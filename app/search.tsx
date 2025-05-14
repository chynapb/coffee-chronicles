import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { BrewData } from '../types/BrewData'
import { BrewProps } from '../components/Brew'
import {
  getUserId,
  getUserBrews,
  deleteBrew,
  duplicateBrew as rawDuplicateBrew,
} from '../services/firestore/brewsService'
import Brew from '../components/Brew'

const SearchPage = () => {
  const navigation = useNavigation()
  const { q } = useLocalSearchParams()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [allBrews, setAllBrews] = useState<BrewData[]>([])
  const [filteredBrews, setFilteredBrews] = useState<BrewData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (typeof q === 'string') {
      setSearchTerm(q)
    } else if (Array.isArray(q)) {
      setSearchTerm(q.join(' '))
    }
  }, [q])

  useEffect(() => {
    navigation.setOptions({
      title: q ? `Results for "${q}"` : 'Search',
    })
  }, [q])

  useEffect(() => {
    const fetchBrews = async () => {
      setIsLoading(true)
      try {
        const userId = await getUserId()
        if (!userId) {
          setIsLoading(false)
          return
        }

        const brews = await getUserBrews(userId)
        setAllBrews(brews as BrewData[])
        setFilteredBrews(brews as BrewData[])
      } catch (error) {
        console.error('Error fetching brews:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBrews()
  }, [])

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredBrews(allBrews)
      return
    }

    const lowerTerm = searchTerm.toLowerCase()
    const searchableFields: (keyof BrewData)[] = [
      'bean',
      'roaster',
      'grinder',
      'grinderSetting',
      'brewMethod',
      'waterRatio',
      'waterTemp',
      'recipe',
      'brewTime',
      'rating',
      'notes',
    ]

    const filtered = allBrews.filter((brew) =>
      searchableFields.some((field) => {
        const value = brew[field]
        return value?.toString().toLowerCase().includes(lowerTerm)
      })
    )

    setFilteredBrews(filtered)
  }, [searchTerm, allBrews])

  const handleDuplicateBrew = (
    brewData: Omit<BrewProps, 'id' | 'deleteBrew' | 'duplicateBrew'>
  ) => {
    rawDuplicateBrew(brewData as BrewData)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder='Search by any field...'
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <ActivityIndicator size='large' color='#FF4500' />
        ) : filteredBrews.length === 0 ? (
          <Text style={styles.noResultsText}>No matching brews found.</Text>
        ) : (
          filteredBrews.map(({ id, ...brewData }) => (
            <Brew
              key={id}
              id={id}
              {...brewData}
              deleteBrew={deleteBrew}
              duplicateBrew={handleDuplicateBrew}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
  },
  searchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 16,
    borderRadius: 50,
    width: 350,
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
})

export default SearchPage
