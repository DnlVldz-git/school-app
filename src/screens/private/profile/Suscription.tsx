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

const Suscription = React.memo(() => {
  const styles = useStyleSheet(themedStyles);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);

  return (
    <Container style={styles.container}>
      <TopNavigation
        title={"Suscripción"}
        accessoryLeft={<NavigationAction status="primary" />}
        accessoryRight={
          <NavigationAction icon="circles_four" status="primary" />
        }
      />
      <Content contentContainerStyle={styles.contentContainerStyle}>
        <Text>aasdasdasd</Text>
      </Content>
    </Container>
  );
});

export default Suscription;

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
