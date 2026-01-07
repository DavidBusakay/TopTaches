import { TextInput } from "react-native";
import Colors from "@/constants/Colors";
import usePoppinsFont from "@/hooks/usePoppinsFont";

const CustomInput = ({ value, onChangeText }) => {
    const { fonts } = usePoppinsFont();
    return (
        <TextInput
            placeholder="Nouvelle tâche"
            placeholderTextColor="#b8b8b8ff"
            value={value}
            onChangeText={onChangeText}
            selectionColor={Colors.primary}
            style={{
                flex: 1,
                backgroundColor: "#fff",
                color: "#000",
                fontFamily: fonts.medium,
                fontSize: 16,
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "#859989ff",
                borderRadius: 8,
                paddingHorizontal: 15,
                height: 50
            }}
        />
    );
}

export default CustomInput;