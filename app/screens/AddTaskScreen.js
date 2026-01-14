import Category from "@/components/Category";
import CustomBtn from "@/components/CustomBtn";
import CustomInput from "@/components/CustomInput";
import TaskPreview from "@/components/TaskPreview";
import Colors from "@/constants/Colors";
import STORAGE_KEY from "@/constants/Storage";
import toggleCategory from "@/functions/toggleCategory";
import usePoppinsFont from "@/hooks/usePoppinsFont";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import { useState } from "react";
import {
  Alert,
  FlatList,
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

const AddTaskScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { fonts } = usePoppinsFont();
  const { tasks, setTasks } = route.params || {};

  const [titleTask, setTitleTask] = useState("");
  const [categories, setCategories] = useState([
    { id: "1", name: "Sport", iconName: "fitness", selected: true },
    { id: "2", name: "Etude", iconName: "book", selected: false },
    { id: "3", name: "Travail", iconName: "briefcase", selected: false },
    { id: "4", name: "Amis", iconName: "people", selected: false },
    { id: "5", name: "Famille", iconName: "heart", selected: false },
    { id: "6", name: "Nourriture", iconName: "fast-food", selected: false },
    { id: "7", name: "Détente", iconName: "leaf", selected: false },
    {
      id: "8",
      name: "Divertissement",
      iconName: "game-controller",
      selected: false,
    },
    { id: "9", name: "Autres", iconName: "apps", selected: false },
  ]);
  const [date, setDate] = useState(new Date());
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [reminder, setReminder] = useState(true);
  const [isDisable, setIsDisable] = useState(true);

  const onChangeDatePicker = (event, selectedDate) => {
    if (event.type === "set" && selectedDate) {
      setDate(selectedDate);
    }
    setShowDateTimePicker(false);
  };

  const addTask = async () => {
    if (titleTask.trim().length === 0) {
      Alert.alert("Erreur", "Saisis d'abord le titre de la tâche");
      return;
    }

    const selectedCategory = categories.find((cat) => cat.selected === true);

    const newTask = {
      id: Date.now().toString(),
      title: titleTask,
      iconName: selectedCategory ? selectedCategory.iconName : "apps",
      category: selectedCategory ? selectedCategory.name : "Autres",
      completed: false,
      isModified: false,
      reminder: reminder,
      createdAt: date.toISOString(),
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);

    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([newTask, ...tasks])
      );
      showMessage({
        message: "Ajout",
        description: "La tâche a été ajoutée avec succès !",
        type: "success",
        icon: "success",
        backgroundColor: Colors.primary,
        duration: 3000,
      });
      setTitleTask("");
      navigation.goBack();
    } catch (_) {
      Alert.alert("Erreur", "Une erreur s'est produite lors de la sauvegarde.");
      return;
    }
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
              <TaskPreview
                title={titleTask}
                iconName={
                  categories.find((cat) => cat.selected === true).iconName
                }
              />
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

            {/* Choix d'une catégorie */}
            <View style={{ marginBottom: 30 }}>
              <Text
                style={{
                  fontFamily: fonts.medium,
                  fontSize: 16,
                  color: Colors.textSecondary,
                }}
              >
                Catégorie
              </Text>
              <FlatList
                data={categories}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <Category
                    name={item.name}
                    iconName={item.iconName}
                    active={item.selected}
                    onPress={() => toggleCategory(item.id, setCategories)}
                  />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  gap: 10,
                  marginTop: 10,
                }}
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

          {/* Bouton d'ajout */}
          <View style={styles.wrapperBtn}>
            <CustomBtn onPress={addTask} disable={isDisable}>
              <Text
                style={{
                  fontFamily: fonts.bold,
                  fontSize: 16,
                  color: Colors.textWhite,
                }}
              >
                Ajouter
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
  wrapperBtn: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
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

export default AddTaskScreen;
