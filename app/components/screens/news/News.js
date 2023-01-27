import {ActivityIndicator, Button, FlatList, RefreshControl, SafeAreaView, ScrollView, Text, View} from "react-native";
import {useCallback, useEffect, useState} from "react";
import NewsPost from "./NewsPost";
import {Ionicons} from "@expo/vector-icons";

const News = ({navigation, currentTheme}) => {
  const [news, setNews] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)
  const [isEnd, setIsEnd] = useState(false)

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons name="refresh-circle-outline" size={32} color={currentTheme["secondColor"]}
                  onPress={() => updateNews()}/>
      )
    })
    fetchNews()
  }, [])

  useEffect(() => {
    fetchNews()
  }, [currentPage])

  const fetchNews = () => {
    setRefreshing(true)
    fetch(`https://frontappapi.dock7.66bit.ru/api/news/get?page=${currentPage}&count=10`)
      .then(res => res.json())
      .then(data => {
        if (currentPage !== 1) {
          setNews([...news, ...data])
        }
        else {
          setNews(data)
        }
        if (data.length === 0) {
          setIsEnd(true)
        }
      })
      .finally(() => {
        setRefreshing(false)
        setIsLoading(false)
      })
  }

  const fetchMoreNews = () => {
    if (!refreshing || !isEnd) {
      setCurrentPage(currentPage + 1)
    }
  }

  const updateNews = async () => {
    if (currentPage !== 1) {
      setCurrentPage(1)
    } else {
      fetchNews()
    }
  }

  const renderFooter = () => (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 40
    }}>
      {refreshing && <ActivityIndicator size={"large"}/>}
      {isEnd && <Text>No more articles at the moment</Text>}
    </View>
  )

  const renderEmpty = () => (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Text>No Data at the moment</Text>
      <Button onPress={() => fetchMoreNews()} title='Refresh'/>
    </View>
  )

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: currentTheme["secondColor"]}}>
      {isLoading
        ? <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}><ActivityIndicator size={"large"}/></View>
        : <FlatList
          style={{padding: 16}}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={updateNews}/>}
          data={news}
          contentContainerStyle={{flexGrow: 1}}
          keyExtractor={(item, index) => index}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          renderItem={({item}) => (
            <NewsPost {...item} theme={currentTheme}/>)}
          onEndReachedThreshold={0.2}
          onEndReached={fetchMoreNews}
        >
          {/*{news.map((item, idx) => (*/}
          {/*  <NewsPost key={idx} title={item["title"]} content={item["content"]} date={item["createdAt"]}/>))}*/}
        </FlatList>}
    </SafeAreaView>
  )
}

export default News
