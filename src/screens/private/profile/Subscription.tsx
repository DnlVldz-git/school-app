import dayjs from "dayjs";

import * as React from "react";
import { Image } from "react-native";

import { useAppSelector } from "hooks/useRedux";

import {
  Layout,
  StyleService,
  useStyleSheet,
  TopNavigation,
} from "@ui-kitten/components";
import Images from "assets/images";
import {
  Container,
  Content,
  Text,
  NavigationAction,
  VStack,
  HStack,
} from "components";

import Subscription from "models/Subscription";
import { useLazyGetAllByStudentQuery } from "slices/SubscriptionSlice";

const Suscription = React.memo(() => {
  const styles = useStyleSheet(themedStyles);
  const currentUser = useAppSelector((state) => state.auth.user);
  const [fetch, { isFetching }] = useLazyGetAllByStudentQuery();

  const [activeSub, setActiveSub] = React.useState<Subscription>(
    new Subscription()
  );

  async function fetchSubs() {
    const data: Subscription[] = await fetch(
      currentUser?.studentId ?? ""
    ).unwrap();

    if (data) {
      setActiveSub(
        data.find((item) => item.status === true) || new Subscription()
      );
    }
  }

  React.useEffect(() => {
    fetchSubs();
  }, []);

  return (
    <Container style={styles.container}>
      <TopNavigation
        title={"Suscripción"}
        accessoryLeft={<NavigationAction status="primary" />}
      />
      <Content contentContainerStyle={styles.content}>
        <VStack level="7" mh={16} border={16} padding={24}>
          <Text
            category="h3"
            status="white"
            marginBottom={30}
            style={(styles.text, { textAlign: "center" })}
          >
            {typeof activeSub.plan === "string"
              ? String(activeSub.plan)
              : String(activeSub.plan.name)}
          </Text>

          <Layout style={styles.iconView} level="3">
            <Image
              source={Images.trophy}
              /* @ts-ignore */
              style={styles.image}
            />
          </Layout>

          <Text
            category="h7"
            status="basic"
            marginBottom={4}
            marginTop={20}
            style={{ fontWeight: "bold", textAlign: "center" }}
          >
            <Text
              category="h7"
              status="white"
              style={{ fontWeight: "bold", textAlign: "center" }}
            >
              Créditos restantes:
            </Text>
            {` ${activeSub.availableCredits}`}
          </Text>

          <Text
            category="h7"
            status="basic"
            style={{ fontWeight: "bold", textAlign: "center" }}
          >
            <Text
              category="h7"
              status="white"
              style={{ fontWeight: "bold", textAlign: "center" }}
            >
              Vencimiento
            </Text>
            {` ${dayjs(activeSub.expiration).format("dddd, MMMM D, YYYY")}`}
          </Text>
        </VStack>
      </Content>
    </Container>
  );
});

export default Suscription;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    paddingTop: 8,
    flexGrow: 1,
  },
  text: {
    textAlign: "center",
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
    width: 50,
    height: 50,
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
    width: 110,
    height: 110,
    borderRadius: 60,
    borderWidth: 3,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderColor: "background-basic-color-1",
  },
});
