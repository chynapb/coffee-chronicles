import AsyncStorage from '@react-native-async-storage/async-storage'
import { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
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

export const getUserId = async (): Promise<string | null> => {
  try {
    const currentUser = getAuth(FIREBASE_APP).currentUser
    if (currentUser) {
      return currentUser.uid
    }

    // Check if guest ID exists
    let guestId = await AsyncStorage.getItem('guestId')

    if (!guestId) {
      // Generate guest ID if none exists
      guestId = uuid.v4()
      await AsyncStorage.setItem('guestId', guestId)
    }

    return guestId
  } catch (error) {
    console.error('Error getting user ID:', error)
    return null
  }
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
  try {
    const currentUser = userId || (await getUserId())

    if (!currentUser) {
      throw new Error('User not logged in.')
    }

    const brewRef = doc(FIREBASE_DB, `users/${currentUser}/brews`, brewId)

    await deleteDoc(brewRef)
  } catch (error) {
    console.error('Error deleting brew: ', error)
    throw error
  }
}

export const brewListener = (
  userId: string,
  onUpdate: (brews: any[]) => void,
  onError: (error: any) => any,
  limitCount?: number,
  sortBy: 'createdAt' | 'rating' = 'createdAt'
) => {
  const brewsCollectionRef = getBrewsCollectionRef(userId)
  let brewsQuery = query(brewsCollectionRef, orderBy(sortBy, 'desc'))

  if (limitCount) {
    brewsQuery = query(brewsQuery, limit(limitCount))
  }

  return onSnapshot(
    brewsQuery,
    (snapshot) => {
      const brews = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      onUpdate(brews)
    },
    (error) => {
      onError(error)
    }
  )
}

export const getTotalBrews = async () => {
  try {
    const user = FIREBASE_AUTH.currentUser

    if (!user) {
      console.log('User not logged in.')
      return
    }

    const userBrewsCollectionRef = collection(
      FIREBASE_DB,
      'users',
      user.uid,
      'brews'
    )

    const querySnapshot = await getDocs(userBrewsCollectionRef)
    return querySnapshot.size
  } catch (error) {
    console.error('Error getting brews: ', error)
  }
}
