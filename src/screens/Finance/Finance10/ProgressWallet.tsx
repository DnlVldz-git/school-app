import React, {memo} from 'react';
import {View} from 'react-native';
import {StyleService, useStyleSheet} from '@ui-kitten/components';
import {VictoryPie} from 'victory-native';

interface Props {
  data: any[];
}

const ProgressWallet = memo(({data}: Props) => {
  const styles = useStyleSheet(themedStyles);

  const chartRadius = 106 / 2;
  const strokeWidth = 20;

  return (
    <View style={styles.container}>
      <VictoryPie
        width={chartRadius * 2}
        height={chartRadius * 2}
        padding={0}
        // cornerRadius={6}
        innerRadius={chartRadius - strokeWidth}
        labelPosition="centroid"
        // padAngle={2}
        animate={{duration: 1200, easing: 'circle'}}
        colorScale={['#5784E8', '#FFDE70', '#E5CABF', '#00CD50']}
        data={data}
        standalone
        startAngle={-70}
        labels={undefined}
      />
    </View>
  );
});

export default ProgressWallet;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconGrow: {
    width: 16,
    height: 12,
    marginRight: 4,
  },
});
