import * as React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useLayout} from 'hooks';
import {
  Layout,
  StyleService,
  useStyleSheet,
  useTheme,
  TopNavigation,
  Avatar,
} from '@ui-kitten/components';

import {
  Container,
  Content,
  Text,
  NavigationAction,
  HStack,
  VStack,
} from 'components';
import BottomBar from './BottomBar';
import ChartLine from './Chart';
import {dataBill, dataShare} from './data';
import Bill from './Bill';

const Finance09 = React.memo(() => {
  const theme = useTheme();
  const {goBack} = useNavigation();
  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);

  return (
    <Container style={styles.container} useSafeArea={false}>
      <VStack style={[styles.header, {paddingTop: top + 12}]} level="2" ph={12}>
        <HStack>
          <NavigationAction icon="waves" status="primary" />
          <NavigationAction icon="dot_six" status="primary" />
        </HStack>
        <Text category="h3" marginTop={12} marginLeft={12}>
          Hi People!
        </Text>
      </VStack>
      <Content contentContainerStyle={styles.content}>
        <Text category="h6" marginTop={32} marginLeft={24} marginBottom={16}>
          Upcoming Bills
        </Text>
        <Content horizontal contentContainerStyle={styles.contentBill}>
          {dataBill.map((item, i) => {
            return <Bill item={item} key={i} />;
          })}
        </Content>
        <Text category="h6" marginTop={24} marginLeft={24}>
          TOP Friends Share
        </Text>
        <Content horizontal>
          {dataShare.map((item, i) => {
            return (
              <VStack key={i} ml={24} mt={16}>
                <Avatar source={item} size="large" />
              </VStack>
            );
          })}
        </Content>
        <Text category="h6" marginTop={32} marginLeft={24}>
          Expense Chart
        </Text>
        <ChartLine />
      </Content>
      <BottomBar />
    </Container>
  );
});

export default Finance09;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingBottom: 12,
  },
  content: {},
  contentBill: {
    paddingHorizontal: 24,
  },
});
