import { Text } from "react-native";
import Colors from "@/constants/Colors";
import usePoppinsFont from "@/hooks/usePoppinsFont";

const TextPrimary = ({ ...rest }) => {
    const { fonts } = usePoppinsFont();
    return <Text
        style={{
            fontFamily: fonts.medium,
            fontSize: 16,
            color: Colors.textPrimary
        }}
        { ...rest }
    />;
}

export default TextPrimary;