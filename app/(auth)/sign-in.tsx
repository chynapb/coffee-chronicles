import { View, Text, StyleSheet, Alert, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../../components/Button'
import Form from '../../components/Form'
import { useState } from 'react'
import { Link, useRouter } from 'expo-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FIREBASE_AUTH } from '../../firebaseConfig'

const SignIn = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const router = useRouter()

  const handleSignIn = async (): Promise<void> => {
    try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
      router.replace('/(home)')
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert('Sign in error: ', error.message)
      } else {
        Alert.alert('An unknown error occurred. Please try again later.')
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.header}>Sign in</Text>
        <Form
          title='Email'
          value={email}
          onChangeText={setEmail}
          placeholder='Email address'
        />
        <Form
          title='Password'
          value={password}
          onChangeText={setPassword}
          placeholder='Password'
        />
        <Button
          title='Sign in'
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          onPress={handleSignIn}
        />
        <Text style={styles.text}>Don't have an account?</Text>
        <Link style={styles.link} href='/sign-up'>
          Sign up
        </Link>
      </View>
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
    textAlign: 'center',
    margin: 25,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: '#343450',
  },
  link: {
    textAlign: 'center',
    color: '#FF4500',
    fontSize: 16,
  },
  button: {
    padding: 15,
    backgroundColor: '#FF4500',
    borderRadius: 50,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#F2F3F4',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default SignIn
