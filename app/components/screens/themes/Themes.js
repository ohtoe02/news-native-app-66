import {SafeAreaView, View} from "react-native";
import {useEffect, useState} from "react";
import Button from "../../ui/button/Button";

const themesList = [
  {
    title: "Темная тема",
    id: "dark",
    btnTextColor: "rgb(209, 187, 46)",
    btnBgColor: "rgb(25, 25, 25)",
  },
  {
    title: "Светлая тема",
    id: "light",
    btnTextColor: "rgb(10, 10, 10)",
    btnBgColor: "rgb(206, 240, 227)",
  },
  {
    title: "Синяя тема",
    id: "blue",
    btnTextColor: "rgb(201, 201, 201)",
    btnBgColor: "rgb(34, 22, 105)",
  },
]

const Themes = ({navigation, changeTheme, currentTheme}) => {

  const fetchTheme = async (name) => {
    fetch(`https://frontappapi.dock7.66bit.ru/api/theme/get?name=${name}`)
      .then((res) => res.json())
      .then(async (data) => {
        changeTheme(data)
      })
      .catch((error) => {
        console.error(`An error occurred: ${error}`)
      })
  }

  return (
    <SafeAreaView style={{flex: 1, alignItems: "center", justifyContent: "center" , backgroundColor: currentTheme["secondColor"]}}>
      {themesList.map((item) => (
        <Button key={item.id} title={item.title} btnStyle={{backgroundColor: item.btnBgColor, paddingVertical: 16, marginBottom: 32, width: "75%"}} textStyle={{color: item.btnTextColor, fontSize: 28}} onPress={() => fetchTheme(item.id)}/>
      ))}
    </SafeAreaView>
  )
}

export default Themes
