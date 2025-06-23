// modules
import { useState, useEffect, useRef } from 'react';
import { AppState, Alert, AppStateStatus } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

// utils
import {
  checkLocationServicesEnabled,
  loadRoute as load,
  saveRoute,
  requestAndCheckPermissions,
} from '@utils';

// typings
import { Position, RouteArray, GeoPosition } from './typings';

export const useLocationTracking = () => {
  const [route, setRoute] = useState<RouteArray>([]);
  const [currentPosition, setCurrentPosition] = useState<Position>(null);
  const [loading, setLoading] = useState(true);
  const [gpsStatus, setGpsStatus] = useState<string>('Initializing...');
  const watchId = useRef<number | null>(null);
  const appState = useRef(AppState.currentState);

  // Stop watching location
  const stopTracking = () => {
    if (watchId.current !== null) {
      Geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
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
        setRoute(prev => {
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
        enableHighAccuracy: true,
        distanceFilter: 5,
        interval: 3000,
        fastestInterval: 2000,
        timeout: 30000,
        maximumAge: 120000,
      },
    );
  };

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
        setRoute(prev => {
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
        enableHighAccuracy: false,
        distanceFilter: 10,
        interval: 5000,
        fastestInterval: 3000,
        timeout: 20000,
        maximumAge: 60000,
      },
    );
  };

  const loadRoute = async () => {
    const parsed = await load();
    setRoute(parsed);
    if (parsed.length > 0) {
      setCurrentPosition(parsed[parsed.length - 1]);
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

  // On mount: permissions, load, start tracking
  useEffect(() => {
    (async () => {
      setLoading(true);
      const ok = await requestAndCheckPermissions();
      await loadRoute();
      const hasLocation = await checkLocationServicesEnabled();
      if (ok && hasLocation) {
        startTracking();
      }
      setLoading(false);
    })();
    return () => stopTracking();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle app state for background/foreground
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        loadRoute();
      }
      appState.current = nextAppState;
    };
    const sub = AppState.addEventListener('change', handleAppStateChange);
    return () => sub.remove();
  }, []);

  return { route, currentPosition, gpsStatus, loading, refreshLocation };
};
