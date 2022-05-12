import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Keyboard, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import * as routes from 'src/constants/routes';
import ChapterSelect from 'src/components/Chapters/ChapterSelect';

import {Formik} from 'formik';
import {ChangePassword} from 'src/components/Forms/validation';

// UI
import Input from 'src/components/Input';
import Button from 'src/components/Button';

const InvateMemberForm = ({navigation, colors}) => {
  let setErors, resetForm;

  const handleSubmit = async values => {};

  return (
    <>
      <Formik
        initialValues={{
          old_password: '',
          password: '',
          password_confirmation: '',
        }}
        validationSchema={ChangePassword}
        onSubmit={values => handleSubmit(values)}>
        {formProps => {
          const {
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            setFieldTouched,
            touched,
            setFieldError,
            handleReset,
            dirty,
            isValid,
          } = formProps;
          setErors = setFieldError;
          resetForm = handleReset;
          return (
            <View style={styles().wrapper}>
              <Input
                name="email"
                label="Email address"
                placeholder="Enter your email"
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                value={values.email}
                error={errors.email}
                touched={touched?.email}
                theme={colors}
              />
              <Input
                name="descr"
                label="Description"
                placeholder="Enter your email"
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                value={values.email}
                error={errors.email}
                touched={touched?.email}
                theme={colors}
                multiline={true}
                customHeigth={100}
              />
            </View>
          );
        }}
      </Formik>
    </>
  );
};

const styles = props => {
  return StyleSheet.create({
    wrapper: {
      paddingLeft: 16,
      paddingRight: 16,
    },
    bottomPanel: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 16,
    },
    agreement: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    label: {
      color: props?.primary,
    },
  });
};

export default InvateMemberForm;
