import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Formik} from 'formik';
import {PersonalInterestSchema} from './validation';
import {useTheme} from '@react-navigation/native';

import {useMutation} from '@apollo/client';
import {INSERT_PROFILE_INTERESTS, UPDATE_PROFILE} from 'src/queries/mutations';
import apolloClient from 'src/graphql/connect';
import combineQuery from 'graphql-combine-query';

// UI
import Button from '../../components/Button';
import Dropdown from '../Dropdown';
import Loader from 'src/components/Loader';

const PersonalInterestForm = props => {
  const {goPrev, goNext, initialValues, onSubmit, staticData} = props;
  const [formSchema, setFormaScheme] = useState([]);
  const [owner_profile_uuid, setProfile] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('@profile').then(id => {
      setProfile(id);
    });
  }, []);

  useEffect(() => {
    staticData &&
      setFormaScheme([
        {
          type: 'select',
          name: 'community',
          label: 'Community',
          list: staticData?.сommunity,
        },
        {
          type: 'select',
          name: 'travel',
          label: 'Travel',
          list: staticData?.travel,
        },
        {
          type: 'select',
          name: 'arts',
          label: 'Arts & Entertainment',
          list: staticData?.arts,
        },
        {
          type: 'select',
          name: 'health',
          label: 'Health & Wellness',
          list: staticData?.health,
        },
        {
          type: 'select',
          name: 'general',
          label: 'General Interests',
          list: staticData?.general,
        },
        {
          type: 'select',
          name: 'family',
          label: 'Interests Regarding Your Family',
          list: staticData?.family,
        },
        {
          type: 'select',
          name: 'business',
          label: 'Interests Regarding Your Business',
          list: staticData?.business,
        },
        {
          type: 'select',
          name: 'leadership',
          label: 'Leadership',
          list: staticData.leadership,
        },
        {
          type: 'select',
          name: 'sports',
          label: 'Sports (General)',
          list: staticData.sports_general,
        },
        {
          type: 'select',
          name: 'outdoor',
          label: 'Outdoor Activities',
          list: staticData.outdoor,
        },
        {
          type: 'select',
          name: 'teamSports',
          label: 'Team Sports',
          list: staticData.team_sports,
        },
      ]);
  }, [staticData]);

  const {name} = useTheme();

  const getInitialValues = () => {
    const res = {};
    formSchema.forEach(item => {
      res[item.name] = '';
    });
    return res;
  };

  // const [InsertProfileInterests, {data, loading, error}] = useMutation(
  //   INSERT_PROFILE_INTERESTS,
  // );

  const handleSubmit = values => {
    setIsLoading(true);
    const profile = {
      step_name: 'risk',
    };
    const data = [];
    Object.keys(values).forEach(key => {
      if (values[key].length) {
        values[key].forEach(item => {
          return data.push({
            type: key,
            interest: item,
            profile_uuid: '1686fedd-221b-4eb0-9911-561450402c16',
          });
        });
      }
    });

    let combineMutation = combineQuery('CompositeMutation').add(
      UPDATE_PROFILE,
      {
        id: owner_profile_uuid,
        profile,
      },
    );

    if (data?.length) {
      combineMutation = combineQuery('CompositeMutation')
        .add(combineMutation.document, combineMutation.variables)
        .add(INSERT_PROFILE_INTERESTS, {
          objects: data,
        });
    }

    apolloClient
      .mutate({
        mutation: combineMutation.document,
        variables: combineMutation.variables,
      })
      .then(res => {
        setIsLoading(false);
        goNext();
      })
      .catch(error => {
        setIsLoading(false);
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
        <View style={styles.inner}>
          <Formik
            initialValues={getInitialValues()}
            validationSchema={PersonalInterestSchema}
            onSubmit={values => {
              handleSubmit(values);
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              initialValues,
              touched,
              setFieldTouched,
              setFieldValue,
            }) => {
              return (
                <ScrollView>
                  {formSchema.map((field, index) => {
                    const {name, label, type} = field;
                    if (type === 'select') {
                      return (
                        <View
                          style={styles.sropsownWrapper}
                          key={`${name}_${index}`}>
                          <Dropdown
                            name={name}
                            label={label}
                            list={field.list}
                            placeholder={`Enter your ${label}`}
                            handleSelect={value => setFieldValue(name, value)}
                            onBlur={name => setFieldTouched(name)}
                            value={values[name]}
                            defaultValue={values[name] || []}
                            error={errors[name]}
                            touched={touched[name]}
                            multiple={true}
                            zIndex={(formSchema.length - index) * 10000}
                          />
                        </View>
                      );
                    }
                  })}
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
                      <Button onPress={handleSubmit} text="Next" />
                    </View>
                  </View>
                </ScrollView>
              );
            }}
          </Formik>
        </View>
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
  },
});

export default PersonalInterestForm;
