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
  padding: 18px 0;
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

export const DeleteButton = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))`
  background: ${colors.error};
  border-radius: 5px;
  padding: 16px;

  margin-bottom: 8px;
`;

export const FinalizaButton = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))`
  background: ${colors.success};
  border-radius: 5px;
  padding: 16px;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  color: #fff;
  text-align: center;
  font-family: 'Poppins-Bold';
`;
