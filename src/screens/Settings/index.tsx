import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Animated, Easing, ToastAndroid, Alert} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {RectButton} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import NetInfo from '@react-native-community/netinfo';

import {
  Container,
  InfoCard,
  InfoContainer,
  InfoLabel,
  InfoTitle,
  LogoutTitle,
  NameAbbrCircle,
  NameContainer,
  NameText,
  Title,
  SyncTitle,
} from './styles';

import Loader from '../../components/Loader';

import {IUser} from '../../db/models/UserSchema';
import {cpf} from '../../utils/masks';
import abbrfy from '../../utils/abbrfy';
import colors from '../../styles/colors';
import api from '../../services/api';

import * as auth from '../../services/auth';
import * as db from '../../db';
import * as sync from '../../services/sync';

export default function Notifications() {
  const navigation = useNavigation();

  const spin = new Animated.Value(0);
  const [user, setUser] = useState<IUser>();
  const [spinValue, setSpinValue] = useState<Animated.AnimatedInterpolation>();

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
      const response = await api.get('sync-data');

      await sync.syncWithApi(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function sendLocalData() {
    const localRdos = await sync.checkLocalData();

    if (localRdos.length > 0) {
      try {
        await api.post('/rdos', {data: localRdos});
        await sync.removeLocalData();
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function syncOperations() {
    ToastAndroid.show('Sincronizando dados', 300);
    Animated.timing(spin, {
      toValue: 30,
      duration: 60 * 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    setSpinValue(
      spin.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
      }),
    );

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
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    resetNavigation('Home');
  }

  useEffect(() => {
    async function loadUser() {
      const realm = await db.connect();
      try {
        const id = await auth.userId();

        if (!id) {
          await auth.logout();
          resetNavigation('Login');
          throw 'userId not found';
        }

        const storedUser = realm.objectForPrimaryKey<IUser>('User', Number(id));

        if (!storedUser) {
          await auth.logout();
          resetNavigation('Login');
          throw 'User not found';
        }

        setUser(storedUser?.toJSON());
      } catch (error) {
        console.log(error);
      }
    }
    loadUser();
  }, [resetNavigation]);

  function confirmLogout() {
    Alert.alert(
      'Confirmar logout?',
      'Esta ação removerá os dados locais, envie os dados pendentes antes de continuar.',
      [{text: 'Cancelar'}, {text: 'Continuar', onPress: logout}],
    );
  }

  async function logout() {
    await sync.resetLocalDB();

    await auth.logout();

    resetNavigation('Login');
  }

  if (!user) {
    return <Loader />;
  }

  return (
    <Container>
      <NameContainer>
        <NameAbbrCircle>{abbrfy(user.nome)}</NameAbbrCircle>
        <NameText>{user.nome}</NameText>
      </NameContainer>

      <InfoContainer>
        <InfoCard>
          <InfoLabel>Cpf</InfoLabel>
          <InfoTitle>{cpf(user.cpf)}</InfoTitle>
        </InfoCard>

        <Title>Opções</Title>

        <RectButton onPress={syncOperations} style={[styles.button]}>
          <SyncTitle>Sincronizar dados offline</SyncTitle>
          <Animated.View
            style={{
              transform: [
                {
                  rotate: spinValue ?? '0deg',
                },
              ],
            }}>
            <Feather color={colors.success} name="refresh-cw" size={26} />
          </Animated.View>
        </RectButton>

        <RectButton
          onPress={confirmLogout}
          style={[styles.button, styles.logoutButton]}>
          <LogoutTitle>Encerrar sessão</LogoutTitle>
          <Feather color="white" name="log-out" size={26} />
        </RectButton>
      </InfoContainer>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 10,
    elevation: 2,
    marginBottom: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  logoutButton: {
    backgroundColor: '#ff6e6e',
  },
});
