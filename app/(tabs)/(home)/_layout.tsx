import { Stack } from 'expo-router'

// app/(tabs)/(home)/layout.tsx
const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='account' options={{ headerShown: false }} />
    </Stack>
  )
}

export default HomeLayout
