import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Dialog, {DialogContent, SlideAnimation} from 'react-native-popup-dialog';
import {useTheme} from '@react-navigation/native';
import * as routes from 'src/constants/routes';

// UI
import Typography from '../Typography';
import ButtonWithIcon from 'src/components/ButtonWithIcon';
import Icon from 'src/components/Icons';
import reduxSaga from 'redux-saga';

const PartnerInfoModal = ({
  navigation,
  isOpenDialog,
  onCancel,
  title,
  stared = false,
}) => {
  const [isStared, setIsStared] = useState(stared);
  const [notifications, setNotifications] = useState(false);
  const {colors} = useTheme();

  //Need refacroring !!!
  const redirect = route => {
    onCancel(false);
    navigation.navigate(routes.CHAPTER_DEALS);
  };
  const redirectToIdeas = route => {
    onCancel(false);
    navigation.navigate(routes.CHAPTER_IDEAS);
  };
  const redirectToMembers = route => {
    onCancel(false);
    navigation.navigate(routes.CHAT_MEMBERS);
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
            text="Small Description ... nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat massa dictumst."
            customStyles={styles(colors).description}
            size={14}
          />
          <View style={styles(colors).controls}>
            <ButtonWithIcon
              handleChange={() => redirect()}
              text="Deals"
              count={2}
              theme={colors}
            />
            <ButtonWithIcon
              handleChange={() => redirectToIdeas()}
              text="Ideas"
              count={'2'}
              theme={colors}
            />
            <ButtonWithIcon
              handleChange={() => redirectToMembers()}
              text="Members"
              count={'3'}
              theme={colors}
            />
            <ButtonWithIcon
              handleChange={() => navigation.navigate(routes.CURRENCY_SETTINGS)}
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

export default PartnerInfoModal;
