import React, {useState} from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as routes from 'src/constants/routes';

import {useMutation, useQuery} from '@apollo/client';
import {LOGIN} from '../../queries/mutations';

import {Formik} from 'formik';
import {SignInSchema} from './validation';

// UI
import Input from 'src/components/Input';
import Button from 'src/components//Button';
import FormCheckbox from 'src/components//FormCheckbox';
import Link from 'src/components//Link';
import Loader from 'src/components/Loader';
import {GET_PROFILE_ENTITY, GET_ROLE} from '../../queries/queries';

const SignInForm = ({navigation}) => {
  let setErors, resetForm;
  const [isRemember, setIsRemember] = useState(false);
  const [accountId, setAccountId] = useState('');

  const [login, {data, loading, error}] = useMutation(LOGIN);

  const handleSubmit = values => {
    login({variables: values}).then(data => loginUser(data));
  };

  const userRole = useQuery(GET_PROFILE_ENTITY, {
    variables: {
      account_uuid: accountId,
    },
  });

  const loginUser = data => {
    const {
      code,
      message: msg,
      account_id,
      error: exeptionm,
      profile_id,
      accessToken,
    } = data.data.login;

    const saveToStorage = async (key, value) => {
      await AsyncStorage.setItem(key, value);
    };

    const saveUserIdentity = () => {
      saveToStorage('@account_id', account_id);
      saveToStorage('@autorization', accessToken);
      saveToStorage('@profile', profile_id);
      // saveToStorage('@role', userRole.data.rearden_profile[0].profiles[0].role);
      if (isRemember) {
        saveToStorage('@remeberUser', 'true');
      }
    };

    if (code === 4043 || code === 4044) {
      setErors('email', 'Invalid email or password');

      return;
    }

    if (code === 4043 || code === 3032) {
      navigation.navigate(routes.EMAIL_VERIFY);

      return;
    }

    if (code === 3035) {
      resetForm();
      navigation.navigate(routes.EMAIL_CONFIRM);

      return;
    }

    if (code === 3034) {
      setAccountId(account_id);
      resetForm();
      saveUserIdentity();
      navigation.navigate(routes.MEMBERSHIP_APPLICATION);
      return;
    }

    if (code === 200) {
      setAccountId(account_id);
      resetForm();
      saveUserIdentity();
      navigation.navigate(routes.HOME);
      return;
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={SignInSchema}
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
        }) => {
          setErors = setFieldError;
          resetForm = handleReset;
          return (
            <View style={styles.wrapper}>
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
              <View style={styles.bottomPanel}>
                <FormCheckbox
                  label="Remember me"
                  value={isRemember}
                  handleChange={() => setIsRemember(!isRemember)}
                />
                <Link
                  text="Forgot your password?"
                  handleClick={() =>
                    navigation.navigate(routes.FORGOT_PASSWORD)
                  }
                />
              </View>
              <Button onPress={handleSubmit} text="Sign in" />
            </View>
          );
        }}
      </Formik>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  bottomPanel: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
});

export default SignInForm;
