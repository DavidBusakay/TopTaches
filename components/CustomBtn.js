import Colors from "@/constants/Colors";
import { TouchableOpacity } from "react-native";

const CustomBtn = ({ onPress, disable, ...rest }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      disabled={disable}
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: disable ? Colors.textSecondary : Colors.primary,
        borderRadius: 10,
        padding: 10,
      }}
      {...rest}
    />
  );
};

export default CustomBtn;
