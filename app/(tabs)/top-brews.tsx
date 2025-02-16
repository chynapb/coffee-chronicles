import { useEffect, useState } from 'react'
import { Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  brewListener,
  deleteBrew,
  getUserId,
} from '../../services/firestore/brewsService'
import Brew from '../../components/Brew'

const TopBrews = () => {
  const [brews, setBrews] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBrews = async () => {
      setIsLoading(true)

      try {
        const userId = await getUserId()
        if (!userId) {
          setIsLoading(false)
          return
        }

        // Pass the correct arguments to brewListener
        const unsubscribe = brewListener(
          userId,
          (fetchedBrews) => {
            setBrews(fetchedBrews)
            setIsLoading(false)
          },
          (error) => {
            console.error('Error fetching brews: ', error)
            setIsLoading(false)
          },
          10,
          'rating'
        )

        return () => unsubscribe()
      } catch (error) {
        console.error('Error fetching brews: ', error)
        setIsLoading(false)
      }
    }

    fetchBrews()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Top Brews</Text>
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

export default TopBrews
