import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import CardText from "./text/CardText";
import Checkbox from "expo-checkbox";
import dayjs from "dayjs";
import "dayjs/locale/fr";

dayjs.locale("fr");

const TaskPreview = ({ title, iconName }) => {
    const displayDate = dayjs(Date.now()).format("HH:mm");

    return (
        <View style={styles.taskContainer}>
            <View style={styles.wrapper}>
                <View style={styles.wrapperIcon}>
                    <Ionicons name={iconName} size={25} color={Colors.textWhite} />
                </View>
                <View style={{ flex: 1 }}>
                    <CardText color={Colors.textPrimary}>
                        <Text numberOfLines={1}>{title}</Text>
                    </CardText>
                    <CardText color={Colors.textSecondary}>
                        <Text style={{ fontSize: 14 }}>Aujourd'hui à {displayDate}</Text>
                    </CardText>
                </View>
                <Checkbox
                    value={null}
                    onValueChange={() => {}}
                    disabled={true}
                    style={{ width: 28, height: 28, borderRadius: 10 }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    taskContainer: {
        backgroundColor: Colors.whiteGray,
        borderRadius: 10,
        padding: 15,
        marginTop: 10
    },
    wrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12
    },
    wrapperIcon: {
        backgroundColor: Colors.red,
        borderRadius: 10,
        padding: 10
    }
});

export default TaskPreview;