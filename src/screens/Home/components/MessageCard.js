import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import {Card} from 'react-native-paper';

//SVGs
import ViewAllArrrow from '../../../../assets/ViewAll';

const MessageCard = () => {
  return (
    <Card style={{padding: 10, marginVertical: 10}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          style={{
            color: '#96C547',
            fontSize: 17,
            fontWeight: 'bold',
            marginLeft: 10,
          }}>
          Messages
        </Text>
        <Text
          style={{
            marginLeft: 10,
            backgroundColor: 'red',
            borderRadius: 40,
            color: 'white',
            width: 20,
            textAlign: 'center',
          }}>
          3
        </Text>
      </View>
      <Text style={{color: '#B4B4B4'}}>
        You can contact the users with personal message
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 10,
          marginTop: 10,
        }}>
        <View style={styles.alignCenter}>
          <Image source={require('../../../../assets/nick.png')} />
          <Text>Nick</Text>
        </View>
        <View style={styles.alignCenter}>
          <Image source={require('../../../../assets/robert.png')} />
          <Text>Robert</Text>
        </View>
        <View style={styles.alignCenter}>
          <Image source={require('../../../../assets/tokiyo.png')} />
          <Text>Allen</Text>
        </View>

        <View>
          <View
            style={{
              backgroundColor: '#96C547',
              justifyContent: 'center',
              width: 45,
              height: 45,
              borderRadius: 60,
              alignItems: 'center',
            }}>
            <ViewAllArrrow />
          </View>
          <Text>View All</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  alignCenter: {alignItems: 'center'},
});

export default MessageCard;
