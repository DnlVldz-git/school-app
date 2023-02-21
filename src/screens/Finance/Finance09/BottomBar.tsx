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
} from '@ui-kitten/components';

import {Container, Content, Text, NavigationAction} from 'components';
import Images from 'assets/images';

const BottomBar = React.memo(() => {
  const theme = useTheme();
  const {goBack} = useNavigation();
  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);

  return (
    <Layout style={[styles.container, {paddingBottom: 12 + bottom}]} level='2'>
      <NavigationAction icon="house"  status='primary'/>
      <NavigationAction icon="calendar" status='primary'/>
      <Image source={Images.logo} 
      //@ts-ignore
      style={styles.logo}/>
      <NavigationAction icon="timer" status='primary'/>
      <NavigationAction icon="user" status='primary'/>
    </Layout>
  );
});

export default BottomBar;

const themedStyles = StyleService.create({
  container: {
    paddingTop: 12,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 24,
    height: 24,
  },
});
