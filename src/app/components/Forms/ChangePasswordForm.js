import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Keyboard, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import * as routes from 'src/constants/routes';

import {Formik} from 'formik';
import {ChangePassword} from 'src/components/Forms/validation';

import {useMutation} from '@apollo/client';
import {SIGNUP} from 'src/queries/mutations';

// UI
import Input from '../Input';
import Button from 'src/components/Button';
import Loader from 'src/components/Loader';
import AlertModal from '../Modals/AlertModal';
const ChangePasswordForm = ({navigation}) => {
  const [signup, {loading}] = useMutation(SIGNUP);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  let setErors, resetForm;

  const {
    colors: {typography: colors},
  } = useTheme();

  const handleSubmit = async values => {
    setIsOpenDialog(true);
    resetForm();
  };
  return (
    <>
      {loading && <Loader />}
      <Formik
        initialValues={{
          old_password: '',
          password: '',
          password_confirmation: '',
        }}
        validationSchema={ChangePassword}
        onSubmit={values => handleSubmit(values)}>
        {({
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
        }) => {
          setErors = setFieldError;
          resetForm = handleReset;
          return (
            <View style={styles().wrapper}>
              <Input
                name="old_password"
                label="Old password"
                placeholder="Enter your old password"
                onChangeText={handleChange('old_password')}
                onBlur={() => setFieldTouched('old_password')}
                isPassword={true}
                value={values.old_password}
                error={errors.old_password}
                touched={touched?.old_password}
              />
              <Input
                name="password"
                label="New password"
                placeholder="Password"
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
                value={values.password}
                error={errors.password}
                isPassword={true}
                touched={touched?.password}
              />
              <Input
                placeholder="Repeat password"
                label="Confirm new password"
                onChangeText={handleChange('password_confirmation')}
                onBlur={() => setFieldTouched('password')}
                value={values.password_confirmation}
                error={errors.password_confirmation}
                isPassword={true}
                touched={touched?.password_confirmation}
              />

              <Button onPress={handleSubmit} text="Save" />
            </View>
          );
        }}
      </Formik>
      <AlertModal
        title="Success"
        text="Your password has been successfully changed"
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
      />
    </>
  );
};

const styles = props => {
  return StyleSheet.create({
    wrapper: {
      paddingLeft: 16,
      paddingRight: 16,
      height: 280,
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
    link: {
      fontSize: 14,
      textDecorationLine: 'underline',
      textDecorationStyle: 'solid',
      textDecorationColor: props?.primary,
      color: props?.primary,
    },
  });
};

export default ChangePasswordForm;
