import { TouchableOpacity } from "react-native";
import Colors from "@/constants/Colors";

const CustomBtn = ({ onPress, disable, ...rest }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            disabled={disable}
            style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: Colors.primary,
                opacity: disable ? 0.5 : 1,
                borderRadius: 8,
                padding: 10
            }}
            {...rest}
        />
    );
}

export default CustomBtn;