import React, {useState, useEffect, useMemo} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  FlatList,
} from 'react-native';
import {Card, Provider, Menu, Button} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {url} from '../../../../constants/urls';
import {getData, getPaginationData} from '../../../NetworkRequest/index';
import {usePaginatorParams} from '../../../../custom_hooks/pagination_params_hook';
import axios from 'axios';
import {useNavigation} from '@react-navigation/core';

// import DotMenuCom from '../../../Test/DotMenu';

//SVGs
import ItemPic from '../../../../../assets/ItemPic';
import ItemPicPlaceHolder from '../../../../../assets/ItemPicWIthPlusSign';
import DotMenu from '../../../../../assets/ThreeDotMenu';
import UpdateIcon from '../../../../../assets/updateICon';
import EditIcon from '../../../../../assets/editOrderIcon';

const ItemCard = () => {
  const navigation = useNavigation();
  const [apiShopItemdata, setApiShopItemData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [isItemLoad, setIsItemLoad] = useState(false);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [isLoading, isRefreshing, items, loadMore, refreshItems] =
    usePaginatorParams(getPaginationData, 'shop/item/', {page: 1});
  const token = useSelector(state => state.auth?.token);

  const renderData = ({item}) => {
    return (
      <Card style={styles.Card}>
        <View style={styles.TopView}>
          {item.image === null ||
          !item.image.includes('png') ||
          !item.image.includes('jpg') ? (
            <ItemPicPlaceHolder />
          ) : (
            <Image source={{uri: item.image}} />
          )}
          <View style={styles.ProductDetail}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.ProductTitle} numberOfLines={1}>
                {item.name}
                <Text style={styles.ProductGenre}>({item.item_category})</Text>
              </Text>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('EditItem', {
                    item_uuid: item?.uuid,
                    // apiData: apiShopItemdata,
                  })
                }>
                <EditIcon
                  height={40}
                  width={40}
                  // style={{backgroundColor: 'grey', borderRadius: 20}}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.PriceAndQuantityView}>
              <Text>
                Price:
                <Text style={styles.PriceText}>Rs.{item.price} </Text>
              </Text>
              <Text style={styles.QuantityText}>
                Quantity:
                <Text style={styles.QuantityNo}> {item.quantity} </Text>
              </Text>
            </View>
            <View style={styles.SoldAndRemainsView}>
              <Text>Sold:</Text>
              <Text style={styles.SoldQuantityView}>246</Text>
              <Text style={styles.RemainsText}>Remains:</Text>
              <Text style={styles.RemainsQuantityText}>142</Text>
            </View>
          </View>
        </View>
        {/* 
        <View style={styles.updateView}>
          <UpdateIcon />
          <Text style={styles.updateText}>Update</Text>
        </View> */}
      </Card>
    );
  };

  const renderFooter = () => {
    return isLoading ? (
      <View style={{marginBottom: 15}}>
        <ActivityIndicator color={'#96C547'} size={'small'} />
      </View>
    ) : null;
  };

  return isLoading && items.length === 0 ? (
    <View style={{justifyContent: 'center', flex: 1}}>
      <ActivityIndicator color={'#96C547'} size={'large'} />
    </View>
  ) : (
    <>
      <FlatList
        data={items}
        renderItem={renderData}
        // keyExtractor={(item, index) => index.toString()}
        // initialNumToRender={10}
        onEndReached={loadMore}
        ListFooterComponent={renderFooter}
        // onEndReachedThreshold={0.5}
        // maxToRenderPerBatch={10}
        removeClippedSubviews={true}
        refreshing={isRefreshing}
      />
    </>
  );
};

const styles = StyleSheet.create({
  QuantityNo: {fontWeight: 'bold', color: 'black'},
  ProductGenre: {color: '#D9D9D9', fontSize: 12},
  ProductTitle: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 15,
    width: 220,
    marginTop: 7,
  },
  ProductDetail: {marginLeft: 10},
  TopView: {flexDirection: 'row'},
  Card: {marginHorizontal: 15, marginVertical: 5},
  QuantityText: {marginLeft: 5},
  PriceText: {color: 'black', fontWeight: 'bold'},
  PriceAndQuantityView: {flexDirection: 'row', marginTop: 0},
  SoldQuantityView: {color: 'black', fontWeight: 'bold', marginLeft: 5},
  SoldAndRemainsView: {flexDirection: 'row', marginTop: 5},
  RemainsQuantityText: {color: 'black', fontWeight: 'bold'},
  RemainsText: {marginLeft: 26},
  // DotMenuStyle: {position: 'absolute', right: 10, top: 5},
  updateView: {
    backgroundColor: '#96C547',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 8,
    right: 5,
    borderRadius: 40,
    height: 'auto',
    width: 'auto',
    padding: 3,
    // padding: -15,
  },
  updateText: {color: 'white'},
});

export default ItemCard;

{
  /* <TouchableOpacity style={styles.DotMenuStyle}>
          <Provider>
            <View style={{flex: 1}}>
              <Menu
                contentStyle={{backgroundColor: 'red'}}
                statusBarHeight={-40}
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                  <TouchableOpacity onPress={openMenu}>
                    <DotMenu />
                  </TouchableOpacity>
                }>
                <Menu.Item onPress={() => {}} title="View" />
                <Menu.Item onPress={() => {}} title="Edit" />
              </Menu>
            </View>
          </Provider>
        </TouchableOpacity> */
}

{
  /* <TouchableOpacity style={styles.DotMenuStyle}>
          <DotMenu />
        </TouchableOpacity> */
}
