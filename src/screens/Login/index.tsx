import React, {useState, useEffect} from 'react';
import {Image, ToastAndroid} from 'react-native';
import {useNavigation, CommonActions} from '@react-navigation/native';

import * as auth from '../../services/auth';
import * as Masks from '../../utils/masks';

import {
  Container,
  LoginContainer,
  Input,
  LoginHeader,
  LoginTitle,
  Button,
  TextButton,
  InvalidInput,
} from './styles';

import logo from '../../assets/logo.png';
import api from '../../services/api';
import Loader from '../../components/Loader';
import colors from '../../styles/colors';

export default function Login() {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    if (cpf.length === 14 && password.length >= 6) {
      setLoginButtonDisabled(false);
    } else {
      setLoginButtonDisabled(true);
    }
  }, [cpf, password]);

  async function handleLoginButton() {
    try {

      console.log('logando')
      
      const response = await api.post('/auth', {
        cpf: Masks.cpfUnmask(cpf),
        password,
      });
      const {token, userId} = response.data;

      await auth.login(token, userId);

      setLoading(false);

      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            {
              name: 'Preload',
            },
          ],
        }),
      );
    } catch (err) {
      console.log(err.toJSON());

      if (!err.response) {
        ToastAndroid.show('Não foi possivel conectar ao servidor', 300);
      }

      setLoading(false);

      if (err.response?.data?.errors) {
        setError(err.response.data.errors[0].message);
      }
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <LoginContainer>
        <LoginHeader>
          <Image source={logo} />
          <LoginTitle>Projel</LoginTitle>
        </LoginHeader>

        <Input
          value={cpf}
          onChangeText={text => setCpf(Masks.cpf(text))}
          placeholder="CPF"
          placeholderTextColor={colors.lightGray}
          keyboardType="numeric"
          maxLength={14}
        />

        <Input
          value={password}
          secureTextEntry
          onChangeText={setPassword}
          placeholder="Senha"
          placeholderTextColor={colors.lightGray}
        />

        {error ? <InvalidInput>{error}</InvalidInput> : null}

        <Button
          disabled={loginButtonDisabled}
          activeOpacity={0.7}
          onPress={handleLoginButton}>
          <TextButton>Entrar</TextButton>
        </Button>
      </LoginContainer>
    </Container>
  );
}
