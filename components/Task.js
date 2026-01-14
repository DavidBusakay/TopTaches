import Colors from "@/constants/Colors";
import usePoppinsFont from "@/hooks/usePoppinsFont";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import calendar from "dayjs/plugin/calendar";
import { Checkbox } from "expo-checkbox";
import { useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";

dayjs.extend(calendar);
dayjs.locale("fr");

const Task = ({
  title,
  iconName,
  completed,
  isModified,
  createAt,
  onToggle,
  onDelete,
  onUpdate,
}) => {
  const swipeableRef = useRef();
  const { fonts } = usePoppinsFont();

  
  const renderRightActions = (progression, drag) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onDelete}
        style={[
          styles.actionBtn,
          {
            backgroundColor: Colors.red,
          },
        ]}
      >
        <Ionicons name="trash" size={25} color={Colors.textWhite} />
      </TouchableOpacity>
    );
  };

  const renderLeftActions = (progress, dragX) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={completed ? undefined : onUpdate}
        disabled={completed}
        style={[
          styles.actionBtn,
          {
            backgroundColor: Colors.primary,
            opacity: completed ? 0.5 : 1,
          },
        ]}
      >
        <Ionicons name="pencil" size={25} color={Colors.textWhite} />
      </TouchableOpacity>
    );
  };

  const displayTime = createAt ? dayjs(createAt).format("HH:mm") : "";

  return (
    <ReanimatedSwipeable
      ref={swipeableRef}
      friction={3}
      rightThreshold={40}
      leftThreshold={40}
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
      enableTrackpadTwoFingerGesture
      overshootRight={true}
      onSwipeableOpen={(direction) => {
        if (direction === "right" && !completed) {
          Vibration.vibrate(50);
          onUpdate();
          swipeableRef.current?.close();
        } else if (direction === "left") {
          Vibration.vibrate(50);
          onDelete();
          swipeableRef.current?.close();
        }
      }}
      containerStyle={{
        overflow: "hidden",
        borderRadius: 10,
      }}
    >
      <View style={styles.taskContainer}>
        <View style={styles.wrapper}>
          <View
            style={[
              styles.wrapperIcon,
              {
                backgroundColor: completed ? Colors.primary : Colors.red,
              },
            ]}
          >
            <Ionicons name={iconName} size={25} color={Colors.textWhite} />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={[
                completed && styles.textDone,
                {
                  fontFamily: fonts.medium,
                  fontSize: 16,
                  color: Colors.textPrimary,
                },
              ]}
              numberOfLines={2}
            >
              {title}
            </Text>
            <Text
              style={{
                fontFamily: fonts.medium,
                fontSize: 13,
                color: Colors.textSecondary,
              }}
            >
              {displayTime} {isModified && "- Modifié"}
            </Text>
          </View>
          <Checkbox
            value={completed}
            onValueChange={onToggle}
            color={completed ? Colors.primary : Colors.textSecondary}
            style={{ width: 28, height: 28, borderRadius: 10 }}
          />
        </View>
      </View>
    </ReanimatedSwipeable>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    backgroundColor: Colors.whiteGray,
    padding: 15,
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  actionBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
  },
  textDone: {
    textDecorationLine: "line-through",
    color: Colors.textSecondary,
  },
  wrapperIcon: {
    borderRadius: 10,
    padding: 10,
  },
});

export default Task;
