import React, {useState, useCallback} from 'react';
import {
  FlatList,
  ListRenderItem,
  View,
  RefreshControl,
  Alert,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';

import Feather from 'react-native-vector-icons/Feather';

import {
  Container,
  FloatingButton,
  FloatingTextButton,
  RDOContainer,
  RDOIconImg,
  RDOIcon,
  RDONome,
  RDOStatus,
  RDODate,
  ActionButton,
  ActionButtonText,
  EmptyMessage,
  RDOHeader,
  RDOInfo,
  RDOActions,
  RDOHeaderInfo,
} from './styles';

import {HeaderText} from '../../styles/globals';

import hammerScrewdriverImg from '../../assets/hammer-screwdriver.png';
import colors from '../../styles/colors';

import * as db from '../../db';
import {IRdo} from '../../db/models/RdoSchema';

import parseDate from '../../utils/parseDate';
import api from '../../services/api';

export default function Home() {
  const navigation = useNavigation();
  const [rdos, setRdos] = useState<IRdo[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  async function fetchActiveRdos() {
    const realm = await db.connect();

    const data = realm.objects<IRdo>('Rdo').filtered('concluido == false');

    setRdos(data.toJSON());

    setRefreshing(false);
  }

  async function createNewRdo() {
    const state: IRdo = {
      nome: '',
      condicoesTempo: 'bom',
      data: new Date(),
      pluviometria: 0,
      status: 'andamento',
      rdoId: Date.now(),
      concluido: false,
      users: [],
      equipamentos: [],
      atividades: [],
    };

    const realm = await db.connect();

    realm.write(() => {
      realm.create<IRdo>('Rdo', {...state});
    });

    return state.rdoId;
  }

  async function handleNewRDO() {
    const rdoId = await createNewRdo();

    navigation.navigate('CreateRDO', {
      rdoId,
    });
  }

  function handleOpenRdo({rdoId}: IRdo) {
    navigation.navigate('CreateRDO', {
      rdoId,
    });
  }

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

  async function validateAndSumbitRdo(rdoId: number) {
    const realm = await db.connect();
    const rdo = realm.objectForPrimaryKey<IRdo>('Rdo', rdoId);

    if (!rdo) return;

    if (validateRdo(rdo)) {
      confirmSubmitRdo(rdoId);
    } else {
      Alert.alert(
        'Rdo incompleto',
        'Preencha todos os campos deste Rdo para concluir!',
      );
    }
  }

  function confirmSubmitRdo(rdoId: number) {
    Alert.alert(
      'Confirmar envio do item?',
      'Esta ação não pode ser desfeita ou alterada, lembre-se de verificar os dados antes de enviar.',
      [
        {text: 'Cancelar'},
        {text: 'Concluir', onPress: () => concluiRdo(rdoId)},
      ],
    );
  }

  async function concluiRdo(rdoId: number) {
    const realm = await db.connect();

    const rdo = realm.objectForPrimaryKey<IRdo>('Rdo', rdoId);

    if (rdo) {
      const connection = await NetInfo.fetch();

      if (connection.isInternetReachable) {
        const rdoData = {data: [rdo.toJSON()]};

        try {
          await api.post('rdos', rdoData);

          realm.write(() => {
            realm.delete(rdo);
          });
        } catch (error) {
          console.log(error.toJSON());
        }
      } else {
        realm.write(() => {
          rdo.concluido = true;
        });
      }
    }

    fetchActiveRdos();
  }

  useFocusEffect(
    useCallback(() => {
      fetchActiveRdos();
    }, []),
  );

  const renderItem: ListRenderItem<IRdo> = ({item, index}) => {
    return (
      <RDOContainer>
        <RDOHeader>
          <RDOHeaderInfo>
            <RDOIcon>
              <RDOIconImg source={hammerScrewdriverImg} />
            </RDOIcon>

            <RDOInfo>
              <RDONome numberOfLines={1}>
                {item.nome || `Sem titulo ${index + 1}`}
              </RDONome>
              <RDOStatus>{item.status}</RDOStatus>
            </RDOInfo>
          </RDOHeaderInfo>

          <RDODate>{parseDate(item.data)}</RDODate>
        </RDOHeader>

        <RDOActions>
          <ActionButton
            onPress={() => validateAndSumbitRdo(item.rdoId)}
            backgroundColor={colors.success}>
            <ActionButtonText>Concluir</ActionButtonText>
          </ActionButton>
          <ActionButton
            onPress={() => handleOpenRdo(item)}
            backgroundColor={colors.primary}>
            <ActionButtonText>Abrir</ActionButtonText>
          </ActionButton>
        </RDOActions>
      </RDOContainer>
    );
  };

  return (
    <Container>
      <HeaderText>RDOS Ativos</HeaderText>

      {!rdos.length && (
        <EmptyMessage>Nenhum RDO Ativo para mostrar</EmptyMessage>
      )}

      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchActiveRdos} />
        }
        data={rdos}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />

      <FloatingButton onPress={handleNewRDO}>
        <Feather name="plus" size={22} color="#ffffff" />
        <FloatingTextButton>NOVO RDO</FloatingTextButton>
      </FloatingButton>
    </Container>
  );
}
