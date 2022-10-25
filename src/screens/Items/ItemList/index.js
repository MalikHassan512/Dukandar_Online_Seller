import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Searchbar} from 'react-native-paper';

//Components
import ItemCard from './components/ItemCard';

//SVGs
import SearchIcon from '../../../../assets/SearchIcon';

const ItemList = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <>
      <View style={styles.OuterView}>
        <Searchbar
          placeholder="Search Item"
          style={{borderRadius: 30}}
          placeholderTextColor={'#B4B4B4'}
          onChangeText={onChangeSearch}
          value={searchQuery}
          icon={() => <SearchIcon />}
        />
      </View>
      {/* <ScrollView showsVerticalScrollIndicator={false}>
        <ItemCard />
      </ScrollView> */}
      <ItemCard />
    </>
  );
};

const styles = StyleSheet.create({
  OuterView: {marginHorizontal: 15, marginVertical: 10},
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ItemList;
