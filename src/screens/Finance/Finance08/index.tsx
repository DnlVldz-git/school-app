import * as React from 'react';
import {useLayout} from 'hooks';
import {
  Layout,
  StyleService,
  useStyleSheet,
  TopNavigation,
  Avatar,
  Icon,
  Button,
} from '@ui-kitten/components';

import {
  Container,
  Content,
  Text,
  NavigationAction,
  HStack,
  VStack,
} from 'components';
import Images from 'assets/images';
import Wallet from './Wallet';
import {Image} from 'react-native';

const Finance08 = React.memo(() => {
  const styles = useStyleSheet(themedStyles);
  const {bottom} = useLayout();
  const [activeWallet, setActiveWallet] = React.useState(0);
  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.header}
        accessoryRight={<Avatar source={Images.avatar.avatar08} />}
        accessoryLeft={<NavigationAction icon="browsers" status="primary" />}
      />
      <Content>
        <Text category="h4" marginLeft={24} marginBottom={24}>
          Fequecy
        </Text>
        <Content horizontal contentContainerStyle={styles.contentWallet}>
          {dataWallet.map((wallet, i) => {
            return (
              <Wallet
                item={wallet}
                isActive={activeWallet === i}
                onPress={() => {
                  setActiveWallet(i);
                }}
                key={i}
              />
            );
          })}
        </Content>
        <HStack itemsCenter mh={24} mt={32}>
          <Text category="h4">Latest Transaction</Text>
          <Icon pack="assets" name="caret_right" style={styles.caret} />
        </HStack>
        {DATA_TRANSACTION.map((item, i) => {
          return (
            <VStack key={i} mt={24} mh={24}>
              <HStack>
                <Layout style={styles.stag} level="3">
                  <Icon pack="assets" name={item.icon} style={styles.icon} />
                </Layout>
                <VStack style={{flex: 1}}>
                  <HStack mb={10}>
                    <Text category="s2">{item.title}</Text>
                    <Text category="h7" status="danger">
                      {item.amount}
                    </Text>
                  </HStack>
                  <Text category="c1" status="platinum">
                    {item.date}
                  </Text>
                </VStack>
              </HStack>
            </VStack>
          );
        })}
      </Content>
      <Button
        accessoryLeft={<Icon pack="assets" name="plus" />}
        style={styles.plus}
      />
      <Layout style={[styles.bottom, {paddingBottom: bottom + 8}]} level="8">
        <NavigationAction icon="house" status="primary" />
        <Image source={Images.logo} style={styles.logo} />
        <NavigationAction icon="user" status="primary" />
      </Layout>
    </Container>
  );
});

export default Finance08;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  header: {
    marginRight: 16,
  },
  contentWallet: {
    paddingHorizontal: 24,
  },
  caret: {
    width: 16,
    height: 16,
    tintColor: 'text-basic-color',
  },
  stag: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
    width: 24,
    height: 24,
  },
  plus: {
    position: 'absolute',
    right: 24,
    bottom: 60,
    width: 48,
    zIndex: 100,
  },
  bottom: {
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  logo: {
    width: 24,
    height: 24,
  },
});
const dataWallet = [
  {
    id: '0',
    name: 'Living',
    icon: 'life',
    color: '#215191',
    total_transactions: 795.2,
    amount: 5680,
  },
  {
    id: '1',
    name: 'Entertainment',
    icon: 'entertainment',
    color: '#4B9BAE',
    total_transactions: 177.6,
    amount: 1480,
  },
  {
    id: '2',
    name: 'Shopping',
    icon: 'shopping',
    color: '#949398',
    total_transactions: 511.2,
    amount: 5680,
  },
  {
    id: '6',
    name: 'Education',
    icon: 'education',
    color: '#FE9870',
    total_transactions: 170.4,
    amount: 5680,
  },
];
const DATA_TRANSACTION = [
  {
    title: 'Food & Drink',
    icon: 'shopping',
    date: '01/25/2021 06:37',
    amount: '-56.000đ',
  },
  {
    title: 'Entertainment',
    icon: 'education',
    date: '01/25/2021 06:37',
    amount: '-56.000đ',
  },
  {
    title: 'Shopping',
    icon: 'life',
    date: '01/25/2021 06:37',
    amount: '-56.000đ',
  },
];
