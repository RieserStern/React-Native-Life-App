import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../../features/auth/login/login.screen";
import { AuthScreen } from "../../features/auth";
import { SignUpScreen } from "../../features/auth/signup/signup.screen";

const Stack = createStackNavigator();

export const AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false, gestureEnabled: false }}
  >
    <Stack.Screen name="Main" component={AuthScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Regist" component={SignUpScreen} />
  </Stack.Navigator>
);
