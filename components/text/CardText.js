import usePoppinsFont from "@/hooks/usePoppinsFont";
import { Text } from "react-native";

const CardText = ({ color, ...rest }) => {
  const { fonts } = usePoppinsFont();
  return (
    <Text
      style={{
        fontFamily: fonts.medium,
        fontSize: 16,
        color: color,
      }}
      numberOfLines={1}
      {...rest}
    />
  );
};

export default CardText;
