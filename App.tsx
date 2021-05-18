import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import Routes from './src/routes';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Routes />
    </React.Fragment>
  );
}
