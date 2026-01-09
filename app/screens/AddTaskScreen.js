import { useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEY from "@/constants/Storage";
import TextSecondary from "@/components/text/TextSecondary";
import CardText from "@/components/text/CardText";
import Colors from "@/constants/Colors";
import Category from "@/components/Category";
import TaskPreview from "@/components/TaskPreview";
import CustomInput from "@/components/input/CustomInput";
import CustomBtn from "@/components/CustomBtn";
import toggleCategory from "@/functions/toggleCategory";

const AddTaskScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { tasks, setTasks } = route.params;

    const [titleTask, setTitleTask] = useState("");
    const [categories, setCategories] = useState([
        { id: "1", name: "Sport", iconName: "fitness", selected: true },
        { id: "2", name: "Etude", iconName: "book", selected: false },
        { id: "3", name: "Travail", iconName: "briefcase", selected: false },
        { id: "4", name: "Amis", iconName: "people", selected: false },
        { id: "5", name: "Famille", iconName: "heart", selected: false },
        { id: "6", name: "Nourriture", iconName: "fast-food", selected: false },
        { id: "7", name: "Détente", iconName: "leaf", selected: false },
        { id: "8", name: "Divertissement", iconName: "game-controller", selected: false },
        { id: "9", name: "Autres", iconName: "apps", selected: false }
    ]);
    const [isDisable, setIsDisable] = useState(true);

    const addTask = async () => {
        if (titleTask.trim().length === 0) {
            Alert.alert("Erreur", "Saisissez d'abord le titre de la tâche");
            return;
        }

        const selectedCategory = categories.find(cat => cat.selected === true);
        
        const newTask = {
            id: Date.now().toString(),
            title: titleTask,
            iconName: selectedCategory ? selectedCategory.iconName : "apps",
            category: selectedCategory ? selectedCategory.name : "Autres",
            completed: false,
            createdAt: new Date().toISOString()
        };
        setTasks(prevTasks => [newTask, ...prevTasks]);

        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([newTask, ...tasks]));
            setTitleTask("");
            navigation.goBack();
        } catch (e) {
            Alert.alert(
                "Erreur", "Une erreur s'est produite lors de la sauvegarde."
            );
            return;
        }
    };

    return (
        <View style={styles.container}>

            {/* Preview */}
            <View style={{ marginBottom: 30 }}>
                <TextSecondary>Prévisualisation</TextSecondary>
                <TaskPreview
                    title={titleTask}
                    iconName={categories.find(cat => cat.selected === true).iconName}
                />
            </View>

            {/* Titre de la tâche */}
            <View style={{ marginBottom: 30 }}>
                <TextSecondary>Titre</TextSecondary>
                <CustomInput
                    value={titleTask}
                    onChangeText={(text) => {
                        setTitleTask(text);
                        text.length > 0 ? setIsDisable(false) : setIsDisable(true);
                    }}
                    placeholder="Ex: Je dois faire du sport"
                />
            </View>
            
            {/* Choix d'une catégorie */}
            <View style={{ marginBottom: 30 }}>
                <TextSecondary>Catégorie</TextSecondary>
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
                        marginTop: 10
                    }}
                />
            </View>

            {/* Bouton d'ajout */}
            <CustomBtn onPress={addTask} disable={isDisable}>
                <CardText color={Colors.textWhite}>Ajouter</CardText>
            </CustomBtn>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bg,
        paddingHorizontal: 15,
        paddingVertical: 20
    }
});

export default AddTaskScreen;