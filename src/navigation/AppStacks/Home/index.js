import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//screens
import Home from '../../../screens/Home';
import AddItem from '../../../screens/Items/addItem';
import ItemList from '../../../screens/Items/ItemList';
import Profile from '../../../screens/Profile';
import Orders from '../../../screens/Orders';
import Notification from '../../../screens/Notification';
import OrderDetails from '../../../screens/Orders/OrderDetails';
import PendingOrders from '../../../screens/Orders/PendingOrders';
import AxiosTest from '../../../screens/Test/AxiosTest';
import PickerSelect from '../../../screens/Test/RNPickerSelect';
import EditItem from '../../../screens/Items/editItem';
//component
import HeaderForOrderDetials from '../../../shared/HeaderForOrderDetails';

const Stack = createNativeStackNavigator();
const {Navigator, Screen} = Stack;

const HomeStack = () => {
  return (
    <Navigator>
      <Screen component={Home} name="Home" options={{headerShown: false}} />
      <Screen
        component={AddItem}
        name="AddItem"
        options={{headerShown: false}}
      />

      <Screen
        component={Profile}
        name="Profile"
        options={{headerShown: false}}
      />
      <Screen component={Orders} name="Orders" options={{headerShown: false}} />

      <Screen
        component={Notification}
        name="Notification"
        options={{headerShown: false}}
      />

      <Screen
        component={OrderDetails}
        name="OrderDetails"
        options={{
          headerShown: false,
          // headerTitle: () => <HeaderForOrderDetials />,
        }}
      />

      <Screen
        component={PendingOrders}
        name="PendingOrders"
        options={{
          headerShown: true,
          title: 'Pending Orders',
          headerTitleAlign: 'center',
        }}
      />

      <Screen
        component={AxiosTest}
        name="AxiosTest"
        options={{
          headerShown: true,
          title: 'Axios Test',
          headerTitleAlign: 'center',
        }}
      />

      <Screen
        component={PickerSelect}
        name="PickerSelect"
        options={{
          headerShown: true,
          title: 'PickerSelect',
          headerTitleAlign: 'center',
        }}
      />

      <Screen
        component={EditItem}
        name="EditItem"
        options={{
          headerShown: true,
          title: 'Edit Item',
          headerTitleAlign: 'center',
        }}
      />
    </Navigator>
  );
};

export default HomeStack;
