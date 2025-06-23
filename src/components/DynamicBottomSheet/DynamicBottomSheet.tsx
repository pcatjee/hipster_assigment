// modules
import React, { forwardRef, useMemo } from 'react';
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

// hooks
import { useDynamicSnapPoints } from '@hooks';

// typings
import { DynamicBottomSheetProps } from './typings';

export type BottomSheetRef = BottomSheet;

const DynamicBottomSheet = forwardRef<BottomSheetRef, DynamicBottomSheetProps>(
  ({ children, onClose }, ref) => {
    const initialSnapPoints = useMemo(() => ['70%', '90%'], []);
    const { snapPoints, handleContentLayout } =
      useDynamicSnapPoints(initialSnapPoints);

    const renderBackdrop = useMemo(
      () => (props: any) =>
        <BottomSheetBackdrop {...props} pressBehavior="close" />,
      [],
    );

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        onClose={onClose}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView onLayout={handleContentLayout}>
          {children}
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

export default DynamicBottomSheet;
