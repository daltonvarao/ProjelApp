import React, {useEffect, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';

import {
  Container,
  ListItems,
  ListItem,
  ItemText,
  RemoveItem,
  TimeText,
  CardBody,
  Row,
  InputGroup,
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
import Modal from '../Modal';
import Button from '../Button';

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
  const [horaFim, setHoraFim] = useState(
    new Date(horaInicio.getTime() + 1000 * 60 ** 2),
  );

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
    setQuantidade('1');
    setQuantidadeFinal('0');
    setQuantidadeInicial('0');
  }

  function handleShowModal() {
    resetData();

    setShow(true);
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
                <Feather name="x" size={18} color="#aaa" />
              </RemoveItem>
            </ListItem>
          );
        })}
      </ListItems>

      <Button
        title="Adicionar nova atividade"
        onPress={handleShowModal}
        removeMargin
      />

      <Modal
        title="Adicionar atividade"
        visible={show}
        onClose={() => setShow(false)}
        disableConfirmButton={!valid}
        onConfirm={handleFinaliza}>
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
                  <Label>Q. Inicial</Label>
                  <Input
                    placeholder="Quantidade"
                    onChangeText={setQuantidadeInicial}
                    value={quantidadeInicial}
                    keyboardType="decimal-pad"
                  />
                </InputGroup>
                <InputGroup style={{marginLeft: 8}}>
                  <Label>Q. Final</Label>
                  <Input
                    placeholder="Quantidade"
                    onChangeText={setQuantidadeFinal}
                    value={quantidadeFinal}
                    keyboardType="decimal-pad"
                  />
                </InputGroup>
                <InputGroup style={{marginLeft: 8}}>
                  <Label>Q. Total</Label>
                  <Input
                    placeholder="Quantidade"
                    onChangeText={setQuantidadeFinal}
                    value={quantidade}
                    editable={false}
                    keyboardType="decimal-pad"
                  />
                </InputGroup>
              </Row>
            </React.Fragment>
          )
        ) : null}

        <Row>
          <InputGroup>
            <Label>Horário inicial</Label>
            <ClockPicker
              value={horaInicio}
              onChange={date => {
                setHoraInicio(date);
              }}
            />
          </InputGroup>
          <InputGroup style={{marginLeft: 8}}>
            <Label>Horário final</Label>
            <ClockPicker
              value={horaFim}
              onChange={date => {
                setHoraFim(date);
              }}
            />
          </InputGroup>
        </Row>
      </Modal>
    </Container>
  );
};

export default AtividadeRDO;
