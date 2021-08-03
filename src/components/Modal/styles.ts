import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import colors from '../../styles/colors';

export const ModalContainer = styled.View`
  flex: 1;
  position: relative;
`;

export const ModalContent = styled.KeyboardAvoidingView`
  background: #fff;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  elevation: 2;
  position: absolute;
  bottom: 0;
  width: 100%;
  max-height: ${Dimensions.get('window').height - 50}px;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`;

export const ModalBody = styled.ScrollView`
  padding-horizontal: 16px;
`;

export const ModalFooter = styled.View`
  padding: 12px 16px;
`;

export const ModalTitle = styled.Text`
  font-size: 18px;
  font-family: 'Poppins-SemiBold';
`;

export const ConfirmButton = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))`
  background: ${colors.primary};
  opacity: ${props => (props.disabled ? 0.6 : 1)};
  border-radius: 5px;
  padding: 12px;
`;

export const ConfirmButtonText = styled.Text`
  color: #fff;
  font-family: 'Poppins-SemiBold';
  text-align: center;
`;

export const CloseModal = styled.TouchableOpacity``;
