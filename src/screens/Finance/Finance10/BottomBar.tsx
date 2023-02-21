import * as React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {useLayout} from 'hooks';
import {Layout, StyleService, useStyleSheet, Icon} from '@ui-kitten/components';
import {NavigationAction} from 'components';
import Images from 'assets/images';

const BottomBar = React.memo(() => {
  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);

  return (
    <Layout style={[styles.container, {paddingBottom: bottom}]} level="2">
      <NavigationAction icon="house" status="primary" />
      <NavigationAction icon="calendar" status="primary" />
      <TouchableOpacity activeOpacity={0.7} style={styles.center}>
        <Icon pack="assets" name="plus" style={styles.icon} />
        <Image
          source={Images.shape}
          //@ts-ignore
          style={styles.shape}
        />
      </TouchableOpacity>
      <NavigationAction icon="timer" status="primary" />
      <NavigationAction icon="user" status="primary" />
    </Layout>
  );
});

export default BottomBar;

const themedStyles = StyleService.create({
  container: {
    paddingTop: 4,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    position: 'absolute',
    zIndex: 100,
    alignItems: 'center',
    top: 14,
    left: 14,
  },
  shape: {
    zIndex: -10,
    width: 48,
    height: 48,
    tintColor: '#5784E8',
  },
  center: {
    marginTop: -24,
  },
});
