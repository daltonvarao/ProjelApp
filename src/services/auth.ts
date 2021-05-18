import AsyncStorage from '@react-native-community/async-storage';

export async function isLoggedIn() {
  const token = await AsyncStorage.getItem('token');

  return token;
}

export async function userId() {
  try {
    const storedUserId = await AsyncStorage.getItem('userId');

    return storedUserId;
  } catch (error) {
    return false;
  }
}

export async function login(token: string, storedUserId: number | string) {
  await AsyncStorage.setItem('token', token);
  await AsyncStorage.setItem('userId', String(storedUserId));
}

export async function logout() {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('userId');
}
