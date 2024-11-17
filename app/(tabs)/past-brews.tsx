import { Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const PastBrews = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Past Brews</Text>
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
    marginTop: 25,
    fontSize: 24,
    color: '#343450',
  },
})

export default PastBrews
