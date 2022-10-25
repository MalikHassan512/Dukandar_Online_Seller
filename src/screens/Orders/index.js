import React, {useState} from 'react';
import {View, useWindowDimensions, Text, StyleSheet} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

import CompletedOrders from './CompletedOrders/index';
import NewOrders from './NewOrders';

const FirstRoute = () => {
  return (
    <>
      <View style={{marginVertical: 10}}>
        <CompletedOrders />
      </View>
    </>
  );
};

const SecondRoute = () => (
  <View style={{marginVertical: 10}}>
    <NewOrders />
  </View>
);

const renderScene = SceneMap({
  first: SecondRoute,
  second: FirstRoute,
});

const Orders = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'New Orders'},
    {key: 'second', title: 'Completed Orders'},
  ]);
  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={props => (
        <TabBar
          {...props}
          style={{backgroundColor: '#faf9f5'}}
          indicatorStyle={{backgroundColor: '#96C547'}}
          labelStyle={{color: '#96C547'}}
          inactiveColor="grey"
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Orders;
