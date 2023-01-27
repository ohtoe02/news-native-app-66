import {NavigationContainer, useNavigationContainerRef} from "@react-navigation/native";
import News from "../../screens/news/News";
import Themes from "../../screens/themes/Themes";
import BottomMenu from "../../ui/bottom-menu/BottomMenu";
import {StatusBar} from "expo-status-bar";
import {putData} from "../../../utils/manageStoredData";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useEffect, useState} from "react";
import {Button} from "react-native";
import {Ionicons} from "@expo/vector-icons";

const MainActivity = ({setCurrentTheme, currentTheme}) => {
  const [currentRoute, setCurrentRoute] = useState(undefined)


  useEffect(() => {
    setCurrentRoute(navRef.getCurrentRoute()?.name)

    const listener = navRef.addListener("state", () => setCurrentRoute(navRef.getCurrentRoute()?.name))

    return () => {
      navRef.removeListener("state", listener)
    }
  }, [])

  const updateTheme = async (theme) => {
    setCurrentTheme(theme)
    await putData("theme", JSON.stringify(theme))
  }

  const navRef = useNavigationContainerRef()

  const Stack = createNativeStackNavigator();

  return (<>
    <NavigationContainer ref={navRef}>
      <Stack.Navigator
        initialRouteName="News"
        screenOptions={{
          headerTitleAlign: "center",
          headerBackButtonMenuEnabled: false,
          headerStyle: {backgroundColor: currentTheme === {} ? "#f4511e" : currentTheme["mainColor"]},
          headerTitleStyle: {color: currentTheme === {} ? "#FFF" : currentTheme["textColor"]},
          animationDuration: 50,
          headerLeft: () => <></>,
        }}
      >
        <Stack.Screen
          name={"News"}
          options={{
            title: "Новости",
            animation: "slide_from_left",
            headerRight: () => (
              <Ionicons name="refresh-circle-outline" size={32} color={currentTheme["secondColor"]} />
            )
          }}
        >
          {(props) => <News {...props} currentTheme={currentTheme}/>}
        </Stack.Screen>
        <Stack.Screen
          name={"Themes"}
          options={{
            title: "Темы",
            animation: "slide_from_right",
          }}
        >
          {(props) => <Themes {...props} changeTheme={updateTheme} currentTheme={currentTheme}/>}

        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    <BottomMenu nav={navRef.navigate} currentRoute={currentRoute} currentTheme={currentTheme}/>
    <StatusBar style="auto"/>
  </>)
}

export default MainActivity
