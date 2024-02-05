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
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Notifications from './screens/Notifications';

//const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// const screenOptions: StackNavigationOptions = {
//   cardStyle: {
//     backgroundColor: colors.light,
//   },
//   headerTitle: () => (
//     <Image
//       source={logo}
//       style={{
//         width: 40,
//         height: 24,
//       }}
//     />
//   ),
//   headerTitleAlign: 'center',
//   headerStyle: {
//     borderBottomWidth: 1,
//     borderBottomColor: 'rgba(0,0,0,0.08)',
//     elevation: 3,
//   },
// };

// function StackRoutes() {
//   return (
//     <Stack.Navigator screenOptions={screenOptions}>
//       <Stack.Screen
//         name="Preload"
//         component={Preload}
//         options={{headerShown: false}}
//       />

//       <Stack.Screen
//         name="Login"
//         component={Login}
//         options={{
//           headerShown: false,
//         }}
//       />

//       <Stack.Screen name="CreateRDO" component={CreateRDO} />
//       <Stack.Screen name="Home" component={TabRoutes} />
//     </Stack.Navigator>
//   );
// }

// function StackRoutes2() {
//   const Stack = createNativeStackNavigator();

//   return <>
//     <Stack.Navigator>
//       <Stack.Screen name="Preload" component={Preload} options={{headerShown: false}} />
//       <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
//       <Stack.Screen name="Home" component={TabRoutes2} options={{headerShown: false}} />
//     </Stack.Navigator>
//   </>
// }

// function TabRoutes2() {
//   return <>
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={Home} />
//       <Tab.Screen name="Settings" component={Settings} />
//     </Tab.Navigator>
//   </>
// }

// function TabRoutes() {
//   return (
//     <Tab.Navigator
      
//       screenOptions={({route}) => ({
//         tabBarIcon: ({color, size}) => {
//           let iconName = '';

//           switch (route.name) {
//             case 'Home':
//               iconName = 'home';
//               break;
//             case 'Settings':
//               iconName = 'settings';
//               break;
//             default:
//               iconName = 'bell';
//           }

//           return <Feather name={iconName} size={size} color={color} />;
//         },
//         "tabBarActiveTintColor": "#1C3B6B",
//         "tabBarShowLabel": false,
//         "tabBarStyle": [
//           {
//             "display": "flex"
//           },
//           null
//         ]
//       })}>
//       <Tab.Screen name="Home" component={Home} />
//       {/* <Tab.Screen name="Notifications" component={Notifications} /> */}
//       <Tab.Screen name="Settings" component={Settings} />
//     </Tab.Navigator>
//   );
// }

const TabRoutes = () => {
  return <Tab.Navigator>
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Settings" component={Settings} />
  </Tab.Navigator>
}
export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Preload" component={Preload} options={{headerShown: false}} />
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="Main" component={TabRoutes}/>
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="CreateRDO" component={CreateRDO} />

        {/* <Stack.Screen name="Home" component={TabRoutes2} options={{headerShown: false}} /> */}

        {/* <Tab.Navigator>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
