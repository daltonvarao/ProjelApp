import styled from 'styled-components/native';
import colors from '../../styles/colors';

export const Container = styled.View`
  margin-bottom: 12px;
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
