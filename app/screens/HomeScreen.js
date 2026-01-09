import React, { useEffect, useState } from "react";
import { Alert, FlatList, Modal, StyleSheet, TouchableOpacity, Vibration, View } from "react-native";
import { CalendarProvider, LocaleConfig, WeekCalendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from "react-native-modern-datepicker";
import dayjs from "dayjs";
import usePoppinsFont from "@/hooks/usePoppinsFont";
import STORAGE_KEY from "@/constants/Storage";
import Task from "@/components/Task";
import CardText from "@/components/text/CardText";
import TextSecondary from "@/components/text/TextSecondary";
import Colors from "@/constants/Colors";
import FrConfig from "@/constants/FrConfig";
import toggleTask from "@/functions/toggleTask";
import deleteTask from "@/functions/deleteTask";
import countTasksUncompleted from "@/functions/countTasksUncompleted";
import filteredTasks from "@/functions/filteredTasks";
import markedDays from "@/functions/markedDays";

// Configuration du calendrier en français
LocaleConfig.locales["fr"] = {
	monthNames: [
		"Janvier", "Février", "Mars", "Avril", "Mai",
		"Juin", "Juillet", "Août", "Septembre",
		"Octobre", "Novembre", "Décembre"
	],
	monthNamesShort: [
		"Janv.", "Févr.", "Mars", "Avr.", "Mai",
		"Juin", "Juil.", "Août", "Sept.",
		"Oct.", "Nov.", "Déc."
	],
	dayNames: [
		"Dimanche", "Lundi", "Mardi", "Mercredi",
		"Jeudi", "Vendredi", "Samedi"
	],
	dayNamesShort: [
		"Dim", "Lun", "Mar", "Mer",
		"Jeu", "Ven", "Sam"
	]
};
LocaleConfig.defaultLocale = "fr";

const HomeScreen = () => {
	const navigation = useNavigation();
	const { fonts } = usePoppinsFont();

	const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY/MM/DD"));
	const [isModalVisible, setModalVisible] = useState(false);
	const [tasks, setTasks] = useState([]);

	// On configure le header dynamiquement pour réagir au clic
	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: () => (
				<TouchableOpacity
					activeOpacity={0.9}
					onPress={() => setModalVisible(true)}
					style={{ flexDirection: "row", alignItems: "center" }}
				>
					<CardText color={Colors.textWhite}>
						{dayjs(selectedDate).format("MMM YYYY").toUpperCase()}
					</CardText>
					<Ionicons
						name="chevron-down"
						size={20}
						color={Colors.textWhite}
						style={{ marginLeft: 8 }}
					/>
				</TouchableOpacity>
			)
		});
	}, [navigation, selectedDate]);

	useEffect(() => {
		const loadTasks = async () => {
			try {
				const savedTasks = await AsyncStorage.getItem(STORAGE_KEY);
				if (savedTasks !== null) {
					setTasks(JSON.parse(savedTasks));
				}
			} catch (e) {
				Alert.alert(
					"Erreur", "Une erreur s'est produite lors du chargement des tâches."
				);
			}
		};
		loadTasks();
	}, []);

	useEffect(() => {
		const saveTasks = async () => {
			try {
				await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
			} catch (e) {
				Alert.alert(
					"Erreur", "Une erreur s'est produite lors de la sauvegarde."
				);
			}
		}
		saveTasks();
	}, [tasks]);

	const handleDelete = (id) => {
		if (!id) return;
		Alert.alert(
			"Confirmation",
			"Voulez-vous vraiment supprimer cette tache ?",
			[
				{
					"text": "Annuler",
					"onPress": () => {},
					"style": "default"
				},
				{
					"text": "Supprimer",
					"onPress": () => deleteTask(id, setTasks),
					"style": "default"
				}
			]
		);
	};

	return (
		<View style={styles.container}>
			{/* Calendrier */}
			<CalendarProvider style={{ flex: 0 }} date={selectedDate.replace(/\//g, "-")}>
				<WeekCalendar
					current={selectedDate.replace(/\//g, "-")}
					onDayPress={(day) => setSelectedDate(day.dateString.replace(/-/g, "/"))}
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
						selectedDotColor: "#fff"
					}}
				/>
			</CalendarProvider>

			{/* Liste des tâches */}
			<View style={styles.inner}>
				<TextSecondary>
					A faire ({countTasksUncompleted(tasks, selectedDate)})
				</TextSecondary>

				<FlatList
					data={filteredTasks(tasks, selectedDate)}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<Task
							title={item.title}
							iconName={item.iconName}
							completed={item.completed}
							createAt={item.createdAt}
							onToggle={() => toggleTask(item.id, setTasks)}
							onDelete={() => handleDelete(item.id)}
							onEdit={() => {}}
						/>
					)}
					contentContainerStyle={{
						gap: 10,
						paddingTop: 10,
						paddingBottom: 30
					}}
					style={{ flex: 1 }}
					ListEmptyComponent={
						<View style={{
							height: 300,
							justifyContent: "center",
							alignItems: "center"
						}}>
							<TextSecondary>Aucune tâche</TextSecondary>
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
							setTasks: setTasks
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
							onMonthYearChange={dateString => {
								const formatedForDayjs = dateString.replace(" ", "/") + "/01";
								const newDate = dayjs(formatedForDayjs, "YYYY/MM/DD").format("YYYY-MM-DD");
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
								defaultFont: fonts.medium
							}}
						/>
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.bg
	},
	inner: {
		flex: 1,
		justifyContent: "flex-end",
		padding: 15
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
			height: 3
		},
		shadowOpacity: 0.3,
		shadowRadius: 4.65,
		borderBottomWidth: 0
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignContent: "center"
	},
	calendarCard: {
		backgroundColor: "#fff",
		borderRadius: 20,
		padding: 15,
		elevation: 10,
		margin: 10
	}
});

export default HomeScreen;