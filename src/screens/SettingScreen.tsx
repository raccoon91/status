import React from "react";
import { Text, View, StyleSheet } from "react-native";

export const SettingScreen = () => {
  return (
    <View style={styles.view}>
      <Text>Setting</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: { flex: 1, justifyContent: "center", alignItems: "center" },
});
