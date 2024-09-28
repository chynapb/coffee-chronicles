import { TouchableOpacity, Text } from 'react-native'

const Button = ({ title, buttonStyle, buttonText, handlePress, isLoading }) => {
  return (
    <TouchableOpacity
      style={buttonStyle}
      activeOpacity={0.5}
      onPress={handlePress}
      disabled={isLoading}
    >
      <Text style={buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button
