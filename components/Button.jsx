import { TouchableOpacity, Text } from 'react-native'

const Button = ({ title, buttonStyle, buttonText, handlePress }) => {
  return (
    <TouchableOpacity style={buttonStyle}>
      <Text style={buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button
