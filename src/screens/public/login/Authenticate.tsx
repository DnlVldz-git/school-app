import React, { memo, useCallback, useState } from "react";

import {
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Icon,
  Layout,
  Input,
  Button,
} from "@ui-kitten/components";
import Text from "components/Text";
import Container from "components/Container";
import CardSignIn from "../../../components/CardSignIn";

import Images from "assets/images";

import useLayout from "hooks/useLayout";
import { useAppDispatch } from "hooks/useRedux";

import { login } from "services/AuthService";

const Authenticate = memo(() => {
  const { goBack } = useNavigation();
  const { top } = useLayout();
  const [hide, setHide] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const styles = useStyleSheet(themedStyles);

  const dispatch = useAppDispatch();
  const handleCard = useCallback(() => {}, []);

  const accessoryRight = useCallback(() => {
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity>
          {/* <Icon pack="assets" name="question" style={styles.topIcon} /> */}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goBack()}>
          {/* <Icon marginLeft={16} pack="assets" name="headphone" style={styles.topIcon} /> */}
        </TouchableOpacity>
      </View>
    );
  }, []);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container style={styles.container} level="1">
        <Layout
          level="4"
          style={[
            styles.layout,
            {
              paddingTop: top,
            },
          ]}
        >
          <TopNavigation
            style={{ backgroundColor: "transparent", paddingHorizontal: 24 }}
            accessoryLeft={() => (
              <Image
                source={Images.logo4}
                /* @ts-ignore */
                style={styles.icon}
              />
            )}
            accessoryRight={accessoryRight}
          />
          <View style={styles.topView}>
            <Text marginTop={12} marginBottom={16} category="h3">
              Ingresa a tu cuenta
            </Text>
            <Input
              status="basic"
              placeholder="Correo"
              value={email}
              onChangeText={setEmail}
              style={{ marginBottom: 16 }}
            />
            <Input
              value={password}
              secureTextEntry={hide}
              onChangeText={setPassword}
              status="basic"
              placeholder="Contraseña"
              accessoryRight={(props) => (
                <TouchableOpacity
                  onPress={() => {
                    setHide(!hide);
                  }}
                >
                  <Icon
                    {...props}
                    pack="assets"
                    name={hide ? "eye" : "eye_close"}
                  />
                </TouchableOpacity>
              )}
            />

            <View style={styles.bottomLayout}>
              <Text onPress={goBack} category="body" center>
                Olvidé mi contraseña
              </Text>

              <Button
                onPress={async () => {
                  dispatch(
                    login({
                      email: email,
                      password: password,
                    })
                  );
                }}
                style={styles.button}
                size="large"
                children="Ingresa"
              />
            </View>
          </View>
        </Layout>
        <FlatList
          data={SignIn01_Data}
          horizontal={false}
          contentContainerStyle={styles.flatList}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={({ item, index }) => (
            <CardSignIn item={item} onPress={handleCard} />
          )}
        />
      </Container>
    </TouchableWithoutFeedback>
  );
});

export default Authenticate;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  flatList: {
    alignItems: "center",
    paddingTop: 16,
  },
  btnBottom: {
    paddingBottom: 16,
  },
  bottomLayout: {
    flexDirection: "row",
    marginVertical: 24,
    alignItems: "center",
  },
  layout: {
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
  },
  topView: {
    marginHorizontal: 24,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  content: {
    flexWrap: "wrap",
    flex: 1,
    alignSelf: "center",
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginRight: 8,
    marginLeft: 28,
  },
  icon: {
    width: 48,
    height: 48,
  },
  topIcon: {
    tintColor: "icon-basic-color",
  },
});
export const SignIn01_Data = [
  {
    id: 0,
    title: "Entra a tus clases de inglés",
    image: Images.folderStar,
  },
  {
    id: 1,
    title: "Elige tu horario",
    image: Images.shieldTick,
  },
];
