import React, { useState } from 'react'
import {
  Alert,
  Modal as ReactModal,
  StyleSheet,
  Text,
  Pressable,
  View,
} from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons'

const AddBrew = () => {
  const [modalVisible, setModalVisible] = useState(false)
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ReactModal
          presentationStyle='fullScreen'
          animationType='slide'
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.')
            setModalVisible(!modalVisible)
          }}
        >
          <Pressable onPress={() => setModalVisible(!modalVisible)}>
            <Ionicons
              name='chevron-back'
              size={30}
              color='#FF4500'
              style={styles.backButton}
            />
          </Pressable>
          <View style={styles.container}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Add Brew Here</Text>
            </View>
          </View>
        </ReactModal>
        <Pressable onPress={() => setModalVisible(true)}>
          <Ionicons name='add-outline' size={75} color='#FF4500' />
        </Pressable>
        <Text>Add Brew</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    alignItems: 'center',
  },
  modalText: {
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 15,
  },
})

export default AddBrew
