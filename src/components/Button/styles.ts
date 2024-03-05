import styled from 'styled-components/native';
import ReactNative from 'react-native';
import colors from '../../styles/colors';

export interface ButtonProps {
  title: string;
  color?: string;
  backgroundColor?: string;
  onPress?: (event: ReactNative.GestureResponderEvent) => void;
  type?: 'success' | 'primary' | 'error';
  disabled?: boolean;
  removeMargin?: boolean;
  style?:any
}

export const ButtonContainer = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))<Partial<ButtonProps>>`
  background: ${props =>
    props.type ? colors[props.type] : props.backgroundColor || colors.primary};
  color: ${props => props.color || '#fff'};
  padding: 12px;
  margin-bottom: ${props => (props.removeMargin ? '0' : '8px')};
  border-radius: 5px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-family: 'Poppins-SemiBold';
  text-align: center;
`;
