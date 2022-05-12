import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Dialog, {DialogContent, SlideAnimation} from 'react-native-popup-dialog';
import {useTheme} from '@react-navigation/native';
import * as routes from 'src/constants/routes';

import {useQuery} from '@apollo/client';
import {
  GET_CHAPTER_MEMBERS_LIST,
  GET_CHAPTER_THREADS,
} from 'src/queries/queries';

// UI
import Typography from 'src/components/Typography';
import ButtonWithIcon from 'src/components/ButtonWithIcon';
import Icon from 'src/components/Icons';

const ChapterInfoModal = ({
  navigation,
  isOpenDialog,
  onCancel,
  details,
  stared = false,
}) => {
  const [isStared, setIsStared] = useState(stared);
  const [notifications, setNotifications] = useState(false);
  const {colors} = useTheme();
  const {account, chapter, title, description} = details;

  const chapterDeals = useQuery(GET_CHAPTER_THREADS, {
    variables: {
      account_uuid: account,
      chapter_uuid: chapter,
      type: 'deal',
    },
  });

  const chapterIdeas = useQuery(GET_CHAPTER_THREADS, {
    variables: {
      account_uuid: account,
      chapter_uuid: chapter,
      type: 'idea',
    },
  });

  const members = useQuery(GET_CHAPTER_MEMBERS_LIST, {
    variables: {
      chapter: chapter,
    },
  });

  const memebrsList = members?.data?.rearden_chapter[0]?.chapter_members;
  const dealsList = chapterDeals?.data?.rearden_chapter[0]?.content;
  const ideasList = chapterIdeas?.data?.rearden_chapter[0]?.content;

  const redirect = (route, params) => {
    onCancel(false);
    navigation.navigate(routes[route], {
      ...params,
    });
  };

  return (
    <Dialog
      visible={isOpenDialog}
      onTouchOutside={() => onCancel(false)}
      dialogStyle={styles(colors).dialog}
      dialogAnimation={
        new SlideAnimation({
          slideFrom: 'bottom',
        })
      }>
      <DialogContent style={styles(colors).content}>
        <View style={styles(colors).title}>
          <Typography
            text={title}
            size={20}
            type={'bold'}
            customStyles={{color: colors.inputText}}
          />
          <TouchableOpacity
            style={styles(colors).star}
            onPress={() => setIsStared(!isStared)}>
            <Icon
              name={isStared ? 'Icon-14' : 'Icon-49'}
              color={colors.inputText}
              size={19}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles(colors).close}
          onPress={() => onCancel()}>
          <Icon name="Icon-36" color={colors.inputText} size={25} />
        </TouchableOpacity>
        <View>
          <Typography
            text="Description"
            size={14}
            customStyles={styles(colors).descriptionTitle}
          />
          <Typography
            text={description}
            customStyles={styles(colors).description}
            size={14}
          />
          <View style={styles(colors).controls}>
            <ButtonWithIcon
              handleChange={() =>
                redirect('CHAPTER_DEALS', {
                  account,
                  chapterId: chapter,
                  title,
                  deals: dealsList,
                })
              }
              text="Deals"
              count={`${dealsList?.length ? dealsList.length : 0}`}
              theme={colors}
            />
            <ButtonWithIcon
              handleChange={() =>
                redirect('CHAPTER_IDEAS', {account, title, ideas: ideasList})
              }
              text="Ideas"
              count={`${ideasList?.length ? ideasList.length : 0}`}
              theme={colors}
            />
            <ButtonWithIcon
              handleChange={() =>
                redirect('CHAT_MEMBERS', {memebers: memebrsList})
              }
              text="Members"
              count={`${memebrsList?.length > 0 ? memebrsList?.length : 0}`}
              theme={colors}
            />
            <ButtonWithIcon
              text="Notifications"
              count={'0'}
              theme={colors}
              withSwitch={true}
              value={notifications}
              handleChange={() => setNotifications(!notifications)}
            />
          </View>
        </View>
      </DialogContent>
    </Dialog>
  );
};

const styles = theme => {
  return StyleSheet.create({
    dialog: {
      position: 'absolute',
      bottom: '-2%',
      width: '100%',
      backgroundColor: 'transparent',
      height: '100%',
      zIndex: 10000,
    },
    content: {
      height: '95%',
      position: 'absolute',
      bottom: 0,
      width: '100%',
      left: 0,
      borderRadius: 14,
      backgroundColor: theme.background,
      paddingLeft: 0,
      paddingRight: 0,
    },
    title: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 16,
      paddingLeft: 16,
      paddingRight: 16,
      marginBottom: 21,
    },
    star: {
      padding: 10,
    },
    close: {
      position: 'absolute',
      right: 16,
      top: 24,
    },
    description: {
      paddingLeft: 16,
      paddingRight: 16,
      color: theme.inputText,
    },
    descriptionTitle: {
      paddingLeft: 16,
      paddingRight: 16,
      color: theme.inputFocuseBr,
      marginBottom: 5,
    },
    controls: {
      marginTop: 40,
    },
  });
};

export default ChapterInfoModal;
