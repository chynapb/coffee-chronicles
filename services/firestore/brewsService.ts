import AsyncStorage from '@react-native-async-storage/async-storage'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import { getAuth } from '@firebase/auth'
import uuid from 'react-native-uuid'
import { BrewData } from '../../types/BrewData'

const getBrewsCollectionRef = (userId: string) => {
  return collection(doc(FIREBASE_DB, 'users', userId), 'brews')
}

export const getUserId = async (): Promise<string> => {
  const auth = getAuth()
  const user = auth.currentUser

  if (user) {
    return user.uid
  }

  // Check if guest ID exists
  const storedGuestId = await AsyncStorage.getItem('guestId')
  if (storedGuestId) return storedGuestId

  // Generate guest ID if none exists
  const newGuestId = uuid.v4()
  await AsyncStorage.setItem('guestID', newGuestId)
  return newGuestId
}

export const getUserBrews = async (userId: string) => {
  const brewsCollectionRef = getBrewsCollectionRef(userId)
  const brewsQuery = query(brewsCollectionRef, orderBy('createdAt', 'desc'))

  try {
    const querySnapshot = await getDocs(brewsQuery)
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error('Error fetching user brews: ', error)
    throw error
  }
}

export const saveBrew = async (brewData: BrewData): Promise<void> => {
  try {
    const userId = await getUserId()

    if (!userId) {
      throw new Error('User ID not found.')
    }

    const userBrewsRef = collection(FIREBASE_DB, 'users', userId, 'brews')
    await addDoc(userBrewsRef, {
      ...brewData,
      createdAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error saving brew: ', error)
    throw Error('Failed to save brew.')
  }
}

export const deleteBrew = async (
  brewId: string,
  userId?: string
): Promise<void> => {
  const currentUserId = userId || FIREBASE_AUTH.currentUser?.uid

  if (!currentUserId) {
    throw new Error('User not logged in')
  }

  try {
    const brewRef = doc(FIREBASE_DB, `users/${currentUserId}/brews`, brewId)
    await deleteDoc(brewRef)
  } catch (error) {
    console.error('Error deleting brew: ', error)
    throw error
  }
}

export const brewListener = (
  userId: string,
  onUpdate: (brews: any[]) => void,
  onError: (error: any) => any
) => {
  const brewsCollectionRef = getBrewsCollectionRef(userId)
  const brewsQuery = query(brewsCollectionRef, orderBy('createdAt', 'desc'))

  const unsubscribe = onSnapshot(
    brewsQuery,
    (snapshot) => {
      const brews = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      onUpdate(brews)
    },
    (error) => {
      console.error('Error fetching brews: ', error)
      onError(error)
    }
  )

  return unsubscribe
}
