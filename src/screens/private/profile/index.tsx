import * as React from "react";
import { View, Image, TouchableOpacity } from "react-native";

import { useLayout } from "hooks";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";

import {
  Layout,
  StyleService,
  useStyleSheet,
  TopNavigation,
  Avatar,
  Button,
} from "@ui-kitten/components";
import Images from "assets/images";
import { Container, Content, Text, NavigationAction } from "components";

import { navigate } from "navigation/RootNavigation";
import { logout } from "services/AuthService";

const Perfil = React.memo(() => {
  const styles = useStyleSheet(themedStyles);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);

  return (
    <Container style={styles.container}>
      <TopNavigation
        title={"Mi perfil"}
        accessoryLeft={<NavigationAction status="primary" />}
        accessoryRight={
          <NavigationAction icon="circles_four" status="primary" />
        }
      />
      <Content contentContainerStyle={styles.contentContainerStyle}>
        <Layout level="3" style={styles.card}>
          <Avatar
            source={Images.avatar.avatar10}
            //@ts-ignore
            style={styles.avatar}
          />
          <Text category="h6" marginTop={16} center>
            {`${currentUser.firstName} ${currentUser.lastName}`}
          </Text>
          <Text category="footnote" status="snow" marginTop={4} center>
            {currentUser.email}
          </Text>
          <View style={styles.boxView}>
            <Layout style={styles.box} level="11">
              <Image
                source={Images.auth.edit}
                /* @ts-ignore */
                style={styles.image}
              />
              <Text category="callout" center status="white">
                Editar
              </Text>
            </Layout>
            <Layout style={styles.box} level="12">
              <Image
                source={Images.auth.logout}
                /* @ts-ignore */
                style={styles.image}
              />
              <Text
                category="callout"
                center
                status="white"
                onPress={() => {
                  dispatch(logout());
                  navigate("Login");
                }}
              >
                Salir
              </Text>
            </Layout>
          </View>
        </Layout>
        <TouchableOpacity style={styles.note}>
          <Image
            source={Images.subscriptions}
            /* @ts-ignore */
            style={styles.image}
          />
          <Text category="body"> Suscripción</Text>
          <Image
            source={Images.arrow}
            /* @ts-ignore */
            style={styles.arrow}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.note}>
          <Image
            source={Images.policy}
            /* @ts-ignore */
            style={styles.image}
          />
          <Text category="body"> Política de privacidad</Text>
          <Image
            source={Images.arrow}
            /* @ts-ignore */
            style={styles.arrow}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.note}>
          <Image
            source={Images.questions}
            /* @ts-ignore */
            style={styles.image}
          />
          <Text category="body"> FAQs</Text>
          <Image
            source={Images.arrow}
            /* @ts-ignore */
            style={styles.arrow}
          />
        </TouchableOpacity>
      </Content>
    </Container>
  );
});

export default Perfil;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  avatar: {
    alignSelf: "center",
    borderRadius: 32,
  },
  boxView: {
    marginTop: 15,
    width: "80%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignSelf: "center",
  },
  box: {
    borderRadius: 12,
    padding: 12,
    marginTop: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignSelf: "center",
  },
  iconView: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: -36,
    borderColor: "background-basic-color-1",
  },
  image: {
    width: 22,
    height: 22,
    marginHorizontal: "1%",
  },
  icon: {
    width: 16,
    height: 16,
    tintColor: "color-basic-100",
  },
  card: {
    height: 210,
    borderRadius: 12,
    marginTop: 15,
    paddingTop: 14,
    paddingBottom: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  arrow: {
    width: 10,
    height: 10,
    marginTop: 8,
  },
  note: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginBottom: 20,
    flexDirection: "row",
    backgroundColor: "#E8EDF7",
    justifyContent: "space-between",
  },
  bottom: {
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
    paddingTop: 8,
    paddingHorizontal: 24,
  },
});
