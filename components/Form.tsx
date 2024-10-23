import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import Feather from '@expo/vector-icons/Feather'

type FormProps = {
  title: string
  value: string
  placeholder?: string
  handleChangeText?: (text: string) => void
}

const Form = ({ title, value, placeholder, handleChangeText }: FormProps) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        placeholderTextColor='#979a9a'
        onChangeText={handleChangeText}
        secureTextEntry={title === 'Password' && !showPassword}
      />
      {title === 'Password' && (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            setShowPassword(!showPassword)
          }}
        >
          <Feather
            name={!showPassword ? 'eye' : 'eye-off'}
            size={20}
            color='#343450'
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  input: {
    width: 300,
    height: 50,
    margin: 5,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#979a9a',
    padding: 10,
    paddingRight: 40,
  },
  iconContainer: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
})

export default Form
