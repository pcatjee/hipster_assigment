// modules
import { StyleSheet } from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';

// constants
import { colors } from '@constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(24),
    backgroundColor: colors.background,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(8),
    padding: moderateScale(12),
    fontSize: moderateScale(16),
    marginBottom: moderateVerticalScale(16),
    elevation: 2,
  },
  resultItem: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(8),
    padding: moderateScale(16),
    marginBottom: moderateVerticalScale(10),
    elevation: 1,
  },
  resultText: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  resultSub: {
    fontSize: moderateScale(13),
    color: colors.textSecondary,
    marginTop: moderateVerticalScale(2),
  },
  empty: {
    textAlign: 'center',
    color: colors.textTertiary,
    marginTop: moderateVerticalScale(32),
  },
});
