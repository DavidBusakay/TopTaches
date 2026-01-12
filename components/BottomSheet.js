import Colors from "@/constants/Colors";
import usePoppinsFont from "@/hooks/usePoppinsFont";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

const BottomSheet = ({ ref, list, onPress }) => {
  const { fonts } = usePoppinsFont();
  return (
    <RBSheet
      ref={ref}
      draggable={true}
      closeOnPressMask={true}
      height={300}
      customStyles={{
        wrapper: {
          backgroundColor: "transparent",
        },
        container: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: Colors.primary,
        },
        draggableIcon: {
          backgroundColor: Colors.textWhite,
        },
      }}
      customModalProps={{
        animationType: "slide",
        statusBarTranslucent: true,
      }}
    >
      <View style={styles.sheetContent}>
        <Text
          style={{
            fontFamily: fonts.bold,
            fontSize: 18,
            color: Colors.textWhite,
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          Filtrer par :
        </Text>

        {list.map((item, key) => (
          <TouchableOpacity
            key={key}
            activeOpacity={0.9}
            style={styles.filterOption}
            onPress={() => {
              onPress(item);
              ref.current?.close();
            }}
          >
            <Ionicons name={item.icon} size={25} color={Colors.textWhite} />
            <Text
              style={{
                fontFamily: fonts.medium,
                fontSize: 16,
                color: Colors.textWhite,
                textAlign: "center",
              }}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  sheetContent: {
    padding: 20,
  },
  filterOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.whiteGray,
  },
});

export default BottomSheet;
