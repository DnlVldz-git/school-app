import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { useLayout } from "hooks";
import { StyleService, useStyleSheet, useTheme, Icon } from "@ui-kitten/components";

import { Container, Content, Text, NavigationAction, HStack, VStack } from "components";

interface Props {
  screen: string;
}

const Finance00: React.FC<Props> = ({ screen }) => {
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
          {screen}
        </Text>
        <NavigationAction icon="circles_three" status="basic" />
      </HStack>
    </Container>
  );
};

export default React.memo(Finance00);

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
