import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedProps,
  Easing,
} from 'react-native-reanimated';
import {useDerivedValue} from 'react-native-reanimated';
import {ReText} from 'react-native-redash';
import Svg, {Circle} from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
interface CircleProps {
  value: number;
  stokeColor?: string;
  progressStokeColor?: string;
  d: number;
}
export default function CircleProgressBar({
  value,
  progressStokeColor = '#5784E8',
  stokeColor = '#FFF',
  d,
}: CircleProps) {
  const progress = useSharedValue(0);
  const CIRCLE_LENGTH = d * Math.PI - 44; // 2PI*R
  const R = CIRCLE_LENGTH / (2 * Math.PI);
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  React.useEffect(() => {
    progress.value = withTiming(value / 100 > 0 ? value / 100 : 0, {
      duration: 3000,
      easing: Easing.bezier(0.1, 0.3, 0.5, 1),
    });
  }, [progress.value, value]);

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}%`;
  }, [value, progress.value]);
  return (
    <View style={[styles.container, {width: d, height: d}]}>
      <Svg
        style={{
          position: 'absolute',
          width: d,
          height: d,
        }}>
        <Circle
          cx={d / 2}
          cy={d / 2}
          r={R}
          stroke={stokeColor}
          strokeWidth={4}
          strokeDasharray={CIRCLE_LENGTH}
        />
        <AnimatedCircle
          cx={d / 2}
          cy={d / 2}
          r={R}
          stroke={progressStokeColor}
          strokeWidth={4}
          strokeDasharray={CIRCLE_LENGTH}
          animatedProps={animatedProps}
          strokeLinecap={'round'}
        />
      </Svg>
      <ReText style={styles.progressText} text={progressText} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 16,
    lineHeight: 20,
    color: '#1F2933',
    alignSelf: 'center',
    marginBottom: 2,
  },
});
