import * as React from "react";
import { View, Image } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";

import { useLayout } from "hooks";

import {
  Layout,
  StyleService,
  useStyleSheet,
  TopNavigation,
  Icon,
  Button,
} from "@ui-kitten/components";

import {
  Container,
  Content,
  Text,
  NavigationAction,
  VStack,
  HStack,
} from "components";

import Images from "assets/images";

import Pagination from "./Pagination";

const nosuscription = React.memo(() => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);

  const [activeIndex, setActiveIndex] = React.useState(0);
  const progressValue = useSharedValue(0);

  return (
    <Container style={styles.container}>
      <TopNavigation
        title={"Suscripción"}
        accessoryLeft={<NavigationAction status="primary" />}
        accessoryRight={
          <NavigationAction status="primary" icon="circles_four" />
        }
      />
      <Content contentContainerStyle={styles.content}>
        <VStack level="1" mh={16} border={16} padding={24}>
          <Text category="h6" marginBottom={7} style={styles.text}>
            Actualmente no cuentas con alguna suscripción
          </Text>
          <Layout style={styles.iconView} level="9"></Layout>
          <Image
            marginBottom={27}
            marginTop={30}
            source={Images.stars}
            /* @ts-ignore */
            style={styles.susbs}
          />
          <Text category="h8" marginBottom={3}>
            Suscribete algún plan para acceder a las clases y materiales que se
            tienen preparado para ti!!
          </Text>
        </VStack>

        <Text category="h6" marginLeft={16} marginTop={24} marginBottom={16}>
          Paquetes de suscripción
        </Text>
        <VStack level="2" mh={2} border={1} padding={24}>
          <View style={{ height: 330 * (height / 812) }}>
            <Carousel
              width={width * 0.7}
              vertical={false}
              style={{ width: "100%", height: "100%" }}
              height={330 * (height / 812)}
              data={DATA}
              pagingEnabled
              loop={false}
              onSnapToItem={(index) => setActiveIndex(index)}
              onProgressChange={(_, absoluteProgress) =>
                (progressValue.value = absoluteProgress)
              }
              renderItem={({ item }) => {
                return (
                  <VStack level="1" style={styles.service} padding={20} pb={16}>
                    <HStack>
                      <Text category="h6">{item.title}</Text>
                      <Icon pack="assets" name="shield" />
                    </HStack>
                    <Text
                      category="body"
                      status="success"
                      marginTop={8}
                      marginBottom={20}
                    >
                      {item.pay}
                    </Text>

                    <HStack wrap mt={10} mb={12}>
                      {item.data.map((item, i) => {
                        return (
                          <HStack
                            key={i}
                            itemsCenter
                            style={{ width: 80 }}
                            mb={12}
                          >
                            <View
                              style={{
                                backgroundColor: item.color,
                                width: 8,
                                height: 8,
                                borderRadius: 99,
                              }}
                            />
                            <Text category="body">{item.title}</Text>
                            <Image
                              marginBottom={50}
                              marginTop={30}
                              source={Images.premium}
                              /* @ts-ignore */
                              style={styles.image}
                            />
                          </HStack>
                        );
                      })}
                    </HStack>
                    <Button children={"Comprar ahora"} />
                  </VStack>
                );
              }}
            />
          </View>
        </VStack>
        <HStack justify="center" mt={16}>
          {DATA.map((item, i) => {
            return (
              <Pagination
                key={i}
                index={i}
                backgroundColor={"#5784E8"}
                length={DATA.length}
                animValue={progressValue}
              />
            );
          })}
        </HStack>
      </Content>
    </Container>
  );
});

export default nosuscription;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    paddingTop: 8,
    flexGrow: 1,
  },
  dot: {
    transform: [
      {
        rotate: "90deg",
      },
    ],
  },
  text: {
    textAlign: "justify",
  },
  caret: {
    tintColor: "text-primary-color",
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 9,
    borderRadius: 8,
  },
  grow: {
    width: 12,
    height: 12,
    marginRight: 9,
  },
  susbs: {
    width: 120,
    height: 120,
    marginHorizontal: "1%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginHorizontal: "1%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  service: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "background-basic-color-3",
    marginLeft: 16,
  },
  iconView: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: 100,
    borderColor: "background-basic-color-1",
  },
});

const DATA = [
  {
    title: "Paquete básico",
    pay: "MXN 800",
    data: [{ title: "3 clases a la semana", color: "#5784E8" }],
  },
  {
    title: "Paquete intermedio",
    pay: "MXN 1,200",
    data: [{ title: "4 clases a la semana", color: "#FFDE70" }],
  },
  {
    title: "Paquete premium",
    pay: "MXN 1,600",
    data: [{ title: "5 clases a la semana", color: "#E5CABF" }],
  },
];
