import { StyleSheet, View } from "react-native";
import CustomTitle from "@/components/text/CustomTitle";
import Colors from "@/constants/Colors";

const HeaderApp = ({ title }) => {
    return (
        <View style={styles.wrapper}>
            <CustomTitle>{title}</CustomTitle>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginVertical: 20
    }
});

export default HeaderApp;