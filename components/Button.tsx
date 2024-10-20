import { Pressable, StyleProp, Text, TextStyle } from 'react-native'

type ButtonProps = {
  title: string
  textStyle?: StyleProp<TextStyle>
  buttonStyle?: StyleProp<TextStyle>
  onPress: () => void
}

const Button = ({ title, textStyle, buttonStyle, onPress }: ButtonProps) => {
  return (
    <Pressable style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  )
}

export default Button
