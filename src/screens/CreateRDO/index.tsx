import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {ScrollView, Alert} from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import NetInfo from '@react-native-community/netinfo';

import DatePicker from '../../components/DatePicker';
import Picker from '../../components/Picker';
import MultiSelect from '../../components/MultiSelect';
import EquipamentoRDO from '../../components/EquipamentoRdo';
import AtividadeRDO from '../../components/AtividadeRdo';
import Select from '../../components/Select';

import {Container, FooterButtons, Title} from './styles';
import {Input, Label} from '../../styles/globals';

import {initialState, reducer} from './reducer';
import * as db from '../../db';
import api from '../../services/api';

import {IRdo} from '../../db/models/RdoSchema';
import {IUser} from '../../db/models/UserSchema';
import {IEquipamentoRdo} from '../../db/models/EquipamentoRdoSchema';
import {IEquipamento} from '../../db/models/EquipamentoSchema';
import {IEstrutura} from '../../db/models/EstruturaSchema';
import Loader from '../../components/Loader';
import Button from '../../components/Button';

interface RouteParams {
  rdoId: number;
}

const CreateRDO: React.FC = () => {
  const route = useRoute();
  const params = route.params as RouteParams;
  const navigation = useNavigation();
  const condicoesTempo = ['bom', 'chuvoso'];
  const statusAtividade = ['andamento', 'finalizado'];
  const [users, setUsers] = useState<IUser[]>();
  const [equipamentos, setEquipamentos] = useState<IEquipamento[]>();
  const [estruturas, setEstruturas] = useState<IEstrutura[]>();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);

  const findRdo = useCallback(async () => {
    const realm = await db.connect();
    const rdo = realm.objectForPrimaryKey<IRdo>('Rdo', state.rdoId);
    return rdo;
  }, [state.rdoId]);

  function validateRdo(rdo: IRdo) {
    if (
      rdo.nome &&
      rdo.data &&
      rdo.status &&
      rdo.condicoesTempo &&
      rdo.status &&
      rdo.users.length > 0 &&
      rdo.equipamentos.length > 0 &&
      rdo.atividades.length > 0 &&
      rdo.equipamentoId &&
      rdo.estruturaId
    ) {
      return true;
    }

    return false;
  }

  async function concluiRdo() {
    const realm = await db.connect();
    const rdo = await findRdo();

    dispatch({
      type: 'DONE',
    });

    if (rdo) {
      const connection = await NetInfo.fetch();
      if (connection.isInternetReachable) {
        const rdoData = {data: [rdo.toJSON()]};
        try {
          setLoading(true);
          await api.post('rdos', rdoData);
          realm.write(() => {
            realm.delete(rdo);
          });
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      } else {
        realm.write(() => {
          rdo.concluido = true;
        });
      }
    }
  }

  async function getStoredRdo(id: number) {
    const realm = await db.connect();
    const rdo = realm.objectForPrimaryKey<IRdo>('Rdo', id);
    if (rdo) {
      dispatch({type: 'CHANGE_ALL', value: rdo.toJSON()});
    }
  }

  async function deleteRdo() {
    const realm = await db.connect();
    const rdo = realm.objectForPrimaryKey<IRdo>('Rdo', state.rdoId);
    realm.write(() => {
      realm.delete(rdo);
    });
    navigation.goBack();
  }

  async function handleSumbitRdo() {
    await concluiRdo();
    navigation.goBack();
  }

  function confirmSubmit() {
    if (!validateRdo(state)) {
      Alert.alert(
        'Rdo incompleto',
        'Preencha todos os campos deste Rdo para concluir!',
      );
      return;
    }

    Alert.alert(
      'Confirmar envio do item?',
      'Esta ação não pode ser desfeita ou alterada, lembre-se de verificar os dados antes de enviar.',
      [{text: 'Cancelar'}, {text: 'Concluir', onPress: handleSumbitRdo}],
    );
  }

  async function loadCollections() {
    const realm = await db.connect();

    const usersData = realm.objects<IUser>('User').sorted('nome');
    const estruturasData = realm
      .objects<IEstrutura>('Estrutura')
      .sorted('nome');
    const equipamentosData = realm
      .objects<IEquipamento>('Equipamento')
      .sorted('tag')
      .filtered('sonda = true');

    setUsers(usersData.toJSON());
    setEquipamentos(equipamentosData.toJSON());
    setEstruturas(estruturasData.toJSON());
  }

  function confirmDeletion() {
    Alert.alert(
      'Você deseja apagar este item?',
      'Todos os dados serão apagados permanentemente.',
      [{text: 'Cancelar'}, {text: 'Apagar', onPress: deleteRdo}],
    );
  }

  useEffect(() => {
    async function updateStoredRdo() {
      const realm = await db.connect();
      const rdo = await findRdo();

      if (rdo) {
        realm.write(() => {
          rdo.nome = state.nome;
          rdo.data = state.data;
          rdo.condicoesTempo = state.condicoesTempo;
          rdo.pluviometria = state.pluviometria;
          rdo.status = state.status;
          rdo.users = state.users;
          rdo.equipamentos = state.equipamentos;
          rdo.atividades = state.atividades;
          rdo.concluido = state.concluido;
          rdo.equipamentoId = state.equipamentoId;
          rdo.estruturaId = state.estruturaId;
        });
      }
    }

    updateStoredRdo();
  }, [state, findRdo]);

  useEffect(() => {
    loadCollections();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getStoredRdo(params.rdoId);
    }, [params]),
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <ScrollView style={{paddingHorizontal: 16}}>
        <Title>RDO</Title>

        <Label>Nome</Label>
        <Input
          placeholder="Nome"
          value={state.nome}
          onChangeText={(text: string) =>
            dispatch({field: 'nome', type: 'CHANGE_STATE', value: text})
          }
        />

        <Label>Equipamento principal</Label>
        {equipamentos ? (
          <Select
            data={equipamentos}
            labelKey="tag_description"
            onSelect={(selected: IEquipamento) => {
              dispatch({
                field: 'equipamentoId',
                type: 'CHANGE_STATE',
                value: selected.id,
              });
            }}
            selectedValue={state.equipamentoId}
            valueKey="id"
            placeholder="Selecione um equipamento"
          />
        ) : null}

        <Label>Estrutura</Label>
        {estruturas ? (
          <Select
            data={estruturas}
            labelKey="nome"
            onSelect={(selected: IEstrutura) => {
              dispatch({
                field: 'estruturaId',
                type: 'CHANGE_STATE',
                value: selected.id,
              });
            }}
            selectedValue={state.estruturaId}
            valueKey="id"
            placeholder="Selecione uma estrutura"
          />
        ) : null}

        <Label>Data</Label>
        <DatePicker
          value={state.data}
          onChange={(_, date) => {
            const value = date || state.data;
            dispatch({field: 'data', type: 'CHANGE_STATE', value});
          }}
        />

        <Title>Condições do tempo</Title>
        <Picker
          onValueChange={value =>
            dispatch({
              field: 'condicoesTempo',
              type: 'CHANGE_STATE',
              value: value.toString(),
            })
          }
          data={condicoesTempo}
          selectedValue={state.condicoesTempo}
        />

        {state.condicoesTempo === 'chuvoso' ? (
          <React.Fragment>
            <Label>Pluviometria (mm)</Label>
            <Input
              placeholder="Pluviometria"
              value={state.pluviometria.toString()}
              keyboardType="numeric"
              onChangeText={(text: string) =>
                dispatch({
                  field: 'pluviometria',
                  type: 'CHANGE_STATE',
                  value: Number(text),
                })
              }
            />
          </React.Fragment>
        ) : null}

        <Title>Equipe</Title>
        {users && (
          <MultiSelect
            data={users}
            valueKey="id"
            labelKey="nome"
            selectedValues={state.users.map(item => item.userId)}
            onSelect={(selectedItem: IUser) => {
              const selectedItems = [...state.users, {userId: selectedItem.id}];
              dispatch({
                type: 'CHANGE_STATE',
                field: 'users',
                value: selectedItems,
              });
            }}
            onRemove={(removedItem: IUser) => {
              const selectedItems = [...state.users];

              const removedUserIndex = selectedItems.findIndex(
                ({userId}) => userId === removedItem.id,
              );

              selectedItems.splice(removedUserIndex, 1);

              dispatch({
                type: 'CHANGE_STATE',
                field: 'users',
                value: selectedItems,
              });
            }}
          />
        )}

        <Title>Equipamentos</Title>
        <EquipamentoRDO
          value={state.equipamentos}
          onSelect={(selected: IEquipamentoRdo) => {
            dispatch({
              type: 'CHANGE_STATE',
              field: 'equipamentos',
              value: [...state.equipamentos, selected],
            });
          }}
          onRemove={removedEquipamento => {
            const newState = state.equipamentos.filter(
              (item: IEquipamentoRdo) => {
                return item.equipamentoId !== removedEquipamento.id;
              },
            );
            dispatch({
              type: 'CHANGE_STATE',
              field: 'equipamentos',
              value: newState,
            });
          }}
        />

        <Title>Atividades</Title>
        <AtividadeRDO
          value={state.atividades}
          estruturaId={state.estruturaId}
          onRemove={atividadeIndex => {
            const newState = Object.values(state.atividades);

            newState.splice(atividadeIndex, 1);

            dispatch({
              type: 'CHANGE_STATE',
              field: 'atividades',
              value: newState,
            });
          }}
          onSelect={selectedAtividade => {
            dispatch({
              type: 'CHANGE_STATE',
              field: 'atividades',
              value: [...state.atividades, selectedAtividade],
            });
          }}
        />

        <Title>Status da atividade</Title>
        <Picker
          onValueChange={value =>
            dispatch({
              field: 'status',
              type: 'CHANGE_STATE',
              value: value.toString(),
            })
          }
          data={statusAtividade}
          selectedValue={state.status}
        />

        <FooterButtons>
          <Button title="Deletar RDO" onPress={confirmDeletion} type="error" />

          <Button
            title="Concluir RDO"
            onPress={confirmSubmit}
            type="success"
            removeMargin
          />
        </FooterButtons>
      </ScrollView>
    </Container>
  );
};

export default CreateRDO;
