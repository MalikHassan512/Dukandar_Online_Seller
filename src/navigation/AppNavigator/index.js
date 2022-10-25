import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from '../AppStacks/Auth';
import HomeStack from '../AppStacks/Home';
import BottomTab from '../BottomTab/index';
import {useSelector} from 'react-redux';

const AppNavigator = () => {
  const status = useSelector(state => state.auth?.status);

  return (
    <NavigationContainer>
      {status ? <BottomTab /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
