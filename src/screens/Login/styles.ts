import styled from 'styled-components/native';
import colors from '../../styles/colors';

export const Container = styled.View`
  flex: 1;
  padding: 0 18px;
  background: #ffffff;
`;

export const LoginContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding: 16px;
`;

export const LoginTitle = styled.Text`
  font-family: 'Poppins-Bold';
  font-size: 32px;
  color: ${colors.lightGray};
`;

export const LoginHeader = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: 18px;
`;

interface InputProps {
  invalid?: string;
}

export const Input = styled.TextInput<InputProps>`
  padding: 14px 18px;
  background: #f0f0fd;
  border: 1px solid ${props => (props.invalid ? colors.error : '#bbb5')};
  width: 100%;
  border-radius: 6px;
  font-family: 'Poppins-Bold';
  font-size: 18px;
  margin-bottom: 12px;
`;

export const InvalidInput = styled.Text`
  color: ${colors.error};
  font-family: 'Poppins-Bold';
  font-size: 14px;
  margin-bottom: 10px;
`;

export const Button = styled.TouchableOpacity`
  padding: 16px;
  background: ${colors.primary};
  opacity: ${props => (props.disabled ? 0.7 : 1)};
  width: 100%;
  border-radius: 6px;
  margin-top: 4px;
`;

export const TextButton = styled.Text`
  color: #fff;
  font-family: 'Poppins-SemiBold';

  font-size: 22px;
  text-align: center;
`;
