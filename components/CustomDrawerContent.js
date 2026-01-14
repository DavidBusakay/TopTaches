import Colors from "@/constants/Colors";
import usePoppinsFont from "@/hooks/usePoppinsFont";
import { Ionicons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

const CustomDrawerContent = (props) => {
  const { fonts } = usePoppinsFont();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />

        <View style={styles.divider} />

        <DrawerItem
          label="Code Source"
          icon={({ color }) => (
            <Ionicons name="code-slash-outline" size={22} color={color} />
          )}
          style={{
            borderRadius: 10,
          }}
          labelStyle={{
            fontFamily: fonts.medium,
            fontSize: 16,
          }}
          onPress={() =>
            Linking.openURL("https://github.com/DavidBusakay/TopTaches")
          }
        />
      </DrawerContentScrollView>

      <Pressable
        onPress={() => Linking.openURL("https://github.com/DavidBusakay")}
        style={styles.footer}
      >
        <Text
          style={{
            fontFamily: fonts.medium,
            fontSize: 14,
            color: Colors.textSecondary,
          }}
        >
          Développé par David Busakay
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 20,
    borderStyle: "solid",
    borderTopWidth: 1,
    borderTopColor: Colors.whiteGray,
    alignItems: "center",
  },
  divider: {
    height: 1,
    backgroundColor: Colors.whiteGray,
    marginVertical: 10,
    marginHorizontal: 15,
  },
});

export default CustomDrawerContent;
