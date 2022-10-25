import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {url} from '../../constants/urls';
import axios from 'axios';
import {Snackbar} from 'react-native-paper';

//SVGs
import ViewPassword from '../../../assets/ViewPasswordICon';
import HidePassword from '../../../assets/hidePassword';

import {useNavigation} from '@react-navigation/core';
import {useSelector, useDispatch} from 'react-redux';
import {logIn} from '../../redux/actions/authActions';

const {height, width} = Dimensions.get('window');

const LoginValidationSchema = yup.object({
  username: yup
    .string()
    // .email('Must be a valid User Name')
    .required('Username is required'),
  password: yup
    .string()
    .min(8, 'Password is too short ')
    .required('Password is required'),
});

const Login = () => {
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [secure, setSecure] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const login = async values => {
    setisLoading(true);

    try {
      const {data} = await axios.post(`${url}login`, values);

      dispatch(
        logIn({
          token: data?.token,
        }),
      );

      console.log(values);
      console.log(data);

      // console.log(JSON.stringify(values) + ' ' + data?.token);
    } catch (error) {
      console.log(error);
      setIsMessageVisible(true);
      setisLoading(false);
      setMessage(error?.response.data.message);
      console.log(message);
    }
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.LogoView}>
            <Image
              source={require('../../../assets/dukandar_logo.png')}
              style={styles.imageStyle}
              resizeMode="contain"
            />
          </View>

          <View style={styles.titleAndTextInputView}>
            <Text style={styles.TopLoginText}>Login</Text>
          </View>

          <Formik
            validationSchema={LoginValidationSchema}
            initialValues={{username: '', password: ''}}
            // onSubmit={(values, actions) => {
            // console.log(values);
            //   actions.resetForm();
            // }}

            onSubmit={values => login(values)}>
            {props => (
              <>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{marginLeft: 40, marginTop: 15}}>
                    User Name:
                    <Text style={{color: 'red'}}>
                      {props.touched.username && props.errors.username}
                    </Text>
                  </Text>
                </View>
                <View style={styles.UserNameTextInputView}>
                  <TextInput
                    style={{
                      marginLeft: 16,
                    }}
                    onChangeText={props.handleChange('username')}
                    onBlur={props.handleBlur('username')}
                    value={props.values.username}
                  />
                </View>

                <View>
                  <Text style={styles.PasswordAndInnerView}>
                    Password:
                    <Text style={{color: 'red'}}>
                      {props.touched.password && props.errors.password}
                    </Text>
                  </Text>
                  <View style={styles.InputAndIconView}>
                    <TextInput
                      onChangeText={props.handleChange('password')}
                      onBlur={props.handleBlur('password')}
                      value={props.values.password}
                      secureTextEntry={secure}
                      style={styles.PasswordInput}
                    />
                    <TouchableOpacity
                      style={{marginRight: 10}}
                      onPress={() => setSecure(prev => !prev)}>
                      {secure ? <ViewPassword /> : <HidePassword />}
                      {/* <Text> {secure ? 'Show' : 'Hide'} </Text> */}
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.ButtonsOverAllView}>
                  <TouchableOpacity
                    style={styles.ForgotPasswordView}
                    onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={styles.forgotPasswordText}>
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={props.handleSubmit}
                    // onPress={() => {
                    //   if (props.errors.password && props.errors.username) {
                    //     alert('Please Enter Correct Credentials');
                    //   } else {
                    //     dispatch(logIn({status: true})) && props.handleSubmit();
                    //   }
                    // }}
                    style={styles.SignInView}>
                    <Text style={styles.SignInText}>Login</Text>
                  </TouchableOpacity>
                </View>

                <Snackbar
                  visible={isMessageVisible}
                  style={{borderRadius: 30}}
                  onDismiss={() => setIsMessageVisible(false)}
                  action={{
                    label: 'OK',
                    onPress: () => {
                      setIsMessageVisible(false);
                    },
                  }}>
                  <Text>Invalid UserName/Password</Text>
                </Snackbar>
              </>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  TopLoginText: {color: '#96C547', fontSize: 35, fontWeight: 'bold'},
  LogoView: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: height / 2.5,
  },
  imageStyle: {
    width: 300,
    height: 150,
  },
  titleAndTextInputView: {
    marginLeft: 40,
    justifyContent: 'flex-start',
  },

  UserNameTextInputView: {
    // marginLeft: 30,
    marginHorizontal: 20,
    marginTop: 5,
    borderColor: 'grey',
    borderWidth: 0.5,
    borderRadius: 3,
  },

  UserNameInput: {
    height: 40,
    marginRight: 20,
    borderColor: 'grey',
    borderBottomWidth: 1,
  },
  PasswordAndInnerView: {marginLeft: 40, marginTop: 10},
  InputAndIconView: {
    borderColor: 'grey',
    borderWidth: 0.5,
    borderRadius: 3,
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  PasswordInput: {width: 270, marginLeft: 15},
  ForgotPasswordView: {
    backgroundColor: '#fe5200',
    width: 160,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  forgotPasswordText: {color: 'white', fontSize: 16},
  SignInView: {
    backgroundColor: '#97c548',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 10,
  },
  SignInText: {color: 'white', fontSize: 18},
  ButtonsOverAllView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    justifyContent: 'space-between',
    marginHorizontal: 45,
  },
});

export default Login;
