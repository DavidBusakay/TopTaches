import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import calendar from "dayjs/plugin/calendar";
import Checkbox from "expo-checkbox";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import TextPrimary from "./text/TextPrimary";
import TextSecondary from "./text/TextSecondary";

dayjs.extend(calendar);
dayjs.locale("fr");

const Task = ({ title, createAt, completed, onToggle, onDelete, onEdit }) => {

    const renderRightActions = (progression, drag) => {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={onDelete}
                style={[
                    styles.actionBtn, {
                        backgroundColor: "#e43737ff",
                        marginStart: 10
                    }
                ]}
            >
                <Ionicons name="trash" size={25} color={Colors.textPrimary} />
            </TouchableOpacity>
        );
    };

    const renderLeftActions = (progression, drag) => {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={onEdit}
                style={[
                    styles.actionBtn, {
                        backgroundColor: Colors.primary,
                        marginEnd: 10
                    }
                ]}
            >
                <Ionicons name="pencil" size={25} color={Colors.textPrimary} />
            </TouchableOpacity>
        );
    };

    const displayDate = createAt ? dayjs(createAt).calendar(null, {
        sameDay: "[Aujourd'hui à] HH:mm",
        lastDay: "[Hier à] HH:mm",
        lastWeek: "dddd [dernier à] HH:mm",
        sameElse: "DD/MM/YYYY"
    }) : "";

    return (
        <ReanimatedSwipeable
            friction={3}
            rightThreshold={40}
            leftThreshold={40}
            renderRightActions={renderRightActions}
            renderLeftActions={renderLeftActions}
            enableTrackpadTwoFingerGesture
        >
            <View style={styles.taskContainer}>
                <View style={[
                    styles.colorBar,
                    { backgroundColor: completed ? Colors.primary : "#e43737ff" }
                ]} />
                <View>
                    <TextPrimary>
                        <Text style={completed && styles.textDone}>{title}</Text>
                    </TextPrimary>
                    {completed == false && (
                        <TextSecondary>
                            <Text style={{ fontSize: 13 }}>{displayDate}</Text>
                        </TextSecondary>
                    )}
                </View>
                <Checkbox
                    value={completed}
                    onValueChange={onToggle}
                    color={completed ? Colors.primary : undefined}
                    style={{ width: 28, height: 28, borderRadius: 8 }}
                />
            </View>
        </ReanimatedSwipeable>
    );
}

const styles = StyleSheet.create({
    taskContainer: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        backgroundColor: Colors.card,
        paddingVertical: 18,
        paddingHorizontal: 15,
        borderTopEndRadius: 8,
        borderEndEndRadius: 8,
        marginVertical: 5,
    },
    colorBar: {
        padding: 2,
        position: "absolute",
        top: 0,
        bottom: 0
    },
    actionBtn: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        padding: 30,
        marginVertical: 5
    },
    textDone: {
        textDecorationLine: "line-through",
        color: Colors.textSecondary
    }
});

export default Task;