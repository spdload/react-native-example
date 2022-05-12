import React, {useState, useEffect} from 'react';
import {useTheme} from '@react-navigation/native';
import {
  StyleSheet,
  FlatList,
  View,
} from 'react-native';
import ButtonBack from '../../../components/ButtonBack';
import Typography from '../../../components/Typography';
import UserItem from '../../../components/UserItem';
import Link from '../../../components/Link';
import * as routes from 'src/constants/routes';
import Photopicker from '../EditProfile/components/Photopicker';
import Input from '../../../components/Input';
import {Formik} from 'formik';
import {CreateGroup} from 'src/components/Forms/validation';
import {navigationRef} from '../../../AppContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useMutation} from '@apollo/client';
import {CREATE_GROUP_CHAT} from 'src/queries/mutations';
import {GET_CHATS_LIST} from 'src/queries/queries';

const ConfrirmCreateGroupdScreen = ({navigation, route}) => {
  const {colors} = useTheme();
  const {data} = route.params;
  const [accout, setAccount] = useState();

  useEffect(() => {
    AsyncStorage.getItem('@account_id').then(id => {
      setAccount(id);
    });
  }, []);

  let setErors, resetForm;
  const handleSubmit = values => {
    navigationRef.current.navigate(routes.CHAT, {
      title: values.group_name,
      type: 'group',
    });
  };

  const renderFlatList = renderData => {
    return (
      <FlatList
        data={renderData}
        renderItem={({item}) => (
          <View style={{marginHorizontal: 5, marginVertical: 10}}>
            <View>
              <View style={css(colors).personalChat}>
                <UserItem
                  imgSrc={item.imgUrl}
                  firstName={item.f_name}
                  surName={item.l_name}
                  location={item.location}
                  role={item.role}
                  chapterName={item.chapterName}
                />
              </View>
            </View>
          </View>
        )}
      />
    );
  };

  const getIds = user => {
    return data.map(user => {
      return user.id;
    });
  };

  const [CreateGroupChat] = useMutation(CREATE_GROUP_CHAT, {
    refetchQueries: [
      {query: GET_CHATS_LIST, variables: {account_uuid: accout}},
    ],
  });

  const createChat = (type, ids, values) => {
    CreateGroupChat({
      variables: {
        kind: type,
        participants: ids,
        title: values.group_name,
      },
    })
      .then(res => {
        navigation.navigate(routes.CHAT, {
          type: 'group',
          id: '1',
          title: values.group_name,
          count: `${4}`,
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <>
      <View>
        <View style={css(colors).container}>
          <Formik
            initialValues={{
              group_name: '',
            }}
            validationSchema={CreateGroup}
            onSubmit={values => createChat('group', getIds(data), values)}>
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
              } = formProps;
              setErors = setFieldError;
              resetForm = handleReset;
              return (
                <>
                  <View style={css(colors).header}>
                    <View style={css(colors).topControls}>
                      <ButtonBack
                        text="Back"
                        pressAction={() => navigation.goBack()}
                      />
                    </View>
                    <Typography
                      customStyles={css(colors).textStartChat}
                      text="Create Group"
                      size={18}
                      type="bold"
                    />
                    <Link
                      handleClick={handleSubmit}
                      text="Create"
                      customStyles={{
                        fontSize: 16,
                      }}
                    />
                  </View>
                  <View style={css(colors).wrapper}>
                    <Photopicker />
                    <View style={css(colors).inputContainer}>
                      <Input
                        name="name"
                        label="Group Name"
                        placeholder="Enter group name"
                        onChangeText={handleChange('group_name')}
                        onBlur={() => setFieldTouched('group_name')}
                        value={values.group_name}
                        error={errors.group_name}
                        touched={touched?.group_name}
                        multiline={true}
                        customStyles={css(colors).input}
                      />
                    </View>
                  </View>
                </>
              );
            }}
          </Formik>
        </View>

        <View style={css(colors).membersContainer}>
          <View>{renderFlatList(data)}</View>
        </View>
      </View>
    </>
  );
};

const css = props => {
  return StyleSheet.create({
    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: Platform.OS === 'ios' ? '10%' : '1%',
      paddingRight: 10,
      backgroundColor: props.headerBackground,
    },
    textStartChat: {
      paddingTop: 10,
    },

    wrapper: {
      flexDirection: 'row',
      marginTop: 30,
      marginBottom: 25,
      marginHorizontal: 15,
    },
    inputContainer: {
      marginTop: 10,
      marginLeft: 15,
      width: '70%',
    },
    membersContainer: {
      marginLeft: 12,
    },
  });
};

export default ConfrirmCreateGroupdScreen;
