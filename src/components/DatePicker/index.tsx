import React, {useState} from 'react';
import DateTimePicker, {Event} from '@react-native-community/datetimepicker';
import Feather from 'react-native-vector-icons/Feather';

import {Container, TextButton} from './styles';

import parseDate from '../../utils/parseDate';

interface DatePickerProps {
  value: Date;
  onChange: (event: Event, date: Date | undefined) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({value, onChange}) => {
  const [show, setShow] = useState(false);

  function handleShowDatePicker() {
    setShow(true);
  }

  return (
    <Container onPress={handleShowDatePicker}>
      {show && (
        <DateTimePicker
          value={value}
          display="spinner"
          onChange={(ev: Event, date?: Date) => {
            setShow(false);
            onChange(ev, date);
          }}
          is24Hour
        />
      )}
      <TextButton>{parseDate(value)}</TextButton>
      <Feather name="calendar" size={22} />
    </Container>
  );
};

export default DatePicker;
