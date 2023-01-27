import {ActivityIndicator, StyleSheet, View} from "react-native";

const Splash = () => {
  return (
    <View style={styles.splash}>
      <ActivityIndicator size="large" />
    </View>)
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Splash
