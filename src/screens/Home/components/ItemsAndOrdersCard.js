import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {Card} from 'react-native-paper';

//SVGs
import MyItem from '../../../../assets/myItemsSVG';
import TotalOrders from '../../../../assets/totalOrders';

const {height, width} = Dimensions.get('window');

const ItemsAndOrdersCard = props => {
  return (
    <>
      <View style={styles.OuterMostView}>
        <Card style={styles.CardStyle}>
          <MyItem style={styles.MyitemsIcon} />
          <View style={styles.NumberAndNameInCenter}>
            {/* <Text style={styles.MyItemInNumber}>225</Text> */}
            <Text style={styles.MyItemInNumber}> {props.TI} </Text>
            <Text style={styles.MyItemText}>Total Items</Text>
          </View>
        </Card>

        <Card style={styles.CardStyle}>
          <MyItem style={styles.MyitemsIcon} />
          <View style={styles.NumberAndNameInCenter}>
            <Text style={styles.MyItemInNumber}> {props.OFS} </Text>
            <Text style={styles.MyItemText}>Out Of Stock</Text>
          </View>
        </Card>

        <Card style={styles.CardStyle}>
          <TotalOrders style={styles.MyitemsIcon} />
          <View style={styles.NumberAndNameInCenter}>
            <Text style={styles.MyItemInNumber}> {props.TO} </Text>
            <Text style={styles.MyItemText}>Total Orders</Text>
          </View>
        </Card>
      </View>

      <Text style={styles.OrderTextSection}>Orders</Text>
      <View style={[styles.OuterMostView, styles.NewStyle]}>
        <Card style={styles.CardStyle}>
          <MyItem style={styles.MyitemsIcon} />
          <View style={styles.NumberAndNameInCenter}>
            <Text style={styles.MyItemInNumber}> {props.Comp} </Text>
            <Text style={styles.MyItemText}>Completed</Text>
          </View>
        </Card>

        <Card style={styles.CardStyle}>
          <MyItem style={styles.MyitemsIcon} />
          <View style={styles.NumberAndNameInCenter}>
            <Text style={styles.MyItemInNumber}> {props.Pend} </Text>
            <Text style={styles.MyItemText}>Pending</Text>
          </View>
        </Card>

        <Card style={styles.CardStyle}>
          <TotalOrders style={styles.MyitemsIcon} />
          <View style={styles.NumberAndNameInCenter}>
            <Text style={styles.MyItemInNumber}> {props.Can} </Text>
            <Text style={styles.MyItemText}>Cancelled</Text>
          </View>
        </Card>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  OrderTextSection: {
    marginTop: 5,
    marginLeft: 5,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  NewStyle: {
    marginTop: 5,
  },
  OuterMostView: {flexDirection: 'row', justifyContent: 'space-between'},
  CardStyle: {
    backgroundColor: '#96C547',
    height: 100,
    width: width / 3.5,
    borderRadius: 15,
  },
  MyitemsIcon: {marginLeft: 5, marginTop: 5},
  MyItemInNumber: {
    // marginLeft: 25,
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  MyItemText: {color: 'white'},
  TotalOrderIcon: {marginLeft: 25, marginTop: 5},
  TotalOrdersInNumber: {
    marginLeft: 55,
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  TotalOrderText: {marginLeft: 50, color: 'white'},
  NumberAndNameInCenter: {justifyContent: 'center', alignItems: 'center'},
});

export default ItemsAndOrdersCard;
