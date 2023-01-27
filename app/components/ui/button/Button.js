import {Pressable, Text} from "react-native";

const Button = ({title, btnStyle, textStyle, onPress}) => {
  return <Pressable
    style={{backgroundColor: "#0095f8", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8, margin: 4, ...btnStyle}}
    onPress={onPress}
  >
    <Text
      style={{
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        ...textStyle
    }}
    >
      {title}
    </Text>
  </Pressable>
}

export default Button
