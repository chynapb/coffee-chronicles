import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons'
import Button from '../../components/Button'
import { Link, useRouter } from 'expo-router'
import Form from '../../components/Form'
import { useState } from 'react'
import { UserAuth } from '../../context/AuthContext'

const SignUp = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { createUser, isLoading } = UserAuth()
  const router = useRouter()

  const handleSignUp = async (): Promise<void> => {
    try {
      await createUser(email, password)
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
      <>
        {isLoading ? (
          <ActivityIndicator size='large' color='#FF4500' />
        ) : (
          <View>
            <Text style={styles.header}>Sign up</Text>
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
              title='Sign up'
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
              onPress={handleSignUp}
            />
            <Text style={styles.text}>Already have an account?</Text>
            <Link style={styles.link} href='/sign-in'>
              Sign in
            </Link>
          </View>
        )}
      </>
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
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
  },
})

export default SignUp
