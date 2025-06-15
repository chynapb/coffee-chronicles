import { useLocalSearchParams, Stack } from 'expo-router'
import BrewForm from '../components/BrewForm'
import { BrewData } from '../types/BrewData'

export default function AddBrewScreen() {
  const params = useLocalSearchParams()

  const initialData: Partial<BrewData> = {
    id: params.id as string,
    bean: params.bean as string,
    roaster: params.roaster as string,
    grinder: params.grinder as string,
    grinderSetting: params.grinderSetting as string,
    brewMethod: params.brewMethod as string,
    waterRatio: params.waterRatio as string,
    waterTemp: parseFloat(params.waterTemp as string) || 0,
    recipe: params.recipe as string,
    brewTime: params.brewTime as string,
    rating: parseFloat(params.rating as string) || 0,
    notes: params.notes as string,
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: params.id ? 'Edit Brew' : 'New Brew',
        }}
      />
      <BrewForm initialData={initialData} />
    </>
  )
}
