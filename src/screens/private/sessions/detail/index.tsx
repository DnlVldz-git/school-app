import dayjs from "utils/date/dayjs";
import { useLayout } from "hooks";

import * as React from "react";
import { View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

import Carousel from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";

import { Card } from "react-native-paper";

import {
  StyleService,
  useStyleSheet,
  TopNavigation,
} from "@ui-kitten/components";

import { Container, Content, Text, NavigationAction, VStack } from "components";

import FilesAndLinksCard from "./FilesAndLinksCard";
import InputSelect from "./InputSelect";

import Session from "models/Session";

const SessionDetail = React.memo(() => {
  const { getState } = useNavigation();
  const { height, width } = useLayout();
  const styles = useStyleSheet(themedStyles);

  const [activeIndex, setActiveIndex] = React.useState(0);
  const progressValue = useSharedValue(0);

  const session = new Session(
    getState().routes.find((item) => item.name === "Detalle")?.params["session"]
  );

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <Container style={styles.container}>
        <TopNavigation
          accessoryLeft={<NavigationAction status="primary" />}
          title="Detalles de la clase"
        />
        <Content contentContainerStyle={styles.content}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (
                dayjs(session.sessionDate).isBetween(
                  dayjs().subtract(1, "hour"),
                  dayjs().add(1, "hour")
                )
              ) {
                console.log("xd");
              }
            }}
          >
            <Card style={{ marginBottom: 15 }}>
              <Card.Cover
                source={{
                  uri:
                    new Date(session.sessionDate).toLocaleDateString() ===
                      new Date().toLocaleDateString() &&
                    new Date(session.sessionDate).getHours() <
                      new Date().getHours()
                      ? "https://beta.ctvnews.ca/content/dam/ctvnews/images/2020/9/8/1_5071991.jpg?cache_timestamp=1599547973157"
                      : "https://thurrott.s3.amazonaws.com/wp-content/uploads/sites/2/2022/09/Zoom-new-logo-1024x576.jpg",
                }}
              />
            </Card>
          </TouchableOpacity>

          <VStack level="5" padding={10} border={20}>
            <Text category="h6" status="white" style={{ textAlign: "center" }}>
              General
            </Text>
          </VStack>

          <InputSelect
            title="Fecha"
            value={dayjs(session.sessionDate).format("MMM D, YYYY h:mm A")}
          />
          <InputSelect
            title="Profesor"
            value={String(session.teacher["name"])}
          />

          <VStack
            level="5"
            padding={10}
            border={20}
            style={{ marginBottom: 15, marginTop: 20 }}
          >
            <Text category="h6" status="white" style={{ textAlign: "center" }}>
              Material de clase
            </Text>
          </VStack>

          {session.lessons.length === 1 && (
            <FilesAndLinksCard
              files={session.lessons[0].studentFiles}
              links={session.lessons[0].studentLinks}
            />
          )}

          {session.lessons.length > 1 && (
            <View style={{ height: 330 * (height / 812) }}>
              <Carousel
                loop={false}
                pagingEnabled
                vertical={false}
                width={width * 0.8}
                data={session.lessons}
                height={330 * (height / 812)}
                style={{ width: "100%", height: "100%" }}
                onSnapToItem={(index) => setActiveIndex(index)}
                onProgressChange={(_, absoluteProgress) =>
                  (progressValue.value = absoluteProgress)
                }
                renderItem={({ item }) => {
                  return (
                    <VStack level="1" style={styles.service} padding={20}>
                      <VStack>
                        <Text category="h6">{item.name}</Text>
                        <Text
                          category="body"
                          status="success"
                          marginVertical={8}
                        >
                          {item.description}
                        </Text>

                        <Text category="subhead">
                          Notas: {item.studentNotes}
                        </Text>

                        <FilesAndLinksCard
                          files={item.studentFiles}
                          links={item.studentLinks}
                        />
                      </VStack>
                    </VStack>
                  );
                }}
              />
            </View>
          )}
        </Content>
      </Container>
    </ScrollView>
  );
});

export default SessionDetail;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
  },
  box: {
    padding: 16,
    borderRadius: 12,
  },
  row: {
    flexDirection: "row",
  },
  input: {
    color: "transparent",
    paddingLeft: 14,
    fontSize: 24,
  },
  shape: {
    height: 101.6,
    marginTop: 32,
  },
  button: {
    marginHorizontal: 24,
    marginBottom: 8,
  },
  dash: {
    height: 89,
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 12,
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  service: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "background-basic-color-3",
    marginLeft: 16,
  },
});
