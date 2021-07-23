import styled from 'styled-components/native';
import colors from '../../styles/colors';

export const Container = styled.TouchableOpacity`
  width: 100%;
  padding: 16px;
  background-color: #fff;
  border-radius: 5px;
  font-family: 'Poppins-SemiBold';
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  border: 1px solid #dfe6eb;
`;

export const TextButton = styled.Text`
  font-size: 16px;
  line-height: 34px;
  font-family: 'Poppins-SemiBold';
  color: ${colors.dark};
`;
