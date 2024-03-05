import React, {useEffect} from 'react';
import {StatusBar, Text} from 'react-native';
import {Routes} from './src/Routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import SplashScreen from 'react-native-splash-screen';
import { ENVIRONMENT } from './src/environment';

export default function App() {
  // useEffect(() => {
  //   SplashScreen.hide();
  // }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <React.Fragment>

        {ENVIRONMENT == 'TEST' && <Text style={{
          backgroundColor: 'red',
          color: 'white',
          textAlign: 'center',
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 0,
          paddingRight: 0
        }}>
          HOMOLOGAÇÃO
        </Text>}

        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <Routes />
      </React.Fragment>
    </GestureHandlerRootView>
  );
}
