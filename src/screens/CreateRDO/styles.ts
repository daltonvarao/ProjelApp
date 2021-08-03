import styled from 'styled-components/native';
import colors from '../../styles/colors';

export const Container = styled.View``;

export const LightTitle = styled.Text`
  font-size: 12px;
  color: #333;
`;

export const Title = styled.Text`
  font-size: 22px;
  margin-bottom: 8px;
  padding: 16px 0;
  color: ${colors.primary};

  border-bottom-width: 1px;
  border-bottom-color: #0001;

  font-family: 'Poppins-Bold';
`;

export const FooterButtons = styled.View`
  padding: 12px 0;
  border-top-width: 1px;
  border-top-color: #0001;
`;
