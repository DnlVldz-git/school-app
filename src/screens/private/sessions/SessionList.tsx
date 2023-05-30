import * as React from "react";
import { Image, View } from "react-native";
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

import { useAppSelector } from "hooks/useRedux";

import { useLazyGetAllSessionsByStudentQuery } from "slices/SessionSlice";
import Session from "models/Session";
import dayjs from "dayjs";
import {
  ActivityIndicator,
  IconButton,
  MD2Colors,
  MD3Colors,
} from "react-native-paper";

const SessionsList = React.memo(() => {
  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const currentUser = useAppSelector((state) => state.auth.user);
  const [fetch, { isFetching }] = useLazyGetAllSessionsByStudentQuery();

  const [items, setItems] = React.useState<
    {
      name: string;
      sessions: Session[];
    }[]
  >([]);

  const getSessions = async () => {
    const now = new Date();
    const data = await fetch(currentUser?.studentId || "").unwrap();

    if (data) {
      const sessionsDone = [...(data || [])].filter((session: Session) => {
        const prev = new Date(session.sessionDate);

        return (
          prev.toLocaleDateString() === now.toLocaleDateString() &&
          prev.getHours() < now.getHours()
        );
      });

      const sessionsToBe = [...(data || [])]
        .filter((session: Session) => {
          const prev = new Date(session.sessionDate);

          return (
            prev.toLocaleDateString() !== now.toLocaleDateString() ||
            prev.getHours() > now.getHours()
          );
        })
        .sort(function (first: Session, second: Session) {
          return (
            new Date(first.sessionDate).getTime() -
            new Date(second.sessionDate).getTime()
          );
        });

      setItems([
        {
          name: "Siguiente",
          sessions: sessionsToBe.slice(0, 1),
        },
        {
          name: "Pasadas",
          sessions: sessionsDone,
        },
        {
          name: "Próximas",
          sessions: sessionsToBe.slice(1),
        },
      ]);
    }
  };

  React.useEffect(() => {
    getSessions();
  }, []);

  return (
    <Container style={styles.container}>
      <TopNavigation title={"Mis clases"} />

      {isFetching ? (
        <ActivityIndicator animating={true} color={MD2Colors.red800} />
      ) : (
        <Content style={{ marginTop: 20 }}>
          {items.map((section, sI) => {
            return (
              <React.Fragment key={sI}>
                <Text category="h4" marginLeft={24} marginBottom={24}>
                  {section.name}
                </Text>
                {section.sessions.length === 0 ? (
                  <VStack key={-1} mb={24} mh={24}>
                    <HStack>
                      <Layout style={styles.stag} level="2">
                        <Image
                          source={Images.emptyBox}
                          /* @ts-ignore */
                          style={styles.icon}
                        />
                      </Layout>
                      <VStack
                        ml={-160}
                        style={{
                          height: 52,
                          justifyContent: "center",
                        }}
                      >
                        <Text category="s2">No hay datos</Text>
                      </VStack>

                      <View>
                        <IconButton
                          icon="eye-arrow-right-outline"
                          iconColor={MD3Colors.error50}
                          size={48}
                        />
                      </View>
                    </HStack>
                  </VStack>
                ) : (
                  section.sessions.map((item, i) => {
                    const sessionDate = dayjs(item.sessionDate);

                    return (
                      <VStack key={i} mb={24} mh={24}>
                        <HStack>
                          <Layout style={styles.stag} level="2">
                            <Image
                              source={Images.videoCall}
                              /* @ts-ignore */
                              style={styles.icon}
                            />
                          </Layout>

                          <VStack
                            ml={-120}
                            style={{
                              height: 52,
                              justifyContent: "center",
                            }}
                          >
                            <Text category="s2">
                              {sessionDate.format("dddd, h:mm A")}
                            </Text>
                            <Text category="c1" status="platinum">
                              {sessionDate.format("MMMM D, YYYY")}
                            </Text>
                          </VStack>

                          <View>
                            <IconButton
                              icon="page-next"
                              iconColor={MD3Colors.neutral30}
                              size={20}
                              onPress={() => {
                                navigation.navigate(
                                  "Detalle" as never,
                                  {
                                    session: item,
                                  } as never
                                );
                              }}
                            />
                          </View>
                        </HStack>
                      </VStack>
                    );
                  })
                )}
              </React.Fragment>
            );
          })}
        </Content>
      )}
      <Button
        onPress={() => navigation.navigate("Calendario" as never)}
        accessoryLeft={<Icon pack="assets" name="plus" />}
        style={styles.plus}
      />
    </Container>
  );
});

export default SessionsList;

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
