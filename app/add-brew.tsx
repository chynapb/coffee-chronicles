import { useLocalSearchParams, Stack } from 'expo-router'
import BrewForm from '../components/BrewForm'
import { BrewData } from '../types/BrewData'

export default function AddBrewScreen() {
  const params = useLocalSearchParams()

  const initialData: Partial<BrewData> = {
    id: typeof params.id === 'string' ? params.id : 'undefined',
    bean: typeof params.bean === 'string' ? params.bean : '',
    roaster: typeof params.roaster === 'string' ? params.roaster : '',
    grinder: typeof params.grinder === 'string' ? params.grinder : '',
    grinderSetting:
      typeof params.grinderSetting === 'string' ? params.grinderSetting : '',
    brewMethod: typeof params.brewMethod === 'string' ? params.brewMethod : '',
    waterRatio: typeof params.waterRatio === 'string' ? params.waterRatio : '',
    waterTemp: parseFloat(params.waterTemp as string) || 0,
    recipe: typeof params.recipe === 'string' ? params.recipe : '',
    brewTime: typeof params.brewTime === 'string' ? params.brewTime : '',
    rating: parseFloat(params.rating as string) || 0,
    notes: typeof params.notes === 'string' ? params.notes : '',
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
