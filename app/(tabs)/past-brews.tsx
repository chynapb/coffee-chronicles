import { View, Text, StyleSheet } from 'react-native'

const PastBrews = () => {
  return (
    <View style={styles.container}>
      <Text>Past Brews</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default PastBrews
