import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';

//SVGs
// import ItemPic from '../../../../assets/ItemPic';
import ItemPic from '../../../../assets/ItemPic';
import DotMenu from '../../../../assets/ThreeDotMenu';
// import UpdateIcon from '../../../../../assets/updateICon';
import UpdateIcon from '../../../../assets/updateICon';

//import Components
import PendingOrdersCard from '../../Home/components/PendingOrders';

const NewOrders = () => {
  return (
    <>
      <View>
        <PendingOrdersCard />
      </View>
      {/* <Card style={styles.Card}>
        <View style={styles.TopView}>
          <ItemPic />
          <View style={styles.ProductDetail}>
            <Text style={styles.ProductTitle}>
              Navia Baby Lotion {''}
              <Text style={styles.ProductGenre}>(Baby product)</Text>
            </Text>
            <View style={styles.PriceAndQuantityView}>
              <Text>
                Price:
                <Text style={styles.PriceText}>Rs.150</Text>
              </Text>
              <Text style={styles.QuantityText}>
                Quantity:
                <Text style={styles.QuantityNo}> 3</Text>
              </Text>
            </View>
            <View style={styles.SoldAndRemainsView}>
              <Text>Jan 20, 2021 at 21:58 PM</Text>
            </View>
          </View>
        </View>

        <View style={styles.updateView}>
          <Text style={{color: '#EB5D24'}}>Pending</Text>
        </View>
      </Card> */}
    </>
  );
};

const styles = StyleSheet.create({
  QuantityNo: {fontWeight: 'bold', color: 'black'},
  ProductGenre: {color: '#D9D9D9', fontSize: 12},
  ProductTitle: {fontWeight: 'bold', color: 'black', fontSize: 15},
  ProductDetail: {marginLeft: 10},
  TopView: {flexDirection: 'row'},
  Card: {marginHorizontal: 15},
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

export default NewOrders;
