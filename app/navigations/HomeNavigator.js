import Colors from "@/constants/Colors";
import usePoppinsFont from "@/hooks/usePoppinsFont";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import AddTaskScreen from "../screens/AddTaskScreen";
import HomeScreen from "../screens/HomeScreen";
import UpdateTaskScreen from "../screens/UpdateTaskScreen";

const Stack = createNativeStackNavigator();

const HomeNavigator = ({ navigation }) => {
  const { fonts } = usePoppinsFont();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: Colors.textWhite,
        headerTitleStyle: {
          fontFamily: fonts.medium,
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Accueil",
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.openDrawer()}
              style={{
                borderRadius: 50,
                padding: 3,
              }}
            >
              <Ionicons name="menu" size={25} color={Colors.textWhite} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {}}
              style={{
                borderRadius: 50,
                padding: 3,
              }}
            >
              <Ionicons name="filter" size={25} color={Colors.textWhite} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="AddTask"
        component={AddTaskScreen}
        options={{
          title: "Ajouter une tâche",
        }}
      />
      <Stack.Screen
        name="UpdateTask"
        component={UpdateTaskScreen}
        options={{
          title: "Modifier une tâche",
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
