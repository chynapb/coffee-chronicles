import { SafeAreaView, StatusBar, Text, View } from 'react-native'

export default function App() {
  return (
    <SafeAreaView>
      <View>
        <Text>Coffee Chronicles</Text>
        <Text>Find your perfect brew</Text>
      </View>
      <StatusBar barStyle='dark-content' />
    </SafeAreaView>
  )
}
