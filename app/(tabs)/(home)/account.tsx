import { Link } from 'expo-router'
import { Text, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Account = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>My Account</Text>
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
  },
})

export default Account
