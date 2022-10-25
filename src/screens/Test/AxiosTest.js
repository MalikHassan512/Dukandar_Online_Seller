import React from 'react';
import {View, Text, Button} from 'react-native';
import axios from 'axios';
import {url} from '../../constants/urls';

const makeRequest = () => {
  console.log('Clicked');

  // config = {
  //   method: 'get',
  //   url: url,
  // };

  const axios = require('axios');
  axios.get(url).then(res => {
    console.log(res, 'this is res');
  });
};

const AxiosTest = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button onPress={makeRequest} title="Check Status" />
    </View>
  );
};

export default AxiosTest;
