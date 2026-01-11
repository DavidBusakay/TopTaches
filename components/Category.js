import Colors from "@/constants/Colors";
import usePoppinsFont from "@/hooks/usePoppinsFont";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";

const Category = ({ name, iconName, active, onPress }) => {
  const { fonts } = usePoppinsFont();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.wrapper,
        {
          backgroundColor: active ? Colors.card : Colors.whiteGray,
        },
      ]}
    >
      <Ionicons
        name={iconName}
        size={28}
        color={active ? Colors.textWhite : Colors.textSecondary}
      />
      <Text
        style={{
          fontFamily: fonts.medium,
          fontSize: 16,
          color: active ? Colors.textWhite : Colors.textSecondary,
        }}
      >
        {name}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    gap: 5,
    width: 170,
    height: 100,
  },
});

export default Category;
