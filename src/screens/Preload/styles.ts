import styled from 'styled-components/native';
import colors from '../../styles/colors';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

export const Logo = styled.Image`
  margin-bottom: 16px;

  width: 168px;
  height: 105px;
`;

export const StatusMessage = styled.Text`
  margin-bottom: 16px;
  color: ${colors.lightGray};
`;
