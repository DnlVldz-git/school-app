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
import { useAppSelector } from "hooks/useRedux";
import { useGetAllActivePlansQuery } from "slices/PlanSlice";
import { useCreateSubscriptionMutation } from "slices/SubscriptionSlice";

const NoSubscription = React.memo(() => {
  const { height, width } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const activePlans = useAppSelector((state) => state.plans.items);

  const progressValue = useSharedValue(0);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const { isFetching } = useGetAllActivePlansQuery({});
  const [subscribe] = useCreateSubscriptionMutation();

  return (
    <Container style={styles.container}>
      <TopNavigation title={"Suscripción"} />

      <Content contentContainerStyle={styles.content}>
        <VStack level="1" mh={16} border={16} padding={24} mt={-20}>
          <Text
            category="h6"
            marginBottom={7}
            style={(styles.text, { textAlign: "center" })}
          >
            Actualmente no cuentas con alguna suscripción
          </Text>
          <Layout style={styles.iconView} level="9"></Layout>
          <Image
            marginBottom={27}
            marginTop={30}
            source={Images.stars}
            /* @ts-ignore */
            style={styles.subs}
          />
          <Text category="h8" style={{ textAlign: "center" }}>
            ¡Elige un plan para iniciar tu formación y acceder al material
            preparado exclusivamente para ti!
          </Text>
        </VStack>

        <Text category="h6" marginLeft={16} marginTop={4} marginBottom={16}>
          Paquetes de suscripción
        </Text>
        <VStack level="2" mh={2} border={1} padding={24}>
          <View style={{ height: 330 * (height / 812) }}>
            <Carousel
              width={width * 0.7}
              vertical={false}
              style={{ width: "100%", height: "100%" }}
              height={290 * (height / 812)}
              data={activePlans}
              pagingEnabled
              loop={false}
              onSnapToItem={(index) => setActiveIndex(index)}
              onProgressChange={(_, absoluteProgress) =>
                (progressValue.value = absoluteProgress)
              }
              renderItem={({ item, index }) => {
                return (
                  <VStack level="1" style={styles.service} padding={20}>
                    <VStack>
                      <HStack>
                        <Text category="h6">{item.name}</Text>
                        <Icon pack="assets" name="shield" />
                      </HStack>
                      <Text category="body" status="success">
                        {new Intl.NumberFormat("es-MX", {
                          style: "currency",
                          currency: "MXN",
                        }).format(item.price)}
                      </Text>
                    </VStack>

                    <HStack wrap>
                      <VStack
                        key={index}
                        style={{
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <Text category="h7" marginBottom={15}>
                          {`${item.credits} créditos\ndisponibles`}
                        </Text>
                        <Image
                          source={Images.premium}
                          /* @ts-ignore */
                          style={styles.image}
                        />
                      </VStack>
                    </HStack>
                    <Button children={"Comprar ahora"} />
                  </VStack>
                );
              }}
            />
          </View>
        </VStack>
      </Content>
    </Container>
  );
});

export default NoSubscription;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
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
  subs: {
    width: 120,
    height: 120,
    marginHorizontal: "1%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  image: {
    width: 75,
    height: 75,
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
