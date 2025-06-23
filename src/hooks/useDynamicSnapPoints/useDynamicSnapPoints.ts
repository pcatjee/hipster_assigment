import { useMemo, useState, useCallback } from 'react';
import { useWindowDimensions } from 'react-native';

const useDynamicSnapPoints = (initialSnapPoints: (string | number)[]) => {
  const { height: windowHeight } = useWindowDimensions();
  const [contentHeight, setContentHeight] = useState(0);

  const handleContentLayout = useCallback(
    (event: { nativeEvent: { layout: { height: number } } }) => {
      const { height } = event.nativeEvent.layout;
      if (height > 0 && height !== contentHeight) {
        setContentHeight(height);
      }
    },
    [contentHeight],
  );

  const snapPoints = useMemo(() => {
    const fullScreenSnap = windowHeight;
    if (contentHeight === 0) {
      return [...initialSnapPoints];
    }
    const contentSnapPoint = contentHeight + 60; // Add padding/handle height
    if (contentSnapPoint < windowHeight) {
      // Only snap to content height
      return [contentSnapPoint];
    }
    // For large content, use initial snap points and full screen
    return [...initialSnapPoints, fullScreenSnap];
  }, [contentHeight, initialSnapPoints, windowHeight]);

  return { snapPoints, handleContentLayout };
};

export default useDynamicSnapPoints;
