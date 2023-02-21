import React from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import {useTheme} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';
import useLayout from 'hooks/useLayout';

import Text from 'components/Text';
import SpendItem from './SpendItem';

import keyExtractor from 'utils/keyExtractor';
import {isEmpty} from 'lodash';
import {VictoryPie} from 'victory-native';
import {ExpensesStat, Spend} from './Expense';

const chartRadius = 160 / 2;
const strokeWidth = 6;

const InitData: ExpensesStat = {
  totalExpenses: 0,
  spends: [],
};

const rawData = {
  expense_aggregate: 0,
  expense: [
    {
      id: '0',
      transactions_aggregate_aggregate_sum: {amount: 3000},
      emoji: '🍔',
      name: 'Food & Drink',
      color: '#F0DF67',
      date: '10/10/2022 06:27',
    },
    {
      id: '1',
      transactions_aggregate_aggregate_sum: {amount: 1000},
      emoji: '✈️',
      name: 'Travel',
      color: '#4B9BAE',
      date: '10/10/2022 06:27',
    },
    {
      id: '2',
      transactions_aggregate_aggregate_sum: {amount: 1000},
      emoji: '⚽',
      name: 'Entertainments',
      color: '#949398',
      date: '10/10/2022 06:27',
    },
    {
      id: '3',
      transactions_aggregate_aggregate_sum: {amount: 1100},
      emoji: '💌',
      name: 'Lover',
      color: '#C06363',
      date: '10/10/2022 06:27',
    },
    {
      id: '4',
      transactions_aggregate_aggregate_sum: {amount: 2000},
      emoji: '🏠',
      name: 'House',
      color: '#5099F4',
      date: '10/10/2022 06:27',
    },
  ],
};

const Expense = () => {
  const theme = useTheme();
  const {bottom} = useLayout();
  const {goBack} = useNavigation();

  const [data, setData] = React.useState<ExpensesStat>(InitData);

  React.useEffect(() => {
    if (rawData) {
      let totalExpenses = 0;
      const spends = rawData.expense.map(value => {
        const amount = value.transactions_aggregate_aggregate_sum.amount | 0;
        const percent = 0;
        totalExpenses += amount;
        return {
          category_id: value.id,
          amount,
          category_name: value.name,
          emoji: value.emoji,
          color: value.color,
          date:value.date,
          percent,
        };
      });
      const mixData: ExpensesStat = {
        totalExpenses,
        spends,
      };
      setData(mixData);
    }
  }, [rawData]);

  const renderItem = React.useCallback(
    ({item}: {item: Spend}) => {
      return (
        <SpendItem
          item={item}
          totalSpend={data.totalExpenses}
          onPress={goBack}
        />
      );
    },
    [data.totalExpenses],
  );

  const colorsChartEmpty = [
    theme['color-primary-100'],
    theme['color-primary-100'],
  ];

  const colorScale = React.useMemo(
    (): string[] => data.spends.map(i => i.color),
    [data.spends],
  );

  const chartData = React.useMemo(
    () =>
      data.spends.map(i => ({
        y: (data.totalExpenses <= 0 ? 0 : i.amount / data.totalExpenses) * 100,
      })),
    [data.spends],
  );

  const chartEmpty = [
    {x: '', y: 1},
    {x: '', y: 1},
  ];

  const listHeaderComponent = React.useCallback(() => {
    return (
      <>
        <VictoryPie
          width={chartRadius * 2}
          height={chartRadius * 2}
          padding={0}
          cornerRadius={4}
          innerRadius={chartRadius - strokeWidth}
          labelPosition="centroid"
          padAngle={0}
          animate={{duration: 1500}}
          colorScale={isEmpty(colorScale) ? colorsChartEmpty : colorScale}
          data={isEmpty(chartData) ? chartEmpty : chartData}
          labels={() => ''}
        />
        <View style={styles.totalView}>
          <Text category="footnote" status="placeholder" center uppercase>
            Total :
          </Text>
          <Text category="callout" marginTop={2} center>
            {data.totalExpenses}
          </Text>
        </View>
      </>
    );
  }, [colorScale, chartEmpty, chartData, chartEmpty]);

  return (
    <FlatList
      data={data.spends || []}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={listHeaderComponent}
      ListHeaderComponentStyle={styles.listHeaderComponentStyle}
      contentContainerStyle={[
        styles.contentContainerStyle,
        {paddingBottom: bottom + 16},
      ]}
    />
  );
};

export default Expense;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  box: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
  },
  contentContainerStyle: {
    paddingTop: 24,
  },
  totalView: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  listHeaderComponentStyle: {
    alignItems: 'center',
    marginBottom: 16,
  },
});
