import { useEffect } from 'react';
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export function useFadeAnimation(visible: boolean) {
  const opacity = useSharedValue(visible ? 1 : 0);
  const translateY = useSharedValue(visible ? 0 : -40);

  useEffect(() => {
    opacity.value = withTiming(visible ? 1 : 0, {
      duration: 300,
      easing: Easing.out(Easing.exp),
    });
    translateY.value = withTiming(visible ? 0 : -40, {
      duration: 300,
      easing: Easing.out(Easing.exp),
    });
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return animatedStyle;
}
