import * as React from "react";
import { View, Image, TouchableOpacity } from "react-native";
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
        title={"Mi perfil"}
        accessoryLeft={<NavigationAction status="primary" />}
        accessoryRight={<NavigationAction icon="circles_four" status="primary" />}
      />
      <Content contentContainerStyle={styles.contentContainerStyle}>
        <Layout level="2" style={styles.card}>
          <Avatar
            source={Images.avatar.avatar10}
            //@ts-ignore
            style={styles.avatar}
          />
          <Text category="h6" marginTop={16} center>
            Karen Mau
          </Text>
          <Text category="footnote" status="snow" marginTop={4} center>
            karen@gmail.com
          </Text>
          <View style={styles.boxView}>
            <Layout style={styles.box} level="5">
              <Text category="callout" marginTop={2} center status="white">
                Editar
              </Text>
            </Layout>
          </View>
        </Layout>
        <TouchableOpacity style={styles.note}>
        <Text><Image source={Images.notifications}
                /* @ts-ignore */
                style={styles.image}
              />
          <Text category="body"> Notificaciones</Text></Text>
          <Image source={Images.arrow}
                /* @ts-ignore */
                style={styles.arrow}
              />
        </TouchableOpacity>
        <TouchableOpacity style={styles.note}>
        <Text><Image source={Images.subscriptions}
                /* @ts-ignore */
                style={styles.image}
              />
          <Text category="body"> Suscripción</Text></Text>
          <Image source={Images.arrow}
                /* @ts-ignore */
                style={styles.arrow}
              />
        </TouchableOpacity>
        <TouchableOpacity style={styles.note}>
        <Text><Image source={Images.policy}
                /* @ts-ignore */
                style={styles.image}
              />
          <Text category="body"> Política de privacidad</Text></Text>
          <Image source={Images.arrow}
                /* @ts-ignore */
                style={styles.arrow}
              />
        </TouchableOpacity>
        <TouchableOpacity style={styles.note}>
          <Text><Image source={Images.questions}
                /* @ts-ignore */
                style={styles.image}
              />
          <Text category="body"> FAQs</Text></Text>
          <Image source={Images.arrow}
                /* @ts-ignore */
                style={styles.arrow}
              />
        </TouchableOpacity>
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
    marginTop: 30,
    width: 150,
    justifyContent: "center",
    alignSelf: "center",
  },
  box: {
    borderRadius: 12,
    padding: 12,
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
    marginHorizontal: '1%',
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
    marginleft: 10,
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
