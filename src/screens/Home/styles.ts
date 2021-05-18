import styled from 'styled-components/native';
import colors from '../../styles/colors';

export const Container = styled.View`
  position: relative;
  flex: 1;
`;

styled.TouchableOpacity;

export const FloatingButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  background-color: ${colors.primary};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 32px;
  position: absolute;
  right: 16px;
  padding: 10px 16px;
  bottom: 16px;
  elevation: 3;
`;

export const FloatingTextButton = styled.Text`
  font-size: 15px;
  font-family: 'Poppins-Medium';
  color: #fff;
  margin-left: 4px;
`;

export const RDOContainer = styled.View`
  background: #fff;
  padding: 22px;
  border-radius: 12px;
  border: 1px solid #e8e8e8;
  margin: 0 16px;
  margin-bottom: 12px;
`;

export const RDOIcon = styled.View`
  background-color: ${colors.primary};
  width: 44px;
  height: 44px;
  border-radius: 22px;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

export const RDOIconImg = styled.Image``;

export const RDONome = styled.Text`
  font-size: 18px;
  font-family: 'Poppins-SemiBold';
  color: ${colors.primary};
`;

export const RDOStatus = styled.Text`
  font-size: 12px;
  color: ${colors.dark};
  text-transform: uppercase;
`;

export const RDODate = styled.Text`
  font-size: 12px;
  color: ${colors.dark};
`;

interface ActionButtonProps {
  backgroundColor: string;
}

export const ActionButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})<ActionButtonProps>`
  background-color: ${props => props.backgroundColor};
  justify-content: center;
  align-items: center;
  border-radius: 32px;
  width: 100px;
  height: 32px;
  margin-right: 8px;
`;

export const ActionButtonText = styled.Text`
  color: #fff;
  font-family: 'Poppins-SemiBold';
  font-size: 12px;
  text-transform: uppercase;
`;

export const EmptyMessage = styled.Text`
  text-align: center;
  margin-top: 24px;
`;
