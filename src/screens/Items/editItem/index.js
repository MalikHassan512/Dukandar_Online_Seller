import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
  Button,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Formik} from 'formik';
import ImagePicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/core';
import {useSelector, useDispatch} from 'react-redux';
import {getData} from '../../NetworkRequest/index';
import {useRoute} from '@react-navigation/native';
import {updateData} from '../../NetworkRequest/index';
import {postData} from '../../NetworkRequest/index';

//import SVGs
import AddNewMaterialPlaceHolder from '../../../../assets/AddNewMaterialPlaceHolder';

const EditItem = () => {
  const {params} = useRoute();
  console.log(params);
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [mainCat, setMainCat] = useState('');
  const [compName, setCompName] = useState('');
  const [itemCat, setItemCat] = useState('');
  const [section, setSection] = useState('');

  const token = useSelector(state => state.auth?.token);

  const updateItem = async values => {
    try {
      const res = await postData(token, 'shop/edit-item', {
        ...values,
        item_uuid: params?.item_uuid,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getEditItemData = async () => {
    try {
      const res = await getData(token, 'shop/edit-item/', {
        // item_uuid: '7c3b9297-8699-4095-97a4-0f1b5b0c151b',
        item_uuid: params?.item_uuid,
      });

      setApiData(res);

      // console.log(res.description);

      // console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // alert(apiData?.description);

  useEffect(() => {
    getEditItemData();
  }, []);

  const TakePhotofromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  };

  const TakePhotoFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  };

  return loading ? (
    <View style={{justifyContent: 'center', flex: 1}}>
      <ActivityIndicator color={'#96C547'} size={'large'} />
    </View>
  ) : (
    <>
      <ScrollView>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.AddNewMaterialPlaceHolderView}>
          <AddNewMaterialPlaceHolder />
        </TouchableOpacity>
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              // Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  onPress={TakePhotofromCamera}
                  style={styles.CameraModalView}>
                  <Text style={styles.CameraModalText}>Camera</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={TakePhotoFromGallery}
                  style={styles.GalleryModalView}>
                  <Text style={styles.CameraModalText}>
                    Choose from Gallery
                  </Text>
                </TouchableOpacity>

                <Button
                  title="Close"
                  color={'red'}
                  onPress={() => setModalVisible(false)}
                />
              </View>
            </View>
          </Modal>
        </View>
        <Formik
          initialValues={{
            name: apiData?.name || '',
            supply_rate: apiData?.supply_rate || '',
            price: apiData?.price,
            quantity: apiData?.quantity || '',
            description: apiData?.description || '',
            bar_code: apiData?.bar_code || '',
          }}
          onSubmit={(values, actions) => {
            updateItem({...values, category: mainCat, item_category: itemCat});
            actions.resetForm();
            alert('Item Updated Succesfully');
          }}
          // console.log(values)

          // console.log(values);
          // actions.resetForm();
        >
          {props => (
            <>
              <View style={styles.TitleView}>
                <Text style={styles.TitleText}>Category</Text>
                <View style={styles.TextInputView}>
                  <Picker
                    dropdownIconColor={'#96C547'}
                    // style={{width: 350, height: 'auto'}}
                    selectedValue={mainCat}
                    onValueChange={(itemValue, itemIndex) =>
                      setMainCat(itemValue)
                    }>
                    <Picker
                      label={apiData?.category}
                      value={apiData?.category}
                    />

                    {apiData.all_category.map((item, index) => (
                      <Picker.Item
                        label={item.name}
                        value={item.name}
                        key={index}
                      />
                    ))}
                  </Picker>
                </View>
              </View>

              <View style={styles.TitleView}>
                <Text style={styles.TitleText}>Item Category</Text>
                <View style={styles.TextInputView}>
                  <Picker
                    dropdownIconColor={'#96C547'}
                    // style={{width: 350, height: 'auto'}}
                    selectedValue={itemCat}
                    onValueChange={(itemValue, itemIndex) =>
                      setItemCat(itemValue)
                    }>
                    <Picker
                      label={apiData?.item_category}
                      value={apiData?.item_category}
                    />

                    {apiData.item_cat.map((item, index) => (
                      <Picker.Item
                        label={item.name}
                        value={item.name}
                        key={index}
                      />
                    ))}
                  </Picker>
                </View>
              </View>

              <View style={styles.TitleView}>
                <Text style={styles.TitleText}>Item Name</Text>
                <View style={styles.TextInputView}>
                  <TextInput
                    placeholder="Enter Item Name"
                    style={{marginLeft: '4%'}}
                    onChangeText={props.handleChange('name')}
                    onBlur={props.handleBlur('name')}
                    value={props.values.name}
                  />
                </View>
              </View>

              <View style={styles.TitleView}>
                <Text style={styles.TitleText}>Item Bar Code (optional)</Text>
                <View style={styles.TextInputView}>
                  <TextInput
                    placeholder="Enter Item Bar Code"
                    style={{marginLeft: '4%'}}
                    onChangeText={props.handleChange('bar_code')}
                    onBlur={props.handleBlur('bar_code')}
                    value={props.values.bar_code}
                  />
                </View>
              </View>

              <View style={styles.TitleView}>
                <Text style={styles.TitleText}>Purchase Price</Text>
                <View style={styles.TextInputView}>
                  <TextInput
                    keyboardType="numeric"
                    placeholder="Enter Purchase Price"
                    style={{marginLeft: '4%'}}
                    onChangeText={props.handleChange('supply_rate')}
                    onBlur={props.handleBlur('supply_rate')}
                    value={props.values.supply_rate.toString()}
                  />
                </View>
              </View>

              <View style={styles.TitleView}>
                <Text style={styles.TitleText}>Selling Price</Text>
                <View style={styles.TextInputView}>
                  <TextInput
                    keyboardType="numeric"
                    placeholder="Enter Selling Price"
                    style={{marginLeft: '4%'}}
                    onChangeText={props.handleChange('price')}
                    onBlur={props.handleBlur('price')}
                    value={props.values.price.toString()}
                  />
                </View>
              </View>

              <View style={styles.TitleView}>
                <Text style={styles.TitleText}>Add Quantity</Text>
                <View style={styles.TextInputView}>
                  <TextInput
                    keyboardType="numeric"
                    placeholder="Price of the material"
                    style={{marginLeft: '4%'}}
                    onChangeText={props.handleChange('quantity')}
                    onBlur={props.handleBlur('quantity')}
                    value={props.values.quantity.toString()}
                  />
                </View>
              </View>

              {/* <View style={styles.TitleView}>
              <Text style={styles.TitleText}>Item Tags</Text>
              <View style={styles.TextInputView}>
                <TextInput
                  placeholder="Enter Item Tags"
                  style={{marginLeft: '4%'}}
                  onChangeText={props.handleChange('tags')}
                  onBlur={props.handleBlur('tags')}
                  value={props.values.tags}
                />
              </View>
            </View> */}

              <View style={styles.TitleView}>
                <Text style={styles.TitleText}>Add Item Description</Text>
                <View style={styles.TextInputView2}>
                  <TextInput
                    multiline={true}
                    placeholder="Description about material"
                    style={{marginLeft: '4%'}}
                    onChangeText={props.handleChange('description')}
                    onBlur={props.handleBlur('description')}
                    value={props.values.description}
                  />
                </View>
              </View>

              {/* <TouchableOpacity
              onPress={() => navigation.navigate('')}
              style={styles.More}>
              <PlusIcon />
              <Text style={{color: 'white'}}>More...</Text>
            </TouchableOpacity> */}

              <TouchableOpacity
                onPress={props.handleSubmit}
                style={styles.buttonStyle}>
                <Text style={styles.buttonText}>Update Item</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  GalleryModalView: {
    marginVertical: 15,
    backgroundColor: '#96C547',
    padding: 10,
    borderRadius: 10,
  },
  CameraModalText: {color: 'white', fontWeight: 'bold', fontSize: 16},
  CameraModalView: {
    backgroundColor: '#96C547',
    padding: 10,
    borderRadius: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  More: {
    backgroundColor: '#96C547',
    flexDirection: 'row',

    // justifyContent: 'flex-end',
    justifyContent: 'space-around',

    borderRadius: 20,
    alignSelf: 'flex-end',
    alignItems: 'center',
    height: 25,
    width: 70,
    marginRight: 25,
    marginTop: 10,
  },
  TextInputView2: {
    borderColor: 'grey',
    borderWidth: 0.3,
    borderRadius: 10,
    marginTop: 8,
    height: 150,
  },
  AddNewMaterialPlaceHolderView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
  },
  TitleView: {marginTop: '5%', marginHorizontal: '5%'},
  TitleText: {color: 'black', fontWeight: 'bold', marginLeft: '5%'},
  TextInputView: {
    borderColor: 'grey',
    borderWidth: 0.3,
    borderRadius: 20,
    marginTop: 8,
    // justifyContent: 'center',
    // flexDirection: 'row',
    // justifyContent: 'flex-start',
  },

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
    marginTop: 10,
    marginBottom: 10,
    height: 50,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {color: 'white', fontWeight: 'bold', fontSize: 16},
});

export default EditItem;
