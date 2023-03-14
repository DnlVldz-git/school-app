import * as React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {StyleService, useStyleSheet, Icon} from '@ui-kitten/components';
import {Text, VStack} from 'components';
import Images from 'assets/images';

interface IButtonShapeProps {
  icon: string;
  title: string;
  onPress?: () => void;
  backgroundColor: string;
}

const ButtonShape = React.memo(
  ({icon, title, onPress, backgroundColor}: IButtonShapeProps) => {
    const styles = useStyleSheet(themedStyles);
    return (
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <VStack>
          <Icon pack="assets" name={icon} style={styles.icon} />
          <Image
            source={Images.shape}
            //@ts-ignore
            style={{tintColor: backgroundColor, ...styles.image}}
          />
        </VStack>
        <Text category="subhead" marginTop={16}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  },
);

export default ButtonShape;

const themedStyles = StyleService.create({
  button: {
    alignItems: 'center',
  },
  image: {
    width: 48,
    height: 48,
    zIndex: -10,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF',
    position: 'absolute',
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    top: 14,
    left: 14,
  },
});
