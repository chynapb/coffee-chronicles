import { SafeAreaView, StyleSheet, Text, View, StatusBar } from 'react-native'
import { router } from 'expo-router'
import Button from '../components/Button'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.header}>Coffee Chronicles</Text>
        <Text style={styles.text}>Find your perfect brew</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title='Sign in'
          textStyle={styles.buttonText}
          buttonStyle={styles.button}
          onPress={() => router.push('/sign-in')}
        />
        <Button
          title='Continue as guest'
          textStyle={styles.buttonText}
          buttonStyle={styles.button}
          onPress={() => router.push('/(home)')}
        />
      </View>
      <StatusBar barStyle='dark-content' />
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
  },
  text: {
    fontSize: 22,
    marginTop: 15,
    marginBottom: 75,
    color: '#FF4500',
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  button: {
    padding: 18,
    backgroundColor: '#FF4500',
    borderRadius: 50,
    margin: 5,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#F2F3F4',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
