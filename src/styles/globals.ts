import styled from 'styled-components/native';
import colors from './colors';

export const HeaderText = styled.Text`
  font-size: 14px;
  color: ${colors.dark};
  text-transform: uppercase;
  margin: 12px 16px;
  font-family: 'Poppins-SemiBold';
`;

export const Input = styled.TextInput`
  width: 100%;
  padding: 16px;
  font-size: 16px;
  background-color: #fff;
  border-radius: 5px;
  font-family: 'Poppins-Regular';
  color: ${colors.dark};
  margin-bottom: 10px;
  border: 1px solid #dfe6eb;
`;

export const Label = styled.Text`
  font-size: 16px;
  color: ${colors.primary};
  margin: 8px 0;
  font-family: 'Poppins-Bold';
`;
