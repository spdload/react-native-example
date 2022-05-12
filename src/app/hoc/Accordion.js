import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView, FlatList, Text} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import {useTheme} from '@react-navigation/native';
import {navigationRef} from '../AppContainer';
import * as routes from 'src/constants/routes';

// UI
import Typography from 'src/components/Typography';
import ItemChatList from 'src/components/ItemListChat';
import ChapterItem from 'src/components/ChapterItem';
import Icon from 'src/components/Icons';
import EmptyPlaceholder from 'src/components/EmptyPlaceholder';
import Button from 'src/components/Button';

const Accordion = ({
  header,
  data,
  defaultOpen = false,
  showButton = false,
  buttonAction,
  listType = 'chat',
  accout,
}) => {
  const [isOpen, toggleOpen] = useState(defaultOpen);
  const {
    colors: {accordion: colors},
  } = useTheme();

  return (
    <Collapse
      style={styles(colors).container}
      isExpanded={isOpen}
      onToggle={() => toggleOpen(!isOpen)}>
      <CollapseHeader>
        <Header title={header.title} count={header.count} isOpen={isOpen} />
      </CollapseHeader>
      <CollapseBody>
        {data?.length < 1 && (
          <>
            <EmptyPlaceholder
              icon="Icon-46"
              title="No DMs"
              text="Get started your first chat."
            />
            {showButton && (
              <View style={styles(colors).startButton}>
                <Button text="Start chat" onPress={() => buttonAction()} />
              </View>
            )}
          </>
        )}
        {data?.length > 0 && (
          <Body items={data} accout={accout} listType={listType} />
        )}
      </CollapseBody>
    </Collapse>
  );
};

const Header = ({title, count, isOpen}) => {
  const {
    name,
    colors: {accordion: colors},
  } = useTheme();
  return (
    <View
      style={{
        ...styles(colors).header,
        backgroundColor: isOpen ? colors.activeBg : colors.defaultBg,
      }}>
      <Typography text={title} />
      <View style={styles(colors).wrapper}>
        <Typography
          text={count}
          customStyles={{color: name === 'dar' ? '$fff' : '#94A3B8'}}
        />
        <View style={{transform: [{rotate: isOpen ? '270deg' : '180deg'}]}}>
          <Icon
            name="Chevron-left-1"
            color={name === 'dar' ? '$fff' : '#94A3B8'}
          />
        </View>
      </View>
    </View>
  );
};

const Body = ({items, accout, listType}) => {
  const renderItem = ({item}) => {
    const kind = item?.chat?.kind;
    const type = item?.chapter ? 'chapter' : 'chat';
    return type === 'chapter' || listType === 'chapter' ? (
      <ChapterItem
        key={item._id}
        title={item.name}
        onPress={() =>
          navigationRef.current.navigate(routes.CHAPTER_CHAT, {
            type: 'chapter',
            id: item.id,
            chapterId: item.id,
            title: item.name,
            chat_uuid: item.chat_uuid,
            accout,
          })
        }
      />
    ) : (
      <ItemChatList
        key={item._id}
        userName={
          kind === 'group'
            ? item?.chat?.title
            : item.chat?.chat_connections[0]?.profile?.first_name +
              ' ' +
              item.chat?.chat_connections[0]?.profile?.last_name
        }
        isRead={true}
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
    <View>
      <FlatList
        nestedScrollEnabled
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = colors => {
  return StyleSheet.create({
    container: {
      marginBottom: 2,
    },
    header: {
      backgroundColor: colors.defaultBg,
      padding: 12,
      paddingLeft: 16,
      paddingRight: 16,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      minHeight: 44,
      borderBottomWidth: 1,
      borderStyle: 'solid',
      borderBottomColor: colors.border,
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    startButton: {
      marginTop: 40,
      paddingHorizontal: 16,
    },
  });
};

export default Accordion;
