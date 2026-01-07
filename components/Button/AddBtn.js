import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const AddBtn = ({ onPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: Colors.primary,
                borderRadius: 8,
                padding: 10
            }}
        >
            <Ionicons name="add" size={25} color={Colors.textPrimary} />
        </TouchableOpacity>
    );
}

export default AddBtn;