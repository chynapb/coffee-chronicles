import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import AntDesign from '@expo/vector-icons/AntDesign'

const Brew = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.brewContainer}>
          <AntDesign
            name='edit'
            size={22}
            color='#343450'
            style={styles.edit}
            onPress={() => console.log('Edit brew')}
          />
          <AntDesign
            name='delete'
            size={22}
            color='#343450'
            style={styles.delete}
            onPress={() => console.log('Deleted')}
          />
          <Text style={styles.header}>11.14.2024</Text>
          <Text style={styles.detail}>
            <Text style={styles.bold}>Bean:</Text> Ethiopia
          </Text>
          <Text style={styles.detail}>
            <Text style={styles.bold}>Brew method:</Text> V60
          </Text>
          <Text style={styles.detail}>
            <Text style={styles.bold}>Grinder setting:</Text> 60 clicks
          </Text>
          <Text style={styles.detail}>
            <Text style={styles.bold}>Brew time:</Text> 2:45
          </Text>
          <Text style={styles.detail}>
            <Text style={styles.bold}>Rating:</Text>
            <FontAwesome name='star-o' size={20} style={styles.star} />
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
  edit: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  delete: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  bold: {
    fontWeight: 'bold',
    color: '#343450',
  },
  header: {
    marginBottom: 8,
    fontSize: 20,
    color: '#343450',
  },
  detail: {
    color: '#343450',
    marginVertical: 1,
  },
  brewContainer: {
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 15,
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
