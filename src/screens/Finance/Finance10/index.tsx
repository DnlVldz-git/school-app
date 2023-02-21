import * as React from 'react';
import {View} from 'react-native';
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
  VStack,
  HStack,
} from 'components';
import Images from 'assets/images';
import ProgressWallet from './ProgressWallet';
import Carousel from 'react-native-reanimated-carousel';
import Pagination from './Pagination';
import {useSharedValue} from 'react-native-reanimated';
import BottomBar from './BottomBar';

const Finance10 = React.memo(() => {
  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);

  const [activeIndex, setActiveIndex] = React.useState(0);
  const progressValue = useSharedValue(0);
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={
          <NavigationAction status="primary" icon="menu" style={styles.dot} />
        }
        accessoryRight={
          <NavigationAction status="primary" icon="circles_four" />
        }
      />
      <Content contentContainerStyle={styles.content}>
        <HStack itemsCenter mh={16} mb={16}>
          <HStack justify="flex-start">
            <Avatar source={Images.avatar.avatar08} />
            <VStack ml={16}>
              <Text category="callout">Hi! Marina Kerr</Text>
              <Text category="subhead" status="platinum">
                Hi! Marina Kerr
              </Text>
            </VStack>
          </HStack>
          <Icon pack="assets" name="caret_right" style={styles.caret} />
        </HStack>
        <VStack level="7" mh={16} border={16} padding={24}>
          <Text category="h6" status="white" marginBottom={14}>
            Curent Balance
          </Text>
          <HStack>
            <Text category="h4" status="white">
              $5,680.00{' '}
              <Text category="subhead" status="white">
                +$78.2
              </Text>
            </Text>
            <Layout style={styles.tag} level="5">
              <Icon pack="assets" name="grow" style={styles.grow} />
              <Text category="subhead" status="white">
                2,5%
              </Text>
            </Layout>
          </HStack>
        </VStack>
        <Text category="h4" marginLeft={16} marginTop={24} marginBottom={16}>
          Services
        </Text>
        <View style={{height: 330 * (height / 812)}}>
          <Carousel
            width={width * 0.7}
            vertical={false}
            style={{width: '100%', height: '100%'}}
            height={330 * (height / 812)}
            data={DATA}
            pagingEnabled
            loop={false}
            onSnapToItem={index => setActiveIndex(index)}
            onProgressChange={(_, absoluteProgress) =>
              (progressValue.value = absoluteProgress)
            }
            renderItem={({item}) => {
              return (
                <VStack style={styles.service} padding={20} pb={16}>
                  <HStack>
                    <Text category="h6">{item.title}</Text>
                    <Icon pack="assets" name="shield" />
                  </HStack>
                  <Text
                    category="body"
                    status="success"
                    marginTop={8}
                    marginBottom={20}>
                    {item.perYear}/year
                  </Text>
                  <ProgressWallet data={item.data} />
                  <HStack wrap mt={16} mb={12}>
                    {item.data.map((item, i) => {
                      return (
                        <HStack key={i} itemsCenter style={{width: 75}} mb={16}>
                          <View
                            style={{
                              backgroundColor: item.color,
                              width: 8,
                              height: 8,
                              borderRadius: 99,
                            }}
                          />
                          <Text category="c1">
                            {item.y}% {item.title}
                          </Text>
                        </HStack>
                      );
                    })}
                  </HStack>
                  <Button children={'Invest now'} />
                </VStack>
              );
            }}
          />
        </View>
        <HStack justify="center" mt={16}>
          {DATA.map((item, i) => {
            return (
              <Pagination
                key={i}
                index={i}
                backgroundColor={'#5784E8'}
                length={DATA.length}
                animValue={progressValue}
              />
            );
          })}
        </HStack>
      </Content>
      <BottomBar />
    </Container>
  );
});

export default Finance10;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    paddingTop: 8,
    flexGrow: 1,
  },
  dot: {
    transform: [
      {
        rotate: '90deg',
      },
    ],
  },
  caret: {
    tintColor: 'text-primary-color',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 8,
  },
  grow: {
    width: 12,
    height: 12,
    marginRight: 9,
  },
  service: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'background-basic-color-3',
    marginLeft: 16,
  },
});
const DATA = [
  {
    title: 'Safety',
    perYear: '9.6%',
    data: [
      {y: 56, title: 'Stock', color: '#5784E8'},
      {y: 24, title: 'Gold', color: '#FFDE70'},
      {y: 12, title: 'Saving', color: '#E5CABF'},
      {y: 8, title: 'Crypto', color: '#00CD50'},
    ],
  },
  {
    title: 'Growing',
    perYear: '16.6%',
    data: [
      {y: 56, title: 'Stock', color: '#5784E8'},
      {y: 24, title: 'Gold', color: '#FFDE70'},
      {y: 12, title: 'Saving', color: '#E5CABF'},
      {y: 8, title: 'Crypto', color: '#00CD50'},
    ],
  },
  {
    title: 'Care',
    perYear: '16.6%',
    data: [
      {y: 56, title: 'Stock', color: '#5784E8'},
      {y: 24, title: 'Gold', color: '#FFDE70'},
      {y: 12, title: 'Saving', color: '#E5CABF'},
      {y: 8, title: 'Crypto', color: '#00CD50'},
    ],
  },
  {
    title: 'Care',
    perYear: '16.6%',
    data: [
      {y: 56, title: 'Stock', color: '#5784E8'},
      {y: 24, title: 'Gold', color: '#FFDE70'},
      {y: 12, title: 'Saving', color: '#E5CABF'},
      {y: 8, title: 'Crypto', color: '#00CD50'},
    ],
  },
];
