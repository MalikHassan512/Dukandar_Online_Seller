import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useSelector, useDispatch} from 'react-redux';
// import {logOut} from '../../redux/actions/authActions';
import {logOut} from '../../redux/actions/authActions';
import axios from 'axios';
import {url} from '../../constants/urls';
// import {shopIdRoot} from '../../redux/actions/shopIdAction';
// import {useIsFocused} from '@react-navigation/core';
// import {shop_Id} from '../../redux/actions/shopIdAction';
import {getData} from '../NetworkRequest';

//SVGs
import Pic from '../../../assets/Pic';
import SalesGrowthPercent from '../../../assets/SalesGrowthPercent';

//Components
import ItemsAndOrdersCard from './components/ItemsAndOrdersCard';
import PendingOrders from './components/PendingOrders';
import Graph from './components/Graph';
import MessageCard from './components/MessageCard';

// const {height, width} = Dimensions.get('window');

const Home = () => {
  const navigation = useNavigation();
  const disp = useDispatch();
  const [Apidata, setApiData] = useState([]);
  const [homeData, setHomeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileApiData, setProfileApiData] = useState([]);

  const token = useSelector(state => state.auth?.token);

  const getShopProfileData = async () => {
    try {
      const data = await getData(token, 'shop/profile/');
      setProfileApiData(data);
      // console.log('dataaaprofile', data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getdataShop = async () => {
    try {
      // console.log(`${url}shop/item/?shop_id=142`);
      const data = await getData(token, 'shop/item/');

      setApiData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getHomeData = async () => {
    try {
      // console.log(`${url}shop/item/?shop_id=142`);
      const data = await getData(token, 'shop/home/');
      // console.log('Home Dataaa', data);
      setHomeData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getdataShop();
    getShopProfileData();
    getHomeData();
    // getId();
  }, []);

  return loading ? (
    <View style={{justifyContent: 'center', flex: 1}}>
      <ActivityIndicator color={'#96C547'} size={'large'} />
    </View>
  ) : (
    <>
      <ScrollView>
        <View style={styles.NameAndPicView}>
          <Text></Text>
          {homeData?.data?.first_name === '' || null ? (
            <Text style={styles.WelcomeText}> Welcome! </Text>
          ) : (
            <Text style={styles.WelcomeText}>
              {homeData?.data?.first_name + ' ' + homeData?.data?.last_name}
            </Text>
          )}
          <TouchableOpacity onPress={() => disp(logOut())}>
            <Pic />
          </TouchableOpacity>
        </View>
        <View style={styles.StatsAndGrothView}>
          <View style={styles.StatsView}>
            <Text style={styles.TotalEarning}>Total Earning</Text>
            <Text style={styles.AmountText}> {homeData?.total_sales} PKR</Text>
            <Text style={styles.UpdatedText}>Updated today at 2 PM</Text>
            {/* <Text> {Apidata[0].shop} </Text> */}
          </View>
          <TouchableOpacity>
            <SalesGrowthPercent width={90} height={90} />
          </TouchableOpacity>
        </View>

        <View style={styles.ItemAndCardView}>
          <ItemsAndOrdersCard
            TI={homeData?.total_items}
            OFS={homeData?.out_of_stock}
            TO={homeData?.total_orders}
            Comp={homeData?.completed}
            Pend={homeData?.pending}
            Can={homeData?.cancelled}
          />
        </View>
        <View style={styles.PendingView}>
          <Text style={styles.PendingOrderText}>Pending Orders</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('PendingOrders')}>
            <Text style={styles.ViewAll}>View All </Text>
          </TouchableOpacity>
        </View>

        <View style={{marginVertical: 5}}>
          <PendingOrders />
        </View>
        <View style={{marginHorizontal: 10}}>
          <TouchableOpacity>
            <Text style={{color: '#96C547', fontSize: 18, fontWeight: 'bold'}}>
              VISITORS
            </Text>
          </TouchableOpacity>
          <Graph />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  ViewAll: {color: '#96C547'},
  PendingOrderText: {fontWeight: 'bold', color: 'black', fontSize: 16},
  NameAndPicView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
  },
  WelcomeText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 70,
  },
  StatsAndGrothView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  StatsView: {marginLeft: 15},
  TotalEarning: {fontSize: 16},
  AmountText: {fontWeight: 'bold', color: 'black', fontSize: 16},
  UpdatedText: {fontSize: 12},
  PendingView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginTop: 15,
  },
  ItemAndCardView: {marginHorizontal: 15},
});

export default Home;
