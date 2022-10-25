import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {Card} from 'react-native-paper';

//SVG
import ItemPic from '../../../../assets/ItemPic';

const OrderedItem = props => {
  console.log(props);
  // console.log(props.ApiData.map(item => item.order_items.map(val => val.item)));
  // console.log(props?.ApiData?.order_items);
  return (
    <>
      <Text style={styles.TitleStyle}>Ordered Items:</Text>
      {props.ApiData.map((item, index) => (
        <View style={styles.TopView} key={index}>
          <ItemPic height={50} width={50} />
          <Text style={styles.ItemNameText}>{item.item}</Text>
          <Text>
            {'( X'} {item.quantity} {')'}
          </Text>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  Card: {marginVertical: 10},
  TopView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 5,
    width: 220,
  },
  ItemNameText: {color: 'black', fontWeight: 'bold', marginHorizontal: 5},
  TitleStyle: {
    marginHorizontal: 20,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default OrderedItem;
