import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from 'react-native';
import {Card} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';
import {useSelector, useDispatch} from 'react-redux';
import {url} from '../../../constants/urls';
import axios from 'axios';
import {getData} from '../../NetworkRequest/index';

//SVGs
import ItemPic from '../../../../assets/ItemPic';
import ItemPicPlaceHolder from '../../../../assets/ItemPicPlaceHolderWithoutPlus';

const CompletedOrders = () => {
  const [ApiShopOrdersFilterdata, setApiShopOrdersFilterData] = useState([]);
  const [Loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const token = useSelector(state => state.auth?.token);

  const getShopOrdersFilters = async () => {
    try {
      // const pro = await axios.get(`${url}shop/order/?id=8090`, {
      //   headers: {
      //     Authorization: `Token ${token}`,
      //   },
      // });

      const pro = await getData(token, 'shop/completed-order/');

      // console.log(pro);

      setApiShopOrdersFilterData(pro);
      // console.log(JSON.stringify(pro));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getShopOrdersFilters();
  }, []);

  const renderData = ({item}) => {
    return (
      <>
        <Card
          key={item.uuid}
          style={styles.Card}
          onPress={() => {
            navigation.navigate('OrderDetails', {order_key: item?.order_key});
          }}>
          <View style={styles.TopView}>
            <ItemPicPlaceHolder />
            <View style={styles.ProductDetail}>
              <Text style={styles.ProductTitle}>
                Order Id:{''} {item.order_key}
                {/* <Text style={styles.ProductGenre}>(Baby product)</Text> */}
              </Text>
              <View style={styles.PriceAndQuantityView}>
                <Text>
                  Order Amount: {''}
                  <Text style={styles.PriceText}>Rs. {item.total_price}</Text>
                </Text>
                {/* <Text style={styles.QuantityText}>
                  Quantity:
                  <Text style={styles.QuantityNo}> 3</Text>
                </Text> */}
              </View>
              <View style={styles.SoldAndRemainsView}>
                {/* <Text>Jan 20, 2021 at 21:58 PM</Text> */}
                <Text> {item.created_at} </Text>
              </View>
            </View>
          </View>

          <View style={styles.updateView}>
            <Text style={{color: '#96C547'}}> {item.order_status} </Text>
          </View>
        </Card>
      </>
    );
  };

  return Loading ? (
    <View style={{justifyContent: 'center', flex: 1}}>
      <ActivityIndicator color={'#96C547'} size={'large'} />
    </View>
  ) : (
    <>
      <FlatList
        data={ApiShopOrdersFilterdata}
        renderItem={renderData}
        // keyExtractor={(item, index) => index.toString()}
        // initialNumToRender={10}
        // onEndReached={handleLoadMore}
        // ListFooterComponent={renderFooter}
        // onEndReachedThreshold={0.5}
        // maxToRenderPerBatch={10}
        // removeClippedSubviews={true}
        // refreshing={loading}
      />
    </>
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

export default CompletedOrders;

// {ApiShopOrdersFilterdata.map((item, index) =>
//   item.order_status === 'delivered' ||
//   item.order_status === 'Delivered' ? (
//     <Card
//       key={item.uuid}
//       style={styles.Card}
//       onPress={() => {
//         navigation.navigate('OrderDetails');
//       }}>
//       <View style={styles.TopView}>
//         <ItemPic />
//         <View style={styles.ProductDetail}>
//           <Text style={styles.ProductTitle}>
//             Navia Baby Lotion
//             <Text style={styles.ProductGenre}>(Baby product)</Text>
//           </Text>
//           <View style={styles.PriceAndQuantityView}>
//             <Text>
//               Price:
//               <Text style={styles.PriceText}>Rs. {item.total_price}</Text>
//             </Text>
//             <Text style={styles.QuantityText}>
//               Quantity:
//               <Text style={styles.QuantityNo}> 3</Text>
//             </Text>
//           </View>
//           <View style={styles.SoldAndRemainsView}>
//             {/* <Text>Jan 20, 2021 at 21:58 PM</Text> */}
//             <Text> {item.created_at} </Text>
//           </View>
//         </View>
//       </View>

//       <View style={styles.updateView}>
//         <Text style={{color: '#96C547'}}> {item.order_status} </Text>
//       </View>
//     </Card>
//   ) : (
//     <View>
//       <Text> No Order history </Text>
//     </View>
//   ),
// )}
