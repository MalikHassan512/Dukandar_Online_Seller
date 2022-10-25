import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {url} from '../../../constants/urls';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import {getData} from '../../NetworkRequest/index';
import OrderedItems from '../OrderedItems/Index';

//Header
import Header from '../../../shared/HeaderForOrderDetails';
import {Card, Divider} from 'react-native-paper';

const OrderDetails = () => {
  const {params} = useRoute();

  const [Apidata, setApiData] = useState([]);
  const [Loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const token = useSelector(state => state.auth?.token);

  const getApiData = async () => {
    try {
      // const res = await axios.get(
      //   `${url}shop/order-detail/?order_key=${params.order_key}`,
      //   {
      //     headers: {
      //       Authorization: `Token ${token}`,
      //     },
      //   },
      // );
      // setApiData(res);
      // console.log(JSON.stringify(Apidata));

      const res = await getData(token, 'shop/order-detail/', {
        order_key: params?.order_key,
      });

      setApiData(res);
      // console.log(res);error.res.data
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // const URL = `${url}shop/order/?id=8090`;
  // const id = URL.substring(URL.lastIndexOf('=') + 1);
  // // alert(id);

  useEffect(() => {
    getApiData();
  }, []);

  return Loading ? (
    <View style={{justifyContent: 'center', flex: 1}}>
      <ActivityIndicator color={'#96C547'} size={'large'} />
      {/* <Text>Hello</Text> */}
    </View>
  ) : (
    // <>
    //   {Apidata.map(val => (
    //     <Text> {val.tax} </Text>
    //   ))}
    // </>

    <>
      {Apidata?.map((item, index) => (
        <ScrollView>
          <Header />
          <Card style={styles.TopCardStyle} key={index}>
            <View style={styles.keyAndDate}>
              <View>
                <Text style={styles.TitleText}>Order Key</Text>
                {/* <Text style={styles.DetailText}>kg9782</Text> */}
                {/* <Text style={styles.DetailText}> {item.order_key} </Text> */}
                {item?.order_key === null ||
                item?.order_key === '' ||
                item?.order_key === undefined ? (
                  <Text style={styles.DetailText}> 12345 </Text>
                ) : (
                  <Text style={styles.DetailText}> {item?.order_key} </Text>
                )}
              </View>
              <View>
                <Text style={styles.TitleText}>Created Date</Text>
                {/* <Text style={styles.DetailText}>17-12-2021</Text> */}
                <Text style={styles.DetailText}> {item?.created_at}</Text>
              </View>
            </View>

            <View style={styles.DirectionAndspacebtw}>
              <View style={styles.TopAndHorizontalMargin}>
                <Text style={styles.TitleText}>Customer Name</Text>
                <Text style={styles.DetailText}> {item?.customer_name} </Text>
              </View>

              <View style={styles.TopAndHorizontalMargin}>
                <Text style={styles.TitleText}>Customer Number</Text>
                {/* <Text style={styles.DetailText}>+92 330 98786514</Text> */}

                <Text style={styles.DetailText}> </Text>
              </View>
            </View>

            <View style={styles.TopAndHorizontalMargin}>
              <Text style={styles.TitleText}>Delivery Address</Text>
              {/* <Text style={styles.DetailText}>
                House No 10, Street 8, F Block Johar Town, Lahore
              </Text> */}
              <Text style={styles.DetailText}> </Text>
            </View>

            <View style={styles.OrderStatusView}>
              <Text style={styles.TitleText}>Order Status</Text>
              <View style={styles.ButtonsView}>
                <TouchableOpacity style={styles.Pendingbutton}>
                  <Text style={styles.buttonText}> {item?.order_status} </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.CancelButton}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Divider />
            <OrderedItems ApiData={item.order_items} />
            <Divider />

            <Text style={styles.PaymentDetailText}>Payment Details</Text>
            <View style={styles.SubTotalView}>
              <Text style={styles.TitleText}>SubTotal</Text>
              <Text style={styles.SubTotalText}>
                PKR: {item?.base_price}
                {/* PKR: Null */}
              </Text>
            </View>
            <Divider />

            <View style={styles.SubTotalView}>
              <Text style={styles.TitleText}>Tax</Text>
              <Text style={styles.SubTotalText}>PKR: {item?.tax} </Text>
            </View>

            <Divider />
            <View style={styles.SubTotalView}>
              <Text style={styles.TitleText}>Delivery Charges</Text>
              <Text style={styles.SubTotalText}>
                PKR: {item?.delivery_charges}
              </Text>
            </View>

            <Divider />
            <View style={styles.SubTotalView}>
              <Text style={styles.TitleText}>Discount</Text>
              <Text style={styles.SubTotalText}>PKR: {item?.discount} </Text>
            </View>

            <Divider />
            <View style={styles.SubTotalView}>
              <Text style={styles.TextStyle}>Total:</Text>
              <Text style={styles.SubTotalText}>PKR: {item?.total_price}</Text>
            </View>

            <Divider />
            <View style={styles.SubTotalView}>
              <Text style={styles.TextStyle}>Paid Amount:</Text>
              <Text style={styles.SubTotalText}>PKR: {item?.paid_amount}</Text>
            </View>

            <Divider />

            <View style={styles.TextandButtonView}>
              <Text style={styles.TextStyle}>Order Type</Text>
              <View style={styles.Button}>
                <Text style={styles.BelowButtonText}> {item?.order_type} </Text>
              </View>
            </View>

            <View style={styles.TextandButtonView}>
              <Text style={styles.TextStyle}>Payment Method</Text>
              <View style={styles.Button}>
                <Text style={styles.BelowButtonText}>
                  {item?.payment_method?.method}
                </Text>
              </View>
            </View>

            <View style={styles.TextandButtonView}>
              <Text style={styles.TextStyle}>Payment Status</Text>
              <View style={styles.Button}>
                <Text style={styles.BelowButtonText}>
                  {item?.payment_status}
                </Text>
              </View>
            </View>
          </Card>
        </ScrollView>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  BelowButtonText: {color: 'white', fontWeight: 'bold', fontSize: 15},
  Button: {
    backgroundColor: '#96C547',
    width: 120,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  TextStyle: {color: 'black', fontWeight: 'bold', fontSize: 16},
  TextandButtonView: {
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  SubTotalView: {
    marginHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 10,
  },
  SubTotalText: {color: 'black', fontWeight: 'bold', fontSize: 16},
  TitleText: {color: '#B4B4B4', fontSize: 15, marginRight: 10},
  DetailText: {color: 'black', fontWeight: 'bold'},
  keyAndDate: {
    marginHorizontal: 20,
    marginTop: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  TopCardStyle: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginTop: -25,
  },
  TopAndHorizontalMargin: {marginTop: 5, marginHorizontal: 20},
  OrderStatusView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  DirectionAndspacebtw: {flexDirection: 'row', justifyContent: 'space-between'},
  ButtonsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 140,
  },
  Pendingbutton: {
    backgroundColor: '#96C547',
    width: 70,
    alignItems: 'center',
    borderRadius: 10,
    padding: 0.5,
  },
  buttonText: {color: 'white'},
  CancelButton: {
    backgroundColor: 'red',
    width: 60,
    alignItems: 'center',
    borderRadius: 10,
    padding: 2,
  },
  PaymentDetailText: {
    marginHorizontal: 20,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default OrderDetails;
