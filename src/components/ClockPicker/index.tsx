import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Feather from 'react-native-vector-icons/Feather';

import {Container, TextButton} from './styles';

import parseTime from '../../utils/parseTime';

interface ClockPickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

const ClockPicker: React.FC<ClockPickerProps> = ({value, onChange}) => {
  const [show, setShow] = useState(false);

  function handleShowClockPicker() {
    setShow(true);
  }

  return (
    <>
      <Container onPress={handleShowClockPicker}>
        <TextButton>{parseTime(value)}</TextButton>
        <Feather name="clock" size={22} />
      </Container>

      {show && (
        <DateTimePicker
          value={value}
          mode="time"
          display="spinner"
          is24Hour
          minuteInterval={1}
          onChange={(_: Event, date?: Date) => {
            setShow(false);
            onChange(date || value);
          }}
        />
      )}
    </>
  );
};

export default ClockPicker;
