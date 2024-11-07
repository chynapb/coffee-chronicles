// app/(tabs)/layout.tsx
import { Tabs } from 'expo-router'
import { UserAuth } from '../../context/AuthContext'
import AntDesign from '@expo/vector-icons/AntDesign'

const TabsLayout = () => {
  const { user } = UserAuth()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF4500',
        tabBarInactiveTintColor: '#343450',
      }}
    >
      <Tabs.Screen
        name='(home)'
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <AntDesign name='home' size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='top-brews'
        options={
          !user
            ? { href: null }
            : {
                title: 'Top Brews',
                headerShown: false,
                tabBarIcon: ({ color }) => (
                  <AntDesign name='hearto' size={24} color={color} />
                ),
              }
        }
      />
      <Tabs.Screen
        name='past-brews'
        options={
          !user
            ? { href: null }
            : {
                title: 'Past Brews',
                headerShown: false,
                tabBarIcon: ({ color }) => (
                  <AntDesign name='clockcircleo' size={24} color={color} />
                ),
              }
        }
      />
    </Tabs>
  )
}
export default TabsLayout
