import Colors from "@/constants/Colors";
import usePoppinsFont from "@/hooks/usePoppinsFont";
import { TextInput } from "react-native";

const CustomInput = ({ value, onChangeText, placeholder }) => {
  const { fonts } = usePoppinsFont();
  return (
    <TextInput
      placeholder={placeholder ?? ""}
      placeholderTextColor="#b8b8b8ff"
      value={value}
      onChangeText={onChangeText}
      selectionColor={Colors.primary}
      style={{
        backgroundColor: "#fff",
        color: "#000",
        fontFamily: fonts.medium,
        fontSize: 16,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: 8,
        paddingHorizontal: 15,
        height: 50,
      }}
    />
  );
};

export default CustomInput;
