import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import Colors from "@/constants/Colors";

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle={"light-content"} backgroundColor={Colors.bg} />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
