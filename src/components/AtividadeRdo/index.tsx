import React, {useEffect, useState, createRef} from 'react';
import {Animated, ToastAndroid, Vibration} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import {
  Container,
  ListItems,
  ListItem,
  ItemText,
  CardBody,
  Row,
  InputGroup,
  CardHeader,
  TitleText,
  Table,
  TableRow,
  TableHeader,
  TableData,
  ItemTextObs,
  CardContent,
  RemoveItem,
} from './styles';

import * as db from '../../db';

import Select from '../Select';
import ClockPicker from '../ClockPicker';

import {Input, Label} from '../../styles/globals';
import {IAtividade} from '../../db/models/AtividadeSchema';
import {IAtividadeRdo} from '../../db/models/AtividadeRdoSchema';
import {IFuro} from '../../db/models/FuroSchema';
import parseTime from '../../utils/parseTime';
import NumberInput from '../NumberInput';
import Modal from '../Modal';
import Button from '../Button';

interface AtividadeRdoProps {
  onSelect: (selectedAtividade: IAtividadeRdo) => void;
  onRemove: (atividadeIndex: number) => void;
  value: IAtividadeRdo[];
  estruturaId?: number;
}

const RenderListItem: React.FC<{
  item: IAtividadeRdo;
  index: number;
  onRemove: (index: number) => void;
}> = ({index, item, onRemove}) => {
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

  function toM(value: number) {
    return value.toFixed(2).concat('m').replace('.', ',');
  }

  return (
    <Swipeable
      ref={ref}
      onBegan={() => {
        if (!alertShown) {
          ToastAndroid.show(
            'Arraste para a esquerda para deletar',
            ToastAndroid.SHORT,
          );
          setAlertShown(true);
        }
      }}
      onSwipeableRightOpen={() => {
        if (ref.current) {
          ref.current.close();
        }
        onRemove(index);
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
        <CardBody>
          <CardHeader>
            <ItemText>
              {parseTime(item.horaInicio, false)
                .concat(' - ')
                .concat(parseTime(item.horaFim, false))}
            </ItemText>
            <ItemText>{item?.furoNome}</ItemText>
          </CardHeader>
          <CardContent noBorder={!(item.tipo === 'produtiva')}>
            <TitleText>{item.descricao}</TitleText>
            {!!item.observacao && <ItemTextObs>{item.observacao}</ItemTextObs>}
          </CardContent>
          {item.tipo === 'produtiva' ? (
            item.unidadeMedida === 'unidades' ? (
              <Table>
                <TableRow>
                  <TableHeader>Quantidade</TableHeader>

                  <TableData>
                    {item.quantidade.toString().concat(' unidade(s)')}
                  </TableData>
                </TableRow>
              </Table>
            ) : (
              <Table>
                <TableRow>
                  <TableHeader>Q. Inicial</TableHeader>
                  <TableHeader>Q. Final</TableHeader>
                  <TableHeader>Q. Total</TableHeader>
                </TableRow>

                <TableRow>
                  <TableData>{toM(item.quantidadeInicial)}</TableData>
                  <TableData>{toM(item.quantidadeFinal)}</TableData>
                  <TableData>{toM(item.quantidade)}</TableData>
                </TableRow>
              </Table>
            )
          ) : null}
        </CardBody>
      </ListItem>
    </Swipeable>
  );
};

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
  const [observacao, setObservacao] = useState('');

  const [horaInicio, setHoraInicio] = useState(new Date());
  const [horaFim, setHoraFim] = useState(
    new Date(horaInicio.getTime() + 1000 * 60 ** 2),
  );

  const [quantidade, setQuantidade] = useState('0');
  const [quantidadeInicial, setQuantidadeInicial] = useState('0');
  const [quantidadeFinal, setQuantidadeFinal] = useState('0');
  const [furoId, setFuroId] = useState<number>();
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
    setObservacao('');
    setFuroId(undefined);
    setFuroNome('');
  }

  function handleShowModal() {
    resetData();

    setShow(true);
  }

  // furos duplicando na criacao de atividades rdo
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

  useEffect(() => {
    if (atividade?.unidadeMedida === 'unidades') {
      setQuantidade('1');
    }
  }, [atividade]);

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
        furoId,
        observacao,
        furoNome,
      });
    }
  }

  return (
    <Container>
      <ListItems>
        {value
          .sort((a, b) => {
            return a.horaInicio > b.horaInicio ? 1 : -1;
          })
          .map((item, index) => (
            <RenderListItem
              key={index.toString()}
              index={index}
              item={item}
              onRemove={onRemove}
            />
          ))}
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
        onConfirm={handleFinaliza}
        closeOnConfirm>
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
          listBgColor="#f5f5f8"
        />

        <Label>Observação ({observacao.length} / 80)</Label>
        <Input
          placeholder="Observação"
          value={observacao}
          onChangeText={text => setObservacao(text.replace(/\r?\n|\r/g, ''))}
          autoCapitalize="none"
          autoCompleteType="off"
          autoCorrect={false}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          maxLength={80}
        />

        {atividade?.tipo === 'produtiva' && (
          <React.Fragment>
            <Label>Furo</Label>
            <Select
              data={furos}
              labelKey="nome"
              valueKey="id"
              listLength={3}
              placeholder="Selecione um furo"
              selectedValue={furoId}
              onSelect={(selected: IFuro) => {
                setFuroId(selected.id);
                setFuroNome(selected.nome);
              }}
              listBgColor="#f5f5f8"
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
                value={quantidade || '1'}
                onlyIntegers
                unsigned
                nonNull
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
