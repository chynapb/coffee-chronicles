import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../../components/Button'
import { Link } from 'expo-router'
import Form from '../../components/Form'
import { useState } from 'react'

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  })

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.header}>Sign up</Text>
          <Form
            title='Username'
            value={form.username}
            placeholder='Username'
            handleChangeText={(e) => setForm({ ...form, username: e })}
          />
          <Form
            title='Email'
            value={form.email}
            placeholder='Email'
            handleChangeText={(e) => setForm({ ...form, email: e })}
            keyboardType='email=address'
          />
          <Form
            title='Password'
            value={form.password}
            placeholder='Password'
            handleChangeText={(e) => setForm({ ...form, password: e })}
          />
          <Button
            title='Sign up'
            buttonStyle={styles.button}
            buttonText={styles.buttonText}
            handlePress={() => {}}
          />
          <Text style={styles.text}>Already have an account?</Text>
          <Link style={styles.link} href='/sign-in'>
            Sign in
          </Link>
        </View>
      </ScrollView>
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

export default SignUp
