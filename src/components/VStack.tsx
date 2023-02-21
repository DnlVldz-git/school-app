import {useTheme} from '@ui-kitten/components';
import React, {memo} from 'react';
import {GestureResponderEvent, TouchableOpacity, ViewProps} from 'react-native';

export interface VStackProps extends ViewProps {
  padder?: boolean;
  mt?: number;
  mb?: number;
  mh?: number;
  mv?: number;
  ml?: number;
  mr?: number;
  ph?: number;
  pt?: number;
  pl?: number;
  pv?: number;
  pb?: number;
  maxWidth?: number;
  minWidth?: number;
  padding?: number;
  border?: number;
  margin?: number;
  alignSelfCenter?: boolean;
  itemsCenter?: boolean;
  wrap?: boolean;
  flexOne?: boolean;
  onPress?(): void;
  onLongPress?: (event: GestureResponderEvent) => void;
  level?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | string;
  justify?:
    | 'center'
    | 'space-between'
    | 'flex-start'
    | 'flex-end'
    | 'space-around'
    | 'space-evenly'
    | undefined;
}

const VStack: React.FC<VStackProps> = memo(
  ({
    style,
    padder,
    children,
    mt,
    mb,
    pt,
    mh,
    pl,
    mv,
    ml,
    mr,
    ph,
    pv,
    pb,
    padding,
    margin,
    itemsCenter,
    wrap,
    level,
    onLongPress,
    justify = 'space-between',
    onPress,
    border,
    maxWidth,
    minWidth,
    flexOne,
    alignSelfCenter,
    ...props
  }) => {
    const theme = useTheme();
    const disabled = !!!onPress && !!!onLongPress;
    return (
      <>
        <TouchableOpacity
          onLongPress={onLongPress}
          disabled={disabled}
          activeOpacity={disabled ? 1 : 0.54}
          onPress={onPress}
          style={[
            flexOne && {flex: 1},
            {
              borderRadius: border,
              maxWidth: maxWidth,
              minWidth: minWidth,
              alignItems: itemsCenter ? 'center' : undefined,
              paddingHorizontal: padder ? 24 : ph,
              paddingBottom: pb,
              paddingLeft: pl,
              padding: padding,
              justifyContent: justify,
              marginTop: mt,
              alignSelf: alignSelfCenter ? 'center' : undefined,
              marginBottom: mb,
              marginLeft: ml,
              marginRight: mr,
              marginHorizontal: mh,
              marginVertical: mv,
              paddingTop: pt,
              flexWrap: wrap ? 'wrap' : undefined,
              margin: margin,
              paddingVertical: pv,
              backgroundColor: level
                ? theme[`background-basic-color-${level}`]
                : 'transparent',
            },
            style,
          ]}
          {...props}>
          {children}
        </TouchableOpacity>
      </>
    );
  },
);

export default VStack;
