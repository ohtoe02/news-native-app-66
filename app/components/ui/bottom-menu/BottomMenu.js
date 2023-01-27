import {StyleSheet, View} from "react-native";
import {menuItems} from "../../../utils/constants";
import MenuItem from "./MenuItem";

const BottomMenu = (props) => {
  const styles = StyleSheet.create({
    bottomMenu: {
      bottom: 0,
      width: "100%",
      display: "flex",
      flexDirection: "row",
      backgroundColor: props.currentTheme["mainColor"],
      justifyContent: "space-around",
      borderTopWidth: 1,
      borderTopColor: props.currentTheme["secondColor"],
      paddingVertical: 16,
    },
  });

  return (
    <View style={styles.bottomMenu}>
      <MenuItem icon={menuItems[0].icon} title={menuItems[0].title} {...props} />
      <MenuItem icon={menuItems[1].icon} title={menuItems[1].title} {...props} />
    </View>
  )
}



export default BottomMenu
