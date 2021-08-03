import {Animated} from 'react-native';
import styled from 'styled-components/native';
import colors from '../../styles/colors';

export const Container = styled.View`
  margin-bottom: 12px;
`;

export const ListItems = styled.View`
  margin-bottom: 12px;
`;

export const ListItem = styled(Animated.View)`
  padding: 16px;
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
  background: ${colors.error};
  width: 100%;
  justify-content: center;
  align-items: flex-end;
  border-radius: 5px;
  margin-bottom: 8px;
`;

export const RemoveItemRight = styled(RemoveItem)`
  padding-right: 32px;
`;

export const CardBody = styled.TouchableOpacity`
  width: 100%;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ItemText = styled.Text`
  font-family: 'Poppins-SemiBold';
  font-size: 16px;
  color: ${colors.lightGray};
`;

export const TitleText = styled.Text`
  font-family: 'Poppins-Bold';
  font-size: 18px;
  color: #444;
`;

export const ItemTextObs = styled.Text`
  font-family: 'Poppins-Regular';
  font-size: 16px;
  color: ${colors.lightGray};
  margin-bottom: 6px;
`;

export const InputGroup = styled.View`
  flex: 1;
`;

export const CardContent = styled.View<{noBorder?: boolean}>`
  margin-bottom: ${props => (props.noBorder ? 0 : 10)}px;
  border-bottom-color: rgba(0, 0, 0, 0.07);
  border-bottom-width: ${props => (props.noBorder ? 0 : 1)}px;
`;

export const Row = styled.View`
  flex-direction: row;
`;

export const Table = styled.View`
  width: 100%;
`;

export const TableRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const TableHeader = styled.Text`
  font-family: 'Poppins-Bold';
  font-size: 16px;
  color: ${colors.dark};
`;

export const TableData = styled.Text`
  font-family: 'Poppins-Regular';
  font-size: 16px;
  color: ${colors.lightGray};
  text-align: center;
`;
