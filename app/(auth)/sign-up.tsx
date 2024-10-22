import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../../components/Button'
import { Link } from 'expo-router'

const SignIn = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.header}>Sign up</Text>
          <Button
            title='Sign in'
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
            onPress={() => {}}
          />
          <Text style={styles.text}>Already have an account?</Text>
          <Link style={styles.link} href='/sign-in'>
            Sign up
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

export default SignIn
