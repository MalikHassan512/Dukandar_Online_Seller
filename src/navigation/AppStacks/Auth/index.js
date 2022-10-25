import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//screens
import Login from '../../../screens/Auth/Login';
import Home from '../../../screens/Home';
import Notification from '../../../screens/Notification';
import Orders from '../../../screens/Orders';
import ForgotPassword from '../../../screens/Auth/ForgotPassword';

const Stack = createNativeStackNavigator();
const {Navigator, Screen} = Stack;

const AuthStack = () => {
  return (
    <Navigator>
      <Screen component={Login} name="Login" options={{headerShown: false}} />

      <Screen component={Home} name="Home" options={{headerShown: false}} />

      <Screen
        component={Notification}
        name="Notification"
        options={{headerShown: false}}
      />

      <Screen component={Orders} name="Orders" options={{headerShown: false}} />

      <Screen
        component={ForgotPassword}
        name="ForgotPassword"
        options={{headerShown: false}}
      />
    </Navigator>
  );
};

export default AuthStack;
