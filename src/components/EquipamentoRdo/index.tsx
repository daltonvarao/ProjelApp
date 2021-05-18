import React, {useEffect, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';

import {
  Container,
  Title,
  Modal,
  AddButton,
  AddButtonText,
  ModalContainer,
  ModalContent,
  CancelButton,
  Buttons,
  FinalizaButton,
  ListItems,
  ListItem,
  ItemText,
  RemoveItem,
} from './styles';

import Select from '../Select';
import * as db from '../../db';

import {Label} from '../../styles/globals';
import {IEquipamentoRdo} from '../../db/models/EquipamentoRdoSchema';
import {IEquipamento} from '../../db/models/EquipamentoSchema';
import NumberInput from '../NumberInput';

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

  const [equipamentoId, setEquipamentoId] = useState<number>();
  const [quantidade, setQuantidade] = useState('1');

  const [equipamentos, setEquipamentos] = useState<IEquipamento[]>([]);

  const [previewData, setPreviewData] = useState<IEquipamento[]>([]);

  async function loadCollections() {
    const realm = await db.connect();

    const equipamentosData = realm
      .objects<IEquipamento>('Equipamento')
      .sorted('tag');

    setEquipamentos(equipamentosData.toJSON());
  }

  function handleShowModal() {
    setShow(true);
  }

  function handleHideModal() {
    setShow(false);
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

      setEquipamentoId(undefined);

      setShow(false);
    }
  }

  return (
    <Container>
      <ListItems>
        {previewData.map((item, index) => {
          return (
            <ListItem key={index.toString()}>
              <ItemText>
                {item.tag_description}
                {item.descricao.length > 20 && '...'}
              </ItemText>
              <RemoveItem onPress={() => onRemove(item)}>
                <Feather name="x" size={20} />
              </RemoveItem>
            </ListItem>
          );
        })}
      </ListItems>
      <AddButton onPress={handleShowModal}>
        <AddButtonText>Adicionar novo equipamento</AddButtonText>
      </AddButton>

      {show && (
        <Modal transparent>
          <ModalContainer>
            <ModalContent>
              <Title>Adicionar Equipamento</Title>

              <Label>Nome</Label>
              <Select
                data={equipamentos}
                labelKey="tag_description"
                valueKey="id"
                listLength={2}
                placeholder="Procure algum equipamento"
                selectedValue={equipamentoId}
                onSelect={selectedEq => {
                  setEquipamentoId(selectedEq.id);
                }}
              />

              <Label>Quantidade</Label>

              <NumberInput
                onChange={setQuantidade}
                value={quantidade}
                unsigned
                onlyIntegers
              />

              <Buttons>
                <CancelButton onPress={handleHideModal}>
                  <AddButtonText>Cancelar</AddButtonText>
                </CancelButton>

                <FinalizaButton disabled={!valid} onPress={handleFinaliza}>
                  <AddButtonText>Adicionar</AddButtonText>
                </FinalizaButton>
              </Buttons>
            </ModalContent>
          </ModalContainer>
        </Modal>
      )}
    </Container>
  );
};

export default EquipamentoRDO;
