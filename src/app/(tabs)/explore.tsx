import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Explore</Text>
        <View style={styles.card}>
          <Text style={styles.text}>
            This starter app includes example code to help you get started.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F0F4F8" },
  content: { padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0D1F4E",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 12,
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    color: "#64748B",
  },
});
