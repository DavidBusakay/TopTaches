import CustomBtn from "@/components/CustomBtn";
import CustomInput from "@/components/CustomInput";
import PasswordInput from "@/components/PasswordInput";
import Colors from "@/constants/Colors";
import usePoppinsFont from "@/hooks/usePoppinsFont";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import IMGPROFIL from "../../assets/images/profile.png";

const ProfileScreen = () => {
  const { fonts } = usePoppinsFont();
  const navigation = useNavigation();

  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData !== null) {
          setUser(JSON.parse(userData));
        }
      } catch (_) {
        navigation.replace("Onboarding");
      }
    };
    loadData();
  }, [navigation]);

  const handleSave = async () => {
    Keyboard.dismiss();

    if (
      !name.trim() ||
      !firstname.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      showMessage({
        message: "Tous les champs sont obligatoires",
        description:
          "Assurez-vous de bien remplir le nom, prénom, le nouveau mot de passe et sa confirmation.",
        type: "danger",
        icon: "danger",
        backgroundColor: Colors.red,
        duration: 3000,
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
        duration: 3000,
      });
      return;
    }

    if (password.trim() !== confirmPassword.trim()) {
      showMessage({
        message: "Les deux mots de passe ne correspondent pas.",
        description: "Assure-toi de bien de confirmer ton mot de passe.",
        type: "danger",
        icon: "danger",
        backgroundColor: Colors.red,
        duration: 3000,
      });
      return;
    }

    const oldData = user;
    const newData = {
      name: name.trim().toUpperCase(),
      firstname: firstname.trim().toUpperCase(),
      password: password.trim(),
      register_at: oldData.register_at,
    };

    try {
      await AsyncStorage.setItem("user", JSON.stringify(newData));
      showMessage({
        message: "Mise à jour du profil réussie",
        description: "Tu peux maintenant ajouter tes tâches.",
        type: "success",
        icon: "success",
        backgroundColor: Colors.primary,
        duration: 3000,
      });
      setEditMode(false);
      setName("");
      setFirstname("");
      setPassword("");
      setConfirmPassword("");
      setHidePassword(true);
      setHideConfirmPassword(true);
    } catch (_) {
      showMessage({
        message: "Échec d'enregistrement",
        description:
          "Une erreur s'est produite lors de l'enregistrement. Rédemarre l'application et réessaye.",
        type: "danger",
        icon: "danger",
        backgroundColor: Colors.red,
        duration: 3000,
      });
      setEditMode(false);
      setName("");
      setFirstname("");
      setPassword("");
      setConfirmPassword("");
      setHidePassword(true);
      setHideConfirmPassword(true);
    }
  };

  const deleteAccount = async () => {
    try {
      await AsyncStorage.removeItem("user");
      showMessage({
        message: "Votre compte a été supprimé avec succès",
        description: "Réinscris-toi pour gérer plus facilement tes tâches.",
        type: "success",
        icon: "success",
        backgroundColor: Colors.primary,
        duration: 3000,
      });
      navigation.navigate("Onboarding");
    } catch (_) {
      showMessage({
        message: "Échec de suppression de compte",
        description:
          "Une erreur s'est produite lors de la suppression de ton compte. Rédemarre l'application et réessaye.",
        type: "danger",
        icon: "danger",
        backgroundColor: Colors.red,
        duration: 3000,
      });
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Suppression de compte",
      "Veux-tu vraiment supprimer définitivement ton compte ?",
      [
        {
          text: "Annuler",
          style: "cancel",
          onPress: () => {},
        },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: deleteAccount,
        },
      ]
    );
  };

  const displayDateRegisterAt = user.register_at
    ? dayjs(user.register_at).calendar(null, {
        sameDay: "[aujourd'hui à] HH:mm",
        lastDay: "[hier à] HH:mm",
        lastWeek: "dddd [dernier à] HH:mm",
        sameElse: "[le] DD/MM/YYYY",
      })
    : "";

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 80}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              paddingTop: 20,
              paddingBottom: 90,
            }}
          >
            <View style={styles.header}>
              <View style={styles.imageBox}>
                <Image source={IMGPROFIL} style={{ width: 100, height: 100 }} />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: fonts.bold,
                    fontSize: 18,
                    color: Colors.textPrimary,
                    textAlign: "center",
                  }}
                  numberOfLines={1}
                >
                  {user.name} {user.firstname}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => setEditMode(!editMode)}
                  style={styles.btnUpdate}
                >
                  <Ionicons
                    name={editMode ? "sync" : "pencil"}
                    size={16}
                    color={Colors.textSecondary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View>
              {editMode ? (
                <>
                  <View style={{ marginBottom: 20 }}>
                    <Text
                      style={{
                        fontFamily: fonts.medium,
                        fontSize: 16,
                        color: Colors.textSecondary,
                        marginBottom: 5,
                      }}
                    >
                      Nouveau nom
                    </Text>
                    <CustomInput
                      value={name}
                      onChangeText={(text) => setName(text)}
                      placeholder="Ton nouveau nom"
                    />
                  </View>

                  <View style={{ marginBottom: 20 }}>
                    <Text
                      style={{
                        fontFamily: fonts.medium,
                        fontSize: 16,
                        color: Colors.textSecondary,
                        marginBottom: 5,
                      }}
                    >
                      Nouveau prénom
                    </Text>
                    <CustomInput
                      value={firstname}
                      onChangeText={(text) => setFirstname(text)}
                      placeholder="Ton nouveau prénom"
                    />
                  </View>

                  <View style={{ marginBottom: 20 }}>
                    <Text
                      style={{
                        fontFamily: fonts.medium,
                        fontSize: 16,
                        color: Colors.textSecondary,
                        marginBottom: 5,
                      }}
                    >
                      Nouveau mot de passe
                    </Text>
                    <PasswordInput
                      value={password}
                      onChangeText={(text) => setPassword(text)}
                      placeholder="Ton nouveau mot de passe"
                      onHide={() => setHidePassword(!hidePassword)}
                      isHide={hidePassword}
                    />
                  </View>

                  <View style={{ marginBottom: 20 }}>
                    <Text
                      style={{
                        fontFamily: fonts.medium,
                        fontSize: 16,
                        color: Colors.textSecondary,
                        marginBottom: 5,
                      }}
                    >
                      Confirme ton nouveau mot de passe
                    </Text>
                    <PasswordInput
                      value={confirmPassword}
                      onChangeText={(text) => setConfirmPassword(text)}
                      placeholder="Confirme ton nouveau mot de passe"
                      onHide={() =>
                        setHideConfirmPassword(!hideConfirmPassword)
                      }
                      isHide={hideConfirmPassword}
                    />
                  </View>
                </>
              ) : (
                <View>
                  <Text
                    style={{
                      fontFamily: fonts.medium,
                      fontSize: 16,
                      color: Colors.textSecondary,
                      marginBottom: 5,
                    }}
                  >
                    Mot de passe
                  </Text>
                  <PasswordInput
                    value={user.password}
                    onChangeText={() => {}}
                    placeholder="Mot de passe"
                    onHide={() => setHidePassword(!hidePassword)}
                    isHide={hidePassword}
                  />
                  <Text
                    style={{
                      fontFamily: fonts.medium,
                      fontSize: 13,
                      color: Colors.textSecondary,
                      textAlign: "center",
                      marginTop: 20,
                    }}
                  >
                    Compte créé {displayDateRegisterAt}
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>

          <View style={styles.wrapperBtn}>
            {editMode ? (
              <CustomBtn onPress={handleSave} disable={false}>
                <Text
                  style={{
                    fontFamily: fonts.bold,
                    fontSize: 16,
                    color: Colors.textWhite,
                  }}
                >
                  Enregistrer
                </Text>
              </CustomBtn>
            ) : (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={handleDeleteAccount}
                style={{
                  backgroundColor: Colors.red,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                  padding: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: fonts.bold,
                    fontSize: 16,
                    color: Colors.textWhite,
                  }}
                >
                  Supprimer mon compte
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    paddingHorizontal: 15,
  },
  header: {
    paddingBottom: 20,
    marginBottom: 30,
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: Colors.whiteGray,
  },
  imageBox: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 10,
  },
  wrapperBtn: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
  },
  btnUpdate: {
    backgroundColor: Colors.whiteGray,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 12,
  },
});

export default ProfileScreen;
