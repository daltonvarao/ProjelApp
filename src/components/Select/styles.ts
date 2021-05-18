import styled from 'styled-components/native';

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

export const ListContainer = styled.ScrollView<{
  listLength?: number;
}>`
  background: #fff;
  border-radius: 5px;
  margin-bottom: 10px;
  max-height: ${props => (props.listLength ? 50 * props.listLength : 150)}px;
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
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
`;

export const SelectedItem = styled.TouchableOpacity`
  background-color: #f0f0fd;
  height: 42px;
  border-radius: 21px;
  justify-content: center;
  padding: 0 14px;
  margin-right: 4px;
  margin-bottom: 8px;
`;

export const SelectedItemText = styled.Text`
  font-size: 14px;
`;
