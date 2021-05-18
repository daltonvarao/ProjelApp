import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {useNavigation, CommonActions} from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';

import {Container, Logo, StatusMessage} from './styles';

import logo from '../../assets/logo.png';
import colors from '../../styles/colors';

import api from '../../services/api';
import * as sync from '../../services/sync';
import * as auth from '../../services/auth';

const Preload: React.FC = () => {
  const [message, setMessage] = useState('');

  const navigation = useNavigation();

  const resetNavigation = useCallback(
    (name: string) => {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            {
              name,
            },
          ],
        }),
      );
    },
    [navigation],
  );

  async function syncWithApi() {
    try {
      setMessage('Baixando dados do servidor.');
      const response = await api.get('sync-data');

      setMessage('Instalando atualizações.');
      await sync.syncWithApi(response.data);
    } catch (error) {
      setMessage('Não foi possível conectar ao servidor!');
      console.log(error.toJSON());
    }
  }

  async function sendLocalData() {
    const localRdos = await sync.checkLocalData();

    if (localRdos.length > 0) {
      try {
        setMessage('Enviando dados para o servidor.');
        await api.post('/rdos', {data: localRdos});
        await sync.removeLocalData();
      } catch (error) {
        console.log(error.toJSON());
      }
    }
  }

  useEffect(() => {
    async function syncOperations() {
      const token = await auth.isLoggedIn();

      if (!token) {
        setMessage('Faça login para continuar');
        resetNavigation('Login');
        return;
      }

      const connection = await NetInfo.fetch();

      if (connection.isInternetReachable) {
        await sendLocalData();
        const currentSyncVersion = await sync.getCurrentSyncVersion();

        if (!currentSyncVersion) {
          await syncWithApi();
        } else {
          try {
            const response = await api.get('sync-version-is-outdated', {
              params: {
                sync_version_id: currentSyncVersion.id,
              },
            });

            const {outdated} = response.data;

            if (outdated) {
              await syncWithApi();
            } else {
              setMessage('Aplicação atualizada.');
            }
          } catch (error) {
            setMessage('Não foi possível conectar ao servidor.');
            console.log(error.toJSON());
          }
        }
      }

      resetNavigation('Home');
    }
    syncOperations();
  }, [resetNavigation]);

  return (
    <Container>
      <Logo source={logo} />
      <StatusMessage>{message}</StatusMessage>
      <ActivityIndicator color={colors.primary} />
    </Container>
  );
};

export default Preload;
