import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';

//SVGs
import HeaderBackButton from '../../assets/headerBackButton';
import EditOrder from '../../assets/editOrderIcon';

const HeaderForOrderDetials = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.OuterView}>
      <View style={styles.BackAndTitleView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <HeaderBackButton />
        </TouchableOpacity>
        <Text style={styles.TitleText}>Order Details</Text>
      </View>
      <EditOrder />
    </View>
  );
};

const styles = StyleSheet.create({
  OuterView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#96C547',
    // alignItems: 'center',
    height: 80,
  },
  BackAndTitleView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  TitleText: {color: 'white', fontWeight: 'bold', fontSize: 16},
});

export default HeaderForOrderDetials;
