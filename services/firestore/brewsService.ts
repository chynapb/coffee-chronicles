import AsyncStorage from '@react-native-async-storage/async-storage'
import { FIREBASE_DB } from '../../firebaseConfig'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { getAuth } from '@firebase/auth'

export type BrewData = {
  bean: string
  roaster: string
  grinder: string
  grinderSetting: string
  brewMethod: string
  waterRatio: string
  waterTemp: number
  recipe: string
  brewTime: string
  rating: number
  notes: string
  createdAt?: string
}

const getUserId = async (): Promise<string> => {
  const user = getAuth().currentUser
  if (user) return user.uid

  // Check if guest ID exists
  const storedGuestId = await AsyncStorage.getItem('guestID')
  if (storedGuestId) return storedGuestId

  // Generate guest ID if none exists
  const timestamp = Date.now()
  const randomSuffix = Math.random().toString(36).substring(2, 8)
  const newGuestId = `guest-${timestamp}-${randomSuffix}`

  // Save guest ID to storage
  await AsyncStorage.setItem('guestID', newGuestId)
  return newGuestId
}

// Retrieve all brews for current user
export const getUserBrews = async (): Promise<BrewData[]> => {
  try {
    const userId = await getUserId()
    const brewCollectionRef = collection(FIREBASE_DB, 'users', userId, 'brews')
    const querySnapshot = await getDocs(brewCollectionRef)

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as BrewData),
    }))
  } catch (error) {
    console.error('Error fetching brews: ', error)
    throw new Error('Failed to fetch user brews.')
  }
}

// Save new brew to current user
export const saveBrew = async (brewData: BrewData): Promise<void> => {
  try {
    const userId = await getUserId()
    const brewId = `brew-${Date.now()}`
    const brewRef = doc(
      collection(FIREBASE_DB, 'users', userId, 'brews'),
      brewId
    )

    await setDoc(brewRef, {
      ...brewData,
      createdAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error saving brew: ', error)
    throw new Error('Failed to save brew.')
  }
}
