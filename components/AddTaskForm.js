import { StyleSheet, View, Keyboard } from "react-native";
import CustomInput from "@/components/input/CustomInput";
import AddBtn from "@/components/Button/AddBtn";
import { useState } from "react";

const AddTaskForm = ({ onAddTask }) => {
    const [taskTitle, setTaskTitle] = useState("");

    const handleAdd = () => {
        onAddTask(taskTitle);
        setTaskTitle("");
        Keyboard.dismiss();
        return true;
    }

    return (
        <View style={styles.wrapper}>
            <CustomInput value={taskTitle} onChangeText={setTaskTitle} />
            <AddBtn onPress={handleAdd} />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        gap: 10,
        marginVertical: 10
    }
});

export default AddTaskForm;