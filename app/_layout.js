import Colors from "@/constants/Colors";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigator from "./navigations/AppNavigator";

const RootLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle={"light-content"} backgroundColor={Colors.primary} />
      <AppNavigator />
    </GestureHandlerRootView>
  );
};

export default RootLayout;
