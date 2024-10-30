import { Stack } from 'expo-router'
import { AuthContextProvider } from '../context/AuthContext'

const RootLayout = () => {
  return (
    <AuthContextProvider>
      <Stack>
        <Stack.Screen name='(auth)' options={{ headerShown: false }} />
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='index' options={{ headerShown: false }} />
      </Stack>
    </AuthContextProvider>
  )
}

export default RootLayout
