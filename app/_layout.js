import Colors from "@/constants/Colors";
import { StatusBar } from "react-native";
import FlashMessage from "react-native-flash-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigator from "./navigations/AppNavigator";

const RootLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle={"light-content"} backgroundColor={Colors.primary} />
      <AppNavigator />
      <FlashMessage position="bottom" />
    </GestureHandlerRootView>
  );
};

export default RootLayout;
