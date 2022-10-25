import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

//components
import PendingOrdersComponents from '../../Home/components/PendingOrders';

const PendingOrders = () => {
  return (
    <>
      <View style={{marginVertical: 10}}>
        <PendingOrdersComponents />
      </View>

      {/* <View>
        <PendingOrdersComponents />
      </View> */}
    </>
  );
};

const styles = StyleSheet.create({});

export default PendingOrders;
