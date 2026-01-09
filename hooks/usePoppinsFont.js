import { useFonts } from "expo-font";

const usePoppinsFont = () => {
  const [fontLoaded] = useFonts({
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });
  return {
    fontLoaded,
    fonts: {
      medium: fontLoaded ? "Poppins-Medium" : undefined,
      bold: fontLoaded ? "Poppins-Bold" : undefined,
    },
  };
};

export default usePoppinsFont;
