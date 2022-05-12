import React, {useState, useEffect} from 'react';
import {useTheme} from '@react-navigation/native';
import {
  StyleSheet,
  FlatList,
  ScrollView,
  View,
} from 'react-native';
import ButtonBack from '../../../components/ButtonBack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Typography from '../../../components/Typography';
import UserItem from '../../../components/UserItem';
import Link from '../../../components/Link';
import * as routes from 'src/constants/routes';
import AccordionCheckBox from '../../../hoc/AccordionCheckBox';
import {navigationRef} from '../../../AppContainer';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Loader from 'src/components/Loader';

import {useQuery} from '@apollo/client';
import {GET_CHAPTER_MEMBERS} from 'src/queries/queries';

const data = [
  {
    id: 1,
    imgUrl:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    f_name: 'Wade',
    l_name: 'Warner',
    location: 'London',
    isChecked: false,
  },
  {
    id: 2,
    imgUrl: 'https://randomuser.me/api/portraits/men/7.jpg',
    f_name: 'Dmitriy',
    l_name: 'Kovalenko',
    location: 'Dubai',
    isChecked: false,
  },
  {
    id: 3,
    imgUrl: 'https://randomuser.me/api/portraits/men/15.jpg',
    f_name: 'Alex',
    l_name: 'Tunder',
    location: 'Dubai',
    isChecked: false,
  },
];

const CreateGroupScreen = ({navigation}) => {
  const {colors} = useTheme();
  const [members, setMembers] = useState(data);
  const [membersChapter, setMembersChapter] = useState([]);
  const [accout, setAccount] = useState();

  const [selectedUsers, setSelectedUser] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('@account_id').then(id => {
      setAccount(id);
    });
  }, []);

  const users = useQuery(GET_CHAPTER_MEMBERS, {
    variables: {
      account_uuid: accout,
    },
  });

  if (users?.loading) return <Loader />;

  const {rearden_chapter} = users.data;

  const formatUsers = (users, chapter) => {
    return users.map(user => {
      return {
        id: user.account.id,
        imgUrl: '',
        f_name: user.account.profiles[0].first_name
          ? user.account.profiles[0].first_name
          : '',
        l_name: `${
          user.account.profiles[0].last_name
            ? user.account.profiles[0].last_name
            : ''
        }`,
        location: `${
          user.account.companies[0].country
            ? user.account.companies[0].country
            : ''
        }${
          user.account.companies[0].city
            ? ', ' + user.account.companies[0].city
            : ''
        }`,
        role: user.account?.profiles[0]?.role,
        chapterName: chapter,
        isChecked: false,
      };
    });
  };

  const sortUsers = list => {
    const arr = [...list];

    arr.sort((a, b) => {
      if (a.f_name > b.f_name) return 1;
      if (a.f_name < b.f_name) return -1;
    });

    const removeDublicationArr = arr.filter((elem, i) => {
      return elem.id !== arr[i + 1]?.id;
    });

    return removeDublicationArr;
  };

  const formatUsersList = data => {
    let res = [];
    if (data?.length) {
      data.forEach(chapter => {
        if (chapter.chapter_members.length) {
          const members = formatUsers(chapter.chapter_members, chapter.name);
          members?.length &&
            members.forEach(member => {
              res.push(member);
            });
        }
      });
    }
    return sortUsers(res);
  };

  const submit = () => {
    const users = sortUsers(selectedUsers);
    if (users.length > 1) {
      navigationRef.current.navigate(routes.CONFRIRM_CREATE_GROUP, {
        data: users,
      });
    }
  };
  const handleChange = item => {
    const index = selectedUsers.findIndex(user => {
      return user.id == item.id;
    });
    if (index > 0) {
      const copy = [...selectedUsers];
      copy.splice(index, 1);
      setSelectedUser(copy);
    } else {
      setSelectedUser([...selectedUsers, item]);
    }
  };

  const renderFlatList = renderData => {
    return (
      <FlatList
        data={renderData}
        renderItem={({item}) => (
          <View style={{margin: 5}}>
            <View>
              <View style={css(colors).personalChat}>
                <BouncyCheckbox
                  isChecked={item.isChecked}
                  iconStyle={{borderColor: '#2563EB'}}
                  unfillColor="transparent"
                  fillColor="#2563EB"
                  onPress={() => handleChange(item)}
                />
                <View style={{paddingRight: 40, width: '100%'}}>
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
          </View>
        )}
      />
    );
  };
  return (
    <>
      <View>
        <View style={css(colors).header}>
          <View style={css(colors).topControls}>
            <ButtonBack text="Back" pressAction={() => navigation.goBack()} />
          </View>
          <Typography
            customStyles={css(colors).textStartChat}
            text="Create Group"
            size={18}
            type="bold"
          />
          {sortUsers(selectedUsers)?.length > 1 ? (
            <Link
              handleClick={() => submit()}
              text="Next"
              customStyles={{
                fontSize: 16,
              }}
            />
          ) : (
            <Typography
              text="Next"
              customStyles={{color: 'grey', padding: 10}}></Typography>
          )}
        </View>
        <ScrollView>
          <View style={css(colors).chaptersWrapper}>
            <View style={css(colors).chaptersHeader}>
              <Typography text="Chapters" size={12} />
            </View>
          </View>
          <>
            {rearden_chapter?.length &&
              rearden_chapter.map(chapter => {
                return (
                  <AccordionCheckBox
                    header={{title: chapter.name}}
                    data={formatUsers(chapter.chapter_members, chapter.name)}
                    defaultOpen={false}
                    onSelecteeMembers={value => {
                      setMembersChapter(value);
                    }}
                  />
                );
              })}
          </>
          <View style={css(colors).personalChatsWrapper}>
            <Typography text="Personal chat" size={12} />
            <View>{renderFlatList(formatUsersList(rearden_chapter))}</View>
          </View>
        </ScrollView>
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
    searchIcon: {
      paddingTop: 10,
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
      backgroundColor: props.inputBg,
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
    },
    btnCreateChat: {
      color: '#60A5FA',
    },
    personalChatsWrapper: {
      marginTop: 30,
      marginLeft: 12,
    },
    personalChat: {
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 16,
      borderBottomColor: props.photoPicker.bg,
      borderBottomWidth: 1,
      borderBottomEndRadius: 20,
    },

    checkbox: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 3,
      borderColor: props.checkbox.br,
      marginRight: 8,
    },
  });
};

export default CreateGroupScreen;
