import * as React from 'react';
import {FlatList} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {
  StyleService,
  useStyleSheet,
  TopNavigation,
  Button,
} from '@ui-kitten/components';

import {Container, NavigationAction} from 'components';
import {FinanceStackParamList} from 'navigation/navigation-types';

interface ButtonProps {
  name: string;
  navigate: keyof FinanceStackParamList;
}

const FinanceIntro = React.memo(() => {
  const {navigate} = useNavigation<NavigationProp<FinanceStackParamList>>();

  const styles = useStyleSheet(themedStyles);

  const data: ButtonProps[] = [
    {name: '01. Home', navigate: 'Finance01'},
    {name: '02. Asset Report', navigate: 'Finance02'},
    {name: '03. Month Chart', navigate: 'Finance03'},
    {name: '04. List Transaction', navigate: 'Finance04'},
    {name: '05. Add Transaction', navigate: 'Finance05'},
    {name: '06. Categories Transaction', navigate: 'Finance06'},
    {name: '07. Tranfers', navigate: 'Finance07'},
    {name: '08. E-wallet', navigate: 'Finance08'},
    {name: '09. Remind Bill', navigate: 'Finance09'},
    {name: '10. Portfolios', navigate: 'Finance10'},
  ];

  return (
    <Container style={styles.container}>
      <TopNavigation
        title={'Finance'}
        accessoryLeft={<NavigationAction status="placeholder" />}
      />
      <FlatList
        data={data}
        contentContainerStyle={styles.content}
        renderItem={({item}) => {
          return (
            <Button
              status="primary"
              children={item.name}
              style={styles.button}
              onPress={() => {
                navigate(item.navigate);
              }}
            />
          );
        }}
      />
    </Container>
  );
});

export default FinanceIntro;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    paddingHorizontal: 24,
  },
  button: {
    marginBottom: 16,
  },
});
