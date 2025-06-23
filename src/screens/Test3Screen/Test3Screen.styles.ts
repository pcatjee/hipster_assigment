import { StyleSheet } from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import { colors } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  map: {
    flex: 1,
    marginHorizontal: moderateScale(8),
    borderRadius: moderateScale(12),
    minHeight: moderateScale(300),
  },
  info: {
    fontSize: moderateScale(14),
    textAlign: 'center',
    marginVertical: moderateVerticalScale(8),
  },
  note: {
    fontSize: moderateScale(12),
    color: colors.textTertiary,
    margin: moderateScale(8),
    textAlign: 'center',
  },
  statusContainer: {
    backgroundColor: colors.backgroundLight,
    padding: moderateScale(8),
    margin: moderateScale(8),
    borderRadius: moderateScale(8),
  },
  statusText: {
    fontSize: moderateScale(14),
    color: colors.textSecondary,
    marginBottom: moderateVerticalScale(4),
  },
  refreshButton: {
    backgroundColor: colors.buttonPrimary,
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    margin: moderateScale(8),
  },
  refreshButtonText: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: colors.white,
  },
  tipsContainer: {
    backgroundColor: colors.backgroundLight,
    padding: moderateScale(8),
    margin: moderateScale(8),
    borderRadius: moderateScale(8),
  },
  tipsTitle: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    marginBottom: moderateVerticalScale(4),
  },
  tipsText: {
    fontSize: moderateScale(14),
    color: colors.textSecondary,
    marginBottom: moderateVerticalScale(4),
  },
});
