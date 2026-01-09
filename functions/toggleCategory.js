import { Vibration } from "react-native";

export default function toggleCategory(id, setCategories) {
  Vibration.vibrate(50);
  setCategories((prevCategories) =>
    prevCategories.map((item) =>
      item.id === id
        ? { ...item, selected: true }
        : { ...item, selected: false }
    )
  );
}
