import AsyncStorage from '@react-native-community/async-storage'

import * as Auth from './auth'

// Auth.isLoggedIn(): string => check if 'token' exists on AsyncStorage
// Auth.login(token: string): void => save 'token' on AsyncStorage
// Auth.logout(): void => remove 'token' from AsyncStorage

describe('Auth utils', () => {
  it("should Auth.isLoggedIn() return saved 'token' in AsyncStorage", async () => {
    await AsyncStorage.setItem('token', '123456')
    const token = await Auth.isLoggedIn()

    expect(token).toEqual('123456')
  })

  it.only("should Auth.login(token: string) saves a new 'token' in AsyncStorage", async () => {
    await Auth.login('123456', 1)
    const token = await AsyncStorage.getItem('token')
    const userId = await AsyncStorage.getItem('userId')

    expect(token).toEqual('123456')
    expect(userId).toEqual('1')
  })

  it("should Auth.logout() removes the 'token' from AsyncStorage", async () => {
    await AsyncStorage.setItem('token', '123456')
    await AsyncStorage.setItem('userId', '1')

    await Auth.logout()

    const removedToken = await AsyncStorage.getItem('token')
    const removedUserId = await AsyncStorage.getItem('userId')

    expect(removedToken).toBeNull()
    expect(removedUserId).toBeNull()
  })
})
