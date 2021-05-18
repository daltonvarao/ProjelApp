import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import colors from '../../styles/colors';

import Feather from 'react-native-vector-icons/Feather';

import {Container} from './styles';

interface NumberInputProps {
  value: string | number;
  onChange: (newValue: string) => void;
  step?: number;
  onlyIntegers?: boolean;
  unsigned?: boolean;
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  step = 1,
  onlyIntegers = false,
  unsigned = false,
}) => {
  function increment() {
    let result = Number(value) + step;

    onChange(String(result));
  }

  function decrement() {
    let result = Number(value) - step;
    if (unsigned && result < 0) return;

    onChange(String(result));
  }

  function handleChange(text: string) {
    let result = text;

    if (onlyIntegers) {
      result = text.replace(/[^0-9]/g, '');
    }

    onChange(result);
  }

  return (
    <Container>
      <TouchableOpacity onPress={decrement} style={styles.buttonLeft}>
        <Feather name="minus" size={22} color={colors.primary} />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        onChangeText={handleChange}
        value={String(value)}
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={increment} style={styles.buttonRight}>
        <Feather name="plus" size={22} color={colors.primary} />
      </TouchableOpacity>
    </Container>
  );
};

const styles = StyleSheet.create({
  buttonRight: {
    width: 48,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },

  buttonLeft: {
    width: 48,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },

  buttonText: {
    color: colors.primary,
    fontSize: 26,
  },

  input: {
    padding: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
});

export default NumberInput;
