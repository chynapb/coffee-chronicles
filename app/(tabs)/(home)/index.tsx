import { Link, router } from 'expo-router'
import { Text, StyleSheet, ActivityIndicator } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { UserAuth } from '../../../context/AuthContext'
import AddBrew from '../../../components/AddBrew'

const Home = () => {
  const { user, isLoading } = UserAuth()

  return (
    <SafeAreaView style={styles.container}>
      <>
        {isLoading ? (
          <ActivityIndicator size='large' color='#FF4500' />
        ) : (
          <>
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
              <>
                <Text>Have an account?</Text>
                <Link push href='/sign-in' style={styles.signInLink}>
                  Sign in
                </Link>
              </>
            )}
          </>
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
  accountButton: {
    position: 'absolute',
    top: 65,
    right: 20,
  },
  signInLink: {
    color: '#FF4500',
    fontSize: 16,
  },
})

export default Home
