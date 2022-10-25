import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Button,
  TouchableOpacity,
  ProgressViewIOSComponent,
  TouchableNativeFeedbackBase,
} from 'react-native';
const {height, width} = Dimensions.get('window');
import {ErrorMessage, Formik} from 'formik';
import * as yup from 'yup';

const EmailValidationSchema = yup.object({
  email: yup
    .string()
    .email('Must be a valid E-mail')
    .required('Email is required'),
});

const ForgotPassword = () => {
  return (
    <ScrollView style={styles.ScreenBackground}>
      <View style={styles.LogoView}>
        <Image
          resizeMode="contain"
          source={require('../../../assets/dukandar_logo.png')}
          style={styles.LogoWidthAndHeight}
        />
      </View>

      <View style={{marginLeft: 40}}>
        <Text style={styles.ForgotPassword}>Forgot</Text>
        <Text style={styles.ForgotPassword}>Password</Text>
      </View>

      <View style={styles.InstructionView}>
        <Text style={styles.InstructionText}>
          Please enter the email associated with your account
        </Text>
      </View>

      <KeyboardAvoidingView behavior="padding">
        <Text style={styles.EmailText}>Email</Text>

        <Formik
          validationSchema={EmailValidationSchema}
          initialValues={{email: ''}}
          onSubmit={values => console.log(values)}>
          {props => (
            <>
              <View style={styles.TextInputView}>
                <TextInput
                  style={{marginHorizontal: 15}}
                  placeholder="Enter your E-mail"
                  onChangeText={props.handleChange('email')}
                  onBlur={props.handleBlur('email')}
                  value={props.values.email}
                />
              </View>
              <Text style={{marginLeft: 35}}>
                {props.touched.email && props.errors.email}{' '}
              </Text>

              {/* <Button onPress={handleSubmit} title="Submit"  /> */}

              <TouchableOpacity
                onPress={props.handleSubmit}
                style={styles.SubmitView}>
                <Text style={styles.SubmitText}>Submit</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>

        {/* <View >
          <TextInput
            placeholder="Enter your e-mail"
            style={styles.UserInputStyle}
          />
        </View> */}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  LogoWidthAndHeight: {height: 150, width: 300},
  InstructionView: {marginHorizontal: 40},
  InstructionText: {color: 'black'},
  EmailText: {marginHorizontal: 40, marginTop: 20},
  UserInputStyle: {marginHorizontal: 16},
  ScreenBackground: {flex: 1, backgroundColor: 'white'},
  LogoView: {
    alignItems: 'center',
    height: height / 2.5,
    justifyContent: 'flex-end',
  },
  ForgotPassword: {fontSize: 35, color: '#96C547', fontWeight: 'bold'},
  TextInputView: {
    borderRadius: 3,
    borderColor: 'grey',
    borderWidth: 0.5,
    marginHorizontal: 20,
    marginTop: 10,
  },
  SubmitView: {
    backgroundColor: '#96C547',
    marginHorizontal: 25,
    marginTop: 25,
    alignItems: 'center',
    borderRadius: 20,
    height: 40,

    justifyContent: 'center',
  },
  SubmitText: {color: 'white', fontWeight: 'bold', fontSize: 16},
});

export default ForgotPassword;
