import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import useLayout from 'hooks/useLayout';

import Text from 'components/Text';

import dayjs from 'utils/dayjs';
import {Icon} from '@ui-kitten/components';
import {formatDefault} from 'utils/formatValue';

interface BillFragment {
  id: string;
  category: {
    name: string;
    color: string;
    icon: string;
  };
  amount: number;
  date: number;
}

interface BillProps {
  item: BillFragment;
  onPress?(): void;
}

const Bill = ({item, onPress}: BillProps) => {
  const {width} = useLayout();
  const {amount, date, category} = item;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.container,
        {width: width - 68, backgroundColor: category?.color},
      ]}
      onPress={onPress}>
      <View style={styles.top}>
        <View style={styles.row}>
          <Icon pack="assets" name={category.icon} style={styles.icon} />
          <View>
            <Text category="h6" status="white">
              {category?.name}
            </Text>
            <Text category="h4" marginTop={8} status='white'>
              {formatDefault(amount.toFixed(2))}
            </Text>
          </View>
        </View>
        <Text category="body" status="white">
          {dayjs(date).format('DD MMM')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Bill;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginRight: 16,
    paddingLeft: 24,
    paddingTop: 24,
    paddingBottom: 16,
    paddingRight: 16,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 16,
  },
});
