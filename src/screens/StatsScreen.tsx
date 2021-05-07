import React from "react";
import { Text, View, StyleSheet } from "react-native";

export const StatsScreen = () => {
  return (
    <View style={styles.view}>
      <Text style={styles.title}>Stats</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: { flex: 1, justifyContent: "flex-start", alignItems: "center" },
  title: { fontSize: 26, fontWeight: "bold", marginVertical: 30 },
});
