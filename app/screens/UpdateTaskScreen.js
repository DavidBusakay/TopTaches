import CustomBtn from "@/components/CustomBtn";
import CustomInput from "@/components/CustomInput";
import TaskPreview from "@/components/TaskPreview";
import Colors from "@/constants/Colors";
import updateTask from "@/functions/updateTask";
import usePoppinsFont from "@/hooks/usePoppinsFont";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";

const UpdateTaskScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { fonts } = usePoppinsFont();
  const { task, setTasks } = route.params || {};

  const [titleTask, setTitleTask] = useState(task ? task.title : "");
  const [isDisable, setIsDisable] = useState(false);

  const handleUpdateTask = () => {
    if (titleTask.trim().length === 0) {
      Alert.alert("Erreur", "Saisis d'abord le titre de la tâche");
      return;
    }
    setTasks((prevTasks) =>
      updateTask(prevTasks, task.id, { title: titleTask })
    );
    showMessage({
      message: "Modification",
      description: "La tâche a été modifiée avec succès !",
      type: "success",
      icon: "success",
      backgroundColor: Colors.primary,
      duration: 3000,
    });
    setTitleTask("");
    navigation.goBack();
  };

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
              paddingBottom: 60,
            }}
          >
            {/* Preview */}
            <View style={{ marginBottom: 30 }}>
              <Text
                style={{
                  fontFamily: fonts.medium,
                  fontSize: 16,
                  color: Colors.textSecondary,
                }}
              >
                Prévisualisation
              </Text>
              <TaskPreview title={titleTask} iconName={task.iconName} />
            </View>

            {/* Titre de la tâche */}
            <View style={{ marginBottom: 30 }}>
              <Text
                style={{
                  fontFamily: fonts.medium,
                  fontSize: 16,
                  color: Colors.textSecondary,
                }}
              >
                Titre
              </Text>
              <CustomInput
                value={titleTask}
                onChangeText={(text) => {
                  setTitleTask(text);
                  setIsDisable(text.length > 0 ? false : true);
                }}
                placeholder="Ex: Je dois faire du sport"
              />
            </View>
          </ScrollView>

          {/* Bouton de modification */}
          <View
            style={{
              position: "absolute",
              bottom: 20,
              left: 0,
              right: 0,
            }}
          >
            <CustomBtn onPress={handleUpdateTask} disable={isDisable}>
              <Text
                style={{
                  fontFamily: fonts.bold,
                  fontSize: 16,
                  color: Colors.textWhite,
                }}
              >
                Modifier
              </Text>
            </CustomBtn>
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
});

export default UpdateTaskScreen;
