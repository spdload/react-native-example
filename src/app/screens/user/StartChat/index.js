import React, {useState, useEffect} from 'react';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, TouchableOpacity, ScrollView, View} from 'react-native';
import ButtonBack from '../../../components/ButtonBack';
import Typography from '../../../components/Typography';
import Icon from '../../../components/Icons';
import UserItem from '../../../components/UserItem';
import * as routes from 'src/constants/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from 'src/components/Loader';
import EmptyPlaceholder from 'src/components/EmptyPlaceholder';
import {useRole} from 'src/helpers/useRole';

import {useQuery, useMutation} from '@apollo/client';
import {GET_CHAPTER_MEMBERS} from 'src/queries/queries';
import {CREATE_CHAT} from 'src/queries/mutations';

const StartChat = ({navigation}) => {
  const {colors} = useTheme();
  const [selectedChaper, setChapter] = useState();
  const [userList, setUserList] = useState();
  const [accout, setAccount] = useState();

  const [role] = useRole();

  useEffect(() => {
    AsyncStorage.getItem('@account_id').then(id => {
      setAccount(id);
    });
  }, []);

  const {data, loading} = useQuery(GET_CHAPTER_MEMBERS, {
    variables: {
      account_uuid: accout,
    },
  });

  const [CreateChat] = useMutation(CREATE_CHAT);

  useEffect(() => {
    data && setUserList(formatUsersList(data?.rearden_chapter));
  }, [data]);

  useEffect(() => {
    if (selectedChaper) {
      const users = createUsersArr(
        data?.rearden_chapter[selectedChaper.index].chapter_members,
      );

      users?.length ? setUserList(sortUsers(users)) : setUserList([]);
    }
  }, [selectedChaper, data]);

  const createUsersArr = (list, chapter) => {
    const arr = list.map(member => {
      return {
        imgUrl: '',
        _id: member?.account?.id,
        firstName: member?.account?.profiles[0]?.first_name,
        lastName: member?.account?.profiles[0]?.last_name,
        city: member?.account?.companies[0]?.address?.city,
        country: member?.account?.companies[0]?.address?.country,
        role: member?.role === 'user' ? '' : member?.role,
        chapterName: chapter,
      };
    });
    return arr;
  };

  const sortUsers = list => {
    const arr = [...list];

    arr.sort((a, b) => {
      if (a.firstName > b.firstName) {
        return 1;
      }
      if (a.firstName < b.firstName) {
        return -1;
      }
    });

    const removeDublicationArr = arr.filter((elem, i) => {
      return elem._id !== arr[i + 1]?._id;
    });

    return removeDublicationArr;
  };

  const formatUsersList = data => {
    let res = [];
    if (data?.length) {
      data.forEach(chapter => {
        if (chapter.chapter_members.length) {
          const members = createUsersArr(chapter.chapter_members, chapter.name);
          members?.length &&
            members.forEach(member => {
              res.push(member);
            });
        }
      });
    }
    return sortUsers(res);
  };

  const createChat = (type, ids, user) => {
    CreateChat({
      variables: {
        kind: type,
        participants: ids,
      },
    })
      .then(res => {
        navigation.navigate(routes.CHAT, {
          type: 'chat',
          id: '1',
          title: user,
          count: `${4}`,
        });
      })
      .catch(err => {});
  };

  return data && !loading ? (
    <>
      <View>
        <View style={css(colors).header}>
          <View style={css(colors).topControls}>
            <ButtonBack
              text="Back"
              pressAction={
                selectedChaper
                  ? () => {
                      setChapter(null);
                      setUserList(formatUsersList(data?.rearden_chapter));
                    }
                  : () => navigation.goBack()
              }
            />
          </View>
          <Typography
            customStyles={css(colors).textStartChat}
            text={selectedChaper ? selectedChaper.name : 'Start Chat'}
            size={18}
            type="bold"
          />
          <TouchableOpacity>
            <Icon name="Icon-37" size={25} style={css(colors).searchIcon} />
          </TouchableOpacity>
        </View>

        {!selectedChaper && (
          <>
            <View style={css(colors).chaptersWrapper}>
              <View style={css(colors).chaptersHeader}>
                <Typography text="Chapters" size={12} />
              </View>

              <View>
                {data?.rearden_chapter.map(({name}, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      setChapter({
                        name,
                        index,
                      })
                    }>
                    <View style={css(colors).chapter}>
                      <Typography text={name} />
                    </View>
                  </TouchableOpacity>
                ))}
                {role === 'admin' && (
                  <TouchableOpacity
                    onPress={() => navigation.navigate(routes.CREATE_CHAPTER)}>
                    <View style={css(colors).chapter}>
                      <Typography
                        customStyles={css(colors).btnCreateChat}
                        text="Create new chapter"
                      />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate(routes.CREATE_GROUP)}>
              <View style={css(colors).btnCreateChatWrapper}>
                <Typography
                  customStyles={css(colors).btnCreateChat}
                  text="Create group chat"
                />
              </View>
            </TouchableOpacity>
          </>
        )}

        <View
          style={{
            ...css(colors).personalChatsWrapper,
            height: selectedChaper ? '85%' : '55%',
          }}>
          <Typography text="Personal chat" size={12} />

          <ScrollView>
            {!userList?.length && (
              <EmptyPlaceholder
                icon="Icon-46"
                title="No Users"
                text="No users in this chapter"
              />
            )}
            {userList?.map(
              (
                {firstName, city, country, lastName, _id, role, chapterName},
                index,
              ) => (
                <TouchableOpacity
                  key={index}
                  onPress={
                    () =>
                      createChat('private', [_id], firstName + ' ' + lastName)
                  }>
                  <View style={css(colors).personalChat}>
                    <UserItem
                      firstName={firstName}
                      lastName={lastName}
                      role={role}
                      chapterName={chapterName}
                      location={`${country ? city : ''}${
                        city ? ', ' + city : ''
                      }`}
                    />
                  </View>
                </TouchableOpacity>
              ),
            )}
          </ScrollView>
        </View>
      </View>
    </>
  ) : (
    <Loader />
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
      paddingRight: 30,
    },
    searchIcon: {
      padding: 5,
      color: props.text.primary,
    },
    chaptersHeader: {
      height: 35,
      display: 'flex',
      justifyContent: 'flex-end',
      paddingLeft: 15,
      marginBottom: 5,
    },
    chapter: {
      display: 'flex',
      backgroundColor: props.headerBackground,
      //#1F2937

      height: 50,
      paddingLeft: 15,
      justifyContent: 'center',
      marginBottom: 2,
    },
    btnCreateChatWrapper: {
      backgroundColor: props.inputBg,
      height: 50,
      marginTop: 30,
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingLeft: 12,
      shadowColor: 'rgba(0,0,0, .2)', // IOS
      shadowOffset: {height: 1, width: 1}, // IOS
      shadowOpacity: 1, // IOS
      shadowRadius: 1, //IOS
      elevation: 2, // Android
    },
    btnCreateChat: {
      color: '#60A5FA',
    },
    personalChatsWrapper: {
      marginTop: 30,
      marginLeft: 12,
    },
    personalChat: {
      marginTop: 16,
      borderBottomColor: props.photoPicker.bg,
      borderBottomWidth: 1,
      height: 55,
      borderBottomEndRadius: 20,
    },
  });
};

export default StartChat;
