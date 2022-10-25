import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import {url} from '../../constants/urls';
import {useSelector, useDispatch} from 'react-redux';
import {getData} from '../NetworkRequest/index';

//import SVGs
import ProfilePlaceHolder from '../../../assets/ProfilePlaceHolder';
import PlusIcon from '../../../assets/PlusIcon';

const {height, width} = Dimensions.get('window');

const Profile = () => {
  const [ApiData, setApiData] = useState([]);
  const [Loading, setLoading] = useState(true);

  const token = useSelector(state => state.auth?.token);

  const getProfileData = async () => {
    try {
      // const res = await axios.get(`${url}shop/profile/?id=4`, {
      //   headers: {
      //     Authorization: `Token ${token}`,
      //   },
      // });

      const res = await getData(token, 'shop/profile/');

      setApiData(res);
      // console.log(res);
      // console.log(JSON.stringify(ApiData));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return Loading ? (
    <View style={{justifyContent: 'center', flex: 1}}>
      <ActivityIndicator color={'#96C547'} size={'large'} />
    </View>
  ) : (
    <ScrollView>
      {/* <Image
        resizeMode="contain"
        source={require('../../../assets/shop.jpg')}
        // source={require('../../../assets/shop_palcehoder.png')}
        style={{width: '100%', height: 150}}
      /> */}
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
        <ProfilePlaceHolder />
      </View>

      <View style={styles.TitleView}>
        <Text style={styles.TitleText}>Shop Name</Text>
        {ApiData?.name === null ? (
          <View style={styles.DataFieldView}>
            <Text style={{marginLeft: 15}}> Name Not Available</Text>
          </View>
        ) : (
          <View style={styles.DataFieldView}>
            <Text style={{marginHorizontal: 20}}>{ApiData?.name}</Text>
          </View>
        )}
      </View>

      <View style={styles.TitleView}>
        <Text style={styles.TitleText}>Mobile Number</Text>
        <View style={styles.DataFieldView}>
          <Text style={{marginHorizontal: 20}}>{ApiData?.phone_number}</Text>
        </View>
      </View>

      <View style={styles.TitleView}>
        <Text style={styles.TitleText}>Shop Address</Text>
        {ApiData?.address === null ? (
          <View style={styles.DataFieldView}>
            <Text style={{marginLeft: 15}}> Address Not Available</Text>
          </View>
        ) : (
          <View style={styles.DataFieldView}>
            <Text style={{marginHorizontal: 20}}>{ApiData?.address}</Text>
          </View>
        )}
      </View>

      <View style={styles.TitleView}>
        <Text style={styles.TitleText}>Email</Text>
        {ApiData?.pri_email === null ? (
          <View style={styles.DataFieldView}>
            <Text style={{marginLeft: 15}}> Email Not Available</Text>
          </View>
        ) : (
          <View style={styles.DataFieldView}>
            <Text style={{marginHorizontal: 20}}>{ApiData?.pri_email}</Text>
          </View>
        )}
      </View>

      <View style={styles.TitleView}>
        <Text style={styles.TitleText}> Web Link</Text>
        {ApiData?.website_url === null || ApiData?.website_url === '' ? (
          <View style={styles.DataFieldView}>
            <Text style={{marginLeft: 15}}> Website Not Available</Text>
          </View>
        ) : (
          <View style={styles.DataFieldView}>
            <Text style={{marginHorizontal: 20}}>{ApiData?.website_url}</Text>
          </View>
        )}
      </View>

      <View style={styles.TitleView}>
        <Text style={styles.TitleText}>Facebook URL</Text>
        {ApiData?.fb_url === null || ApiData?.fb_url === '' ? (
          <View style={styles.DataFieldView}>
            <Text style={{marginLeft: 15}}>Facebook Profile Not Available</Text>
          </View>
        ) : (
          <View style={styles.DataFieldView}>
            <Text style={{marginHorizontal: 20}}>{ApiData?.fb_url}</Text>
          </View>
        )}
      </View>

      <View style={styles.buttonStyle}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  DataFieldView: {
    borderColor: 'grey',
    borderWidth: 0.3,
    borderRadius: 20,
    marginTop: 5,
    justifyContent: 'center',
    height: 40,
  },

  AddNewMaterialPlaceHolderView: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 150,
  },
  TitleView: {marginTop: '5%', marginHorizontal: '5%'},
  TitleText: {color: 'black', fontWeight: 'bold', marginLeft: '5%'},

  TextInputViewwithDownArrow: {
    borderColor: 'grey',
    borderWidth: 0.3,
    borderRadius: 10,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonStyle: {
    backgroundColor: '#96C547',
    marginHorizontal: '5%',
    marginTop: 30,
    marginBottom: 10,
    height: 50,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {color: 'white', fontWeight: 'bold', fontSize: 16},
});

export default Profile;
