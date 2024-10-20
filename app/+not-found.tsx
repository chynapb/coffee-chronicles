import { Link, Stack } from 'expo-router'
import { View, StyleSheet } from 'react-native'

export default function NotFound() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops! This page doesn't exist." }} />
      <View style={styles.container}>
        <Link href='/'>Go home</Link>
      </View>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})