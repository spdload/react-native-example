import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {familyBioInfoSchema, inputBasic} from './validation';
import {useTheme} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import apolloClient from 'src/graphql/connect';
import combineQuery from 'graphql-combine-query';
import {
  INSERT_EDUCATION,
  INSERT_ORGANIZATION,
  INSERT_FAMILY_INFO,
  UPDATE_PROFILE,
  INSERT_ADDRESS,
} from 'src/queries/mutations';

// UI
import Input from '../Input';
import Button from '../../components/Button';
import SplitLine from '../SplitLine';
import AddButton from '../AddButton';
import Loader from 'src/components/Loader';

const formSchema = [
  {
    groupTitle: 'Home Address:',
    fields: [
      {
        type: 'input',
        name: 'city',
        label: 'City',
      },
      {
        type: 'input',
        name: 'country',
        label: 'Country',
      },
      {
        type: 'input',
        name: 'zipcode',
        label: 'Postal Code',
      },
    ],
  },
  {
    groupTitle: 'Family:',
    fields: [
      {
        type: 'input',
        name: 'spouseName',
        label: 'Spouse’s Name (optional)',
      },
      {
        type: 'input',
        name: 'childrenName',
        label: 'Children’s Name(s) (optional)',
      },
    ],
  },
  {
    groupTitle: 'Languages:',
    fields: [
      {
        type: 'input',
        name: 'primary_languages',
        label: 'Primary Language Spoken',
      },
      {
        type: 'input',
        name: 'other_languages',
        label: 'Other Fluent Languages',
      },
    ],
  },
  {
    groupTitle: 'Education',
    fields: [
      {
        type: 'input',
        name: 'degree',
        label: 'Degree Received',
      },
      {
        type: 'input',
        name: 'major',
        label: 'Major',
      },
      {
        type: 'input',
        name: 'year_graduated',
        label: 'Year Graduated',
      },
    ],
  },
  {
    groupTitle: '',
    fields: [
      {
        type: 'input',
        name: 'organizations',
        label: 'Other Organizations or Associations to Which You Belong:',
      },
    ],
  },
];

