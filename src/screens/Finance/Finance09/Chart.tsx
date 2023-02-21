import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import useLayout from 'hooks/useLayout';
import {
  LineChart,
  LineChartCursorLine,
  LineChartDot,
  TLineChartPoint,
} from 'react-native-wagmi-charts';
import {FAKE_DATA} from './data';
import dayjs from 'utils/dayjs';
import _ from 'lodash';
import {Layout} from '@ui-kitten/components';
import {Text} from 'components';
import {formatDefault} from 'utils/formatValue';

const ChartLine = memo(() => {
  const convertData = (
    data: {
      fundPriceId: string;
      fundId: string;
      priceDate: string;
      closingPrice: number;
    }[],
  ) => {
    const updateData =
      data &&
      _.map(
        data.map((obj, index) => {
          let newObj: TLineChartPoint = {
            value: 0,
            timestamp: 0,
          };
          Object.keys(obj).forEach(key => {
            if (key === 'closingPrice') {
              newObj.value = obj[key];
            }
            if (key === 'priceDate') {
              newObj.timestamp = dayjs(obj[key]).unix();
            }
          });
          return newObj;
        }),
      );
    return updateData;
  };

  const {width} = useLayout();
  const [data, setData] = React.useState<
    {
      fundPriceId: string;
      fundId: string;
      priceDate: string;
      closingPrice: number;
    }[]
  >(FAKE_DATA[0].data);
  const [activeindex, setActiveindex] = React.useState(data.length - 1);
  const [show, setShow] = React.useState(true);
  const onCurrentChange = (index: number) => {
    setShow(false);
    setActiveindex(index);
  };
  return (
    <View style={{flex: 1, flexDirection: 'row', marginLeft: 24}}>
      <LineChart.Provider
        data={convertData(data)}
        onCurrentIndexChange={onCurrentChange}>
        <LineChart.Group>
          <LineChart yGutter={80} style={{}} width={width - 24} height={240}>
            <LineChart.Path color="#5099F4" width={4} inactiveColor="#5099F420">
              {show && (
                <LineChartDot
                  color="#5099F4"
                  outerSize={16}
                  at={data.length - 1}
                  hasPulse
                  size={6}
                />
              )}
              <LineChart.Gradient color="#02A4EA" />
            </LineChart.Path>
            <LineChartCursorLine />
            <LineChart.CursorCrosshair
              onEnded={e => {
                setActiveindex(data.length - 1);
                setShow(true);
              }}
              enabled
              cancelsTouchesInView
              crosshairProps={{
                style: styles.crosshairStyle,
              }}>
              <LineChart.Tooltip>
                <Layout style={styles.tooltip}>
                  <Text category="c2" status="white">
                    {dayjs(data[activeindex].priceDate).format('MMMM YYYY')}
                  </Text>
                  <Text status="white">
                    {formatDefault(data[activeindex].closingPrice.toFixed(2))}
                  </Text>
                </Layout>
              </LineChart.Tooltip>
            </LineChart.CursorCrosshair>
          </LineChart>
        </LineChart.Group>
      </LineChart.Provider>
    </View>
  );
});

export default ChartLine;

const styles = StyleSheet.create({
  chart: {
    marginTop: 32,
    height: 250,
    flex: 1,
  },
  crosshairStyle: {
    borderWidth: 3,
    borderColor: '#E20086',
    width: 13,
    height: 13,
    borderRadius: 99,
    backgroundColor: '#FFF',
  },
  tooltip: {
    backgroundColor: '#323F4B',
    padding: 8,
    borderRadius: 12,
  },
});
