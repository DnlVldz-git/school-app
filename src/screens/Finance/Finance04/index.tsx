import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useLayout} from 'hooks';
import {
  StyleService,
  useStyleSheet,
  useTheme,
  Avatar,
  Icon,
  Button,
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
import Images from 'assets/images';
import ProgressBar from 'components/ProgressBar';

const Finance04 = React.memo(() => {
  const theme = useTheme();
  const {goBack} = useNavigation();
  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);

  return (
    <Container style={styles.container}>
      <HStack ml={16}>
        <HStack itemsCenter>
          <Avatar source={Images.avatar.avatar08} />
          <VStack ml={12}>
            <Text category="callout">Repay Marina Kerr</Text>
            <Text category="subhead" status="placeholder">
              7 Active Saving
            </Text>
          </VStack>
        </HStack>
        <NavigationAction icon="bell_ring" status="primary" />
      </HStack>
      <Content contentContainerStyle={styles.content}>
        <VStack level="5" border={12} padding={24} mb={16} mt={24} mh={16}>
          <HStack>
            <HStack justify="flex-start" itemsCenter mb={8}>
              <Text category="callout" status="white" marginRight={4}>
                Balance
              </Text>
              <Icon pack="assets" name="eye_closed" style={styles.eyeClose} />
            </HStack>
            <Icon pack="assets" name="caret_right" style={styles.eyeClose} />
          </HStack>
          <HStack itemsCenter justify="flex-start">
            <Text category="h3" marginRight={8} status="white">
              $13,925.60
            </Text>
            <VStack level="1" ph={12} pv={8} border={8}>
              <Text category="c1" status="primary">
                +15%
              </Text>
            </VStack>
          </HStack>
        </VStack>
        <HStack mb={24} mh={16}>
          <Button
            style={styles.button}
            children={'Deposit'}
            accessoryLeft={<Icon pack="assets" name="plus" />}
          />
          <Button
            style={[styles.button, {marginHorizontal: 16}]}
            children={'Withdraw'}
            status="transparent-primary"
            accessoryLeft={<Icon pack="assets" name="download" />}
          />
          <TouchableOpacity style={styles.buttonOption}>
            <Icon pack="assets" name="menu" style={styles.menu} />
          </TouchableOpacity>
        </HStack>
        <HStack mb={16} mh={16}>
          <Text category="h6">Portfolios</Text>
          <Text category="callout" status="primary">
            See All
          </Text>
        </HStack>
        <Content horizontal contentContainerStyle={styles.contentPort}>
          {DATA_Portfolios.map((item, i) => {
            return (
              <VStack
                level="3"
                padding={24}
                border={16}
                key={i}
                mr={16}
                minWidth={width - 52}>
                <HStack justify="flex-start" mb={16}>
                  <Text marginRight={12} category="h1">
                    🏠
                  </Text>
                  <VStack style={{flex: 1}}>
                    <Text category="callout">New House</Text>
                    <HStack itemsCenter>
                      <Text category="subhead" status="platinum">
                        10/10/2022 17:04
                      </Text>
                      <Text category="callout" status="primary">
                        25%
                      </Text>
                    </HStack>
                  </VStack>
                </HStack>
                <ProgressBar progress={25 / 100} />
                <HStack itemsCenter mt={8}>
                  <Text category="subhead" status="platinum">
                    $30,000
                  </Text>
                  <Text category="h8">$30,000</Text>
                </HStack>
              </VStack>
            );
          })}
        </Content>
        <HStack mh={16} mt={32} mb={16}>
          <Text category="h6">Transaction</Text>
          <Icon pack="assets" name="caret_right" style={styles.caretIcon} />
        </HStack>
        {DATA_Transaction.map((item, i) => {
          return (
            <HStack key={i} mb={16} mh={16}>
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

export default Finance04;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {},
  contentPort: {
    paddingHorizontal: 16,
  },
  eyeClose: {
    width: 16,
    height: 16,
    tintColor: 'text-white-color',
  },
  button: {
    flex: 1,
  },
  buttonOption: {
    backgroundColor: '#5784E820',
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    transform: [
      {
        rotate: '90deg',
      },
    ],
  },
  caretIcon: {
    width: 16,
    height: 16,
    tintColor: 'text-primary-color',
  },
});

const DATA_Portfolios = [
  {
    title: '🏠',
    describe: 'New House',
    date: '10/10/2022 17:04',
    progress: 25 / 100,
    deposit: '$30,000',
    target: '$800,000',
  },
  {
    title: '🍔',
    describe: 'Food & Drink',
    date: '10/10/2022 17:04',
    progress: 25 / 100,
    deposit: '$30,000',
    target: '$800,000',
  },
  {
    title: '🏠',
    describe: 'New House',
    date: '10/10/2022 17:04',
    progress: 25 / 100,
    deposit: '$30,000',
    target: '$800,000',
  },
  {
    title: '🏠',
    describe: 'New House',
    date: '10/10/2022 17:04',
    progress: 25 / 100,
    deposit: '$30,000',
    target: '$800,000',
  },
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
