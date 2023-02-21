import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  StyleService,
  useStyleSheet,
  useTheme,
  TopNavigation,
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

import InputSelect from './InputSelect';

const Finance05 = React.memo(() => {
  const theme = useTheme();
  const {goBack} = useNavigation();
  const styles = useStyleSheet(themedStyles);

  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={<NavigationAction status="primary" />}
        title="Add Transaction"
        accessoryRight={
          <NavigationAction icon="circles_four" status="primary" />
        }
      />
      <Content contentContainerStyle={styles.content}>
        <VStack level="5" padding={16} border={16}>
          <HStack justify="flex-start" mb={16}>
            {DATA.map((data, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setActiveIndex(index);
                  }}>
                  <Text
                    status="white"
                    category="callout"
                    opacity={index === activeIndex ? 1 : 0.5}
                    marginRight={8}>
                    {data.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </HStack>
          <Text category="h4" status="white">
            {DATA[activeIndex].value}
          </Text>
        </VStack>
        <InputSelect title="Category" value={`Food & Drink`} onPress={goBack} />
        <InputSelect
          title="Calendar"
          value="Today, 20 Sept 2021"
          onPress={goBack}
        />
        <InputSelect title="Memo" value="Nothing" onPress={goBack} />
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.dash, {borderColor: theme['color-basic-800']}]}>
          <Icon
            pack="assets"
            name="image"
            style={{tintColor: theme['text-primary-color']}}
          />
          <Text category="callout" status="primary" marginLeft={16}>
            Add Image
          </Text>
        </TouchableOpacity>
      </Content>
      <Button
        children="Create Now"
        style={[styles.button]}
        accessoryRight={<Icon pack="assets" name="arrow_right" />}
        onPress={goBack}
      />
    </Container>
  );
});

export default Finance05;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
  },
  box: {
    padding: 16,
    borderRadius: 12,
  },
  row: {
    flexDirection: 'row',
  },
  input: {
    color: 'transparent',
    paddingLeft: 14,
    fontSize: 24,
  },
  shape: {
    height: 101.6,
    marginTop: 32,
  },
  button: {
    marginHorizontal: 24,
    marginBottom: 8,
  },
  dash: {
    height: 89,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 12,
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

const DATA = [
  {
    title: 'Expensive',
    value: '$1,485.60',
  },
  {
    title: 'Income',
    value: '$2,485.60',
  },
  {
    title: 'Tranfers',
    value: '$3,485.60',
  },
];
