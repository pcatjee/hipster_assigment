// modules
import { Alert, Linking } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';

// typings
import { RouteArray } from '@hooks/useLocationTracking/typings';

// constants
import { STORAGE_KEY } from '@constants';

export const checkLocationServicesEnabled = async () => {
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

// Load saved route from AsyncStorage
export const loadRoute = async () => {
  try {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed: RouteArray = JSON.parse(saved);
      return parsed;
    }
  } catch (e) {
    // Ignore
  }
  return [];
};

// Save route to AsyncStorage
export const saveRoute = async (newRoute: RouteArray) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newRoute));
  } catch (e) {
    // Ignore
  }
};
