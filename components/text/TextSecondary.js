import { Text } from "react-native";
import Colors from "@/constants/Colors";
import usePoppinsFont from "@/hooks/usePoppinsFont";

const TextSecondary = ({ ...rest }) => {
    const { fonts } = usePoppinsFont();
    return <Text
        style={{
            fontFamily: fonts.medium,
            fontSize: 16,
            color: Colors.textSecondary
        }}
        { ...rest }
    />;
}

export default TextSecondary;