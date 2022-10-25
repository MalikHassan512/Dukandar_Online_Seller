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
  Modal,
  Button,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Formik} from 'formik';
import ImagePicker from 'react-native-image-crop-picker';
import {postData} from '../../NetworkRequest/index';
import {getData} from '../../NetworkRequest/index';
import {useNavigation} from '@react-navigation/core';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';

//import SVGs
import AddNewMaterialPlaceHolder from '../../../../assets/AddNewMaterialPlaceHolder';
import PlusIcon from '../../../../assets/PlusIcon';

const {height, width} = Dimensions.get('window');

const AddItem = () => {
  const navigation = useNavigation();
  const [apiData, setApiData] = useState([]);
  const [mainCat, setMainCat] = useState('');
  const [compName, setCompName] = useState('');
  const [itemCat, setItemCat] = useState('');
  const [section, setSection] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(true);
  const disp = useDispatch();

  const token = useSelector(state => state.auth?.token);

  const getAddItemDropDownData = async () => {
    try {
      const res = await getData(token, 'shop/add-item/');

      setApiData(res);
      // console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const postItemData = async values => {
    try {
      const res = await postData(token, 'shop/add-item/', values);
      console.log('may vauess', values);
      console.log(values);
    } catch (error) {
      console.log(error);
      // console.log(error?.response?.message);
      // console.log(values);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAddItemDropDownData();
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
                <Text style={styles.CameraModalText}>Choose from Gallery</Text>
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
          // company: '',
          // category: '',
          // item_category: '',
          // section: '',
          name: '',
          supply_rate: '',
          price: '',
          quantity: '',
          description: '',
          bar_code: '',
          // tags: '',
          // select_image: '',
        }}
        onSubmit={(values, actions) => {
          postItemData({
            ...values,
            category: mainCat,
            item_category: itemCat,
            company: compName,
            section: section,
            // select_image:
          });
          // console.log(values);
          actions.resetForm();
        }}>
        {props => (
          <>
            {/* <View style={styles.TitleView}>
              <Text style={styles.TitleText}>Company</Text>
              <View style={styles.TextInputView}>
                <Picker
                  dropdownIconColor={'#96C547'}
                  // style={{width: 350, height: 'auto'}}
                  selectedValue={compName}
                  onValueChange={(itemValue, itemIndex) =>
                    setCompName(itemValue)
                  }>
                  <Picker label="Choose Company" value="0" />
                  {apiData?.company.map(item => (
                    <Picker.Item label={item.name} value={item.name} />
                  ))}
                </Picker>
              </View>
            </View>
             */}
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
                  <Picker label="Choose main Category" value="0" />
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
              <Text style={styles.TitleText}>Item Catagory</Text>
              <View style={styles.TextInputView}>
                <Picker
                  dropdownIconColor={'#96C547'}
                  // style={{width: 350, height: 'auto'}}
                  selectedValue={itemCat}
                  onValueChange={(itemValue, itemIndex) =>
                    setItemCat(itemValue)
                  }>
                  {/* {console.log(itemCat)} */}
                  <Picker label="Choose Item Category" value="0" />
                  {apiData.item_category.map((item, index) => (
                    <Picker.Item
                      label={item.name}
                      value={item.name}
                      key={index}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            {/* 
            <View style={styles.TitleView}>
              <Text style={styles.TitleText}>Section</Text>
              <View style={styles.TextInputView}>
                <Picker
                  dropdownIconColor={'#96C547'}
                  // style={{width: 350, height: 'auto'}}
                  selectedValue={section}
                  onValueChange={(itemValue, itemIndex) =>
                    setSection(itemValue)
                  }>
                  <Picker label="Choose Section" value="0" />
                  {apiData.sections.map(item => (
                    <Picker.Item label={item.name} value={item.name} />
                  ))}
                </Picker>
              </View>
            </View> */}

            {/* <View style={styles.TitleView}>
              <Text style={styles.TitleText}>Item Category</Text>
              <View style={styles.TextInputView}>
                <Picker
                  dropdownIconColor={'#96C547'}
                  // style={{width: 350, height: 40}}
                  selectedValue={selectedLanguage}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedLanguage(itemValue)
                  }
                  // value={props.values.itemValue}
                >
                  <Picker label="Choose Item Category" value="0" />
                  <Picker.Item label="Milk" value="1" />
                  <Picker.Item label="Vegetable" value="2" />
                  <Picker.Item label="3" value="3" />
                </Picker>
              </View>
            </View> */}

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
                  value={props.values.supply_rate}
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
                  value={props.values.price}
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
                  value={props.values.quantity}
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
              <Text style={styles.buttonText}>Add Item</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </ScrollView>
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
    justifyContent: 'flex-end',
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

export default AddItem;
