import CustomInput from "@/components/CustomInput";
import PasswordInput from "@/components/PasswordInput";
import Colors from "@/constants/Colors";
import usePoppinsFont from "@/hooks/usePoppinsFont";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { SafeAreaView } from "react-native-safe-area-context";

const OnboardingSreen = () => {
  const { fonts } = usePoppinsFont();
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const onRegister = async () => {
    Keyboard.dismiss();

    if (!name.trim() || !firstname.trim() || !password.trim()) {
      showMessage({
        message: "Tous les champs sont obligatoires",
        description:
          "Assurez-vous de bien remplir le nom, prénom et mot de passe.",
        type: "danger",
        icon: "danger",
        backgroundColor: Colors.red,
        duration: 5000,
      });
      return;
    }

    if (password.trim().length < 6) {
      showMessage({
        message: "Mot de passe trop faible",
        description: "Minimum 6 caractères (A-Z, 0-9 et caractères spéciaux).",
        type: "danger",
        icon: "danger",
        backgroundColor: Colors.red,
        duration: 7000,
      });
      return;
    }

    const user = {
      name: name.trim().toUpperCase(),
      firstname: firstname.trim().toUpperCase(),
      password: password.trim(),
      register_at: new Date().toISOString(),
    };

    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      showMessage({
        message: "Enregistrement réussi",
        description:
          "L'enregistrement a réussi. Tu peux consulter tes informations dans ton profil.",
        type: "success",
        icon: "success",
        backgroundColor: Colors.primary,
        duration: 7000,
      });
      setName("");
      setFirstname("");
      setPassword("");
      navigation.replace("Main");
    } catch (_) {
      showMessage({
        message: "Échec d'enregistrement",
        description:
          "Une erreur s'est produite lors de l'enregistrement. Rédemarre l'application et réessaye.",
        type: "danger",
        icon: "danger",
        backgroundColor: Colors.red,
        duration: 7000,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <View style={styles.inner}>
          <View style={styles.header}>
            <Text
              style={{
                fontFamily: fonts.bold,
                fontSize: 28,
                color: "#fff",
                textAlign: "center",
                marginBottom: 5,
              }}
            >
              TopTâches
            </Text>
            <Text
              style={{
                fontFamily: fonts.medium,
                fontSize: 16,
                color: "#ffffffe0",
                textAlign: "center",
                marginBottom: 30,
              }}
            >
              L&apos;application idéale pour gérer tes tâches facilement et
              rapidement.
            </Text>
          </View>

          <View style={styles.body}>
            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontFamily: fonts.medium,
                  fontSize: 14,
                  color: "#ffffffe0",
                  marginBottom: 5,
                }}
              >
                Nom
              </Text>
              <CustomInput
                value={name}
                onChangeText={(text) => setName(text)}
                placeholder="Ton nom"
              />
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontFamily: fonts.medium,
                  fontSize: 14,
                  color: "#ffffffe0",
                  marginBottom: 5,
                }}
              >
                Prénom
              </Text>
              <CustomInput
                value={firstname}
                onChangeText={(text) => setFirstname(text)}
                placeholder="Ton Prénom"
              />
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontFamily: fonts.medium,
                  fontSize: 14,
                  color: "#ffffffe0",
                  marginBottom: 5,
                }}
              >
                Mot de passe
              </Text>
              <PasswordInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder="Ton mot de passe"
                onHide={() => setHidePassword(!hidePassword)}
                isHide={hidePassword}
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={onRegister}
              style={styles.btn}
            >
              <Text
                style={{
                  fontFamily: fonts.bold,
                  fontSize: 16,
                  color: Colors.primary,
                }}
              >
                Enregistrer
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    paddingVertical: 10,
  },
  header: {
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
  },
  body: {
    flex: 1,
    paddingTop: 30,
  },
  btn: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default OnboardingSreen;
