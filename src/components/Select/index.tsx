import React, {useEffect, useState} from 'react';
import {View} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

import {
  InputContainer,
  ListContainer,
  ListItem,
  ListItemLabel,
  Input,
  SelectActionButton,
} from './styles';

interface SelectProps {
  data: any[];
  labelKey: string;
  valueKey: any;
  onSelect: (selectedItem: any) => void;
  selectedValue: any;
  placeholder?: string;
  listLength?: number;
  onBlur?: (text: string) => void;
  listBgColor?: string;
}

const Select: React.FC<SelectProps> = ({
  data,
  labelKey,
  valueKey,
  onSelect,
  selectedValue,
  placeholder,
  listLength,
  listBgColor = '#fff',
  onBlur,
}) => {
  const [search, setSearch] = useState('');

  const [selectableData, setSelectableData] = useState<any[]>([]);

  const [showList, setShowList] = useState(false);

  useEffect(() => {
    let newData = data.filter(item => {
      return item[labelKey].toLowerCase().includes(search.toLowerCase());
    });

    setSelectableData(newData);
  }, [data, search, labelKey]);

  useEffect(() => {
    data.filter(item => {
      if (item[valueKey] === selectedValue) {
        setSearch(item[labelKey]);
      }
    });
  }, [data, selectedValue, labelKey, valueKey]);

  return (
    <View>
      <InputContainer>
        <Input
          value={search}
          onChangeText={setSearch}
          placeholder={placeholder}
          onFocus={() => setShowList(true)}
          onEndEditing={e => {
            if (!onBlur) return;

            onBlur(e.nativeEvent.text || '');
          }}
        />

        {search ? (
          <SelectActionButton
            hitSlop={{
              bottom: 25,
              top: 25,
              left: 25,
              right: 25,
            }}
            onPress={() => {
              onSelect('');
              setSearch('');
            }}>
            <Feather name="x" size={20} />
          </SelectActionButton>
        ) : showList ? (
          <SelectActionButton
            onPress={() => {
              setShowList(false);
            }}>
            <Feather name="chevron-up" size={22} />
          </SelectActionButton>
        ) : (
          <SelectActionButton
            onPress={() => {
              setShowList(true);
            }}>
            <Feather name="chevron-down" size={22} />
          </SelectActionButton>
        )}
      </InputContainer>

      {selectableData.length > 0 && showList && (
        <ListContainer
          background={listBgColor}
          listLength={listLength}
          nestedScrollEnabled>
          {selectableData.map((item, index) => (
            <ListItem
              key={index.toString()}
              last={index === selectableData.length - 1}
              onPress={() => {
                onSelect(item);
                setShowList(false);
              }}>
              <ListItemLabel>{item[labelKey]}</ListItemLabel>
            </ListItem>
          ))}
        </ListContainer>
      )}
    </View>
  );
};

export default Select;
