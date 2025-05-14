import { Stack, useNavigation } from 'expo-router'
import { AuthContextProvider } from '../context/AuthContext'
import { Pressable } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

const RootLayout = () => {
  return (
    <AuthContextProvider>
      <Stack>
        <Stack.Screen name='(auth)' options={{ headerShown: false }} />
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen
          name='search'
          options={{
            headerTitleStyle: {
              fontSize: 20,
              color: '#343450',
            },
            headerLeft: () => {
              const navigation = useNavigation()
              return (
                <Pressable onPress={() => navigation.goBack()}>
                  <Ionicons name='chevron-back' size={30} color='#FF4500' />
                </Pressable>
              )
            },
            headerTintColor: '#343450',
            headerTitleAlign: 'center',
          }}
        />
      </Stack>
    </AuthContextProvider>
  )
}

export default RootLayout
