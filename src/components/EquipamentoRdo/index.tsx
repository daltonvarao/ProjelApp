import React, {useEffect, useState, createRef} from 'react';
import {Animated, Vibration, ToastAndroid} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';

import {Container, ListItems, ListItem, ItemText, RemoveItem} from './styles';

import Modal from '../Modal';

import Select from '../Select';
import * as db from '../../db';

import {Label} from '../../styles/globals';
import {IEquipamentoRdo} from '../../db/models/EquipamentoRdoSchema';
import {IEquipamento} from '../../db/models/EquipamentoSchema';
import NumberInput from '../NumberInput';
import Button from '../Button';

const RenderListItem: React.FC<{
  item: IEquipamento;
  onRemove: (removedItem: IEquipamento) => void;
}> = ({item, onRemove}) => {
  const [elevation] = useState(new Animated.Value(0));
  const ref = createRef<Swipeable>();
  const [alertShown, setAlertShown] = useState(false);

  function increaseElevation() {
    Animated.timing(elevation, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }

  function decreaseElevation() {
    Animated.timing(elevation, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Swipeable
      onBegan={() => {
        if (!alertShown) {
          ToastAndroid.show(
            'Arraste para a esquerda para deletar',
            ToastAndroid.SHORT,
          );
          setAlertShown(true);
        }
      }}
      ref={ref}
      onSwipeableRightOpen={() => {
        if (ref.current) {
          ref.current.close();
        }
        onRemove(item);
      }}
      onSwipeableRightWillOpen={() => {
        Vibration.vibrate(100);
      }}
      onActivated={increaseElevation}
      onCancelled={decreaseElevation}
      onSwipeableWillClose={decreaseElevation}
      renderRightActions={() => {
        return (
          <RemoveItem>
            <Feather name="trash" size={26} color="#fff" />
          </RemoveItem>
        );
      }}>
      <ListItem style={{elevation}}>
        <ItemText>
          {item.tag_description}
          {item.descricao.length > 20 && '...'}
        </ItemText>
      </ListItem>
    </Swipeable>
  );
};

interface EquipamentoRdoProps {
  onSelect: (selectedEquipamento: IEquipamentoRdo) => void;
  onRemove: (removedEquipamento: IEquipamento) => void;
  value: IEquipamentoRdo[];
}

const EquipamentoRDO: React.FC<EquipamentoRdoProps> = ({
  onSelect,
  value,
  onRemove,
}) => {
  const [show, setShow] = useState(false);
  const [valid, setValid] = useState(false);

  const [equipamentoId, setEquipamentoId] = useState<number | undefined>();
  const [quantidade, setQuantidade] = useState('1');

  const [equipamentos, setEquipamentos] = useState<IEquipamento[]>([]);
  const [previewData, setPreviewData] = useState<IEquipamento[]>([]);

  function resetData() {
    setEquipamentoId(undefined);
    setQuantidade('1');
  }

  async function loadCollections() {
    const realm = await db.connect();

    const equipamentosData = realm
      .objects<IEquipamento>('Equipamento')
      .sorted('tag');

    setEquipamentos(equipamentosData.toJSON());

    setEquipamentos([
      {
        descricao: "foo",
        id: 1,
        sonda: true,
        tag: "bar",
        tag_description: "baz",

      }
    ])
  }

  function handleShowModal() {
    resetData();
    setShow(true);
  }

  useEffect(() => {
    loadCollections();
  }, []);

  useEffect(() => {
    if (quantidade && equipamentoId) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [equipamentoId, quantidade]);

  useEffect(() => {
    const selected = value.map(item => item.equipamentoId);

    const preview = equipamentos.filter(item => {
      return selected.includes(item.id);
    });

    setPreviewData(preview);
  }, [value, equipamentos]);

  function handleFinaliza() {
    if (quantidade && equipamentoId) {
      onSelect({
        equipamentoId,
        quantidade: Number(quantidade),
      });

      resetData();
      setShow(false);
    }
  }

  return (
    <Container>
      <ListItems>
        {previewData.map((item, index) => {
          return (
            <RenderListItem
              item={item}
              onRemove={onRemove}
              key={index.toString()}
            />
          );
        })}
      </ListItems>

      <Button
        title="Adicionar novo equipamento"
        onPress={handleShowModal}
        removeMargin
      />

      <Modal
        visible={show}
        title="Adicionar equipamento"
        disableConfirmButton={!valid}
        onConfirm={handleFinaliza}
        onClose={() => setShow(false)}>
        <Label>Nome</Label>
        <Select
          data={equipamentos}
          labelKey="tag_description"
          valueKey="id"
          listLength={3}
          placeholder="Procure algum equipamento"
          selectedValue={equipamentoId}
          onSelect={selectedEq => {
            setEquipamentoId(selectedEq.id);
          }}
          listBgColor="#f5f5f8"
        />

        <Label>Quantidade</Label>

        <NumberInput
          onChange={setQuantidade}
          value={quantidade}
          unsigned
          onlyIntegers
        />
      </Modal>
    </Container>
  );
};

export default EquipamentoRDO;
