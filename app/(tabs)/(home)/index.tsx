import { Link, router } from 'expo-router'
import { Text, StyleSheet, Alert, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { UserAuth } from '../../../context/AuthContext'
import Button from '../../../components/Button'

const Home = () => {
  const { user, logout } = UserAuth()

  const handleLogout = async (): Promise<void> => {
    try {
      await logout()
      router.replace('/(home)')
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert('Sign up error: ', error.message)
      } else {
        Alert.alert('An unknown error occurred. Please try again later.')
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Add Brew</Text>
      {user ? (
        <>
          <Button
            title='Logout'
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
            onPress={handleLogout}
          />
          <Link href='/account' style={styles.accountLink}>
            Account
          </Link>
        </>
      ) : (
        <Link href='/sign-in' style={styles.accountLink}>
          Sign in
        </Link>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountLink: {
    color: '#FF4500',
    fontSize: 16,
    // position: 'absolute',
    // top: 10,
    // right: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#FF4500',
    borderRadius: 50,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#F2F3F4',
    fontSize: 16,
  },
})

export default Home
