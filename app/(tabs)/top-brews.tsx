import { Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const TopBrews = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Top Brews</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    margin: 25,
    fontSize: 24,
    color: '#343450',
  },
})

export default TopBrews
