import React from 'react';
import {Image} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Feather from 'react-native-vector-icons/Feather';

import colors from './styles/colors';
import logo from './assets/logo.png';

import Preload from './screens/Preload';
import Login from './screens/Login';

import Home from './screens/Home';
import CreateRDO from './screens/CreateRDO';
import Settings from './screens/Settings';
// import Notifications from './screens/Notifications';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptions: StackNavigationOptions = {
  cardStyle: {
    backgroundColor: colors.light,
  },
  headerTitle: () => (
    <Image
      source={logo}
      style={{
        width: 40,
        height: 24,
      }}
    />
  ),
  headerTitleAlign: 'center',
  headerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.08)',
    elevation: 3,
  },
};

function StackRoutes() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Preload"
        component={Preload}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen name="CreateRDO" component={CreateRDO} />
      <Stack.Screen name="Home" component={TabRoutes} />
    </Stack.Navigator>
  );
}

function TabRoutes() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.primary,
        showLabel: false,
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName = '';

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Settings':
              iconName = 'settings';
              break;
            default:
              iconName = 'bell';
          }

          return <Feather name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      {/* <Tab.Screen name="Notifications" component={Notifications} /> */}
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

export default function Routes() {
  return (
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  );
}
