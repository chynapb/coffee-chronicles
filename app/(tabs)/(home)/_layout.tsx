// app/(tabs)/(home)/layout.tsx
import { Stack } from 'expo-router'

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='account' options={{ headerShown: false }} />
    </Stack>
  )
}

export default HomeLayout
