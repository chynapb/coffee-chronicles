import { View, Text, StyleSheet } from 'react-native'

const TopBrews = () => {
  return (
    <View style={styles.container}>
      <Text>Top Brews</Text>
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

export default TopBrews
