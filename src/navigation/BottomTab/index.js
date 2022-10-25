import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/core';

//screens
import HomeStack from '../AppStacks/Home/index';
import ItemList from '../../screens/Items/ItemList';
import Orders from '../../screens/Orders';
import AddItem from '../../screens/Items/addItem';
import Profile from '../../screens/Profile/index';
//Icons
import HomeIcon from '../../../assets/BottomHomeTabIcon';
import ItemIcon from '../../../assets/ItemIconBottomTab';
import OrdersIcon from '../../../assets/OrdersBottomIcon';
import ProfileIcon from '../../../assets/ProfileBottomIcon';
import AddItemicon from '../../../assets/AddItemIConBottom';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const navigation = useNavigation();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeScreen"
        component={HomeStack}
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: () => <HomeIcon />,
        }}
      />

      <Tab.Screen
        name="ItemList"
        component={ItemList}
        options={{
          title: 'Items',
          headerShown: false,
          tabBarIcon: () => <ItemIcon />,
        }}
      />

      <Tab.Screen
        name="AddItem"
        component={AddItem}
        options={{
          title: 'Add Item',
          headerShown: false,
          tabBarIcon: () => <AddItemicon />,
          tabBarIconStyle: {marginBottom: 25},
        }}
      />

      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          title: 'Orders',
          headerShown: false,
          tabBarIcon: () => <OrdersIcon />,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: () => <ProfileIcon />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