const FamilyBioForm = props => {
  const {name} = useTheme();
  const [schema, setSchema] = useState(formSchema);
  const [educationBlock, setEducationBlock] = useState(1);
  const [validationSchema, setValidationSchema] = useState(familyBioInfoSchema);
  const [initial, setInitial] = useState();
  const [owner_profile_uuid, setProfile] = useState();
  const {goPrev, goNext, initialValues, onSubmit} = props;
  const [isLoading, setIsLoading] = useState(false);
  let setError;

  useEffect(() => {
    AsyncStorage.getItem('@profile').then(id => {
      setProfile(id);
    });
  }, []);

  const getInitialValues = count => {
    const res = {};
    formSchema.forEach(item => {
      item.fields?.length &&
        item.fields.forEach(field => {
          if (
            field.name === 'degree' ||
            field.name === 'major' ||
            field.name === 'year_graduated'
          ) {
            for (let i = 1; i <= count; i++) {
              res[`${field.name}${i}`] =
                initialValues && initialValues[`${field.name}${i}`]
                  ? initialValues[`${field.name}${i}`].toLowerCase()
                  : '';
            }
          } else {
            res[field.name] =
              initialValues && initialValues[field.name]
                ? initialValues[field.name]
                : '';
          }
        });
    });
    setInitial(res);
  };

  useEffect(() => {
    getInitialValues(1);
  }, []);

  useEffect(() => {
    if (initialValues) {
      const count =
        initialValues &&
        Math.max.apply(
          null,
          Object.keys(initialValues).map(key => {
            return key.replace(/\D+/, '');
          }),
        );
      setEducationBlock(count);
      getInitialValues(count);
    }
  }, [initialValues]);

  const addEducationBlock = () => {
    setEducationBlock(educationBlock + 1);
    updateValidaion();
  };

  const updateValidaion = () => {
    const newValidationSchema = {
      ...validationSchema,
      [`degree${educationBlock}`]: inputBasic,
      [`major${educationBlock}`]: inputBasic,
      [`year_graduated${educationBlock}`]: inputBasic,
    };
    setValidationSchema(newValidationSchema);
  };

  const renderEducation = (group, props) => {
    const educationBlocks = [];
    for (let i = 1; i <= educationBlock; i++) {
      educationBlocks.push(
        <View style={styles.wrapper} key={i}>
          {group?.groupTitle ? (
            <SplitLine
              label={`${group.groupTitle}${i > 1 ? i : ''}:`}
              styles={{marginBottom: 16}}
            />
          ) : (
            <></>
          )}
          {group.fields.map((field, index) => {
            const {name, label, type} = field;
            const nameFormated = `${field.name}${i}`.toLowerCase();
            if (type === 'input') {
              return (
                <Input
                  key={index}
                  name={nameFormated}
                  label={label}
                  placeholder={`Enter your ${label}`}
                  onChangeText={props.handleChange(nameFormated)}
                  onBlur={name => props.setFieldTouched(name)}
                  value={props.values[nameFormated]}
                  error={props.errors[{nameFormated}]}
                  touched={props.touched[nameFormated]}
                  isNumeric={field?.numeric}
                />
              );
            }
          })}
        </View>,
      );
    }
    educationBlocks.push(
      <View style={styles.wrapper} key={'addButton'}>
        <AddButton
          text={'Add education'}
          styles={{marginBottom: 16}}
          onPress={() => addEducationBlock()}
        />
      </View>,
    );

    return educationBlocks;
  };

  const sendFormData = values => {
    setIsLoading(true);
    const {
      city,
      country,
      zipcode,
      primary_languages,
      other_languages,
      childrenName,
      spouseName,
      organizations,
    } = values;
    const id = owner_profile_uuid;

    const profile = {
      primary_languages,
      other_languages,
      step_name: 'interests',
    };

    let combineMutation = combineQuery('CompositeMutation').add(
      UPDATE_PROFILE,
      {
        id: owner_profile_uuid,
        profile,
      },
    );

    const education = [];
    for (let i = 1; i <= educationBlock; ++i) {
      const educationObj = {
        profile_uuid: owner_profile_uuid,
        ...(values['degree' + i]?.length && {degree: values[`degree${i}`]}),
        ...(values['major' + i]?.length && {major: values[`major${i}`]}),
        ...(values['year_graduated' + i]?.length && {
          year_graduated: values[`year_graduated${i}`],
        }),
      };
      if (Object.keys(educationObj).length > 1) {
        education.push(educationObj);
      }
    }

    if (education.length) {
      combineMutation = combineQuery('CompositeMutation')
        .add(combineMutation.document, combineMutation.variables)
        .add(INSERT_EDUCATION, {
          education,
        });
    }

    const organization = {
      profile_uuid: owner_profile_uuid,
      name: values?.organizations,
    };

    if (organizations?.length) {
      combineMutation = combineQuery('CompositeMutation')
        .add(combineMutation.document, combineMutation.variables)
        .add(INSERT_ORGANIZATION, {
          organization,
        });
    }

    const address = {
      ...(city && {city}),
      ...(country && {country}),
      zipcode,
      object_id: owner_profile_uuid,
      object_type: 'family',
    };

    combineMutation = combineQuery('CompositeMutation')
      .add(combineMutation.document, combineMutation.variables)
      .add(INSERT_ADDRESS, {
        address,
      });

    const family = [];
    if (childrenName) {
      family.push({
        name: childrenName,
        owner_profile_uuid: owner_profile_uuid,
        relation: 'child',
      });
    }
    if (spouseName) {
      family.push({
        name: spouseName,
        owner_profile_uuid: owner_profile_uuid,
        relation: 'spouse',
      });
    }

    if (family.length) {
      combineMutation = combineQuery('CompositeMutation')
        .add(combineMutation.document, combineMutation.variables)
        .add(INSERT_FAMILY_INFO, {
          family,
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
        error.graphQLErrors.map(error => {
          if (error?.extensions?.internal?.error?.message) {
            const {property, message} = JSON.parse(
              error?.extensions?.internal?.error?.message,
            );
            setError(property, message);
          }
        });
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
        <View style={styles.inner}>
          {isLoading && <Loader />}
          {initial && (
            <Formik
              initialValues={{
                city: '',
                country: '',
                zipcode: '',
              }}
              enableReinitialize={true}
              validationSchema={Yup.object().shape(validationSchema)}
              onSubmit={values => {
                // goNext();
                sendFormData(values);
              }}>
              {props => {
                const {
                  handleChange,
                  handleSubmit,
                  values,
                  errors,
                  setFieldError,
                  touched,
                  setFieldTouched,
                } = props;
                setError = setFieldError;
                return (
                  <ScrollView>
                    {schema.map((group, index) => {
                      return group.groupTitle === 'Education' ? (
                        renderEducation(group, props)
                      ) : (
                        <View style={styles.wrapper} key={index}>
                          {group?.groupTitle ? (
                            <SplitLine
                              label={group.groupTitle}
                              styles={{marginBottom: 16}}
                            />
                          ) : (
                            <></>
                          )}
                          {group.fields.map((field, index) => {
                            const {name, label, type} = field;
                            if (type === 'input') {
                              return (
                                <Input
                                  key={index}
                                  name={name}
                                  label={label}
                                  placeholder={`Enter your ${label}`}
                                  onChangeText={handleChange(name)}
                                  onBlur={name => setFieldTouched(name)}
                                  value={values[name]}
                                  error={errors[name]}
                                  touched={touched[name]}
                                  isNumeric={field?.numeric}
                                />
                              );
                            }
                          })}
                        </View>
                      );
                    })}
                    <View
                      style={{
                        ...styles.controls,
                        backgroundColor:
                          name === 'dark' ? '#1F2937' : '#F8FAFC',
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
          )}
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
});

export default FamilyBioForm;
