import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Dialog, {DialogContent, SlideAnimation} from 'react-native-popup-dialog';
import {useTheme} from '@react-navigation/native';
import Typography from '../Typography';

const CreateDealsIdeasModal = ({
  isOpenDialog,
  setIsOpenDialog,
  createDealAction,
  createIdeaAction,
}) => {
  const {colors} = useTheme();

  return (
    <Dialog
      visible={isOpenDialog}
      onTouchOutside={() => setIsOpenDialog(false)}
      dialogStyle={styles(colors).dialog}
      dialogAnimation={
        new SlideAnimation({
          slideFrom: 'bottom',
        })
      }>
      <DialogContent style={styles(colors).content}>
        <View style={styles(colors).main}>
          <View style={styles(colors).title}>
            <Typography
              text="What do you want to add?"
              size={13}
              customStyles={styles(colors).title}
            />
          </View>
          <TouchableOpacity
            style={styles(colors).primaryButtonWrapper}
            onPress={() => {
              createDealAction();
              setIsOpenDialog();
            }}>
            <Typography
              text={'Deal'}
              size={20}
              customStyles={styles(colors).primaryButton}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles(colors).primaryButtonWrapper}
            onPress={() => {
              createIdeaAction();
              setIsOpenDialog();
            }}>
            <Typography
              text={'Idea'}
              size={20}
              customStyles={styles(colors).primaryButton}
            />
          </TouchableOpacity>
        </View>
        <View style={styles(colors).buttonWrapper}>
          <TouchableOpacity onPress={() => setIsOpenDialog()}>
            <Typography
              text="Cancel"
              customStyles={styles(colors).cancel}
              size={20}
            />
          </TouchableOpacity>
        </View>
      </DialogContent>
    </Dialog>
  );
};

const styles = theme => {
  return StyleSheet.create({
    dialog: {
      position: 'absolute',
      bottom: '2%',
      width: '100%',
      backgroundColor: 'transparent',
      zIndex: 10000,
    },
    content: {
      paddingLeft: 8,
      paddingRight: 8,
    },
    main: {
      backgroundColor: theme.background,
      borderRadius: 14,
      marginBottom: 8,
    },
    title: {
      color: theme.inputText,
      textAlign: 'center',
      padding: 8,
    },
    primaryButtonWrapper: {
      padding: 10,
      borderTopWidth: 1,
      borderTopColor: theme.modal.br,
    },
    primaryButton: {
      color: theme.addButton.text,
      textAlign: 'center',
      padding: 14,
    },
    buttonWrapper: {
      width: '100%',
      flex: 1,
      backgroundColor: theme.background,
      margin: 0,
      padding: 14,
      borderRadius: 14,
    },
    cancel: {
      textAlign: 'center',
      color: theme.button.deleteText,
      backgroundColor: theme.background,
    },
  });
};

export default CreateDealsIdeasModal;
