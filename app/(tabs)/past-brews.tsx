import {
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Brew from '../../components/Brew'
import React, { useEffect, useState } from 'react'
import { UserAuth } from '../../context/AuthContext'
import {
  brewListener,
  deleteBrew as deleteBrewFromFirestore,
} from '../../services/firestore/brewsService'

const PastBrews = () => {
  const [brews, setBrews] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = UserAuth()

  useEffect(() => {
    if (!user) {
      setIsLoading(false)
      return
    }

    const unsubscribe = brewListener(
      user?.uid,
      (fetchedBrews) => {
        setBrews(fetchedBrews)
        setIsLoading(false)
      },
      (error) => {
        console.error('Error fetching brews: ', error)
        setIsLoading(false)
      }
    )

    return () => unsubscribe()
  }, [user])

  const deleteBrew = async (id: string) => {
    try {
      Alert.alert('Delete Brew', 'Are you sure you want to delete this brew?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteBrewFromFirestore(id)
            setBrews((prevBrews) => prevBrews.filter((brew) => brew.id !== id))
          },
        },
      ])
    } catch (error) {
      Alert.alert('Error', 'Failed to delete brew. Please try again.')
      console.error(error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Past Brews</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <ActivityIndicator size='large' color='#FF4500' />
        ) : (
          brews.map((brew) => (
            <Brew key={brew.id} deleteBrew={deleteBrew} {...brew} />
          ))
        )}
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
  header: {
    margin: 25,
    fontSize: 24,
    color: '#343450',
  },
})

export default PastBrews
