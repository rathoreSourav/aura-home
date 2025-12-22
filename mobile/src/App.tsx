import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { HomeScreen } from "./screens/HomeScreen";
import { DevicesScreen } from "./screens/DevicesScreen";
import { AssistantScreen } from "./screens/AssistantScreen";
import { AutomationsScreen } from "./screens/AutomationsScreen";
import { AlertsScreen } from "./screens/AlertsScreen";
import { theme } from "./design/theme";
import { TabBarIcon } from "./components/TabBarIcon";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.background,
    primary: theme.colors.primary,
    text: theme.colors.text,
    border: theme.colors.border,
    card: theme.colors.surface,
  },
};

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.muted,
        tabBarStyle: { backgroundColor: theme.colors.surface },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="DevicesTab"
        component={DevicesScreen}
        options={{
          title: "Devices",
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="lightbulb" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AutomationsTab"
        component={AutomationsScreen}
        options={{
          title: "Automations",
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="zap" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AssistantTab"
        component={AssistantScreen}
        options={{
          title: "Assistant",
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="message-circle" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AlertsTab"
        component={AlertsScreen}
        options={{
          title: "Alerts",
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="bell" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style="dark" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Root" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
