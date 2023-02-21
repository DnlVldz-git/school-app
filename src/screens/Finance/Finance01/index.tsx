import * as React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useLayout} from 'hooks';
import {
  StyleService,
  useStyleSheet,
  useTheme,
  TopNavigation,
  Icon,
  Button,
  Avatar,
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

const Finance01 = React.memo(() => {
  const styles = useStyleSheet(themedStyles);

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={
          <Image
            source={Images.logo}
            //@ts-ignore
            style={styles.logo}
          />
        }
        accessoryRight={<NavigationAction icon="bell_ring" status="primary" />}
      />
      <Content contentContainerStyle={styles.content}>
        <VStack level="10" border={12} padding={24} mb={16}>
          <HStack justify="flex-start" itemsCenter mb={8}>
            <Text category="callout">Balance</Text>
            <Icon pack="assets" name="eye_closed" style={styles.eye} />
          </HStack>
          <HStack itemsCenter justify="flex-start">
            <Text category="h3" marginRight={8}>
              $13,925.60
            </Text>
            <VStack level="1" ph={12} pv={8} border={8}>
              <Text category="c1" status="primary">
                +15%
              </Text>
            </VStack>
          </HStack>
        </VStack>
        <HStack mb={24}>
          <Button
            style={styles.button}
            children={'Send'}
            accessoryLeft={<Icon pack="assets" name="upload" />}
          />
          <Button
            style={[styles.button, {marginHorizontal: 16}]}
            children={'Send'}
            status="danger"
            accessoryLeft={<Icon pack="assets" name="download" />}
          />
          <TouchableOpacity style={styles.buttonOption}>
            <Icon pack="assets" name="menu" style={styles.menu} />
          </TouchableOpacity>
        </HStack>
        <VStack level="3" padding={24} border={16}>
          <HStack mb={24}>
            <Text category="h5">Remind</Text>
            <Text category="callout" status="primary">
              See All
            </Text>
          </HStack>
          <HStack justify="flex-start" itemsCenter>
            <Avatar
              source={Images.avatar.avatar10}
              //@ts-ignore
              style={styles.avatar}
            />
            <VStack style={{flex: 1}}>
              <Text category="h8">Repay Marina Kerr</Text>
              <HStack mt={4}>
                <Text category="subhead" status="platinum">
                  10/10/2022 17:04
                </Text>
                <Text category="h8" status="danger">
                  $250.99
                </Text>
              </HStack>
            </VStack>
          </HStack>
        </VStack>
        <HStack itemsCenter mt={24} mb={16}>
          <Text category="h6">Transaction</Text>
          <Icon pack="assets" name="caret_right" style={styles.caret} />
        </HStack>
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
                  {item.prime}
                </Text>
              </HStack>
            </HStack>
          );
        })}
      </Content>
    </Container>
  );
});

export default Finance01;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  logo: {
    width: 24,
    height: 24,
    marginLeft: 16,
  },
  content: {
    paddingHorizontal: 16,
  },
  eye: {
    width: 16,
    height: 16,
    marginLeft: 4,
  },
  menu: {
    transform: [
      {
        rotate: '90deg',
      },
    ],
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
  avatar: {
    width: 48,
    height: 48,
    marginRight: 12,
  },
  caret: {
    width: 16,
    height: 16,
    tintColor: 'text-primary-color',
  },
});

const DATA_Transaction = [
  {
    id: '1',
    title: '🍔',
    describe: 'Food & Drink',
    prime: '$15.40',
    time: '10/10/2022 06:27',
  },
  {
    id: '1',
    title: '⚽',
    describe: 'Sports',
    prime: '$15.40',
    time: '10/10/2022 06:27',
  },
  {
    id: '1',
    title: '👙',
    describe: 'Shopping',
    prime: '$15.40',
    time: '10/10/2022 06:27',
  },
  {
    id: '1',
    title: '✈️',
    describe: 'Travel',
    prime: '$15.40',
    time: '10/10/2022 06:27',
  },
];
