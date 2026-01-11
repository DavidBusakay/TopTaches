import Colors from "@/constants/Colors";
import usePoppinsFont from "@/hooks/usePoppinsFont";
import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "../screens/ProfileScreen";
import HomeNavigator from "./HomeNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
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
        headerTintColor: "#fff",
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
          drawerIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={22}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Profil"
        component={ProfileScreen}
        options={{
          title: "Mon Profil",
          drawerIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={22}
              color={color}
            />
          ),
          headerTitleAlign: "center",
          headerTintColor: "#fff",
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
