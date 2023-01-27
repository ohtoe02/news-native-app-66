import {Pressable} from "react-native";
import {Ionicons} from "@expo/vector-icons";

const Menuitem = ({title, icon, nav, currentRoute, currentTheme}) => {
  const isActive = currentRoute === title

  return (
    <Pressable style={{flex: 1, alignItems: "center"}} onPress={() => nav(title)}>
      <Ionicons
        name={icon}
        size={36}
        color={isActive ? currentTheme["textColor"] : currentTheme["secondColor"]}
      />
    </Pressable>
  )
}

export default Menuitem
