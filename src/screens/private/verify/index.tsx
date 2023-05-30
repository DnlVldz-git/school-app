import * as React from "react";
import { Button, TextInput, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { showMessage } from "react-native-flash-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useAppDispatch, useAppSelector } from "hooks/useRedux";

import {
  StyleService,
  TopNavigation,
  useStyleSheet,
} from "@ui-kitten/components";
import { Container, Text, NavigationAction, Content } from "components";

import { COLORS, FONTS } from "utils/theme";

import { useResendCodeMutation, useVerifyMutation } from "slices/AuthSlice";

const Verify = () => {
  const dispatch = useAppDispatch();
  const styles = useStyleSheet(themedStyles);
  const { user } = useAppSelector((state) => state.auth);

  const [otp, setOtp] = React.useState({ 1: "", 2: "", 3: "", 4: "" });

  const firstInput = React.useRef<any>();
  const secondInput = React.useRef<any>();
  const thirdInput = React.useRef<any>();
  const fourthInput = React.useRef<any>();

  const [verify, { isLoading }] = useVerifyMutation();
  const [resend] = useResendCodeMutation();

  const verificarCodigo = async () => {
    try {
      if (otp[1] == "" || otp[2] == "" || otp[3] == "" || otp[4] == "") {
        return showMessage({
          message: "Ingresa un código válido",
          type: "danger",
        });
      }

      const codigo = `${otp[1]}${otp[2]}${otp[3]}${otp[4]}`;
      await verify({ email: user?.email || "", code: codigo });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container style={styles.container}>
      <TopNavigation
        title={"Verifica tu cuenta"}
        accessoryLeft={<NavigationAction status="primary" />}
        accessoryRight={
          <NavigationAction icon="circles_four" status="primary" />
        }
      />
      <Content contentContainerStyle={styles.contentContainerStyle}>
        <KeyboardAwareScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 20,
            paddingVertical: 25,
          }}
          showsHorizontalScrollIndicator={false}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingHorizontal: 0,
              alignItems: "center",
              paddingVertical: 25,
            }}
            showsHorizontalScrollIndicator={false}
          >
            <View
              style={{
                width: "100%",
                backgroundColor: COLORS.white,
                paddingHorizontal: 20,
                paddingVertical: 35,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  ...FONTS.H2,
                  color: COLORS.black,
                  lineHeight: 22 * 1.2,
                  marginBottom: 25,
                  marginTop: -15,
                }}
              >
                Escribe el código
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 30,
                }}
              >
                <View
                  style={{
                    borderRadius: 60,
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderColor: COLORS.goldenTransparent_05,
                  }}
                >
                  <TextInput
                    style={{
                      textAlign: "center",
                      paddingHorizontal: 22,
                      paddingVertical: 14.5,
                      fontSize: 24,
                      color: COLORS.golden,
                      width: 60,
                    }}
                    keyboardType="number-pad"
                    maxLength={1}
                    ref={firstInput}
                    onChangeText={(text) => {
                      setOtp({ ...otp, 1: text });
                      text && secondInput.current.focus();
                    }}
                  />
                </View>
                <View
                  style={{
                    borderRadius: 60,
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderColor: COLORS.goldenTransparent_05,
                  }}
                >
                  <TextInput
                    style={{
                      textAlign: "center",
                      paddingHorizontal: 22,
                      paddingVertical: 14.5,
                      fontSize: 24,
                      color: COLORS.golden,
                      width: 59,
                    }}
                    keyboardType="number-pad"
                    maxLength={1}
                    ref={secondInput}
                    onChangeText={(text) => {
                      setOtp({ ...otp, 2: text });
                      text
                        ? thirdInput.current.focus()
                        : firstInput.current.focus();
                    }}
                  />
                </View>
                <View
                  style={{
                    borderRadius: 60,
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderColor: COLORS.goldenTransparent_05,
                  }}
                >
                  <TextInput
                    style={{
                      textAlign: "center",
                      paddingHorizontal: 22,
                      paddingVertical: 14.5,
                      fontSize: 24,
                      color: COLORS.golden,
                      width: 59,
                    }}
                    keyboardType="number-pad"
                    maxLength={1}
                    ref={thirdInput}
                    onChangeText={(text) => {
                      setOtp({ ...otp, 3: text });
                      text
                        ? fourthInput.current.focus()
                        : secondInput.current.focus();
                    }}
                  />
                </View>
                <View
                  style={{
                    borderRadius: 60,
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderColor: COLORS.goldenTransparent_05,
                  }}
                >
                  <TextInput
                    style={{
                      textAlign: "center",
                      paddingHorizontal: 22,
                      paddingVertical: 14.5,
                      fontSize: 24,
                      color: COLORS.golden,
                      width: 59,
                    }}
                    keyboardType="number-pad"
                    maxLength={1}
                    ref={fourthInput}
                    onChangeText={(text) => {
                      setOtp({ ...otp, 4: text });
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  marginBottom: 30,
                }}
              >
                <TouchableOpacity
                  onPress={async () => {
                    await resend(user?.email ?? "");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: COLORS.black,
                      lineHeight: 16 * 1.7,
                      textAlign: "center",
                    }}
                  >
                    Reenviar código
                  </Text>
                </TouchableOpacity>
              </View>

              <Button title="Verificar" onPress={() => verificarCodigo()} />
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      </Content>
    </Container>
  );
};

export default Verify;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    paddingTop: 24,
  },
  contentContainerStyle: {
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  iconHeader: {
    width: 16,
    height: 16,
    tintColor: "text-white-color",
  },
  tag: {
    backgroundColor: "background-basic-color-1",
    borderRadius: 99,
    padding: 4,
    paddingHorizontal: 8,
  },
  logo: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  bottom: {
    paddingTop: 12,
    paddingHorizontal: 24,
  },
  logoApp: {
    width: 32,
    height: 32,
  },
});
