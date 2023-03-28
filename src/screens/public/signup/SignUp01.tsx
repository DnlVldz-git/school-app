import React, { memo } from "react";
import { Image, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Button,
  Icon,
  Input,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";

import Images from "assets/images";

import { useAppDispatch } from "hooks/useRedux";
import { Formik } from "formik";

import { register } from "services/AuthService";

const SignUp01 = memo(() => {
  const { goBack } = useNavigation();
  const { bottom } = useSafeAreaInsets();
  const styles = useStyleSheet(themedStyles);
  const dispatch = useAppDispatch();

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
      <Formik
        initialValues={{
          firstName: "Harim",
          lastName: "Castellanos Altamirano",
          dateOfBirth: "10/08/1982",
          email: "raanloga@gmail.com",
          password: "123456789",
          phone: "+529516093311",
          address: "Av. de las Flores #321",
        }}
        onSubmit={(values) => {
          dispatch(register(values));
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <KeyboardAwareScrollView
            extraHeight={30}
            enableOnAndroid
            extraScrollHeight={30}
            showsVerticalScrollIndicator={false}
          >
            <Text marginTop={24} marginBottom={24} center category="h2">
              Registrarse
            </Text>

            <Input
              style={styles.input}
              status="primary"
              placeholder="Nombre(s)"
              accessoryLeft={(props) => (
                <Icon {...props} pack="assets" name={"user"} />
              )}
              onChangeText={handleChange("firstName")}
              onBlur={handleBlur("firstName")}
              value={values.firstName}
            />
            <Input
              style={styles.input}
              status="primary"
              placeholder="Apellidos"
              accessoryLeft={(props) => (
                <Icon {...props} pack="assets" name={"user"} />
              )}
              onChangeText={handleChange("lastName")}
              onBlur={handleBlur("lastName")}
              value={values.lastName}
            />
            <Input
              style={styles.input}
              status="primary"
              placeholder="Teléfono"
              accessoryLeft={(props) => (
                <Icon {...props} pack="assets" name={"phone"} />
              )}
              onChangeText={handleChange("phone")}
              onBlur={handleBlur("phone")}
              value={values.phone}
            />
            <Input
              style={styles.input}
              status="primary"
              placeholder="Dirección"
              accessoryLeft={(props) => (
                <Icon {...props} pack="assets" name={"house"} />
              )}
              onChangeText={handleChange("address")}
              onBlur={handleBlur("address")}
              value={values.address}
            />
            <Input
              style={styles.input}
              status="primary"
              placeholder="Correo"
              accessoryLeft={(props) => (
                <Icon {...props} pack="assets" name={"email"} />
              )}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            <Input
              style={styles.input}
              status="primary"
              placeholder="Contraseña"
              accessoryLeft={(props) => (
                <Icon {...props} pack="assets" name={"lock"} />
              )}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            <Button
              children="Registrarse"
              style={styles.signIn}
              onPress={() => handleSubmit()}
            />
          </KeyboardAwareScrollView>
        )}
      </Formik>
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
