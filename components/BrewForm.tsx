import React, { useState } from 'react'
import {
  View,
  TextInput,
  Button,
  Alert,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native'
import { BrewData } from '../types/BrewData'
import { FIREBASE_DB } from '../firebaseConfig'
import { getUserId } from '../services/firestore/brewsService'
import { collection, doc, addDoc, setDoc, getDoc } from 'firebase/firestore'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'

type BrewFormProps = {
  initialData?: Partial<BrewData>
}

const BrewForm: React.FC<BrewFormProps> = ({ initialData }) => {
  const navigation = useNavigation()

  const [brewData, setBrewData] = useState<BrewData>({
    id: '',
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
    ...initialData,
  })

  const handleChange = (field: keyof BrewData, value: string) => {
    setBrewData((prev) => ({
      ...prev,
      [field]:
        field === 'rating' || field === 'waterTemp'
          ? parseFloat(value) || 0
          : value,
    }))
  }

  const handleStarPress = (rating: number) => {
    setBrewData((prev) => ({ ...prev, rating }))
  }

  const handleSaveBrew = async () => {
    try {
      if (!brewData.rating) {
        Alert.alert('Error', 'Please select a rating.')
        return
      }

      const userId = await getUserId()

      if (!userId) {
        Alert.alert('Error', 'User not logged in.')
        return
      }

      const userBrewsRef = collection(FIREBASE_DB, 'users', userId, 'brews')

      if (brewData.id) {
        const docRef = doc(FIREBASE_DB, 'users', userId, 'brews', brewData.id)

        const existingSnap = await getDoc(docRef)
        const existingData = existingSnap.exists() ? existingSnap.data() : {}

        await setDoc(docRef, {
          ...existingData,
          ...brewData,
          updatedAt: new Date().toISOString(),
        })
      } else {
        await addDoc(userBrewsRef, {
          ...brewData,
          createdAt: new Date().toISOString(),
        })
      }

      Alert.alert('Success', 'Brew saved!')
      navigation.goBack()
    } catch (err) {
      console.error('Error saving brew:', err)
      Alert.alert('Error', 'Could not save brew.')
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Bean:</Text>
      <TextInput
        value={brewData.bean}
        onChangeText={(val) => handleChange('bean', val)}
        style={styles.input}
      />

      <Text style={styles.label}>Roaster:</Text>
      <TextInput
        value={brewData.roaster}
        onChangeText={(val) => handleChange('roaster', val)}
        style={styles.input}
      />

      <Text style={styles.label}>Grinder:</Text>
      <TextInput
        value={brewData.grinder}
        onChangeText={(val) => handleChange('grinder', val)}
        style={styles.input}
      />

      <Text style={styles.label}>Grinder Setting:</Text>
      <TextInput
        value={brewData.grinderSetting}
        onChangeText={(val) => handleChange('grinderSetting', val)}
        style={styles.input}
      />

      <Text style={styles.label}>Brew Method:</Text>
      <TextInput
        value={brewData.brewMethod}
        onChangeText={(val) => handleChange('brewMethod', val)}
        style={styles.input}
      />

      <Text style={styles.label}>Water Ratio:</Text>
      <TextInput
        value={brewData.waterRatio}
        onChangeText={(val) => handleChange('waterRatio', val)}
        style={styles.input}
      />

      <Text style={styles.label}>Water Temp (°F):</Text>
      <TextInput
        value={brewData.waterTemp.toString()}
        keyboardType='numeric'
        onChangeText={(val) => handleChange('waterTemp', val)}
        style={styles.input}
      />

      <Text style={styles.label}>Recipe:</Text>
      <TextInput
        value={brewData.recipe}
        onChangeText={(val) => handleChange('recipe', val)}
        style={styles.input}
        multiline
      />

      <Text style={styles.label}>Brew Time (e.g., 3:30):</Text>
      <TextInput
        value={brewData.brewTime}
        onChangeText={(val) => handleChange('brewTime', val)}
        style={styles.input}
      />
      <Text style={styles.label}>Rating:</Text>
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
      <Text style={styles.label}>Notes:</Text>
      <TextInput
        value={brewData.notes}
        onChangeText={(val) => handleChange('notes', val)}
        style={[styles.input, { height: 80 }]}
        multiline
      />

      <Button title='Save Brew' onPress={handleSaveBrew} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    padding: 8,
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
})

export default BrewForm
