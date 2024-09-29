import { SafeAreaView, StyleSheet, Text, View, StatusBar } from 'react-native'
import { router } from 'expo-router'
import Feather from '@expo/vector-icons/Feather'
import Button from '../components/Button'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Coffee Chronicles</Text>
        <Feather name='coffee' size={50} style={styles.icon} />
        <Text style={styles.text}>Find your perfect brew</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title='Sign in'
          buttonStyle={styles.button}
          buttonText={styles.buttonText}
          handlePress={() => router.push('/sign-in')}
        />
        <Button
          title='Continue as guest'
          buttonStyle={styles.button}
          buttonText={styles.buttonText}
          handlePress={() => router.push('/home')}
        />
      </View>
      <StatusBar barStyle='dark' />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 40,
    color: '#343450',
  },
  icon: {
    color: '#343450',
    margin: 10,
  },
  text: {
    fontSize: 24,
    marginTop: 25,
    marginBottom: 75,
    color: '#FF4500',
    fontStyle: 'italic',
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
