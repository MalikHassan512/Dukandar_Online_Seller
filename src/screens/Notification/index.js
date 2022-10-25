import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

//components
import NotificationCard from './components/NotificationCard';

const Notification = () => {
  return (
    <>
      <View style={{marginHorizontal: 10, marginVertical: 10}}>
        <NotificationCard />
      </View>

      <View style={{marginHorizontal: 10, marginVertical: 5}}>
        <NotificationCard />
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

export default Notification;
