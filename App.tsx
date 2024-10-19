import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.header}>Coffee Chronicles</Text>
        <Text style={styles.text}>Find your perfect brew</Text>
      </View>
      <StatusBar barStyle='dark-content' />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 36,
    color: '#343450',
  },
  text: {
    fontSize: 22,
    marginTop: 15,
    marginBottom: 75,
    color: '#FF4500',
    textAlign: 'center',
  },
})
