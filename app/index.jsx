import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import Feather from '@expo/vector-icons/Feather'
import Button from '../components/Button'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Coffee Chronicles</Text>
      <Feather name='coffee' size={50} style={styles.icon} />
      <StatusBar style='auto' />
      <Text style={styles.text}>Find your perfect brew</Text>
      <Button
        title='Sign in'
        buttonStyle={styles.buttonContainer}
        buttonText={styles.buttonText}
        handlePress={() => {}}
      />
      <Button
        title='Continue as guest'
        buttonStyle={styles.buttonContainer}
        buttonText={styles.buttonText}
        handlePress={() => {}}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 38,
    color: '#343450',
  },
  icon: {
    color: '#343450',
    margin: 10,
  },
  text: {
    fontSize: 24,
    margin: 30,
    color: '#FF4500',
    fontStyle: 'italic',
  },
  buttonContainer: {
    padding: 15,
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
