import Colors from "@/constants/Colors";
import usePoppinsFont from "@/hooks/usePoppinsFont";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const InputDateTime = ({ offset, onPress, iconName }) => {
  const { fonts } = usePoppinsFont();
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.wrapper}
    >
      <View style={styles.inner}>
        <Ionicons name={iconName} size={25} color={Colors.textSecondary} />
        <Text
          style={{
            fontFamily: fonts.medium,
            fontSize: 16,
            color: Colors.textPrimary,
          }}
        >
          {offset}
        </Text>
      </View>
      <Ionicons name="chevron-down" size={20} color={Colors.textSecondary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.whiteGray,
    borderRadius: 10,
    padding: 20,
    marginBottom: 10
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
});

export default InputDateTime;
