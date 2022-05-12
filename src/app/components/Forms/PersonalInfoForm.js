/* eslint-disable no-sparse-arrays */
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';

import {Formik} from 'formik';
import {PersonalInfoSchema} from './validation';

import {useQuery} from '@apollo/client';
import {GET_PROFILE_ENTITY} from 'src/queries/queries';
import {INSERT_CHAT_CONNECTIONS, UPDATE_PROFILE} from 'src/queries/mutations';
import combineQuery from 'graphql-combine-query';
import apolloClient from 'src/graphql/connect';

// UI
import Input from '../Input';
import InputPhoneNumber from '../InputPhoneNumber';
import Button from '../../components/Button';
import ChapterSelect from 'src/components/Chapters/ChapterSelect';
import Loader from 'src/components/Loader';

const PersonalInfoForm = ({goNext}) => {
  const {name} = useTheme();
  let setError;

  const [phoneIsValid, setPhoneValid] = useState(false);
  const [account_uuid, setUserId] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('@account_id').then(id => {
      setUserId(id);
    });
  }, []);

  const {data} = useQuery(GET_PROFILE_ENTITY, {
    variables: {
      account_uuid,
    },
  });

  useEffect(() => {
    if (data?.rearden_profile[0].id) {
      AsyncStorage.setItem('@profile', data.rearden_profile[0].id);
    }
  }, [data]);

  const sendRequest = async values => {
    setIsLoading(true);
    let multipleMutation;
    const chapters = values.chapters.map(({chapter_uuid, chat_uuid}) => {
      return {
        chapter_uuid,
        chat_uuid,
        member_uuid: account_uuid,
        role: 'user',
      };
    });

    if (!chapters.length) {
      setError('chapters', 'Select minimum 1 chapter');
      setIsLoading(false);
      return;
    } else {
      multipleMutation = combineQuery('CompositeMutation').add(
        INSERT_CHAT_CONNECTIONS,
        {
          chapters,
        },
      );
    }

    const profile = {};
    Object.keys(values).forEach(name => {
      if (values[name].length && name !== 'chapters') {
        return (profile[name] = values[name]);
      }
    });
    profile.step_name = 'company';

    if (Object.keys(profile).length) {
      multipleMutation = combineQuery('CompositeMutation')
        .add(multipleMutation.document, {...multipleMutation.variables})
        .add(UPDATE_PROFILE, {
          id: data.rearden_profile[0].id,
          profile,
        });
    }

    apolloClient
      .mutate({
        mutation: multipleMutation.document,
        variables: multipleMutation.variables,
      })
      .then(res => {
        if (
          res.data?.insert_rearden_chat_connections.returning[0].id &&
          res.data.update_rearden_profile.returning[0].id
        ) {
          setIsLoading(false);
          goNext();
        }
      })
      .catch(error => {
        setIsLoading(false);
        console.error('PERSONAL INFO ERROR', error);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.select({
        ios: () => 40,
        android: () => 0,
      })()}
      style={styles.container}>
      <View style={styles.inner}>
        {isLoading && <Loader />}
        <Formik
          initialValues={{
            chapters: [],
            sponsor: '',
            first_name: '',
            middle_name: '',
            last_name: '',
            nickname: '',
            membership_name: '',
            phone_number: '',
          }}
          enableReinitialize={true}
          validationSchema={PersonalInfoSchema}
          onSubmit={values => {
            if (!phoneIsValid) {
              setError('phone_number', 'Invalid phone number');
              return false;
            }
            sendRequest(values);
          }}>
          {formProps => {
            const {
              handleSubmit,
              values,
              errors,
              handleChange,
              setFieldTouched,
              setFieldValue,
              setFieldError,
              touched,
            } = formProps;
            setError = setFieldError;
            return (
              <ScrollView>
                {/* <View style={styles.selectWrapper}> */}
                <ChapterSelect {...formProps} />
                {/* </View> */}
                <View style={styles.wrapper}>
                  <Input
                    name={'sponsor'}
                    label="Sponsor"
                    placeholder="Enter your Sponsor"
                    onChangeText={handleChange('sponsor')}
                    onBlur={name => setFieldTouched('sponsor')}
                    value={values.sponsor}
                    error={errors.sponsor}
                    touched={touched.sponsor}
                  />
                  <Input
                    name={'first_name'}
                    label="First Name"
                    placeholder="Enter your First Name"
                    onChangeText={handleChange('first_name')}
                    onBlur={name => setFieldTouched('first_name')}
                    value={values.first_name}
                    error={errors.first_name}
                    touched={touched.first_name}
                  />
                  <Input
                    name={'middle_name'}
                    label="Middle Name"
                    placeholder="Enter your Middle Name"
                    onChangeText={handleChange('middle_name')}
                    onBlur={name => setFieldTouched('middle_name')}
                    value={values.middle_name}
                    error={errors.middle_name}
                    touched={touched.middle_name}
                  />
                  <Input
                    name={'last_name'}
                    label="Surname"
                    placeholder="Enter your Surname"
                    onChangeText={handleChange('last_name')}
                    onBlur={name => setFieldTouched('last_name')}
                    value={values.last_name}
                    error={errors.last_name}
                    touched={touched.last_name}
                  />
                  <Input
                    name={'membership_name'}
                    label="Name as it should appear on Membership Card"
                    placeholder="Enter your Membership Name"
                    onChangeText={handleChange('membership_name')}
                    onBlur={name => setFieldTouched('membership_name')}
                    value={values.membershipCardName}
                    error={errors.membership_name}
                    touched={touched.membership_name}
                  />
                  <Input
                    name={'nickname'}
                    label="Nickname/Preferred Name"
                    placeholder="Enter your Nickname"
                    onChangeText={handleChange('nickname')}
                    onBlur={name => setFieldTouched('nickname')}
                    value={values.nickname}
                    error={errors.nickname}
                    touched={touched.nickname}
                  />
                </View>
                <View style={styles.sropsownWrapper}>
                  <InputPhoneNumber
                    {...formProps}
                    setValue={(name, phone, isValid) => {
                      setFieldValue(name, phone);
                      setPhoneValid(isValid);
                    }}
                    name="phone_number"
                    label="Personal Phone Number"
                  />
                </View>
                <View
                  style={{
                    ...styles.controls,
                    backgroundColor: name === 'dark' ? '#1F2937' : '#F8FAFC',
                  }}>
                  {/* <View style={styles.buttonWrapper}>
                    <Button
                      onPress={() => goPrev(1)}
                      text="Back"
                      type="secondary"
                    />
                  </View> */}
                  <View style={styles.buttonWrapper}>
                    <Button onPress={handleSubmit} text="Next" />
                  </View>
                </View>
              </ScrollView>
            );
          }}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  wrapper: {
    zIndex: -1,
    paddingLeft: 16,
    paddingRight: 16,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
  controls: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#1F2937',
    paddingTop: 20,
    marginTop: 56,
    paddingBottom: 56,
    paddingLeft: 8,
    paddingRight: 8,
  },
  buttonWrapper: {
    flex: 1,
    paddingRight: 8,
    paddingLeft: 8,
  },
  sropsownWrapper: {
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 24,
    position: 'relative',
  },
  selectWrapper: {
    padding: 15,
    zIndex: 1000,
    // elevation: 100,
    marginBottom: 10,
  },
});

export default PersonalInfoForm;
