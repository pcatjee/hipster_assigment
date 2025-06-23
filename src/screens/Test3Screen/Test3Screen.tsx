// modules
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Alert,
  AppState,
  ActivityIndicator,
  AppStateStatus,
  Linking,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';

// styles
import { styles } from './Test3Screen.styles';

// components
import { Header } from '@components';

// icons
// @ts-ignore
import Icon from 'react-native-vector-icons/Foundation';

// typings
import { GeoPosition, Position, RouteArray } from './typings';

// constants
import { STORAGE_KEY } from './constants';

// utils
import { requestAndCheckPermissions } from '@utils';

/**
 * Screen for live GPS tracking and route recording
 */
const Test3Screen = () => {
  const [route, setRoute] = useState<RouteArray>([]);
  const [currentPosition, setCurrentPosition] = useState<Position>(null);
  const [loading, setLoading] = useState(true);
  const [gpsStatus, setGpsStatus] = useState<string>('Initializing...');
  const watchId = useRef<number | null>(null);
  const appState = useRef(AppState.currentState);

  // Load saved route from AsyncStorage
  const loadRoute = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: RouteArray = JSON.parse(saved);
        setRoute(parsed);
        if (parsed.length > 0) setCurrentPosition(parsed[parsed.length - 1]);
      }
    } catch (e) {
      // Ignore
    }
    setLoading(false);
  };

  // Save route to AsyncStorage
  const saveRoute = async (newRoute: RouteArray) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newRoute));
    } catch (e) {
      // Ignore
    }
  };

  // Add debug log for currentPosition
  useEffect(() => {
    console.log('Current position:', currentPosition);
  }, [currentPosition]);

  // Start watching location
  const startTracking = () => {
    setGpsStatus('Getting GPS fix...');
    watchId.current = Geolocation.watchPosition(
      (pos: GeoPosition) => {
        const { latitude, longitude } = pos.coords;
        setCurrentPosition({ latitude, longitude });
        setGpsStatus(
          `GPS Active (Accuracy: ${Math.round(pos.coords.accuracy)}m)`,
        );
        setRoute((prev: RouteArray) => {
          if (
            !prev.length ||
            prev[prev.length - 1].latitude !== latitude ||
            prev[prev.length - 1].longitude !== longitude
          ) {
            const updated = [...prev, { latitude, longitude }];
            saveRoute(updated);
            return updated;
          }
          return prev;
        });
      },
      err => {
        if (err.code === 3) {
          // Timeout - try with different settings
          setGpsStatus('GPS timeout, retrying...');
          stopTracking();
          setTimeout(() => {
            startTrackingWithFallback();
          }, 2000);
        } else {
          setGpsStatus('GPS Error');
          Alert.alert(
            'Location Error',
            `Failed to get location: ${err.message}`,
            [
              {
                text: 'Retry',
                onPress: () => {
                  stopTracking();
                  setTimeout(() => startTracking(), 1000);
                },
              },
              { text: 'OK', style: 'cancel' },
            ],
          );
        }
      },
      {
        enableHighAccuracy: false, // Start with lower accuracy for faster fix
        distanceFilter: 10, // Increased distance filter
        interval: 5000, // Increased interval
        fastestInterval: 3000,
        timeout: 20000, // Increased timeout
        maximumAge: 60000, // Accept cached positions
      },
    );
  };

  // Fallback tracking with different settings
  const startTrackingWithFallback = () => {
    setGpsStatus('Trying high accuracy GPS...');
    watchId.current = Geolocation.watchPosition(
      (pos: GeoPosition) => {
        const { latitude, longitude } = pos.coords;
        setCurrentPosition({ latitude, longitude });
        setGpsStatus(
          `GPS Active (High Accuracy: ${Math.round(pos.coords.accuracy)}m)`,
        );
        setRoute((prev: RouteArray) => {
          if (
            !prev.length ||
            prev[prev.length - 1].latitude !== latitude ||
            prev[prev.length - 1].longitude !== longitude
          ) {
            const updated = [...prev, { latitude, longitude }];
            saveRoute(updated);
            return updated;
          }
          return prev;
        });
      },
      _err => {
        setGpsStatus('GPS Failed');
        Alert.alert(
          'Location Error',
          'Unable to get location. Please check your GPS settings and try again.',
          [
            {
              text: 'Retry',
              onPress: () => {
                stopTracking();
                setTimeout(() => startTracking(), 1000);
              },
            },
            { text: 'OK', style: 'cancel' },
          ],
        );
      },
      {
        enableHighAccuracy: true, // Try high accuracy in fallback
        distanceFilter: 5,
        interval: 3000,
        fastestInterval: 2000,
        timeout: 30000, // Even longer timeout
        maximumAge: 120000, // Accept older cached positions
      },
    );
  };

  // Stop watching location
  const stopTracking = () => {
    if (watchId.current !== null) {
      Geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
  };

  // Manual refresh function
  const refreshLocation = async () => {
    stopTracking();
    const ok = await requestAndCheckPermissions();
    const hasLocation = await checkLocationServicesEnabled();
    if (ok && hasLocation) {
      startTracking();
    } else {
      setGpsStatus('Refresh failed');
    }
  };

  // Handle app state for background/foreground
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // App has come to foreground
        loadRoute();
      }
      appState.current = nextAppState;
    };
    const sub = AppState.addEventListener('change', handleAppStateChange);
    return () => sub.remove();
  }, []);

  const checkLocationServicesEnabled = async () => {
    return new Promise(resolve => {
      Geolocation.getCurrentPosition(
        () => resolve(true),
        error => {
          if (error.code === 2) {
            // Location services disabled
            Alert.alert(
              'Enable Location',
              'Please enable location services in your device settings.',
              [
                {
                  text: 'Open Settings',
                  onPress: () => Linking.openSettings(),
                },
                { text: 'Cancel', style: 'cancel' },
              ],
            );
            resolve(false);
          } else if (error.code === 3) {
            // Timeout - this is common, especially indoors or when GPS is cold
            resolve(true); // Don't block the app for timeout
          } else {
            resolve(true);
          }
        },
        {
          enableHighAccuracy: false, // Try with lower accuracy first
          timeout: 15000, // Increased timeout
          maximumAge: 60000, // Accept cached positions up to 1 minute old
        },
      );
    });
  };

  // On mount: permissions, load, start tracking
  useEffect(() => {
    (async () => {
      const ok = await requestAndCheckPermissions();
      await loadRoute();
      const hasLocation = await checkLocationServicesEnabled();
      if (ok && hasLocation) {
        startTracking();
      }
    })();
    return () => stopTracking();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Map initial region
  const initialRegion = currentPosition
    ? {
        ...currentPosition,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }
    : {
        latitude: 1.3521, // Default: Singapore
        longitude: 103.8198,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };

  return (
    <View style={styles.container}>
      <Header title="Live Tracking Map" />

      {/* GPS Status */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>{gpsStatus}</Text>
        <Text style={styles.statusText}>Route Points: {route.length}</Text>
      </View>

      {/* GPS Tips - only show when needed */}
      {(gpsStatus.includes('timeout') ||
        gpsStatus.includes('Getting GPS') ||
        gpsStatus.includes('Initializing')) && (
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>GPS Tips:</Text>
          <Text style={styles.tipsText}>• Go outside or near a window</Text>
          <Text style={styles.tipsText}>• Wait 30-60 seconds for GPS fix</Text>
          <Text style={styles.tipsText}>
            • Ensure location services are enabled
          </Text>
        </View>
      )}

      {/* Refresh Button */}
      <TouchableOpacity style={styles.refreshButton} onPress={refreshLocation}>
        <Text style={styles.refreshButtonText}>Refresh Location</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 32 }} />
      ) : (
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          region={
            currentPosition
              ? {
                  ...currentPosition,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }
              : undefined
          }
          showsUserLocation={false}
          followsUserLocation={true}
        >
          {route.length > 0 && (
            <Polyline
              coordinates={route}
              strokeColor="#007AFF"
              strokeWidth={5}
            />
          )}
          {currentPosition && (
            <Marker coordinate={currentPosition} title="You">
              <Icon name="marker" size={30} color="#900" />
            </Marker>
          )}
        </MapView>
      )}

      <Text style={styles.info}>
        {route.length} points tracked. {'\n'}
        {currentPosition
          ? `Current: ${currentPosition.latitude.toFixed(
              5,
            )}, ${currentPosition.longitude.toFixed(5)}`
          : 'No position'}
      </Text>
      <Text style={styles.note}>Offline Location Tracking & Route Drawing</Text>
    </View>
  );
};

export default Test3Screen;
