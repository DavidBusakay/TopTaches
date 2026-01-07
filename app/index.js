import AddTaskForm from "@/components/AddTaskForm";
import HeaderApp from "@/components/HeaderApp";
import Task from "@/components/Task";
import Colors from "@/constants/Colors";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Alert, FlatList, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TextSecondary from "@/components/text/TextSecondary";

const STORAGE_KEY = "tasks_list";

const App = () => {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		const loadTasks = async () => {
			try {
				const savedTasks = await AsyncStorage.getItem(STORAGE_KEY);
				if (savedTasks !== null) {
					setTasks(JSON.parse(savedTasks))
				}
			} catch (e) {
				Alert.alert(
					"Erreur", "Une erreur s'est produite lors du chargement des tâches."
				)
			}
		};
		loadTasks();
	}, []);

	useEffect(() => {
		const saveTasks = async () => {
			try {
				await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
			} catch (e) {
				Alert.alert(
					"Erreur", "Une erreur s'est produite lors de la sauvegarde des tâches."
				)
			}
		};
		saveTasks();
	}, [tasks]);

	const addTask = (title) => {
		if (title.trim().length === 0) {
			return;
		}

		const newTask = {
			id: Date.now().toString(),
			title: title,
			completed: false,
			createAt: new Date().toISOString()
		};

		setTasks(prevTasks => [newTask, ...prevTasks]);
	};

	const editTask = (id) => {
		Alert.alert("Modifier", "Succes")
	}

	const deleteTask = (id) => {
		setTasks(prevTasks =>
			prevTasks.filter(task => task.id !== id)
		);
	};

	const toggleTask = (id) => {
		setTasks(prevTasks =>
			prevTasks.map(item =>
				item.id === id ? { ...item, completed: !item.completed } : item
			)
		);
	};
	
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaView style={styles.container}>
				<HeaderApp title="Mes Tâches" />

				<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
					<View style={styles.inner}>
						<FlatList
							data={tasks}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({ item }) => (
								<Task
									title={item.title}
									completed={item.completed}
									createAt={item.createAt}
									onToggle={() => toggleTask(item.id)}
									onDelete={() => deleteTask(item.id)}
									onEdit={() => editTask(item.id)}
								/>
							)}
							contentContainerStyle={{ paddingBottom: 20 }}
							style={{ flex: 1 }}
							ListEmptyComponent={
								<View style={{ flex: 1, alignItems: "center" }}>
									<TextSecondary>Aucune tâche</TextSecondary>
								</View>
							}
							keyboardShouldPersistTaps="handled"
							showsVerticalScrollIndicator={false}
						>
						</FlatList>
						<AddTaskForm onAddTask={addTask} />
					</View>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</GestureHandlerRootView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.bg,
		padding: 10
	},
	inner: {
		flex: 1,
		justifyContent: "flex-end"
	}
});

export default App;