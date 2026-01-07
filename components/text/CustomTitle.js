import { Text } from "react-native";
import Colors from "@/constants/Colors";
import usePoppinsFont from "@/hooks/usePoppinsFont";

const CustomTitle = ({ ...rest }) => {
    const { fonts } = usePoppinsFont();
    return <Text
        style={{
            fontFamily: fonts.bold,
            fontSize: 26,
            color: Colors.textPrimary
        }}
        { ...rest }
    />;
}

export default CustomTitle;