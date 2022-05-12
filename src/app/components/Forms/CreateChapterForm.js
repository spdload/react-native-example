import React, {useState, useLayoutEffect, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Formik} from 'formik';
import {CreateChapterShema, PersonalInfoSchema} from './validation';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

// UI
import Input from '../Input';
import SplitLine from '../SplitLine';
import SearchBar from '../SearchBar';
import Typography from '../Typography';
import UserItem from '../UserItem';
import UserItemButton from '../UserItemButton';
import {useQuery} from '@apollo/client';
import {GET_CHAPTERS} from 'src/queries/queries';
import Loader from 'src/components/Loader';
import {GET_USERS_APPROVED} from '../../queries/queries';

const CreateChapterForm = ({members, submutFunc, handleSave}) => {
  let setError;
  let saveForm;

  useEffect(() => {
    refetch();
    saveForm && submutFunc(saveForm);
  }, []);

  // const [selectetItemId, setSelectedId] = useState('223');
  // const [members, setMembers] = useState([]);
  const [customErrors, setCustomErrors] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const {data, refetch, loading} = useQuery(GET_USERS_APPROVED);

  const Item = ({item}) => (
    <View
      style={{
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 15,
        paddingRight: 40,
        paddingLeft: 15,
      }}>
      <UserItem
        id={item.id}
        firstName={item.profiles[0].first_name}
        lastName={item.profiles[0].last_name}
        location={'Dubai'}
      />
      <BouncyCheckbox
        iconStyle={{borderColor: '#2563EB'}}
        unfillColor="transparent"
        fillColor="#2563EB"
        onPress={() => handleItemSelect(item.id)}
        isChecked={item.id === selectedItemId}
      />
      {/* <UserItemButton
        onPress={id => {
          setSelectedId(id);
        }}
        id={item.id}
        firstName={item.profiles[0].first_name}
        surName={item.profiles[0].last_name}
        location={'Dubai'}
      /> */}
    </View>
  );
  const renderItem = ({item}) => {
    return <Item item={item} />;
  };

  const sendDataToUp = values => {
    setCustomErrors(false);
    if (values.selectedItemId === null) {
      setCustomErrors(true);
    } else {
      handleSave({
        ...values,
        selectedItemId,
      });
    }
  };
  const handleItemSelect = itemId => {
    setSelectedItemId(itemId);
  };

  // if (loading) {
  //   return <Loader />;
  // }

  // if (error) {
  //   return <Typography text="Somerhin went wrong" variant="error" />;
  // }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.select({
        ios: () => 40,
        android: () => 0,
      })()}
      style={styles.container}>
      <View style={styles.inner}>
        <Formik
          initialValues={{
            chapter_name: '',
            chapter_description: '',
          }}
          validationSchema={CreateChapterShema}
          onSubmit={values => {
            sendDataToUp({
              ...values,
              selectedItemId,
            });
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
            saveForm = handleSubmit;
            return (
              <ScrollView>
                <View style={styles.wrapper}>
                  <SplitLine label="Main info" styles={{marginBottom: 16}} />
                  <Input
                    name={'chapter_name'}
                    label="Chapter Name"
                    placeholder="Enter chapter name"
                    onChangeText={handleChange('chapter_name')}
                    onBlur={name => setFieldTouched('chapter_name')}
                    value={values.chapter_name}
                    error={errors.chapter_name}
                    touched={touched.chapter_name}
                  />
                  <SplitLine label="Description" />
                  <Input
                    name={'chapter_description'}
                    placeholder="Enter description about chapter"
                    onChangeText={handleChange('chapter_description')}
                    onBlur={name => setFieldTouched('chapter_description')}
                    value={values.chapter_description}
                    error={errors.chapter_description}
                    touched={touched.chapter_description}
                    multiline={true}
                    customHeigth={100}
                  />
                </View>
                <View style={styles.wrapper}>
                  <Typography size={14} text="ADD MEDERATOR IN CHAPTER" />
                  <SearchBar
                    customStyles={{paddingHorizontal: 0}}
                    isFilter={false}
                  />
                </View>
              </ScrollView>
            );
          }}
        </Formik>
        <View>
          {customErrors && (
            <Typography
              variant="delete"
              size={14}
              text="Must selected on member"
              customStyles={{padding: 10}}
            />
          )}
          {loading ? (
            <Loader />
          ) : (
            <FlatList
              data={data.rearden_account}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              // extraData={selectetItemId}
              extraData={selectedItemId}
            />
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
    // backgroundColor: 'white',
    marginTop: 12,
  },
  controls: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: '#1F2937',
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
    zIndex: 100,
    marginBottom: 10,
  },
});

export default CreateChapterForm;
