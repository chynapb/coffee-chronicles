import { Link } from 'expo-router'
import { View, StyleSheet } from 'react-native'

const Home = () => {
  return (
    <View style={styles.container}>
      <Link href='/sign-up'>Create an Account</Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Home
