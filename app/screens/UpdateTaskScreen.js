import CustomBtn from "@/components/CustomBtn";
import CustomInput from "@/components/CustomInput";
import TaskPreview from "@/components/TaskPreview";
import Colors from "@/constants/Colors";
import updateTask from "@/functions/updateTask";
import usePoppinsFont from "@/hooks/usePoppinsFont";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
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
      Alert.alert("Erreur", "Saisissez d'abord le titre de la tâche");
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
    <View style={styles.container}>
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

      {/* Bouton de modification */}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
});

export default UpdateTaskScreen;
