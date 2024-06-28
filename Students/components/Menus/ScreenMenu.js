import { View, Text } from 'react-native';
import React, {useContext} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../screens/auth/Login';
import Register from '../../screens/auth/Register';
import Home from '../../screens/Home';
import { AuthContext } from '../../context/authContext';
import HeaderMenu from './HeaderMenu';
import AddNew from '../../screens/AddNew';
import About from '../../screens/About';
import User from '../../screens/User';
import Myposts from '../../screens/Myposts';

const ScreenMenu = () => {

    //global state
    const [state] = useContext(AuthContext);
    //auth condition true false
    const authenticatedUser = state?.user && state?.token;
    const Stack = createNativeStackNavigator();
    return (
          <Stack.Navigator initialRouteName='Login'>
            { authenticatedUser ? (
            <>
             <Stack.Screen 
             name="Home" 
             component={Home} 
             options={{
                title:"Students Details",
                headerRight: () => <HeaderMenu />,
             }} 
             />
             <Stack.Screen 
             name="AddNew" 
             component={AddNew} 
             options={{
                title:"Add New",
                headerBackTitle:"Back",
                headerRight: () => <HeaderMenu />,
             }} 
             />
             <Stack.Screen 
             name="Details" 
             component={Myposts} 
             options={{
                headerBackTitle:"Back",
                headerRight: () => <HeaderMenu />,
             }} 
             />
             <Stack.Screen 
             name="User" 
             component={User} 
             options={{
                headerBackTitle:"Back",
                headerRight: () => <HeaderMenu />,
             }} 
             />

            </>
            ) : (
                <>
                <Stack.Screen 
                name="Login" 
                component={Login} 
                options={{headerShown:false}} 
                />

                <Stack.Screen 
                name="Register" 
                component={Register} 
                options={{headerShown:false}} 
                />
                </>
            ) }
          </Stack.Navigator>
      );
}

export default ScreenMenu;