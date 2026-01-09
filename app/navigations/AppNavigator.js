import Colors from "@/constants/Colors";
import usePoppinsFont from "@/hooks/usePoppinsFont";
import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeNavigator from "./HomeNavigator";

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  const { fonts } = usePoppinsFont();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: Colors.cardText,
        headerTitleStyle: {
          fontFamily: fonts.medium,
        },
        drawerActiveTintColor: Colors.primary,
        drawerType: "slide",
        drawerStyle: {
          width: 300,
        },
        drawerItemStyle: {
          borderRadius: 10,
        },
        drawerLabelStyle: {
          fontFamily: fonts.medium,
          fontSize: 16,
        },
      }}
    >
      <Drawer.Screen
        name="(Home)"
        component={HomeNavigator}
        options={{
          title: "Accueil",
          drawerIcon: ({ color }) => (
            <Ionicons name="home" size={22} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppNavigator;
