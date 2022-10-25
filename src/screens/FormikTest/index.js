import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {TextInput} from 'react-native-paper';

const Schema = yup.object({
  title: yup.string().required().min(4),
  body: yup.string().required().min(8),
  rating: yup
    .string()
    .required()
    .test('is-num-1-5', 'Rating must be a number btw 1-5', val => {
      return parseInt(val) > 0 && parseInt(val) < 6;
    }),
});

const FormikTest = () => {
  return (
    <>
      <Formik
        validationSchema={Schema}
        initialValues={{title: '', body: '', rating: ''}}
        onSubmit={(values, actions) => {
          console.log(values);
          actions.resetForm();
        }}>
        {props => (
          <View>
            <TextInput
              onBlur={props.handleBlur('title')}
              style={{
                // backgroundColor: 'red',
                borderColor: 'grey',
                borderWidth: 1,
                marginHorizontal: 10,
                marginTop: 10,
                borderRadius: 20,
              }}
              placeholder="Review Title"
              onChangeText={props.handleChange('title')}
              value={props.values.title}
            />
            <Text styles={{color: 'red'}}>
              {props.touched.title && props.errors.title}
            </Text>

            <TextInput
              style={{}}
              placeholder="Review body"
              onChangeText={props.handleChange('body')}
              value={props.values.body}
            />

            <TextInput
              style={{}}
              placeholder="Rating (1-5)"
              onChangeText={props.handleChange('rating')}
              value={props.values.rating}
              keyboardType="numeric"
            />

            <Button
              title="Submit"
              color="maroon"
              onPress={props.handleSubmit}
            />
          </View>
        )}
      </Formik>
    </>
  );
};

const styles = StyleSheet.create({});

export default FormikTest;
