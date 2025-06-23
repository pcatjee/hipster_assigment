import { StyleSheet } from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import { colors } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(24),
    backgroundColor: colors.background,
  },
  inputField: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(8),
    padding: moderateScale(16),
    marginBottom: moderateVerticalScale(16),
    elevation: 2,
  },
  inputLabel: {
    fontSize: moderateScale(14),
    color: colors.textTertiary,
  },
  inputValue: {
    fontSize: moderateScale(16),
    color: colors.textPrimary,
    marginTop: moderateVerticalScale(4),
  },
  confirmButton: {
    backgroundColor: colors.buttonPrimary,
    borderRadius: moderateScale(8),
    padding: moderateScale(16),
    alignItems: 'center',
    marginTop: moderateVerticalScale(32),
  },
  confirmText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: moderateScale(16),
  },
});
