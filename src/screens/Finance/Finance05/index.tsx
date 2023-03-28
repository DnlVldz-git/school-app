import * as React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  StyleService,
  useStyleSheet,
  useTheme,
  TopNavigation,
  Icon,
  Button,
  Layout
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
        title="Detalles de la clase"
        accessoryRight={
          <NavigationAction icon="circles_four" status="primary" />
        }
      />
      <Content contentContainerStyle={styles.content}>
        <VStack level="1" padding={16} border={16}>
        <Text category="h4" marginLeft={-10} marginTop={5} marginBottom={16}>
          Clase 1
        </Text>
          <HStack justify="flex-start" mb={16}>
            {DATA.map((data, index) => {
              return (
                  <Layout style={styles.boxView} level="5">
                    <Text
                      center 
                      status="white"
                      category="h5"
                      opacity={index === activeIndex ? 1 : 0.5}
                      marginRight={10}>
                      
                    </Text>
                  </Layout>
                  
              );
            })}
          </HStack>
        </VStack> 
        <InputSelect title="Profesor" value="Rubén Martinez" onPress={goBack} />
        <InputSelect title="Fecha" value="27/03/2023" onPress={goBack}/>
        <InputSelect title="Hora" value="10:30 hrs" onPress={goBack}/>
        <Image source={Images.videoCallCircle}
                /* @ts-ignore */
                style={styles.image}
              />
      </Content>
      <Button
        children="Unirse a la clase"
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
  boxView: {
    marginTop: 2,
    width: 400,
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: -15,
    marginLeft: -40,
  },
  row: {
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 40,
    alignSelf: "center",
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
    backgroundColor: '#D90B14',
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
    title: 'Clase 1',
    date: '27/03/2023',
    hour: '10:30 hrs'
  },
];
