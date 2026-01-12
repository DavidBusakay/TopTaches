import BottomSheet from "@/components/BottomSheet";
import Task from "@/components/Task";
import Colors from "@/constants/Colors";
import FrConfig from "@/constants/FrConfig";
import STORAGE_KEY from "@/constants/Storage";
import countTasks from "@/functions/countTasks";
import deleteTask from "@/functions/deleteTask";
import filteredTasks from "@/functions/filteredTasks";
import markedDays from "@/functions/markedDays";
import toggleTask from "@/functions/toggleTask";
import usePoppinsFont from "@/hooks/usePoppinsFont";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import {
  CalendarProvider,
  LocaleConfig,
  WeekCalendar,
} from "react-native-calendars";
import { showMessage } from "react-native-flash-message";
import DatePicker from "react-native-modern-datepicker";

// Configuration du calendrier en français
LocaleConfig.locales["fr"] = {
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  monthNamesShort: [
    "Janv.",
    "Févr.",
    "Mars",
    "Avr.",
    "Mai",
    "Juin",
    "Juil.",
    "Août",
    "Sept.",
    "Oct.",
    "Nov.",
    "Déc.",
  ],
  dayNames: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ],
  dayNamesShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
};
LocaleConfig.defaultLocale = "fr";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { fonts } = usePoppinsFont();
  const refRBSheet = useRef();

  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY/MM/DD")
  );
  const [isModalVisible, setModalVisible] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [filterLabel, setFilterLabel] = useState("Toutes les tâches");

  // Liste de filtres
  const filters = [
    { label: "Toutes les tâches", value: "all", icon: "list" },
    { label: "A faire", value: "todo", icon: "flash" },
    { label: "Terminées", value: "done", icon: "checkmark-done" },
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setModalVisible(true)}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Text
            style={{
              fontFamily: fonts.medium,
              fontSize: 17,
              color: Colors.textWhite,
            }}
          >
            {dayjs(selectedDate).format("MMM YYYY").toUpperCase()}
          </Text>
          <Ionicons
            name="chevron-down"
            size={20}
            color={Colors.textWhite}
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => refRBSheet.current?.open()}
          style={{
            borderRadius: 50,
            padding: 3,
          }}
        >
          <Ionicons name="filter" size={25} color={Colors.textWhite} />
        </TouchableOpacity>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, selectedDate]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedTasks !== null) {
          setTasks(JSON.parse(savedTasks));
        }
      } catch (_) {
        showMessage({
          message: "Erreur de chargement",
          description:
            "Une erreur s'est produite lors du chargement des tâches.",
          type: "danger",
          icon: "danger",
          backgroundColor: Colors.red,
          duration: 3000,
        });
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      } catch (_) {
        showMessage({
          message: "Erreur de sauvegarde",
          description:
            "Une erreur s'est produite lors de la sauvegarde des tâches.",
          type: "danger",
          icon: "danger",
          backgroundColor: Colors.red,
          duration: 3000,
        });
      }
    };
    saveTasks();
  }, [tasks]);

  return (
    <View style={styles.container}>
      {/* Calendrier */}
      <CalendarProvider
        style={{ flex: 0 }}
        date={selectedDate.replace(/\//g, "-")}
      >
        <WeekCalendar
          current={selectedDate.replace(/\//g, "-")}
          onDayPress={(day) =>
            setSelectedDate(day.dateString.replace(/-/g, "/"))
          }
          markedDates={markedDays(tasks)}
          theme={{
            calendarBackground: Colors.bg,
            selectedDayBackgroundColor: Colors.primary,
            selectedDayTextColor: Colors.textWhite,
            todayTextColor: Colors.primary,
            dayTextColor: Colors.textSecondary,
            textDisabledColor: "gray",
            textDayFontFamily: fonts.medium,
            dotColor: Colors.primary,
            selectedDotColor: "#fff",
          }}
        />
      </CalendarProvider>

      {/* Liste des tâches */}
      <View style={styles.inner}>
        <Text
          style={{
            fontFamily: fonts.medium,
            fontSize: 16,
            color: Colors.textSecondary,
          }}
        >
          {filterLabel} ({countTasks(tasks, filter, selectedDate)})
        </Text>

        <FlatList
          data={filteredTasks(tasks, filter, selectedDate)}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Task
              title={item.title}
              iconName={item.iconName}
              completed={item.completed}
              createAt={item.createdAt}
              onToggle={() => toggleTask(item.id, setTasks)}
              onDelete={() => deleteTask(item.id, setTasks)}
              onUpdate={() => {
                navigation.navigate("UpdateTask", {
                  task: item,
                  setTasks: setTasks,
                });
              }}
            />
          )}
          contentContainerStyle={{
            gap: 10,
            paddingTop: 10,
            paddingBottom: 30,
          }}
          style={{ flex: 1 }}
          ListEmptyComponent={
            <View
              style={{
                height: 300,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.medium,
                  fontSize: 13,
                  color: Colors.textSecondary,
                }}
              >
                Aucune tâche
              </Text>
            </View>
          }
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        />

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            Vibration.vibrate(50);
            navigation.navigate("AddTask", {
              tasks: tasks,
              setTasks: setTasks,
            });
          }}
          style={styles.addBtn}
        >
          <Ionicons name="add" size={25} color={Colors.textWhite} />
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.calendarCard}>
            <DatePicker
              mode="monthYear"
              isGregorian={true}
              selectorStartingYear={2020}
              selectorEndingYear={2100}
              selected={dayjs(selectedDate).format("YYYY/MM/DD")}
              onMonthYearChange={(dateString) => {
                const formatedForDayjs = dateString.replace(" ", "/") + "/01";
                const newDate = dayjs(formatedForDayjs, "YYYY/MM/DD").format(
                  "YYYY-MM-DD"
                );
                setSelectedDate(newDate);
                setModalVisible(false);
              }}
              configs={FrConfig}
              options={{
                backgroundColor: "#fff",
                textHeaderColor: Colors.primary,
                textDefaultColor: "#000",
                selectedTextColor: "#fff",
                mainColor: Colors.primary,
                defaultFont: fonts.medium,
              }}
            />
          </View>
        </View>
      </Modal>

      {/* BOTTOM SHEET */}
      <BottomSheet
        ref={refRBSheet}
        list={filters}
        onPress={(selectedFilter) => {
          setFilter(selectedFilter.value);
          setFilterLabel(selectedFilter.label);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  inner: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 15,
  },
  addBtn: {
    position: "absolute",
    right: 25,
    bottom: 40,
    backgroundColor: Colors.primary,
    padding: 20,
    borderRadius: 50,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    borderBottomWidth: 0,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignContent: "center",
  },
  calendarCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    elevation: 10,
    margin: 10,
  },
});

export default HomeScreen;
