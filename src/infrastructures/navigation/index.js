import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef } from "react";
import { AppState } from "react-native";
import { AUTH_STATE } from "../../constants/redux";
import { Splash } from "../../features/splash";
import { NavigationContainer } from "@react-navigation/native";
import { firebaseSDK } from "../../libs/firebase";
import { AuthNavigator } from "./auth.navigator";
import { AppNavigator } from "./app.navigator";
import { APP_STATE_ACTION } from "../../constants/redux";
import { SafeAreaProvider } from "react-native-safe-area-context";

export const Navigator = () => {
  const dispatch = useDispatch();

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    console.log(appState);
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        dispatch({ type: APP_STATE_ACTION.FOREGROUND });
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const { auth_state } = useSelector((state) => state.auth_state);

  const onSignOut = () => {
    firebaseSDK.signOut();
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {auth_state == AUTH_STATE.UNCHECK ? (
          <Splash />
        ) : auth_state == AUTH_STATE.NOAUTH ? (
          <AuthNavigator />
        ) : (
          <AppNavigator />
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
