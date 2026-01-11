import Colors from "@/constants/Colors";
import usePoppinsFont from "@/hooks/usePoppinsFont";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { Checkbox } from "expo-checkbox";
import { StyleSheet, Text, View } from "react-native";

dayjs.locale("fr");

const TaskPreview = ({ title, iconName }) => {
  const { fonts } = usePoppinsFont();
  const displayDate = dayjs(Date.now()).format("HH:mm");

  return (
    <View style={styles.taskContainer}>
      <View style={styles.wrapper}>
        <View style={styles.wrapperIcon}>
          <Ionicons name={iconName} size={25} color={Colors.textWhite} />
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: fonts.medium,
              fontSize: 16,
              color: Colors.textPrimary,
            }}
            numberOfLines={2}
          >
            {title}
          </Text>
          <Text
            style={{
              fontFamily: fonts.medium,
              fontSize: 14,
              color: Colors.textSecondary,
            }}
          >
            {displayDate}
          </Text>
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
    marginTop: 10,
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  wrapperIcon: {
    backgroundColor: Colors.red,
    borderRadius: 10,
    padding: 10,
  },
});

export default TaskPreview;
