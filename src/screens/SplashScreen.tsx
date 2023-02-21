import * as React from "react";
import { FlatList } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StyleService, useStyleSheet, Button } from "@ui-kitten/components";
import { Container, Text } from "components";
import { RootStackParamList } from "navigation/navigation-types";

interface SplashButtonProps {
  name: string;
  navigate?: keyof RootStackParamList;
}

const SplashScreen = React.memo(() => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useStyleSheet(themedStyles);

  const data: SplashButtonProps[] = [    
    { name: "Finance", navigate: "Finance" },    
  ];

  return (
    <Container style={styles.container}>
      <Text category="h3" center marginBottom={32}>
        {`Welcome to\nTramKam UIkit 🎉🎉🎉`}
      </Text>
      <FlatList
        data={data}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => {
          return (
            <Button
              disabled={!item.navigate}
              children={item.name}
              style={styles.button}
              onPress={() => {
                item.navigate && navigate(item.navigate);
              }}
            />
          );
        }}
      />
    </Container>
  );
});

export default SplashScreen;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  button: {
    marginBottom: 24,
  },
  content: {
    paddingHorizontal: 24,
  },
});
