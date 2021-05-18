import React from 'react'
import { Picker } from '@react-native-picker/picker'
import { Container } from './styles'

interface PickerProps {
  data: any[]
  selectedValue: any
  onValueChange: (itemValue: React.ReactText, itemIndex: number) => void
}

const CustomPicker: React.FC<PickerProps> = ({ onValueChange, data, selectedValue }) => {
  return (
    <Container>
      <Picker onValueChange={onValueChange} mode="dropdown" selectedValue={selectedValue}>
        {data.map((item, index) => (
          <Picker.Item key={index.toString()} label={item.toString()} value={item} />
        ))}
      </Picker>
    </Container>
  )
}

export default CustomPicker
