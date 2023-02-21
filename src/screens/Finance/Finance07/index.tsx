import * as React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLayout } from "hooks";
import {
  Layout,
  StyleService,
  useStyleSheet,
  useTheme,
  TopNavigation,
  Avatar,
  Icon,
  Button,
} from "@ui-kitten/components";

import { Container, Content, Text, NavigationAction } from "components";
import Images from "assets/images";
import Asterisk from "./Asterisk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "navigation/AppContainer";
import { navigate } from "navigation/RootNavigation";

const Finance07 = React.memo(() => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);

  const { signOut } = React.useContext(AuthContext);

  return (
    <Container style={styles.container}>
      <TopNavigation
        title={"Transfer money"}
        accessoryLeft={<NavigationAction status="primary" />}
        accessoryRight={<NavigationAction icon="circles_four" status="primary" />}
      />
      <Content contentContainerStyle={styles.contentContainerStyle}>
        <Avatar
          source={Images.avatar.avatar10}
          //@ts-ignore
          style={styles.avatar}
        />
        <Text category="h6" marginTop={16} center>
          Francis Dixon
        </Text>
        <Text category="footnote" status="snow" marginTop={4} center>
          francisdixon@company.com
        </Text>
        <View style={styles.boxView}>
          <Layout style={styles.box} level="5">
            <Text category="callout" marginTop={16} center status="white">
              Total Balance
            </Text>
            <Text category="h4" center children={"$1,485.60"} status="white" marginTop={4} />
            <Text
              category="subhead"
              center
              children={"fee 1.5%"}
              status="white"
              marginTop={4}
              opacity={0.5}
            />
          </Layout>
          <Layout style={styles.iconView} level="8">
            <Icon pack="assets" name="line_up" style={styles.icon} />
          </Layout>
        </View>
        <Layout level="2" style={styles.card}>
          <View style={styles.row}>
            <Text category="h7">Transfer card</Text>
            <Text category="h7" uppercase>
              Visa
            </Text>
          </View>
          <View style={styles.cardNumber}>
            <Asterisk number={4} />
            <Asterisk number={4} />
            <Asterisk number={4} />
            <Text category="h4">1313</Text>
          </View>
        </Layout>
        <Layout level="2" style={styles.note}>
          <Text category="body">GLWS Bro</Text>
        </Layout>
      </Content>
      <Layout style={[styles.bottom, { paddingBottom: bottom + 16 }]}>
        <Button
          activeOpacity={0.7}
          children="Cerrar sesión"
          onPress={async () => {
            try {
              await AsyncStorage.removeItem("userInfo");
              console.log(await AsyncStorage.getItem("userInfo"));
              signOut();
              navigate("Login");
            } catch (error) {
              console.log("Error removing user info: ", error);
            }
          }}
        />
      </Layout>
    </Container>
  );
});

export default Finance07;

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
    marginTop: 54,
  },
  box: {
    borderRadius: 12,
    padding: 16,
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
  icon: {
    width: 16,
    height: 16,
    tintColor: "color-basic-100",
  },
  card: {
    height: 100,
    borderRadius: 12,
    marginTop: 24,
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
  cardNumber: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  note: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
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
