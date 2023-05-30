import React from "react";
import { List } from "react-native-paper";
import { Linking, View } from "react-native";

import { FileType } from "models/Lesson";

export default function FilesAndLinksCard({
  links,
  files,
}: {
  links: string[];
  files: FileType[];
}) {
  return (
    <View style={{ backgroundColor: "white" }}>
      <List.AccordionGroup>
        <List.Accordion
          style={{ backgroundColor: "white" }}
          title="Archivos"
          id="1"
        >
          {files.map((file, index) => {
            return (
              <List.Item
                key={index}
                title={file.fileName}
                onPress={() => Linking.openURL(file.fileUrl)}
                left={(props) => <List.Icon {...props} icon="folder" />}
              />
            );
          })}
        </List.Accordion>
        <List.Accordion
          style={{ backgroundColor: "white" }}
          title="Enlaces"
          id="2"
        >
          {links.map((link, index) => {
            return (
              <List.Item
                key={index}
                title={link}
                onPress={() => Linking.openURL(link)}
                left={(props) => <List.Icon {...props} icon="link-variant" />}
              />
            );
          })}
        </List.Accordion>
      </List.AccordionGroup>
    </View>
  );
}
