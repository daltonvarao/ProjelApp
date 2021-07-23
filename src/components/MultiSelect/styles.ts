import styled from 'styled-components/native';
import colors from '../../styles/colors';

export const Container = styled.View``;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-radius: 5px;
  padding: 6px 12px;
  margin-bottom: 10px;
  border: 1px solid #dfe6eb;
`;

export const Input = styled.TextInput`
  flex: 1;
  font-size: 16px;
  font-family: 'Poppins-Regular';
  color: #676767;
`;

export const ListContainer = styled.ScrollView`
  background: #fff;
  border-radius: 5px;
  margin-bottom: 8px;
  max-height: 150px;
`;

export const ListItem = styled.TouchableOpacity<{last: boolean}>`
  padding: 14px;
  border-bottom-width: ${props => (props.last ? 0 : '1px')};
  border-bottom-color: ${props => (props.last ? 0 : '#bbb2')};
`;

export const ListItemLabel = styled.Text`
  font-size: 16px;
`;

export const PreviewSelectedItems = styled.View`
  flex-direction: column;
  margin-top: 10px;
`;

export const SelectedTitle = styled.Text`
  padding: 0 8px;
  margin: 8px 0;
  font-size: 18px;
  font-family: 'Poppins-SemiBold';
  color: ${colors.primary};
`;

export const SelectedItem = styled.View`
  background-color: #fff;
  border-radius: 8px;
  padding: 12px;
  /* margin-right: 4px; */
  margin-bottom: 8px;
  width: 170px;
  min-height: 70px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const SelectedItemOffset = styled.View`
  width: 8px;
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

export const SelectedItemText = styled.Text`
  font-size: 16px;
  font-family: 'Poppins-SemiBold';
  color: ${colors.dark};
  max-width: 100px;
`;
