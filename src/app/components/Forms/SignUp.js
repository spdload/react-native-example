import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Keyboard, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import * as routes from 'src/constants/routes';

import {Formik} from 'formik';
import {SignUpSchema} from 'src/components/Forms/validation';

import {useMutation} from '@apollo/client';
import {SIGNUP} from 'src/queries/mutations';
import AsyncStorage from '@react-native-async-storage/async-storage';

// UI
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import FormCheckbox from 'src/components/FormCheckbox';
import Loader from 'src/components/Loader';

const SignUpForm = ({navigation}) => {
  let setErors, resetForm;
  const [isAgree, setAgree] = useState(false);

  const {
    colors: {typography: colors},
  } = useTheme();

  const [signUp, {data, loading, error}] = useMutation(SIGNUP);

  const handleSubmit = async values => {
    const {email, password} = values;
    await signUp({variables: {email, password, isAgreed: true}}).then(data =>
      validateError(data),
    );
  };

  const validateError = data => {
    const {message, error} = data.data.signup;
    const {signup} = data.data;
    if (message === 'Success') {
      Keyboard.dismiss();
      setAgree(false);
      resetForm();
      navigation.navigate(routes.EMAIL_CONFIRM);
      return;
    }
    if (message === 'Error' && signup.error?.property) {
      setErors(signup.error.property, error.message);
      return;
    }
    if (signup.error === 'Invalid account') {
      setErors('email', signup.error);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Formik
        initialValues={{
          email: '',
          password: '',
          password_confirmation: '',
        }}
        validationSchema={SignUpSchema}
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
                name="email"
                label="Email address"
                placeholder="Enter your email"
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                value={values.email}
                error={errors.email}
                touched={touched?.email}
              />
              <Input
                name="password"
                label="Password"
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
                label="Repeat Password"
                onChangeText={handleChange('password_confirmation')}
                onBlur={() => setFieldTouched('password')}
                value={values.password_confirmation}
                error={errors.password_confirmation}
                isPassword={true}
                touched={touched?.password_confirmation}
              />
              <View style={styles().bottomPanel}>
                <FormCheckbox
                  label=""
                  handleChange={() => setAgree(!isAgree)}
                  value={isAgree}
                />
                <View style={styles().agreement}>
                  <Text
                    onPress={() => setAgree(!isAgree)}
                    style={styles(colors).label}>
                    I agree with{' '}
                  </Text>
                  <Text
                    style={styles(colors).link}
                    onPress={() => navigation.navigate(routes.PRIVACY_POLISY)}>
                    Membership Agreement
                  </Text>
                  <Text
                    style={styles(colors).link}
                    onPress={() => navigation.navigate(routes.PRIVACY_POLISY)}>
                    >& Signature Information
                  </Text>
                </View>
              </View>
              <Button
                onPress={handleSubmit}
                text="Sign up"
                disabled={!isAgree}
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
    link: {
      fontSize: 14,
      textDecorationLine: 'underline',
      textDecorationStyle: 'solid',
      textDecorationColor: props?.primary,
      color: props?.primary,
    },
  });
};

export default SignUpForm;
