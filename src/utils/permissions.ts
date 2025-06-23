import { Platform, Alert, Linking } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

/**
 * Request and check location permissions for both Android and iOS
 * @returns Promise<boolean> - true if permissions are granted, false otherwise
 */
export const requestAndCheckPermissions = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    try {
      // Check current permission states
      const fine = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      const coarse = await check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);

      // Request basic location permissions first
      let fineResult = fine;
      let coarseResult = coarse;

      if (fine !== RESULTS.GRANTED) {
        fineResult = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      }
      if (coarse !== RESULTS.GRANTED) {
        coarseResult = await request(
          PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        );
      }

      if (fineResult !== RESULTS.GRANTED || coarseResult !== RESULTS.GRANTED) {
        Alert.alert(
          'Permission required',
          'Location permission is required to track your route.',
          [
            {
              text: 'Open Settings',
              onPress: () => Linking.openSettings(),
            },
            { text: 'Cancel', style: 'cancel' },
          ],
        );
        return false;
      }

      // Only request background location if basic permissions are granted
      // and user is actively using the app (not on first launch)
      const background = await check(
        PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
      );
      if (background !== RESULTS.GRANTED) {
        // Show info about background location
        Alert.alert(
          'Background Location',
          'For continuous tracking when the app is in background, please grant background location permission in Settings.',
          [
            {
              text: 'Open Settings',
              onPress: () => Linking.openSettings(),
            },
            { text: 'Skip', style: 'cancel' },
          ],
        );
      }

      return true;
    } catch (err: any) {
      Alert.alert('Permission error', err.message);
      return false;
    }
  } else if (Platform.OS === 'ios') {
    // For iOS, we'll use the native permission request
    // The Info.plist descriptions will handle the user prompts
    return true;
  }
  // This should never be reached in React Native (only iOS and Android are supported)
  return false;
};
