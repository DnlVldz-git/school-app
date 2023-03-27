import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon, useTheme} from '@ui-kitten/components';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import Text from 'components/Text';

export interface WalletFragment {
  id?: string;
  name?: string;
  color?: string;
  icon?: string;
  total_transactions?: number;
  amount?: number;
}
interface WalletProps {
  item: WalletFragment;
  isActive: boolean;
  onPress?(): void;
}

const Wallet = ({item, onPress, isActive}: WalletProps) => {
  const theme = useTheme();
  const {name, icon, total_transactions, amount, color} = item;
  const process =
    total_transactions && amount
      ? total_transactions / amount < 0
        ? 0
        : total_transactions / amount > 1
        ? 1
        : total_transactions / amount
      : 0;

  const width = useSharedValue(0);

  const [widthItem, setWidthItem] = React.useState(0);

  const style = useAnimatedStyle(
    () => ({
      width: withTiming(width.value, {
        duration: 1500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
      backgroundColor: isActive
        ? theme['color-basic-1000']
        : theme['color-basic-100'],
    }),
    [width, color],
  );

  React.useEffect(() => {
    width.value = widthItem * process;
  }, [width, widthItem, process]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.container, {backgroundColor: color}]}>
      <Icon pack="assets" name={icon} style={styles.icon} />
      <Text
        category="body"
        marginTop={8}
        status={!isActive ? 'basic' : 'white'}>
        {name}
      </Text>
      <Text
        category="callout"
        opacity={0.5}
        marginTop={44}
        status={!isActive ? 'basic' : 'white'}>
        {Math.round(process * 100)}%
      </Text>
      <View
        style={styles.line}
        onLayout={({nativeEvent}) => setWidthItem(nativeEvent.layout.width)}>
        <Animated.View style={[styles.lineAnim, style]} />
      </View>
      <Text
        category="callout"
        marginTop={12}
        status={!isActive ? 'basic' : 'white'}>
        ${amount}
      </Text>
    </TouchableOpacity>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    width: 180,
    borderRadius: 16,
    marginRight: 16,
    padding: 24,
  },
  icon: {
    width: 32,
    height: 32,
  },
  line: {
    height: 4,
    width: '100%',
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: 2,
  },
  lineAnim: {
    height: 4,
    flex: 1,
    borderRadius: 4,
  },
});
