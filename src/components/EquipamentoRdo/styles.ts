import {Animated} from 'react-native';
import styled from 'styled-components/native';
import colors from '../../styles/colors';

export const Container = styled.View`
  margin-bottom: 12px;
`;

export const ListItems = styled.View`
  margin-bottom: 12px;
`;

export const ListItem = styled(Animated.View)`
  padding: 16px;
  background: #fff;
  border-radius: 5px;
  margin-bottom: 8px;
`;

export const RemoveItem = styled.View`
  background: ${colors.error};
  width: 100%;
  justify-content: center;
  align-items: flex-end;
  border-radius: 5px;
  margin-bottom: 8px;
  padding-right: 32px;
`;

export const ItemText = styled.Text`
  font-family: 'Poppins-SemiBold';
  font-size: 16px;
  color: ${colors.dark};
`;
