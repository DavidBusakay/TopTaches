import Colors from "@/constants/Colors";
import usePoppinsFont from "@/hooks/usePoppinsFont";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SplashScreen = () => {
  const { fonts } = usePoppinsFont();
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(async () => {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        navigation.replace("Main");
      } else {
        navigation.replace("Onboarding");
      }
    }, 1500);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text
          style={{
            fontFamily: fonts.bold,
            fontSize: 24,
            color: "#fff",
          }}
        >
          TopTâches
        </Text>
        <ActivityIndicator size="small" color="#fff" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    padding: 15,
  },
  inner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SplashScreen;
