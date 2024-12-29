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
import { saveBrew } from '../services/firestore/brewsService'
import { BrewData } from '../types/BrewData'

const placeholders: Record<string, string> = {
  grinderSetting: 'Grinder setting',
  brewMethod: 'Brew method',
  waterRatio: 'Water ratio',
  waterTemp: 'Water temp',
  brewTime: 'Brew time',
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
    waterTemp: 0,
    recipe: '',
    brewTime: '',
    rating: 0,
    notes: '',
  })

  const handleChange = (field: keyof BrewData, value: string) => {
    if (field === 'rating') {
      const parsedRating = parseFloat(value)
      setBrewData((prevState) => ({
        ...prevState,
        [field]: isNaN(parsedRating) ? 0 : parsedRating,
      }))
    } else {
      setBrewData((prevState) => ({
        ...prevState,
        [field]: value,
      }))
    }
  }

  const handleStarPress = (selectedRating: number) => {
    setBrewData((prevState) => ({
      ...prevState,
      rating: selectedRating,
    }))
  }

  const handleSaveBrew = async (): Promise<void> => {
    try {
      if (!brewData.rating) {
        Alert.alert('Error', 'Please select a rating.')
        return
      }

      // Validate required fields
      const requiredFields = [
        'bean',
        'grinderSetting',
        'brewMethod',
        'brewTime',
        'rating',
      ]

      const missingField = requiredFields.find(
        (field) => !brewData[field as keyof BrewData]?.toString().trim()
      )

      if (missingField) {
        Alert.alert('Error', `Please fill out all required fields.`)
        return
      }

      await saveBrew(brewData)

      Alert.alert('Success', 'Brew saved!')
      setBrewData({
        bean: '',
        roaster: '',
        grinder: '',
        grinderSetting: '',
        brewMethod: '',
        waterRatio: '',
        waterTemp: 0,
        recipe: '',
        brewTime: '',
        rating: 0,
        notes: '',
      })
      setModalVisible(false)
    } catch (error) {
      console.error('Error saving brew: ', error)
      Alert.alert('Error', 'Failed to save brew. Please try again.')
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
              {Object.keys(brewData)
                .filter((field) => field !== 'rating')
                .map((field) => (
                  <TextInput
                    key={field}
                    style={styles.input}
                    placeholder={
                      placeholders[field] ||
                      field.charAt(0).toUpperCase() + field.slice(1)
                    }
                    placeholderTextColor='#979a9a'
                    value={
                      field === 'waterTemp' &&
                      brewData[field as keyof BrewData] === 0
                        ? ''
                        : brewData[field as keyof BrewData]?.toString() || ''
                    }
                    onChangeText={(value) =>
                      handleChange(field as keyof BrewData, value)
                    }
                  />
                ))}
              <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Pressable key={star} onPress={() => handleStarPress(star)}>
                    <FontAwesome
                      name={brewData.rating >= star ? 'star' : 'star-o'}
                      size={35}
                      style={styles.star}
                      color={brewData.rating >= star ? '#FFD700' : '#C0C0C0'}
                    />
                  </Pressable>
                ))}
              </View>
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
