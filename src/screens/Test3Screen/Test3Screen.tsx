// modules
import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

// styles
import { styles } from './Test3Screen.styles';

// components
import { Header } from '@components';

// hooks
import { useLocationTracking } from '@hooks';

// icons
// @ts-ignore
import Icon from 'react-native-vector-icons/Foundation';

/**
 * Screen for live GPS tracking and route recording
 */
const Test3Screen = () => {
  const { route, currentPosition, gpsStatus, loading, refreshLocation } =
    useLocationTracking();

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
