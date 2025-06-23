import { Dimensions, StyleSheet } from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import { colors } from '../../constants';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  map: {
    flex: 1,
    width: width,
    height: height - moderateScale(100),
  },
  error: {
    color: colors.error,
    fontSize: moderateScale(16),
    alignSelf: 'center',
    marginTop: moderateVerticalScale(32),
  },
});
