import {StyleSheet, Text, View} from "react-native";

const NewsPost = ({title, content, createdAt, theme}) => {
  const styles = StyleSheet.create({
    wrapper: {
      marginBottom: 24,
      backgroundColor: "rgba(0,0,0,0.15)",
      padding: 8,
      borderRadius: 8
    },
    title: {
      fontWeight: "bold",
      fontSize: 22,
      marginBottom: 4,
      color: theme["mainColor"]
    },
    date: {
      color: theme["mainColor"],
      fontSize: 14,
      textAlign: "right",
    },
    content: {
      fontSize: 16,
      marginBottom: 4,
      color: theme["textColor"]
    }
  });

  const formatDate = (rawDate) => {
    const newDate = new Date(rawDate)

    const year = newDate.getFullYear()
    const month = newDate.getMonth()
    const day = newDate.getDate()
    const minutes = newDate.getMinutes()
    const hours = newDate.getHours()
    return `${newDate.toLocaleTimeString()} - ${newDate.toLocaleDateString()}`
    // return `${hours}:${minutes} - ${day}/${month}/${year}`
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title} >{title}</Text>
      <Text style={styles.content}>{content}</Text>
      <Text style={styles.date} >{formatDate(createdAt)}</Text>
    </View>
  )
}



export default NewsPost
