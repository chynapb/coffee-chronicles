import { Link, useRouter } from 'expo-router'
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  TextInput,
} from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Ionicons from '@expo/vector-icons/Ionicons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { UserAuth } from '../../../context/AuthContext'
import AddBrew from '../../../components/AddBrew'
import React, { useState } from 'react'

const Home = () => {
  const { user, isLoading } = UserAuth()
  const [query, setQuery] = useState<string>('')
  const router = useRouter()

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size='large' color='#FF4500' />
      ) : (
        <>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.input}
              value={query}
              onChangeText={setQuery}
              placeholder='Search your brews...'
            />
            <Ionicons
              name='search'
              size={24}
              color='#343450'
              style={styles.searchIcon}
              onPress={() => {
                if (query.trim()) {
                  router.push(`/search?q=${query}`)
                }
              }}
            />
          </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 125,
    width: 275,
    height: 40,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#979a9a',
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
  },
  accountButton: {
    position: 'absolute',
    top: 65,
    left: 20,
  },
  searchIcon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    height: '100%',
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
