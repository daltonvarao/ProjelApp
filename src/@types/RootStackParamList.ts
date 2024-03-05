export type RootStackParamList = {
    Home: undefined;
    Profile: { userId: string };
    Feed: { sort: 'latest' | 'top' } | undefined;
    Preload: undefined;
    Login: undefined
    Main: undefined
    Settings: undefined
    CreateRDO: undefined
  };