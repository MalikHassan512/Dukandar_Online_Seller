import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {Card} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {url} from '../../../constants/urls';
import {getData} from '../../NetworkRequest';

//SVGs
import ItemPic from '../../../../assets/ItemPic';
import ItemPicPlaceHolder from '../../../../assets/ItemPicPlaceHolderWithoutPlus';

import UpdateIcon from '../../../../assets/updateICon';

const PendingOrders = () => {
  const [apidata, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const token = useSelector(state => state.auth?.token);

  // {
  //   apidata.map((value, index) => {
  //     const id = value?.uuid;
  //     // console.log(id);
  //   });
  // }

  const getOrderFilerData = async () => {
    try {
      const res = await getData(token, 'shop/pending-order/');

      setApiData(res);
      // console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const renderData = ({item}) => {
    return (
      <>
        <Card
          // key={index}
          style={styles.Card}
          onPress={() =>
            navigation.navigate('OrderDetails', {order_key: item?.order_key})
          }>
          <View style={styles.TopView}>
            <ItemPicPlaceHolder />
            <View style={styles.ProductDetail}>
              {item.order_key === null || item.order_key === '' ? (
                <Text style={styles.ProductTitle}>
                  Null or Empty
                  {/* <Text style={styles.ProductGenre}>(Baby product)</Text> */}
                </Text>
              ) : (
                <Text style={styles.ProductTitle}>
                  Order Id: {item.order_key}
                  {/* <Text style={styles.ProductGenre}>(Baby product)</Text> */}
                </Text>
              )}

              <View style={styles.PriceAndQuantityView}>
                <Text>
                  Order Amount:{' '}
                  <Text style={styles.PriceText}>Rs.{item.total_price} </Text>
                </Text>
                {/* <Text style={styles.QuantityText}>
                  Quantity:
                  <Text style={styles.QuantityNo}> 3</Text>
                </Text> */}
              </View>
              <View style={styles.SoldAndRemainsView}>
                <Text> {item.created_at} </Text>
              </View>
            </View>
          </View>

          <View style={styles.updateView}>
            <Text style={{color: '#EB5D24'}}> {item.order_status} </Text>
          </View>
        </Card>
      </>
    );
  };

  useEffect(() => {
    getOrderFilerData();
  }, []);
  return loading ? (
    <View style={{justifyContent: 'center', flex: 1}}>
      <ActivityIndicator color={'#96C547'} size={'large'} />
    </View>
  ) : (
    <FlatList data={apidata} renderItem={renderData} />
  );
};

const styles = StyleSheet.create({
  QuantityNo: {fontWeight: 'bold', color: 'black'},
  ProductGenre: {color: '#D9D9D9', fontSize: 12},
  ProductTitle: {fontWeight: 'bold', color: 'black', fontSize: 15},
  ProductDetail: {marginLeft: 10},
  TopView: {flexDirection: 'row'},
  Card: {marginHorizontal: 15, marginVertical: 5},
  QuantityText: {marginLeft: 5},
  PriceText: {color: 'black', fontWeight: 'bold'},
  PriceAndQuantityView: {flexDirection: 'row', marginTop: 5},
  SoldQuantityView: {color: 'black', fontWeight: 'bold', marginLeft: 5},
  SoldAndRemainsView: {flexDirection: 'row', marginTop: 5},
  RemainsQuantityText: {color: 'black', fontWeight: 'bold'},
  RemainsText: {marginLeft: 26},
  DotMenuStyle: {position: 'absolute', right: 10, top: 5},
  updateView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 5,
    borderRadius: 40,
    height: 'auto',
    width: 'auto',
  },
  updateText: {color: 'white', marginLeft: 5},
});

export default PendingOrders;
