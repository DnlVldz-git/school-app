import * as React from "react";
import { View, Image, TouchableOpacity } from "react-native";

import { useLayout } from "hooks";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import Carousel from 'react-native-reanimated-carousel';
import {
  Layout,
  StyleService,
  useStyleSheet,
  TopNavigation,
  Avatar,
  Button,
  Icon,
} from "@ui-kitten/components";
import Images from "assets/images";
import { Container, Content, Text, NavigationAction,  VStack, HStack, } from "components";
import {useSharedValue} from 'react-native-reanimated';
import { navigate } from "navigation/RootNavigation";
import { logout } from "services/AuthService";
import Pagination from './Pagination';

const Suscription = React.memo(() => {
  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);
  const dispatch = useAppDispatch();
  const progressValue = useSharedValue(0);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const currentUser = useAppSelector((state) => state.auth.user);

  return (
    <Container style={styles.container}>
      <TopNavigation
        title={"Suscripción"}
        accessoryLeft={<NavigationAction status="primary" />}
        accessoryRight={
          <NavigationAction status="primary" icon="circles_four" />
        }
      />
      <Content contentContainerStyle={styles.content}>
        <VStack level="7" mh={16} border={16} padding={24}>
          <Text category="h6" status="white" marginBottom={14} style={styles.text}>
          Actualmente cuentas con la suscripción básica que consta de 3 clases a la semana
          </Text>
          <Layout style={styles.iconView} level="9">
          </Layout>
          <Image marginBottom={50} marginTop={30} source={Images.trophy}
            /* @ts-ignore */
            style={styles.image}
          />
          <Text category="h8" status="white" marginBottom={14}>
          Su plan de suscripción terminará en 3 días
          </Text>
          <HStack>
              <Text category="callout" status="primary">
                Cancelar
              </Text>
          </HStack>
        </VStack>
      </Content>
    </Container>
  );
});

export default Suscription;

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
  text:{
    textAlign:'justify',
  },
  caret: {
    tintColor: 'text-primary-color',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 9,
    borderRadius: 8,
  },
  grow: {
    width: 12,
    height: 12,
    marginRight: 9,
  },
  susbs:{
    width: 50,
    height: 50,
  },
  image:{
    width: 100,
    height: 100,
    marginHorizontal: "1%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  service: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'background-basic-color-3',
    marginLeft: 16,
  },
  iconView: {
    width: 110,
    height: 110,
    borderRadius: 60,
    borderWidth: 3,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: 140,
    borderColor: "background-basic-color-1",
  },
});