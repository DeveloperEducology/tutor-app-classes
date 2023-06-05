import React from "react";
import { Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../features/account/Login";


const Stack = createNativeStackNavigator();

export const AccountNavigator = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
);
