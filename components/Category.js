import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import CardText from "./text/CardText";

const Category = ({ name, iconName, active, onPress }) => {
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
      {active ? (
        <>
          <Ionicons name={iconName} size={28} color={Colors.textWhite} />
          <CardText color={Colors.textWhite}>{name}</CardText>
        </>
      ) : (
        <>
          <Ionicons name={iconName} size={28} color={Colors.textSecondary} />
          <CardText color={Colors.textSecondary}>{name}</CardText>
        </>
      )}
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
