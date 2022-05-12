import React, {useEffect, useState} from 'react';
import {View, StyleSheet, VirtualizedList, ScrollView} from 'react-native';
import Button from '../../../components/Button';
import DefaultHeader from '../../../components/DefaultHeader';
import ItemChatList from '../../../components/ItemListChat';
import EmptyPlaceholder from '../../../components/EmptyPlaceholder';
import {BottomNavigation} from '../../../components/BottomNavigation';
import {ButtonCreateChat} from '../../../components/ButtonCreateChat';
import Loader from '../../../components/Loader';
import {useSubscription} from '@apollo/client';
import {SUBSCRIPTION_CHATS_LIST} from '../../../queries/subscriptions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as routes from 'src/constants/routes';
import {navigationRef} from '../../../AppContainer';
const ChatList = props => {
  const {navigation} = props;
  const [accout, setAccount] = useState();

  useEffect(() => {
    AsyncStorage.getItem('@account_id').then(id => {
      setAccount(id);
    });
  }, []);
  const chatList = useSubscription(SUBSCRIPTION_CHATS_LIST, {
    variables: {account_uuid: accout},
  });
  const handleOpenChat = () => {
    navigation.navigate(routes.CHAT);
  };

  const renderItem = ({item}) => {
    const kind = item?.chat?.kind;
    return (
      <ItemChatList
        key={item._id}
        userName={
          kind === 'group'
            ? item?.chat?.title
            : item.chat?.chat_connections[0]?.profile?.first_name +
              ' ' +
              item.chat?.chat_connections[0]?.profile?.last_name
        }
        isRead={item.isRead}
        avatarUrl={
          kind === 'group'
            ? `https://eu.ui-avatars.com/api/?background=6B7280&color=fff&name=${item?.chat?.title}`
            : item.chat?.chat_connections[0]?.profile?.avatar?.meta?.link
        }
        dateTime={item.last_message?.message?.created_at}
        msg={item.last_message?.message?.text}
        navigation={() => {
          navigationRef.current.navigate(routes.CHAT, {
            type: 'chat',
            id: item.chat?.id,
            title:
              kind === 'group'
                ? item?.chat?.title
                : item.chat?.chat_connections[0]?.profile?.first_name +
                  ' ' +
                  item.chat?.chat_connections[0]?.profile?.last_name,
            avatar:
              kind === 'group'
                ? `https://eu.ui-avatars.com/api/?background=6B7280&color=fff&name=${item?.chat?.title}`
                : item.chat?.chat_connections[0]?.profile?.avatar?.meta?.link,
          });
        }}
      />
    );
  };

  return (
    <>
      <DefaultHeader navigation={navigation} />
      {chatList.loading ? null : chatList?.data?.rearden_chat_connections
          ?.length < 1 ? (
        <View style={css.container}>
          <View style={css.emptyBlock}>
            <EmptyPlaceholder
              icon="Icon-46"
              title="No DMs"
              text="Get started your first chat."
            />
          </View>
          <View style={css.buttonBlock}>
            <Button
              onPress={() => navigation.navigate(routes.START_CHAT)}
              text="Start"
            />
          </View>
        </View>
      ) : (
        <View style={css.container}>
          <VirtualizedList
            data={chatList?.data?.rearden_chat_connections}
            initialNumToRender={8}
            renderItem={renderItem}
            getItem={(data, index) => data[index]}
            getItemCount={data => data.length}
            keyExtractor={item => item.id}
          />
        </View>
      )}
      <ButtonCreateChat navigation={navigation} />
      <BottomNavigation role={'user'} navigation={navigation} />
    </>
  );
};

const css = StyleSheet.create({
  container: {
    marginTop: '5%',
    height: '75%',
  },
  emptyBlock: {
    margin: 50,
  },
  buttonBlock: {
    paddingHorizontal: 16,
  },
});

export default ChatList;
