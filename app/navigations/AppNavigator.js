import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingSreen from "../screens/OnboarbingScreen";
import DrawerNavigator from "./DrawerNavigator";

const Stack = createNativeStackNavigator();

const AppNavigator = ({ initialRouteName }) => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "fade" }}
      initialRouteName={initialRouteName}
    >
      <Stack.Screen name="Onboarding" component={OnboardingSreen} />
      <Stack.Screen name="Main" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
