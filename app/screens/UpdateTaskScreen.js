import CustomBtn from "@/components/CustomBtn";
import CustomInput from "@/components/CustomInput";
import TaskPreview from "@/components/TaskPreview";
import Colors from "@/constants/Colors";
import updateTask from "@/functions/updateTask";
import usePoppinsFont from "@/hooks/usePoppinsFont";
import { scheduleTaskNotification } from "@/services/notification";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";

const UpdateTaskScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { fonts } = usePoppinsFont();
  const { task, setTasks } = route.params || {};
  const [reminder, setReminder] = useState(task?.reminder ?? true);

  const [titleTask, setTitleTask] = useState(task ? task.title : "");
  const [date, setDate] = useState(new Date(task?.createdAt));
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  const onChangeDatePicker = (event, selectedDate) => {
    if (event.type === "set" && selectedDate) {
      setDate(selectedDate);
    }
    setShowDateTimePicker(false);
  };

  const handleUpdateTask = () => {
    Keyboard.dismiss();

    if (titleTask.trim().length === 0) {
      showMessage({
        message: "Aucun titre de tâche",
        description: "Saisis d'abord le titre de la tâche.",
        type: "danger",
        icon: "danger",
        backgroundColor: Colors.red,
        duration: 3000,
      });
      return;
    }

    (async () => {
      let notificationId = task.notificationId || null;
      if (reminder) {
        notificationId = await scheduleTaskNotification({
          ...task,
          title: titleTask,
          createdAt: date.toISOString(),
        });
      }
      setTasks((prevTasks) =>
        updateTask(prevTasks, task.id, {
          title: titleTask,
          createdAt: date.toISOString(),
          isModified: true,
          reminder,
          notificationId,
        })
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
    })();
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

            {/* Programmation */}
            <View style={{ marginBottom: 30 }}>
              <Text
                style={{
                  fontFamily: fonts.medium,
                  fontSize: 16,
                  color: Colors.textSecondary,
                  marginBottom: 10,
                }}
              >
                Programmation
              </Text>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setShowDateTimePicker(true)}
                style={styles.wrapperDate}
              >
                <Text
                  style={{
                    fontFamily: fonts.medium,
                    fontSize: 16,
                    color: Colors.textPrimary,
                  }}
                >
                  {dayjs(date).format("DD/MM/YYYY")}
                </Text>
                <Ionicons
                  name="chevron-down"
                  size={20}
                  color={Colors.textSecondary}
                />
              </TouchableOpacity>
              {showDateTimePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  design="material"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={onChangeDatePicker}
                  minimumDate={new Date()}
                  maximumDate={new Date(2030, 12, 31)}
                  title="Sélectionne une date pour la tâche"
                  timeZoneName="Africa/Kinshasa"
                />
              )}
            </View>

            {/* Rappels */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 30,
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.medium,
                  fontSize: 16,
                  color: Colors.textSecondary,
                }}
              >
                Me rappeler
              </Text>
              <Switch
                value={reminder}
                onChange={() => setReminder(!reminder)}
                thumbColor={Colors.primary}
                accessibilityLabel="Me rappeler"
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
  wrapperDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.whiteGray,
    borderRadius: 10,
    padding: 20,
  },
});

export default UpdateTaskScreen;
