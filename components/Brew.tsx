import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import moment from 'moment'

type BrewProps = {
  id: string
  createdAt: string
  bean: string
  grinderSetting: string
  brewMethod: string
  brewTime: string
  rating: number
  deleteBrew: (id: string) => void
  duplicateBrew: (
    brewData: Omit<BrewProps, 'id' | 'deleteBrew' | 'duplicateBrew'>
  ) => void
}

const Brew = ({
  id,
  createdAt,
  bean,
  grinderSetting,
  brewMethod,
  brewTime,
  rating,
  deleteBrew,
  duplicateBrew,
}: BrewProps) => {
  const formattedCreatedAt = moment(createdAt).format('MM.DD.YYYY')
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <View key={id} style={styles.brewContainer}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <MaterialCommunityIcons
          name='dots-vertical'
          size={22}
          color='#343450'
          style={styles.dots}
        />
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType='fade'
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                duplicateBrew({
                  createdAt,
                  bean,
                  grinderSetting,
                  brewMethod,
                  brewTime,
                  rating,
                })
                setModalVisible(false)
              }}
            >
              <Text style={styles.menuText}>Duplicate</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                deleteBrew(id)
                setModalVisible(false)
              }}
            >
              <Text style={[styles.menuText, styles.deleteText]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      <View style={styles.container}>
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
    padding: 15,
    position: 'relative',
  },
  star: {
    color: '#FFBF00',
  },
  dots: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  menu: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    width: 200,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
  },
  deleteText: {
    color: '#FF4500',
    fontWeight: 'bold',
  },
})

export default Brew
