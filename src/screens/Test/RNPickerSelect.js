import React from 'react';
import {View, Text} from 'react-native';
// import RNPickerSelect from 'react-native-picker-select';

const Dropdown = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Hello from Picker Select</Text>
      {/* <RNPickerSelect
        onValueChange={value => console.log(value)}
        items={[
          {label: 'Football', value: 'football'},
          {label: 'Baseball', value: 'baseball'},
          {label: 'Hockey', value: 'hockey'},
        ]}
      /> */}
    </View>
  );
};

export default Dropdown;
