import Colors from "@/constants/Colors";
import usePoppinsFont from "@/hooks/usePoppinsFont";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

const PasswordInput = ({
  value,
  onChangeText,
  placeholder,
  onHide,
  isHide,
}) => {
  const { fonts } = usePoppinsFont();
  return (
    <View style={styles.wrapper}>
      <TextInput
        placeholder={placeholder ?? ""}
        placeholderTextColor="#b8b8b8ff"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isHide}
        selectionColor={Colors.primary}
        style={[
          styles.input,
          {
            fontFamily: fonts.medium,
          },
        ]}
      />
      <Pressable onPress={onHide} style={{ padding: 5 }}>
        <Ionicons
          name={isHide ? "eye-off" : "eye"}
          size={25}
          color="#b8b8b8ff"
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 11,
  },
  input: {
    flex: 1,
    color: "#000",
    fontSize: 16,
  },
});

export default PasswordInput;
