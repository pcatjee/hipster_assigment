import { StyleSheet } from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import { colors } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  verticalLayout: {
    paddingHorizontal: moderateScale(16),
    paddingBottom: moderateVerticalScale(16),
  },
  horizontalList: {
    paddingHorizontal: moderateScale(16),
    paddingBottom: moderateVerticalScale(16),
  },
  horizontalCard: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(8),
    padding: moderateScale(16),
    marginRight: moderateScale(10),
    width: moderateScale(150),
    height: moderateScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  verticalCard: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(8),
    padding: moderateScale(16),
    marginBottom: moderateVerticalScale(12),
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  cardTitle: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  activeCardTitle: {
    color: colors.white,
  },
  cardDescription: {
    fontSize: moderateScale(14),
    color: colors.textSecondary,
    marginTop: moderateVerticalScale(4),
  },
  bsContainer: {
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateVerticalScale(12),
  },
  bsHeader: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    marginBottom: moderateVerticalScale(12),
  },
  bsDescription: {
    fontSize: moderateScale(16),
    lineHeight: moderateScale(24),
    marginBottom: moderateVerticalScale(20),
  },
  bsHorizontalList: {
    paddingBottom: moderateVerticalScale(20),
  },
  bsHorizontalCard: {
    backgroundColor: colors.cardBackgroundLight,
    borderRadius: moderateScale(8),
    padding: moderateScale(16),
    marginRight: moderateScale(10),
    width: moderateScale(160),
    height: moderateScale(120),
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeHorizontalCard: {
    backgroundColor: colors.cardActive,
  },
});
