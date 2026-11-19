import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return <Tabs screenOptions={{ tabBarActiveTintColor: "#0D9488", tabBarInactiveTintColor: "#94A3B8", headerShown: false }}>
    <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: ({ color, size }) => <Ionicons name="people-outline" color={color} size={size} /> }} />
    <Tabs.Screen name="statistics" options={{ title: "Stats", tabBarIcon: ({ color, size }) => <Ionicons name="bar-chart-outline" color={color} size={size} /> }} />
    <Tabs.Screen name="explore" options={{ title: "Explore", tabBarIcon: ({ color, size }) => <Ionicons name="compass-outline" color={color} size={size} /> }} />
    <Tabs.Screen name="add-student" options={{ href: null, headerShown: true, headerTitle: "Join the Directory", headerStyle: { backgroundColor: "#0D1F4E" }, headerTintColor: "#FFFFFF" }} />
  </Tabs>;
}
