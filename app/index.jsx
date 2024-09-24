import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import Feather from '@expo/vector-icons/Feather'
import { Link } from 'expo-router'

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 36 }}>Coffee Chronicles</Text>
      <Feather name='coffee' size={50} style={{ margin: 15 }} />
      <StatusBar style='auto' />
      <Link href='/home' style={styles.link}>
        Let's Brew!
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    fontSize: 24,
    margin: 50,
    color: '#FF4500',
  },
})
