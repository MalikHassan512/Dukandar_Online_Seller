import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {Card} from 'react-native-paper';

//SVGs
import NotificationDot from '../../../../assets/NotificationDot';

const NotificationCard = () => {
  return (
    <Card>
      <View style={styles.Card}>
        <Image source={require('../../../../assets/NotificationPic.png')} />
        <View style={styles.detailsView}>
          <Text style={styles.PersonNameText}>
            Anees Malik <Text style={styles.Ordered}>Ordered Baby Lotion</Text>
          </Text>
          <Text style={styles.AddressText}>
            From F1 Block Johar Town, Lahore
          </Text>
          <Text style={styles.DateAndTime}>Jan 25, 2021 at 09:35 PM</Text>
        </View>
      </View>

      <View style={styles.NotificationDot}>
        <NotificationDot />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  Card: {flexDirection: 'row', padding: 10, marginHorizontal: 10},
  detailsView: {marginLeft: 10},
  PersonNameText: {color: 'black', fontWeight: 'bold'},
  Ordered: {color: '#D1D1D1', fontSize: 12},
  AddressText: {color: '#D1D1D1'},
  DateAndTime: {color: '#B4B4B4'},
  NotificationDot: {position: 'absolute', right: 10, top: 10},
});

export default NotificationCard;
