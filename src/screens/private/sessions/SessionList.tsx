import dayjs from "dayjs";

import Session from "models/Session";

import * as React from "react";
import { Image, View } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  ActivityIndicator,
  IconButton,
  MD2Colors,
  MD3Colors,
} from "react-native-paper";

import {
  Layout,
  StyleService,
  useStyleSheet,
  TopNavigation,
} from "@ui-kitten/components";

import {
  Container,
  Content,
  Text,
  HStack,
  VStack,
  NavigationAction,
} from "components";

import Images from "assets/images";

import { useAppSelector } from "hooks/useRedux";
import { useLazyGetAllSessionsByStudentQuery } from "slices/SessionSlice";

const SessionsList = React.memo(() => {
  const isFocused = useIsFocused();
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
    if (isFocused) {
      getSessions();
    }
  }, [isFocused]);

  return (
    <Container style={styles.container}>
      <TopNavigation
        title={"Mis clases"}
        accessoryLeft={
          <NavigationAction
            icon="refresh"
            status="primary"
            onPress={() => getSessions()}
          />
        }
        accessoryRight={
          <NavigationAction
            icon="plus"
            status="primary"
            onPress={() => navigation.navigate("Calendario" as never)}
          />
        }
      />

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
                          icon="close-circle"
                          iconColor={MD3Colors.error50}
                          size={28}
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
                            style={{
                              width: 260,
                              justifyContent: "flex-start",
                            }}
                          >
                            <Text category="s2">
                              {sessionDate.format("dddd, h:mm A")}
                            </Text>
                            <Text category="c1" status="platinum">
                              {sessionDate.format("MMMM D, YYYY")}
                            </Text>
                          </VStack>

                          <IconButton
                            icon="eye-arrow-right-outline"
                            iconColor={MD3Colors.neutral30}
                            size={40}
                            onPress={() => {
                              navigation.navigate(
                                "Detalle" as never,
                                {
                                  session: item,
                                } as never
                              );
                            }}
                          />
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
