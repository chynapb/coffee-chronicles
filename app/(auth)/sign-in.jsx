import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../../components/Button'
import { router } from 'expo-router'
import Form from '../../components/Form'

const SignIn = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.header}>Sign In</Text>
          <Form />
          <Text style={styles.text}>Don't have an account?</Text>
          <Button
            title='Sign Up'
            buttonStyle={styles.button}
            buttonText={styles.buttonText}
            handlePress={() => router.push('/sign-up')}
          />
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
    fontSize: 16,
    color: '#343450',
  },
  button: {
    padding: 18,
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
