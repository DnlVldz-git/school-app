import * as React from "react";

import { useLayout } from "hooks";

import { StyleService, useStyleSheet } from "@ui-kitten/components";
import { Container, Text, NavigationAction, HStack } from "components";

const Verify = () => {
  const { top } = useLayout();
  const styles = useStyleSheet(themedStyles);

  return (
    <Container style={styles.container} useSafeArea={false}>
      <HStack level="5" style={[{ paddingTop: top + 8 }]} itemsCenter>
        <NavigationAction icon="dot_six" status="basic" />
        <Text category="h7" status="white">
          Verifica tu cuenta
        </Text>
        <NavigationAction icon="circles_three" status="basic" />
      </HStack>
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
