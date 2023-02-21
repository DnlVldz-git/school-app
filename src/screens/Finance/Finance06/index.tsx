import * as React from "react";
import { Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLayout } from "hooks";
import {
  Layout,
  StyleService,
  useStyleSheet,
  useTheme,
  Icon,
  Divider,
} from "@ui-kitten/components";

import { Container, Content, Text, NavigationAction, HStack, VStack } from "components";
import ButtonShape from "./ButtonShape";
import CircleSlider from "./CircleSlider";
import Images from "assets/images";

const Finance06 = React.memo(() => {
  const theme = useTheme();
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);

  const [activeTab, setActiveTab] = React.useState(0);
  return (
    <Container style={styles.container} useSafeArea={false}>
      <HStack level="5" style={[{ paddingTop: top + 8 }]} itemsCenter>
        <NavigationAction icon="dot_six" status="basic" />
        <Text category="h7" status="white">
          Investment
        </Text>
        <NavigationAction icon="circles_three" status="basic" />
      </HStack>
      <VStack level="5" ph={16} pb={24} style={styles.header}>
        <HStack>
          <HStack justify="flex-start" itemsCenter mb={8}>
            <Text status="white" category="h7" marginRight={4}>
              My Balance
            </Text>
            <Icon pack="assets" name="eye_closed" style={styles.iconHeader} />
          </HStack>
          <Icon pack="assets" name="caret_right" style={styles.iconHeader} />
        </HStack>
        <HStack itemsCenter justify="flex-start">
          <Text category="h3" status="white" marginRight={24}>
            $13,925.60
          </Text>
          <VStack style={styles.tag}>
            <Text category="c2" status="primary">
              +15%
            </Text>
          </VStack>
        </HStack>
      </VStack>
      <Content contentContainerStyle={styles.content}>
        <HStack mh={32} mt={24} mb={32}>
          <ButtonShape icon="plus" title="Deposit" backgroundColor="#CE8ABC" />
          <ButtonShape icon="arrow_down" title="Withdraw" backgroundColor="#E5CABF" />
          <ButtonShape icon="money" title="Swap" backgroundColor="#5784E8" />
        </HStack>
        <HStack level="10" padding={16} border={16} itemsCenter justify="flex-start" mh={16}>
          <CircleSlider value={80} d={70} />
          <VStack ml={16} mr={24}>
            <Text category="h6" marginBottom={8}>
              Done Achivements!
            </Text>
            <Text category="subhead">You are better than 25% user</Text>
          </VStack>
          <Icon pack="assets" name="caret_right" style={{ tintColor: "#1F2933" }} />
        </HStack>
        <HStack mh={16} mb={16} mt={32}>
          <Text category="h6">Portfolios</Text>
          <Text category="callout" status="primary">
            See All
          </Text>
        </HStack>
        <Content horizontal>
          {DATA.map((item, i) => {
            return (
              <VStack
                key={i}
                minWidth={288 * (width / 375)}
                level="2"
                ml={16}
                border={16}
                padding={24}
              >
                <HStack itemsCenter mb={24}>
                  <HStack itemsCenter>
                    <Layout level="3" style={styles.logo}>
                      <Icon pack="assets" name={item.icon} />
                    </Layout>
                    <Text marginLeft={4} category="callout">
                      {item.title}
                    </Text>
                  </HStack>
                  <VStack level="5" border={16} pv={4} ph={8}>
                    <Text category="callout" status="white">
                      {item.progress}
                    </Text>
                  </VStack>
                </HStack>
                <Divider
                  style={{
                    width: 272 * (width / 375),
                    backgroundColor: theme["color-basic-900"],
                  }}
                />
                <HStack mt={16}>
                  <Text category="subhead" status="platinum">
                    Balance
                  </Text>
                  <Text category="subhead" status="platinum">
                    Profits
                  </Text>
                </HStack>
                <HStack mt={4}>
                  <Text category="h8" status="basic">
                    {item.balance}
                  </Text>
                  <Text category="h8" status="basic">
                    {item.profits}
                  </Text>
                </HStack>
              </VStack>
            );
          })}
        </Content>
      </Content>
    </Container>
  );
});

export default Finance06;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    paddingTop: 24,
  },
  content: {},
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

const DATA = [
  {
    title: "Stock",
    progress: "+30%",
    icon: "chart_line",
    balance: "$800,000",
    profits: "$24,000",
  },
  {
    title: "Stock",
    progress: "+25%",
    icon: "coins",
    balance: "$800,000",
    profits: "$34,000",
  },
];
const DATA_BOTTOM = [
  {
    title: "Home",
    icon: "house",
  },
  {
    title: "Wallet",
    icon: "card_holder",
  },
  { icon: "logo" },
  {
    title: "Analytics",
    icon: "chart_line",
  },
  {
    title: "Profile",
    icon: "user_circle",
  },
];
