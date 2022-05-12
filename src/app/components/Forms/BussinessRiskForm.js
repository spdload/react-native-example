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
import {useTheme} from '@react-navigation/native';

import combineQuery from 'graphql-combine-query';
import apolloClient from 'src/graphql/connect';
import {useQuery, useMutation} from '@apollo/client';
import {
  INSERT_PROFILE_RISK,
  UPDATE_PROFILE,
  UPDATE_INVITE,
} from 'src/queries/mutations';

// UI
import Button from '../../components/Button';
import Dropdown from '../Dropdown';
import Typography from '../Typography';
import Loader from 'src/components/Loader';

const formSchema = [
  {
    type: 'select',
    name: 'risk_tolerance',
    label:
      "What is the investor's risk tolerance  or willingness to take financial risk? ",
  },
  {
    type: 'select',
    name: 'risk_assets',
    label: "What is the investor's preference when holding risky assets?  ",
  },
  {
    type: 'select',
    name: 'fincancial_concepts',
    label:
      'How knowledgeable is the investor about financial and investment concepts? ',
  },
  {
    type: 'select',
    name: 'investment_products',
    label:
      'How much experience does the investor have with investment products?',
  },
  {
    type: 'select',
    name: 'investor_perception',
    label:
      "What is the investor's perception of the riskiness of the stock market?",
  },
  {
    type: 'select',
    name: 'investment_action_loses',
    label:
      'In the past, when faced with investment losses, what action did the investor take?',
  },
];

const BussinessRiskForm = props => {
  const {name} = useTheme();
  const {goPrev, goNext, initialValues, onSubmit, staticData} = props;
  const [account_uuid, setAcount] = useState();
  const [profile_uuid, setProfile] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('@profile').then(id => {
      setProfile(id);
    });
    AsyncStorage.getItem('@account_id').then(id => {
      setAcount(id);
    });
  }, []);

  const getInitialValues = () => {
    const res = {};
    formSchema.forEach(item => {
      res[item.name] = '';
    });
    return res;
  };

  const sendRequest = async values => {
    setIsLoading(true);
    const riskProfile = {
      profile_uuid,
      ...(values.fincancial_concepts?.length && {
        investment_concepts: values.fincancial_concepts,
      }),
      ...(values.investment_products?.length && {
        investment_products: values.investment_products,
      }),
      ...(values.investment_action_loses?.length && {
        loses_decision: values.investment_action_loses,
      }),
      ...(values.risk_assets?.length && {
        risky_assets: values.risk_assets,
      }),
      ...(values.investor_perception?.length && {
        stock_market_risks: values.investor_perception,
      }),
      ...(values.risk_tolerance?.length && {
        tolerance: values.risk_tolerance,
      }),
    };

    let combineMutation = () => {
      let res = combineQuery('CompositeMutation').add(UPDATE_PROFILE, {
        id: profile_uuid,
        profile: {
          step_name: 'attachments',
        },
      });
      if (Object.keys(riskProfile).length) {
        res = combineQuery('CompositeMutation')
          .add(res.document, res.variables)
          .add(INSERT_PROFILE_RISK, {
            risk: {
              ...riskProfile,
            },
          });
      }
      return res;
    };

    const {document, variables} = (() => combineMutation())();

    const response = await apolloClient.mutate({
      mutation: document,
      variables: variables,
    });

    if (response.data?.update_rearden_profile?.returning[0]?.id) {
      setIsLoading(false);
    }
    goNext();
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
            onSubmit={values => {
              sendRequest(values);
              // goNext();
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
                        staticData && (
                          <View key={index} style={styles.sropsownWrapper}>
                            <Typography
                              text={label}
                              customStyles={{marginBottom: 0}}
                            />
                            <Dropdown
                              name={name}
                              label=""
                              list={staticData ? staticData[field?.name] : []}
                              placeholder={'Select item'}
                              handleSelect={value => setFieldValue(name, value)}
                              onBlur={name => setFieldTouched(name)}
                              value={values[name]}
                              defaultValue={values[name]}
                              error={errors[name]}
                              touched={touched[name]}
                              zIndex={(formSchema.length - index) * 10000}
                            />
                          </View>
                        )
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

export default BussinessRiskForm;
