import Colors from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import FlashMessage from "react-native-flash-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigator from "./navigations/AppNavigator";

const RootLayout = () => {
  const [initialRoute, setInitialRoute] = useState(null);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        setInitialRoute(user ? "Main" : "Onboarding");
      } finally {
        setAppReady(true);
      }
    }
    checkUser();
  }, []);

  if (!appReady || !initialRoute) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle={"light-content"} backgroundColor={Colors.primary} />
      <AppNavigator initialRouteName={initialRoute} />
      <FlashMessage position="bottom" />
    </GestureHandlerRootView>
  );
};

export default RootLayout;
