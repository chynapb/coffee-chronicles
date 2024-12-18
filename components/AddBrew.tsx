import React from 'react'
import { useState } from 'react'
import {
  Modal as ReactModal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Button from './Button'
import { getAuth } from 'firebase/auth'
import { collection, doc, setDoc } from 'firebase/firestore'
import { FIREBASE_DB } from '../firebaseConfig'
import AsyncStorage from '@react-native-async-storage/async-storage'

type BrewData = {
  bean: string
  roaster: string
  grinder: string
  grinderSetting: string
  brewMethod: string
  waterRatio: string
  waterTemp: string
  recipe: string
  // rating: tbd
  notes: string
}

const placeholders: Record<string, string> = {
  grinderSetting: 'Grinder Setting',
  brewMethod: 'Brew Method',
  waterRatio: 'Water Ratio',
  waterTemp: 'Water Temp',
}

const AddBrew = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [brewData, setBrewData] = useState<BrewData>({
    bean: '',
    roaster: '',
    grinder: '',
    grinderSetting: '',
    brewMethod: '',
    waterRatio: '',
    waterTemp: '',
    recipe: '',
    // rating: tbd
    notes: '',
  })

  const handleChange = (field: keyof BrewData, value: string) => {
    setBrewData((prevState) => ({
      ...prevState,
      [field]: value,
    }))
  }

  const handleSaveBrew = async () => {
    try {
      const isValid = Object.values(brewData).every(
        (value) => typeof value === 'string' && value.trim() !== ''
      )

      if (!isValid) {
        Alert.alert('Error', 'Please fill out all fields.')
        return
      }

      // Get user ID
      let userId = getAuth().currentUser?.uid

      // Get guest ID if not logged in
      if (!userId) {
        userId = await getGuestId()
      }

      // Get brew ID
      const brewId = `brew-${Date.now()}`
      const brewRef = doc(
        collection(FIREBASE_DB, `users/${userId}/brews`),
        brewId
      )

      await setDoc(brewRef, {
        ...brewData,
        createdAt: new Date().toISOString(),
      })

      Alert.alert('Success', 'Brew saved!')
      setBrewData({
        bean: '',
        roaster: '',
        grinder: '',
        grinderSetting: '',
        brewMethod: '',
        waterRatio: '',
        waterTemp: '',
        recipe: '',
        // rating: tbd
        notes: '',
      })
      setModalVisible(!modalVisible)
    } catch (error) {
      console.error('Error saving brew: ', error)
      Alert.alert('Error', 'Failed to save brew. Please try again')
    }
  }

  // Create or retrieve guest ID
  const getGuestId = async (): Promise<string> => {
    try {
      // Check if guest ID exists
      const storedGuestId = await AsyncStorage.getItem('guestID')
      if (storedGuestId) {
        return storedGuestId
      }

      // If no ID, generate new one
      const timestamp = Date.now()
      const randomSuffix = Math.random().toString(36).substring(2, 8)
      const newGuestId = `guest-${timestamp}-${randomSuffix}`

      // Save guest ID to storage
      await AsyncStorage.setItem('guestID', newGuestId)
      return newGuestId
    } catch (error) {
      console.error('Error getting or setting guest ID:', error)
      throw new Error('Could not generate guest ID')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ReactModal
        presentationStyle='fullScreen'
        animationType='slide'
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Pressable onPress={() => setModalVisible(!modalVisible)}>
            <Ionicons
              name='chevron-back'
              size={30}
              color='#FF4500'
              style={styles.backButton}
            />
          </Pressable>
          <View style={styles.container}>
            <Text style={styles.header}>Brew Details</Text>
            <View style={styles.inputContainer}>
              {Object.keys(brewData).map((field) => (
                // <>
                //   <Text style={styles.inputTitle}>{field}</Text>
                <TextInput
                  key={field}
                  style={styles.input}
                  placeholder={
                    placeholders[field] ||
                    field.charAt(0).toUpperCase() + field.slice(1)
                  }
                  value={brewData[field as keyof BrewData]}
                  onChangeText={(value) =>
                    handleChange(field as keyof BrewData, value)
                  }
                />
                // </>
              ))}
              {/* <Text style={styles.inputTitle}>Bean</Text>
              <TextInput
                style={styles.input}
                placeholder='Ex: Ethiopia Chelbesa'
                placeholderTextColor='#979a9a'
              />
              <Text style={styles.inputTitle}>Roaster</Text>
              <TextInput
                style={styles.input}
                placeholder='Ex: Onyx Coffee'
                placeholderTextColor='#979a9a'
              />
              <Text style={styles.inputTitle}>Grinder</Text>
              <TextInput
                style={styles.input}
                placeholder='Ex: Comandante C40'
                placeholderTextColor='#979a9a'
              />
              <Text style={styles.inputTitle}>Grinder setting</Text>
              <TextInput
                style={styles.input}
                placeholder='Ex: 20 clicks'
                placeholderTextColor='#979a9a'
              />
              <Text style={styles.inputTitle}>Brew method</Text>
              <TextInput
                style={styles.input}
                placeholder='Ex: V60'
                placeholderTextColor='#979a9a'
              />
              <Text style={styles.inputTitle}>Water ratio</Text>
              <TextInput
                style={styles.input}
                placeholder='Ex: 16:1'
                placeholderTextColor='#979a9a'
              />
              <Text style={styles.inputTitle}>Water temperature</Text>

              <TextInput
                style={styles.input}
                placeholder='Ex: 205 F'
                placeholderTextColor='#979a9a'
              />
              <Text style={styles.inputTitle}>Recipe</Text>
              <TextInput
                style={styles.input}
                placeholder='Ex: Tetsu 4:6 method'
                placeholderTextColor='#979a9a'
              />
              <Text style={styles.inputTitle}>Rating</Text>
              <View style={styles.ratingContainer}>
                <FontAwesome name='star-o' size={35} style={styles.star} />
                <FontAwesome name='star-o' size={35} style={styles.star} />
                <FontAwesome name='star-o' size={35} style={styles.star} />
                <FontAwesome name='star-o' size={35} style={styles.star} />
                <FontAwesome name='star-o' size={35} style={styles.star} />
              </View>
              <Text style={styles.inputTitle}>Notes</Text>
              <TextInput
                multiline
                style={styles.notesInput}
                placeholder='Ex: Slighty sour finish - try grinding finer.'
                placeholderTextColor='#979a9a'
              /> */}
              <Button
                title='Add Brew'
                textStyle={styles.buttonText}
                buttonStyle={styles.button}
                onPress={handleSaveBrew}
              />
            </View>
          </View>
        </ScrollView>
      </ReactModal>
      <Pressable onPress={() => setModalVisible(true)}>
        <Ionicons name='add-outline' size={75} color='#FF4500' />
      </Pressable>
      <Text style={styles.inputTitle}>New Brew</Text>
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
    marginBottom: 35,
    fontSize: 24,
    color: '#343450',
  },
  inputContainer: {
    alignItems: 'center',
    padding: 10,
  },
  inputTitle: {
    fontSize: 16,
    color: '#343450',
  },
  input: {
    width: 225,
    height: 40,
    marginTop: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#979a9a',
    padding: 10,
    paddingRight: 40,
  },
  ratingContainer: {
    marginTop: 5,
    marginBottom: 15,
    flexDirection: 'row',
  },
  star: {
    marginHorizontal: 3,
    color: '#FFBF00',
  },
  notesInput: {
    width: 225,
    margin: 5,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#979a9a',
    padding: 10,
    paddingRight: 40,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 15,
  },
  button: {
    padding: 12,
    backgroundColor: '#FF4500',
    borderRadius: 50,
    margin: 10,
    width: 225,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#F2F3F4',
    fontSize: 14,
    fontWeight: 'bold',
  },
})

export default AddBrew
