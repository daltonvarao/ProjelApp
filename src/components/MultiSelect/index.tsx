import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

import {
  InputContainer,
  ListContainer,
  ListItem,
  ListItemLabel,
  PreviewSelectedItems,
  SelectedItem,
  SelectedItemText,
  Input,
} from './styles';

interface MultiSelectProps {
  data: any[];
  labelKey: string;
  valueKey: any;
  onSelect: (selectedItem: any) => void;
  onRemove: (removedItem: any) => void;
  selectedValues: any[];
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  data,
  labelKey,
  valueKey,
  onSelect,
  onRemove,
  selectedValues,
}) => {
  const [search, setSearch] = useState('');

  const [selectableData, setSelectableData] = useState<any[]>([]);

  const [previewSelectedItems, setPreviewSelectedItems] = useState<any[]>([]);

  useEffect(() => {
    let newData = data.filter(item => {
      return !selectedValues.includes(item[valueKey]);
    });

    newData = newData.filter(item => {
      return item[labelKey].toLowerCase().includes(search.toLowerCase());
    });
    setSelectableData(newData);

    const preview = data.filter(item => {
      return selectedValues.includes(item[valueKey]);
    });

    setPreviewSelectedItems(preview);
  }, [data, selectedValues, search, labelKey, valueKey]);

  return (
    <View>
      <InputContainer>
        <Input
          value={search}
          onChangeText={setSearch}
          placeholder="Procure algum colaborador"
        />
        <Feather name="chevron-down" size={20} />
      </InputContainer>

      {selectableData.length > 0 && (
        <ListContainer nestedScrollEnabled>
          {selectableData.map((item, index) => (
            <ListItem
              key={index.toString()}
              last={index === selectableData.length - 1}
              onPress={() => onSelect(item)}>
              <ListItemLabel>{item[labelKey]}</ListItemLabel>
            </ListItem>
          ))}
        </ListContainer>
      )}

      {previewSelectedItems.length > 0 && (
        <Text style={{paddingHorizontal: 8}}>Selecionados</Text>
      )}

      <PreviewSelectedItems>
        {previewSelectedItems.map((selected, index) => (
          <SelectedItem
            key={index.toString()}
            onPress={() => onRemove(selected)}>
            <SelectedItemText>
              {selected[labelKey]} <Feather name="x" size={16} color="#aaa" />
            </SelectedItemText>
          </SelectedItem>
        ))}
      </PreviewSelectedItems>
    </View>
  );
};

export default MultiSelect;
