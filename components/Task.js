import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import calendar from "dayjs/plugin/calendar";
import Checkbox from "expo-checkbox";
import { StyleSheet, Text, TouchableOpacity, Vibration, View } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import CardText from "./text/CardText";

dayjs.extend(calendar);
dayjs.locale("fr");

const Task = ({ title, iconName, createAt, completed, onToggle, onDelete, onEdit }) => {

    const renderRightActions = (progression, drag) => {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={onDelete}
                style={[
                    styles.actionBtn, {
                        backgroundColor: Colors.red
                    }
                ]}
            >
                <Ionicons name="trash" size={25} color={Colors.textWhite} />
            </TouchableOpacity>
        );
    };

    const renderLeftActions = (progression, drag) => {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={completed ? undefined : onEdit}
                disabled={completed}
                style={[
                    styles.actionBtn, {
                        backgroundColor: Colors.primary,
                        opacity: completed ? 0.5 : 1
                    }
                ]}
            >
                <Ionicons name="pencil" size={25} color={Colors.textWhite} />
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
            onSwipeableOpen={(direction) => {
                if (direction === "right" && !completed) {
                    Vibration.vibrate(50);
                    onEdit();
                } else if (direction === "left") {
                    Vibration.vibrate(50);
                    onDelete();
                }
            }}
            containerStyle={{
                overflow: "hidden",
                borderRadius: 10
            }}
            >
            <View style={styles.taskContainer}>
                <View style={styles.wrapper}>
                    <View style={[styles.wrapperIcon, {
                        backgroundColor: completed ? Colors.primary : Colors.red
                    }]}> 
                        <Ionicons name={iconName} size={25} color={Colors.textWhite} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <CardText color={Colors.textPrimary}>
                            <Text style={completed && styles.textDone}>{title}</Text>
                        </CardText>
                        {completed === false && (
                            <CardText color={Colors.textSecondary}>
                                <Text style={{ fontSize: 13 }}>{displayDate}</Text>
                            </CardText>
                        )}
                    </View>
                    <Checkbox
                        value={completed}
                        onValueChange={onToggle}
                        color={completed ? Colors.primary : Colors.textSecondary}
                        style={{ width: 28, height: 28, borderRadius: 50 }}
                    />
                </View>
            </View>
        </ReanimatedSwipeable>
    );
}

const styles = StyleSheet.create({
    taskContainer: {
        backgroundColor: Colors.whiteGray,
        padding: 15
    },
    wrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12
    },
    actionBtn: {
        justifyContent: "center",
        alignItems: "center",
        width: 60
    },
    textDone: {
        textDecorationLine: "line-through",
        color: Colors.textSecondary
    },
    wrapperIcon: {
        borderRadius: 10,
        padding: 10
    }
});

export default Task;