import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome from '@expo/vector-icons/FontAwesome'

const Brew = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.brewContainer}>
          <Text>11.14.2024</Text>
          <Text>Bean: </Text>
          <Text>Brew method: </Text>
          <Text>Grinder setting: </Text>
          <Text>Time: </Text>
          <Text>
            Rating: <FontAwesome name='star-o' size={20} style={styles.star} />
            <FontAwesome name='star-o' size={20} style={styles.star} />
            <FontAwesome name='star-o' size={20} style={styles.star} />
            <FontAwesome name='star-o' size={20} style={styles.star} />
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brewContainer: {
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    width: 350,
    height: 175,
    justifyContent: 'center',
    alignItems: 'center',
  },
  star: {
    color: '#FFBF00',
  },
})

export default Brew
