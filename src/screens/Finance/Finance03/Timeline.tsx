import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import {StyleService, useStyleSheet, useTheme} from '@ui-kitten/components';

import {Text, HStack} from 'components';

interface ITimelineProps {
  selectTab: number;
  onSelect: React.Dispatch<React.SetStateAction<number>>;
}

const Timeline = React.memo(({selectTab, onSelect}: ITimelineProps) => {
  const styles = useStyleSheet(themedStyles);
  const TABS = ['Y', 'M', 'W'];

  return (
    <HStack style={styles.container}>
      {TABS.map((item, index) => {
        const isActive = index === selectTab;

        return (
          <TouchableOpacity
            activeOpacity={0.7}
            key={index}
            onPress={() => onSelect(index)}
            style={[styles.button, isActive && styles.activeButton]}>
            <Text
              category={isActive ? 'h8' : 'c1'}
              status={isActive ? 'white' : 'platinum'}>
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </HStack>
  );
});

export default Timeline;

const themedStyles = StyleService.create({
  container: {
    borderRadius: 8,
    backgroundColor: 'background-basic-color-2',
  },
  button: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
  },
  activeButton: {
    backgroundColor: 'background-basic-color-5',
    borderRadius: 8,
  },
});
