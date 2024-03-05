import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Text, View } from "react-native";
import Home from "./screens/Home";
import Settings from "./screens/Settings";
import Preload from "./screens/Preload";
import Login from "./screens/Login";
import CreateRDO from "./screens/CreateRDO";
import { RootStackParamList } from "./@types/RootStackParamList";
import Feather from 'react-native-vector-icons/Feather';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const TabRoutes = () => {
    return <Tab.Navigator
        screenOptions={({route}) => ({
            tabBarIcon: ({focused, size, color}) => {

                const routeIcon = {
                    'Home': 'home',
                    'Settings': 'settings'
                }

                console.log(`route.name: ${route.name}`)

                return <Feather
                    name={routeIcon[route.name as keyof typeof routeIcon]}
                    size={size}
                    color={color}/>
            }
        })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  }




export const Routes = () => {
    return <>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Preload" component={Preload} options={{headerShown: false}} />
                <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
                <Stack.Screen name="Main" component={TabRoutes}/>
                <Stack.Screen name="Settings" component={Settings} />
                <Stack.Screen name="CreateRDO" component={CreateRDO} />
            </Stack.Navigator>
        </NavigationContainer>
    </>
}
