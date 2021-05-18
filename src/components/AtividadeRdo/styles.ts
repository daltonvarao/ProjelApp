import styled from 'styled-components/native';
import colors from '../../styles/colors';

export const Container = styled.View`
  margin-bottom: 12px;
`;

export const Modal = styled.Modal`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.View`
  background: rgba(0, 0, 0, 0.7);
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.View`
  background: #f8f8ff;
  padding: 20px 16px;
  width: 90%;
  border-radius: 8px;
`;

export const Title = styled.Text`
  font-family: 'Poppins-SemiBold';
  font-size: 18px;
  text-align: center;
`;

export const Buttons = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 8px;
`;

export const AddButton = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))`
  background: ${colors.primary};
  padding: 12px;
  border-radius: 5px;
`;

export const FinalizaButton = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))`
  background: ${props => (props.disabled ? colors.dark : colors.primary)};
  border-radius: 5px;
  padding: 12px;
`;

export const CancelButton = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))`
  background: ${colors.error};
  padding: 12px;
  border-radius: 5px;
  margin-right: 8px;
`;

export const AddButtonText = styled.Text`
  color: #fff;
  font-family: 'Poppins-SemiBold';
  text-align: center;
`;

export const ListItems = styled.View`
  margin-bottom: 12px;
`;

export const ListItem = styled.View`
  padding: 12px 10px;
  background: #fff;
  border-radius: 5px;
  margin-bottom: 8px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const RemoveItem = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))`
  background: #f0f0fd;
  width: 26px;
  height: 26px;
  justify-content: center;
  align-items: center;
  border-radius: 13px;
`;

export const CardBody = styled.View``;

export const TimeText = styled.Text`
  font-family: 'Poppins-SemiBold';
  font-size: 16px;
  margin-bottom: 8px;
  color: ${colors.primary};
`;

export const ItemText = styled.Text`
  font-family: 'Poppins-SemiBold';
  font-size: 16px;
  color: ${colors.dark};
`;

export const InputGroup = styled.View`
  flex: 1;
`;

export const Row = styled.View`
  flex-direction: row;
`;
