import React from 'react';
import {StyleSheet, Modal, View} from 'react-native';
import Typography from '../Typography';
import Button from '../Button';
import Icon from '../../../assets/images/exclamation.svg';

const ApproveDeleteModal = ({
  title = 'Are you sure you want to delete the chat?',
  text = 'If you delete the chat ... warning text',
  setIsOpenDialog,
  isOpenDialog,
  onPress,
}) => {

  const handleDeleteChat = id => {
    setIsOpenDialog(false);
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      onTouchOutside={() => setIsOpenDialog(false)}
      visible={isOpenDialog}>
      <View style={css.screenWrapper}>
        <View style={css.modalWrapper}>
          <Icon />
          <Typography text={title} size={18} customStyles={css.headerText} />
          <Typography text={text} size={14} customStyles={css.text} />

          <View style={css.buttonsBlock}>
            <Button
              text="Delete"
              styles={css.buttonDelete}
              type="deleteFilled"
              onPress={onPress}
            />
            <Button
              text="Cancel"
              styles={css.buttonCancel}
              type=""
              onPress={() => setIsOpenDialog(false)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const css = StyleSheet.create({
  screenWrapper: {
    backgroundColor: 'rgba(17, 24, 39, 0.8)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    width: 344,
    height: 288,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  headerText: {
    textAlign: 'center',
    color: 'black',
    height: 52,
    width: '60%',
    marginTop: 12,
  },
  text: {
    color: 'grey',
    marginTop: 8,
    marginBottom: 20,
  },
  buttonsBlock: {
    width: '90%',
  },
  buttonDelete: {
    marginBottom: 16,
    height: 42,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
  },
  buttonCancel: {
    marginBottom: 16,
    height: 42,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
});

export default ApproveDeleteModal;
