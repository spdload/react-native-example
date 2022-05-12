import React from 'react';
import {
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import * as routes from 'src/constants/routes';

// UI
import Typography from 'src/components/Typography';
import InputSearch from 'src/components/InputSearch';
import UserItem from 'src/components/UserItem';
import ButtonBack from 'src/components/ButtonBack';
import SplitLine from 'src/components/SplitLine';
import EmptyPlaceholder from 'src/components/EmptyPlaceholder';

const data = [
  {
    id: 1,
    imgUrl: 'https://randomuser.me/api/portraits/men/10.jpg',
    f_name: 'Wade',
    l_name: 'Warner',
    location: 'London',
    role: 'Watching',
    isChecked: false,
  },
  {
    id: 2,
    imgUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
    f_name: 'Dmitriy',
    l_name: 'Kovalenko',
    location: 'Dubai',
    role: 'Watching',
    isChecked: false,
  },
  {
    id: 3,
    imgUrl: 'https://randomuser.me/api/portraits/men/15.jpg',
    f_name: 'Alex',
    l_name: 'Tunder',
    location: 'Dubai',
    role: 'Participate',
    isChecked: false,
  },
];
const ChatMembersScreen = ({navigation, route}) => {
  const {colors} = useTheme();
  const {memebers} = route.params;

  const renderFlatList = renderData => {
    return (
      <FlatList
        data={memebers}
        renderItem={({item}) => {
          let location = '';
          if (item?.account?.companies[0].address?.country) {
            location = location + item.account?.companies[0].address?.country;
          }
          if (item?.account?.companies[0].address?.city) {
            const separator = location?.length ? ', ' : '';
            location =
              location + separator + item.account?.companies[0].address?.city;
          }
          return (
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate(routes.PROFILE)}>
                <View style={{paddingVertical: 10}}>
                  <View style={styles(colors).cardContainer} key={item.id}>
                    <UserItem
                      firstName={item.account?.profiles[0]?.first_name}
                      lastName={item.account?.profiles[0]?.last_name}
                      role={item?.role !== 'user' ? item.role : ''}
                      location={location}
                      imgSrc={item.account?.profiles[0]?.avatar?.meta?.link}
                    />
                  </View>
                </View>
                <SplitLine />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    );
  };
  return (
    <View style={styles(colors).container}>
      <View style={styles(colors).containerHeader}>
        <View style={styles(colors).header}>
          <View style={styles(colors).topControls}>
            <ButtonBack
              text="Back"
              pressAction={() => {
                navigation.goBack();
              }}
            />
          </View>
          <Typography
            customStyles={styles(colors).textStartChat}
            text="Chapter Members"
            size={18}
            type="bold"
          />
        </View>
      </View>
      <View style={styles(colors).search}>
        <InputSearch placeholder="Search..." />
      </View>
      <View style={styles(colors).list}>
        {data?.length ? (
          <TouchableOpacity onPress={() => navigation.navigate(routes.PROFILE)}>
            <View style={styles(colors).user}>{renderFlatList(data)}</View>
          </TouchableOpacity>
        ) : (
          <View style={styles(colors).emptyWrapper}>
            <EmptyPlaceholder
              icon="Icon-58"
              title="No chapter members"
              text="Waiting when someone join to chapter"
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = props => {
  return StyleSheet.create({
    containerHeader: {
      backgroundColor: props.headerBackground,
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: Platform.OS === 'ios' ? '10%' : '1%',
      paddingBottom: 10,
    },
    textStartChat: {
      paddingTop: 10,
    },
    topControls: {
      position: 'absolute',
      left: 0,
      top: 0,
    },
    search: {
      padding: 16,
    },
    list: {
      marginTop: 16,
    },
    user: {
      marginHorizontal: 16,
    },
    emptyWrapper: {
      paddingHorizontal: 16,
      paddingTop: 60,
    },
  });
};

export default ChatMembersScreen;
