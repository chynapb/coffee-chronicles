import { Text, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../../../components/Button'
import { UserAuth } from '../../../context/AuthContext'
import { router } from 'expo-router'

const Account = () => {
  const { user, logout, isLoading } = UserAuth()

  const handleSignOut = async (): Promise<void> => {
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
      <Ionicons
        style={styles.backButton}
        name='chevron-back'
        size={30}
        color='#343450'
        onPress={() => router.back()}
      />
      {isLoading ? (
        <ActivityIndicator size='large' color='#FF4500' />
      ) : (
        <>
          <Text>My Account</Text>
          <Text>Signed in as {user?.email}</Text>
          <Text>Brews logged:</Text>
          <Button
            title='Sign out'
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
            onPress={handleSignOut}
          />
        </>
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
  link: {
    color: '#FF4500',
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
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
  },
})

export default Account
