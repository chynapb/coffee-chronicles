import { Link } from 'expo-router'
import { Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Link href='/account' style={styles.link}>
        My Account
      </Link>
      <Text>Home</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    color: '#FF4500',
    fontSize: 16,
  },
})

export default Home
