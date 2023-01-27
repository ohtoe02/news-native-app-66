import {useEffect, useState} from "react";
import {getObjectData, putData} from "./app/utils/manageStoredData";
import MainActivity from "./app/components/activities/main/MainActivity";
import Splash from "./app/components/activities/splash/Splash";


export default function App() {
  const [currentTheme, setCurrentTheme] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getObjectData("theme")
      .then(data => {
        if (data != null) {
          setCurrentTheme(data)
        } else {
          fetch("https://frontappapi.dock7.66bit.ru/api/theme/get?name=light")
            .then(res => res.json())
            .then(async data => {
              setCurrentTheme(data)
              await putData("theme", JSON.stringify(data))
            })
        }
      })
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <>
      {isLoading ? <Splash/> : <MainActivity setCurrentTheme={setCurrentTheme} currentTheme={currentTheme}/>}
    </>
  );
}
