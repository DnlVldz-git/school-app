import React, { memo } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Button,
  Icon,
  Input,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import TabBar from "components/TabBar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Images from "assets/images";

const SignUp01 = memo(() => {
  const { goBack } = useNavigation();
  const { top, bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const [activeTab, setActiveTab] = React.useState(0);
  return (
    <Container style={[styles.container, { paddingBottom: bottom + 8 }]}>
      <TopNavigation
        accessoryLeft={() => <NavigationAction status="primary" />}
        style={{ marginLeft: 12, marginRight: 24 }}
        accessoryRight={() => {
          return (
            <TouchableOpacity onPress={goBack}>
              <Image
                source={Images.logo4}
                /* @ts-ignore */
                style={styles.image}
              />
            </TouchableOpacity>
          );
        }}
      />

      <KeyboardAwareScrollView
        extraHeight={30}
        enableOnAndroid
        extraScrollHeight={30}
        showsVerticalScrollIndicator={false}
      >
        <Text marginTop={24} marginBottom={24} center category="h2">
          Registrar
        </Text>

        <Input
          style={styles.input}
          status="primary"
          placeholder="Nombre(s)"
          accessoryLeft={(props) => <Icon {...props} pack="assets" name={"user"} />}
        />
        <Input
          style={styles.input}
          status="primary"
          placeholder="Apellidos"
          accessoryLeft={(props) => <Icon {...props} pack="assets" name={"user"} />}
        />
        <Input
          style={styles.input}
          status="primary"
          placeholder="Teléfono"
          accessoryLeft={(props) => <Icon {...props} pack="assets" name={"phone"} />}
        />
        <Input
          style={styles.input}
          status="primary"
          placeholder="Dirección"
          accessoryLeft={(props) => <Icon {...props} pack="assets" name={"house"} />}
        />
        <Input
          style={styles.input}
          status="primary"
          placeholder="Correo"
          accessoryLeft={(props) => <Icon {...props} pack="assets" name={"email"} />}
        />
        <Input
          style={styles.input}
          status="primary"
          placeholder="Contraseña"
          accessoryLeft={(props) => <Icon {...props} pack="assets" name={"lock"} />}
        />
        <Button children="Registrarse" style={styles.signIn} />
      </KeyboardAwareScrollView>
    </Container>
  );
});

export default SignUp01;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  bottom: {
    position: "absolute",
    bottom: 8,
    width: "100%",
  },
  input: {
    paddingHorizontal: 32,
    marginBottom: 20,
  },
  image: {
    width: 48,
    height: 48,
  },
  tabBar: {
    marginHorizontal: 80,
  },
  line: {
    height: 1,
    flex: 1,
  },
  facebook: {
    backgroundColor: "#6979F8",
    marginHorizontal: 32,
    justifyContent: "flex-start",
    marginTop: 40,
    marginBottom: 24,
  },
  icon: {
    tintColor: "color-basic-100",
    marginRight: 32,
    marginLeft: 16,
  },
  btnGG: {
    backgroundColor: "#FF647C",
    marginHorizontal: 32,
    justifyContent: "flex-start",
  },
  middleView: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  signIn: {
    marginHorizontal: 32,
    marginTop: 5,
  },
});
