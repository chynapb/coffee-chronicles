import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import AntDesign from '@expo/vector-icons/AntDesign'
import moment from 'moment'

type BrewProps = {
  id: string
  createdAt: string
  bean: string
  grinderSetting: string
  brewMethod: string
  brewTime: string
  rating: number
}

const Brew = ({
  id,
  createdAt,
  bean,
  grinderSetting,
  brewMethod,
  brewTime,
  rating,
}: BrewProps) => {
  const formattedCreatedAt = moment(createdAt).format('MM.DD.YYYY')

  return (
    <View key={id} style={styles.brewContainer}>
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
      <Text style={styles.header}>{formattedCreatedAt}</Text>
      <Text style={styles.detail}>
        <Text style={styles.bold}>Bean:</Text> {bean}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.bold}>Grinder setting:</Text> {grinderSetting}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.bold}>Brew method:</Text> {brewMethod}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.bold}>Brew time:</Text> {brewTime}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.bold}>Rating:</Text>
        {[...Array(5)].map((_, index) => (
          <FontAwesome
            key={index}
            name={index < rating ? 'star' : 'star-o'}
            size={20}
            style={styles.star}
          />
        ))}
      </Text>
    </View>
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
