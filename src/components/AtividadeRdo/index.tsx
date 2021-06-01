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
  TimeText,
  CardBody,
  Row,
  InputGroup,
  ModalView,
} from './styles';

import * as db from '../../db';

import Select from '../Select';
import ClockPicker from '../ClockPicker';

import {Input, Label} from '../../styles/globals';
import {IAtividade} from '../../db/models/AtividadeSchema';
import {IAtividadeRdo} from '../../db/models/AtividadeRdoSchema';
import parseTime from '../../utils/parseTime';
import NumberInput from '../NumberInput';
import {IFuro} from '../../db/models/FuroSchema';

interface AtividadeRdoProps {
  onSelect: (selectedAtividade: IAtividadeRdo) => void;
  onRemove: (atividadeIndex: number) => void;
  value: IAtividadeRdo[];
  estruturaId?: number;
}

const AtividadeRDO: React.FC<AtividadeRdoProps> = ({
  value,
  estruturaId,
  onRemove,
  onSelect,
}) => {
  const [show, setShow] = useState(false);
  const [valid, setValid] = useState(false);

  const [atividades, setAtividades] = useState<IAtividade[]>([]);
  const [furos, setFuros] = useState<IFuro[]>([]);
  const [atividade, setAtividade] = useState<IAtividade>();
  const [atividadeId, setAtividadeId] = useState<number>();
  const [descricao, setDescricao] = useState('');

  const [horaInicio, setHoraInicio] = useState(new Date());
  const [horaFim, setHoraFim] = useState(new Date(Date.now() + 1000 * 60 ** 2));

  const [quantidade, setQuantidade] = useState('1');
  const [quantidadeInicial, setQuantidadeInicial] = useState('0');
  const [quantidadeFinal, setQuantidadeFinal] = useState('0');
  const [furoNome, setFuroNome] = useState<string>();

  function resetData() {
    setHoraInicio(new Date());
    setHoraFim(new Date(Date.now() + 60000 * 60));
    setShow(false);
    setAtividadeId(undefined);
    setDescricao('');
    setAtividade(undefined);
    setQuantidade('0');
    setQuantidadeFinal('0');
    setQuantidadeInicial('0');
  }

  function handleShowModal() {
    resetData();

    setShow(true);
  }

  function handleHideModal() {
    setShow(false);
  }

  useEffect(() => {
    async function loadCollections() {
      const realm = await db.connect();

      const atividadesData = realm
        .objects<IAtividade>('Atividade')
        .sorted('descricao');
      let furosData = realm.objects<IFuro>('Furo').sorted('nome');

      if (estruturaId) {
        furosData = furosData.filtered(`estruturaId = ${estruturaId}`);
      }

      setAtividades(atividadesData.toJSON());
      setFuros(furosData.toJSON());
    }

    if (show) {
      loadCollections();
    }
  }, [show, estruturaId]);

  useEffect(() => {
    if (horaFim > horaInicio && atividadeId) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [horaInicio, atividadeId, horaFim]);

  useEffect(() => {
    setQuantidade(
      String((Number(quantidadeFinal) - Number(quantidadeInicial)).toFixed(2)),
    );
  }, [quantidadeFinal, quantidadeInicial]);

  function handleFinaliza() {
    if (horaFim > horaInicio && atividadeId && quantidade && atividade) {
      onSelect({
        horaFim,
        horaInicio,
        atividadeId,
        descricao,
        unidadeMedida: atividade.unidadeMedida,
        tipo: atividade.tipo,
        quantidade: Number(quantidade),
        quantidadeFinal: Number(quantidadeFinal),
        quantidadeInicial: Number(quantidadeInicial),
        furoNome,
      });

      setHoraFim(new Date(horaFim.getTime() + 60000 * 60));
      setHoraInicio(horaFim);
      setShow(false);
      setAtividadeId(undefined);
      setDescricao('');
      setAtividade(undefined);
      setQuantidade('0');
      setQuantidadeFinal('0');
      setQuantidadeInicial('0');
      setFuroNome('');
    }
  }

  return (
    <Container>
      <ListItems>
        {value.map((item, index) => {
          return (
            <ListItem key={index.toString()}>
              <CardBody>
                <TimeText>
                  {parseTime(item.horaInicio, false)
                    .concat(' - ')
                    .concat(parseTime(item.horaFim, false))}
                </TimeText>
                <ItemText>{item.descricao}</ItemText>
                {item.tipo === 'produtiva' ? (
                  <ItemText>
                    {item.unidadeMedida === 'metros'
                      ? item.quantidade.toString().concat(' metro(s)')
                      : item.quantidade.toString().concat(' unidade(s)')}
                  </ItemText>
                ) : null}
              </CardBody>
              <RemoveItem onPress={() => onRemove(index)}>
                <Feather name="x" size={20} />
              </RemoveItem>
            </ListItem>
          );
        })}
      </ListItems>
      <AddButton onPress={handleShowModal}>
        <AddButtonText>Adicionar nova atividade</AddButtonText>
      </AddButton>

      {show && (
        <Modal transparent>
          <ModalContainer>
            <ModalView>
              <ModalContent>
                <Title>Adicionar Atividade</Title>

                <Label>Atividade</Label>
                <Select
                  data={atividades}
                  labelKey="descricao"
                  valueKey="id"
                  listLength={3}
                  placeholder="Selecione uma atividade"
                  selectedValue={atividadeId}
                  onSelect={(selected: IAtividade) => {
                    setAtividadeId(selected.id);
                    setAtividade(selected);
                    setDescricao(selected.descricao);
                  }}
                />

                {atividade?.tipo === 'produtiva' && (
                  <React.Fragment>
                    <Label>Furo</Label>
                    <Select
                      data={furos}
                      labelKey="nome"
                      valueKey="nome"
                      listLength={3}
                      placeholder="Selecione um furo"
                      selectedValue={furoNome}
                      onSelect={({nome}: IFuro) => {
                        setFuroNome(nome);
                      }}
                      onBlur={setFuroNome}
                    />
                  </React.Fragment>
                )}

                {atividade?.tipo === 'produtiva' ? (
                  atividade.unidadeMedida === 'unidades' ? (
                    <React.Fragment>
                      <Label>Quantidade (un)</Label>
                      <NumberInput
                        onChange={newValue => {
                          setQuantidade(String(newValue));
                        }}
                        value={quantidade}
                        onlyIntegers
                        unsigned
                      />
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Row>
                        <InputGroup>
                          <Label>Qtd Inicial (m)</Label>
                          <Input
                            placeholder="Quantidade"
                            onChangeText={setQuantidadeInicial}
                            value={quantidadeInicial}
                            keyboardType="decimal-pad"
                          />
                        </InputGroup>
                        <InputGroup style={{marginLeft: 8}}>
                          <Label>Qtd Final (m)</Label>
                          <Input
                            placeholder="Quantidade"
                            onChangeText={setQuantidadeFinal}
                            value={quantidadeFinal}
                            keyboardType="decimal-pad"
                          />
                        </InputGroup>
                      </Row>

                      <Label>Quantidade Total (m)</Label>
                      <Input
                        placeholder="Quantidade"
                        onChangeText={setQuantidadeFinal}
                        value={quantidade}
                        editable={false}
                        keyboardType="decimal-pad"
                      />
                    </React.Fragment>
                  )
                ) : null}

                <Label>Início da Atividade</Label>
                <ClockPicker
                  value={horaInicio}
                  onChange={date => {
                    setHoraInicio(date);
                  }}
                />

                <Label>Fim da Atividade</Label>
                <ClockPicker
                  value={horaFim}
                  onChange={date => {
                    setHoraFim(date);
                  }}
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
            </ModalView>
          </ModalContainer>
        </Modal>
      )}
    </Container>
  );
};

export default AtividadeRDO;
