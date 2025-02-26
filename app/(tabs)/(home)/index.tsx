import { Link, router } from 'expo-router'
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  TextInput,
} from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { UserAuth } from '../../../context/AuthContext'
import AddBrew from '../../../components/AddBrew'
import React, { useState } from 'react'

const Home = () => {
  const { user, isLoading } = UserAuth()
  const [query, setQuery] = useState<string>('')

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size='large' color='#FF4500' />
      ) : (
        <>
          <TextInput
            style={styles.input}
            value={query}
            onChangeText={setQuery}
            placeholder='Search your brews...'
          />
          <AddBrew />
          {user ? (
            <MaterialIcons
              style={styles.accountButton}
              name='account-circle'
              size={40}
              color='#343450'
              onPress={() => router.push('/account')}
            />
          ) : (
            <View style={styles.linkContainer}>
              <Text>Have an account?</Text>
              <Link push href='/sign-in' style={styles.signInLink}>
                Sign in
              </Link>
            </View>
          )}
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
  accountButton: {
    position: 'absolute',
    top: 65,
    left: 20,
  },
  input: {
    position: 'absolute',
    top: 125,
    width: 275,
    height: 40,
    marginTop: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#979a9a',
    backgroundColor: '#ffffff',
    padding: 10,
    paddingRight: 40,
  },
  linkContainer: {
    textAlign: 'center',
    alignItems: 'center',
  },
  signInLink: {
    color: '#FF4500',
    fontSize: 16,
  },
})

export default Home
