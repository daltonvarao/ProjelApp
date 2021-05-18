import React from 'react';
import {ActivityIndicator} from 'react-native';

import {Container} from './styles';
import colors from '../../styles/colors';

export default function Loader() {
  return (
    <Container>
      <ActivityIndicator size="small" color={colors.primary} />
    </Container>
  );
}
