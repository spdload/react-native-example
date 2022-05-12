import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Formik} from 'formik';
import {CompanyInfoSchema} from './validation';
import {useTheme} from '@react-navigation/native';
import InputPhoneNumber from '../InputPhoneNumber';

import {useQuery, useMutation} from '@apollo/client';
import {INSERT_COMPANY_INFORMATION} from 'src/queries/mutations';
import {GET_COMPANY_ENTITY} from 'src/queries/queries';

// UI
import Input from '../Input';
import Button from '../../components/Button';
import SplitLine from '../SplitLine';
import Loader from 'src/components/Loader';

const CompanyInfoForm = props => {
  const {name} = useTheme();
  const {goPrev, goNext} = props;
  const [phoneIsValid, setPhoneValid] = useState(false);
  const [account_uuid, setUserId] = useState();
  const [profileId, setProfileId] = useState();
  let setError;

  useEffect(() => {
    AsyncStorage.getItem('@account_id').then(id => {
      setUserId(id);
    });
    AsyncStorage.getItem('@profile').then(id => {
      setProfileId(id);
    });
  }, []);

  const {data} = useQuery(GET_COMPANY_ENTITY, {
    variables: {
      account_uuid,
    },
  });

  const [InsertCompanyInformation, {loading, error}] = useMutation(
    INSERT_COMPANY_INFORMATION,
  );

  const sendRequest = async values => {
    const company_profile = {};
    Object.keys(values).forEach(name => {
      if (
        values[name].length &&
        name !== 'city' &&
        name !== 'country' &&
        name !== 'zipcode'
      ) {
        return (company_profile[name] = values[name]);
      }
    });

    const {city, country, zipcode} = values;
    InsertCompanyInformation({
      variables: {
        company_uuid: data.rearden_company[0].id,
        profile_uuid: profileId,
        address: {
          city,
          country,
          ...(zipcode && {zipcode}),
          object_id: data.rearden_company[0].id,
          object_type: 'company',
        },
        profile: {
          step_name: 'family',
        },
        company_profile,
      },
    }).then(() => goNext());
  };

  useEffect(() => {
    if (error && setError) {
      error.graphQLErrors.map(error => {
        if (error?.extensions?.internal?.error?.message) {
          const {property, message} = JSON.parse(
            error?.extensions?.internal?.error?.message,
          );
          if (property && message) {
            setError(property, message);
          }
        }
      });
    }
  }, [error, setError]);

  return (
    <>
      {loading && <Loader />}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.select({
          ios: () => 40,
          android: () => 50,
        })()}
        style={styles.container}>
        <View style={styles.inner}>
          <Formik
            initialValues={{
              name: '',
              email: '',
              phone_number: '',
              website: '',
              title: '',
              city: '',
              country: '',
              zipcode: '',
              aum: '',
              type: '',
              description: '',
            }}
            validationSchema={CompanyInfoSchema}
            onSubmit={values => {
              sendRequest(values);
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
                  <View style={styles.wrapper}>
                    <Input
                      name={'name'}
                      label="Company Name"
                      placeholder="Enter your Company Name"
                      onChangeText={handleChange('name')}
                      onBlur={() => setFieldTouched('name')}
                      value={values.name}
                      error={errors.name}
                      touched={touched.name}
                    />
                  </View>
                  <View style={styles.wrapper}>
                    <SplitLine
                      label="Company Address::"
                      styles={{marginBottom: 16}}
                    />
                    <Input
                      name={'city'}
                      label="City"
                      placeholder="Enter your City"
                      onChangeText={handleChange('city')}
                      onBlur={() => setFieldTouched('city')}
                      value={values.city}
                      error={errors.city}
                      touched={touched.city}
                    />
                    <Input
                      name={'country'}
                      label="Country"
                      placeholder="Enter your Country"
                      onChangeText={handleChange('country')}
                      onBlur={() => setFieldTouched('country')}
                      value={values.country}
                      error={errors.country}
                      touched={touched.country}
                    />
                    <Input
                      name={'zipcode'}
                      label="Postal Code"
                      placeholder="Enter your Postal Code"
                      onChangeText={handleChange('zipcode')}
                      onBlur={() => setFieldTouched('zipcode')}
                      value={values.zipcode}
                      error={errors.zipcode}
                      touched={touched.zipcode}
                    />
                  </View>
                  <View style={styles.wrapper}>
                    <SplitLine label="Contact:" styles={{marginBottom: 16}} />
                    <Input
                      name={'email'}
                      label="Business Email"
                      placeholder="Enter your Business Email"
                      onChangeText={handleChange('email')}
                      onBlur={() => setFieldTouched('email')}
                      value={values.email}
                      error={errors.email}
                      touched={touched.email}
                    />
                    <InputPhoneNumber
                      {...formProps}
                      setValue={(name, phone, isValid) => {
                        setFieldValue(name, phone);
                        setPhoneValid(isValid);
                      }}
                      name="phone_number"
                      label="Business Phone Number"
                    />
                    <Input
                      name={'website'}
                      label="Company Website"
                      placeholder="Enter your Company Website"
                      onChangeText={handleChange('website')}
                      onBlur={() => setFieldTouched('website')}
                      value={values.website}
                      error={errors.website}
                      touched={touched.website}
                    />
                  </View>
                  <View style={styles.wrapper}>
                    <SplitLine
                      label="Company Website"
                      styles={{marginBottom: 16}}
                    />
                    <Input
                      name={'title'}
                      label="Title Held at the Company"
                      placeholder="Enter Title Held at the Company"
                      onChangeText={handleChange('title')}
                      onBlur={() => setFieldTouched('title')}
                      value={values.title}
                      error={errors.title}
                      touched={touched.title}
                    />
                    <Input
                      name={'aum'}
                      label="Total AUM"
                      placeholder="Enter Total AUM"
                      onChangeText={handleChange('aum')}
                      onBlur={() => setFieldTouched('aum')}
                      value={values.aum}
                      error={errors.aum}
                      touched={touched.aum}
                      isNumeric={true}
                    />
                    <Input
                      name={'type'}
                      label="Type of Company"
                      placeholder="Enter Type of Company"
                      onChangeText={handleChange('type')}
                      onBlur={() => setFieldTouched('type')}
                      value={values.type}
                      error={errors.type}
                      touched={touched.type}
                    />
                    <Input
                      name={'description'}
                      label="Company Description"
                      placeholder="Enter Company Description"
                      onChangeText={handleChange('description')}
                      onBlur={() => setFieldTouched('description')}
                      value={values.description}
                      error={errors.description}
                      touched={touched.description}
                    />
                  </View>
                  <View
                    style={{
                      ...styles.controls,
                      backgroundColor: name === 'dark' ? '#1F2937' : '#F8FAFC',
                    }}>
                    {/* <View style={styles.buttonWrapper}>
                    <Button
                      onPress={() => goPrev()}
                      text="Back"
                      type="secondary"
                    />
                  </View> */}
                    <View style={styles.buttonWrapper}>
                      <Button text="Next" onPress={handleSubmit} />
                    </View>
                  </View>
                </ScrollView>
              );
            }}
          </Formik>
        </View>
      </KeyboardAvoidingView>
    </>
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
});

export default CompanyInfoForm;
