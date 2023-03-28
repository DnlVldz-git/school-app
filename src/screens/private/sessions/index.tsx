import * as React from "react";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import moment from "moment";
import "moment/locale/es";

import {
  Layout,
  StyleService,
  useStyleSheet,
  TopNavigation,
  Avatar,
  Icon,
  Button,
} from "@ui-kitten/components";

import {
  Container,
  Content,
  Text,
  NavigationAction,
  HStack,
  VStack,
} from "components";
import Images from "assets/images";

import { useAppDispatch, useAppSelector } from "hooks/useRedux";

import { findAllByStudentId } from "services/SessionsService";

const Sessions = React.memo(() => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const styles = useStyleSheet(themedStyles);

  const currentUser = useAppSelector((state) => state.auth.user);
  const { sessions } = useAppSelector((state) => state.sessions);

  const getSessions = () => {
    dispatch(findAllByStudentId(currentUser.studentId));
  };

  React.useEffect(() => {
    getSessions();
  }, []);

  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.header}
        accessoryLeft={<NavigationAction status="primary" />}
        accessoryRight={<Avatar source={Images.avatar.avatar08} />}
      />
      <Content>
        <Text category="h4" marginLeft={24} marginBottom={24}>
          Mis clases
        </Text>
        {sessions.map((item, i) => {
          var formattedDate = moment(item.sessionDate).format("LLL");

          return (
            <VStack key={i} mt={24} mh={24}>
              <HStack>
                <Layout style={styles.stag} level="3">
                  <Image
                    source={Images.videoCall}
                    /* @ts-ignore */
                    style={styles.icon}
                  />
                </Layout>

                <VStack style={{ flex: 1 }}>
                  <HStack mb={10}>
                    <Text category="s2">{`Sesión ${item.id}`}</Text>
                    <Text
                      category="callout"
                      status="danger"
                      onPress={() => {
                        navigation.navigate("Detalles");
                      }}
                    >
                      Ver detalles
                    </Text>
                  </HStack>
                  <Text category="c1" status="platinum">
                    {formattedDate}
                  </Text>
                </VStack>
              </HStack>
            </VStack>
          );
        })}
      </Content>
      <Button
        accessoryLeft={<Icon pack="assets" name="plus" />}
        style={styles.plus}
      />
    </Container>
  );
});

export default Sessions;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  header: {
    marginRight: 16,
  },
  contentWallet: {
    paddingHorizontal: 24,
  },
  caret: {
    width: 16,
    height: 16,
    tintColor: "text-basic-color",
  },
  stag: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  icon: {
    width: 32,
    height: 32,
  },
  plus: {
    position: "absolute",
    right: 24,
    bottom: 20,
    width: 48,
    zIndex: 100,
  },
  bottom: {
    paddingTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  logo: {
    width: 24,
    height: 24,
  },
});

const DATA_CLASS = [
  {
    id: 1,
    title: "Clase 1",
    date: "27/03/2023 10:30",
  },
  {
    id: 2,
    title: "Clase 2",
    date: "30/03/2023 13:00",
  },
  {
    id: 3,
    title: "Clase 3",
    date: "31/03/2023 20:00",
  },
  {
    id: 4,
    title: "Clase 4",
    date: "01/04/2023 21:30",
  },
];
