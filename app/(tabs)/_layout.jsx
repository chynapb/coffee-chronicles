import { Tabs } from 'expo-router'

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#FF4500',
          tabBarInactiveTintColor: '#3e3e5f',
        }}
      >
        <Tabs.Screen
          name='home'
          options={{
            title: 'Home',
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name='top-brews'
          options={{
            title: 'Top Brews',
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name='past-brews'
          options={{
            title: 'Past Brews',
            headerShown: false,
          }}
        />
      </Tabs>
    </>
  )
}
export default TabsLayout
