import * as React from 'react';
import {useLayout} from 'hooks';
import {
  StyleService,
  useStyleSheet,
  useTheme,
  TopNavigation,
  Divider,
} from '@ui-kitten/components';

import {
  Container,
  Content,
  Text,
  NavigationAction,
  HStack,
  VStack,
} from 'components';
import TabBar from './TabBar02';
import {VictoryBar, VictoryAxis, VictoryChart} from 'victory-native';

const Finance02 = React.memo(() => {
  const theme = useTheme();
  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);

  const [activeTab, setActiveTab] = React.useState(0);
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryRight={<NavigationAction status="primary" icon="upload" />}
        accessoryLeft={<Text category="h6" children={'Assets Report'} />}
      />
      <TabBar
        style={styles.tabBar}
        tabs={['Weekly', 'Monthly', 'Yearly', 'All']}
        onChangeTab={setActiveTab}
        tabActive={activeTab}
        backgroundTab={theme['background-basic-color-3']}
        backgroundTabActive={theme['background-basic-color-5']}
      />
      <Content contentContainerStyle={styles.content}>
        <HStack mt={20} mb={40}>
          <Text category="body">Expensive 2020:</Text>
          <VStack>
            <Text category="callout">$24,680.99</Text>
            <Text category="c1" status="danger">
              +15% pass year
            </Text>
          </VStack>
        </HStack>
        <VictoryChart
          width={width - 32}
          height={200}
          padding={{left: 24, bottom: 24, right: 24, top: 0}}>
          <VictoryAxis
            style={{
              axis: {stroke: 'transparent'},
              ticks: {stroke: 'transparent', size: 0},
              tickLabels: {fontSize: 14, padding: 5},
            }}
            tickValues={[1, 2, 3, 4, 5, 6]}
            tickFormat={['2017', '2018', '2019', '2020', '2021', '2022']}
          />
          <VictoryBar
            events={[
              {
                target: 'data',
                eventHandlers: {
                  onPressIn: () => {
                    return [
                      {
                        target: 'data',
                        eventKey: 'all',
                        mutation: () => ({
                          style: {fill: '#E4E7EB'},
                        }),
                      },
                      {
                        target: 'data',
                        mutation: () => ({
                          style: {fill: theme['background-basic-color-5']},
                        }),
                      },
                    ];
                  },
                  onPressOut: () => {
                    return [];
                  },
                },
              },
            ]}
            data={DATA}
            x="time"
            colorScale={'qualitative'}
            barWidth={40}
            padding={{left: 100}}
            cornerRadius={{bottom: 12, top: 12}}
            style={{
              data: {
                fill: '#E4E7EB',
              },
            }}
          />
        </VictoryChart>
        <Text category="h6" marginBottom={20} marginTop={24}>
          Categories
        </Text>
        {DATA_Transaction.map((item, i) => {
          return (
            <HStack key={i} mb={16}>
              <HStack justify="flex-start">
                <Text category="h1" marginRight={8}>
                  {item.title}
                </Text>
                <VStack style={{flex: 1}}>
                  <Text category="h7">{item.describe}</Text>
                  <Text category="c1" status="platinum" marginBottom={12}>
                    {item.time}
                  </Text>
                  <Divider />
                </VStack>
                <Text category="callout" status="primary">
                  {item.progress}
                </Text>
              </HStack>
            </HStack>
          );
        })}
      </Content>
    </Container>
  );
});

export default Finance02;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    paddingHorizontal: 16,
  },
  tabBar: {
    marginHorizontal: 16,
  },
});

const DATA = [
  {x: 1, y: 2, time: '2017'},
  {x: 2, y: 3, time: '2018'},
  {x: 3, y: 5, time: '2019'},
  {x: 4, y: 4, time: '2020'},
  {x: 5, y: 6, time: '2021'},
  {x: 6, y: 6, time: '2022'},
];
const DATA_Transaction = [
  {
    id: '1',
    title: '🍔',
    describe: 'Food & Drink',
    progress: '$15.40',
    time: '10/10/2022 06:27',
  },
  {
    id: '1',
    title: '⚽',
    describe: 'Sports',
    progress: '$15.40',
    time: '10/10/2022 06:27',
  },
  {
    id: '1',
    title: '👙',
    describe: 'Shopping',
    progress: '$15.40',
    time: '10/10/2022 06:27',
  },
  {
    id: '1',
    title: '✈️',
    describe: 'Travel',
    progress: '$15.40',
    time: '10/10/2022 06:27',
  },
];
