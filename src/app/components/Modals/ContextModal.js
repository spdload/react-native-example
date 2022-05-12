import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import {useTheme} from '@react-navigation/native';
import Typography from '../Typography';
import Icon from '../Icons';

const ContextMenuModal = ({
  isOpenDialog,
  openPicker,
  setIsOpenDialog,
  openCameraPhoto,
  openCameraVideo,
}) => {
  const {
    colors: {modal: colors},
  } = useTheme();
  return (
    <Dialog
      visible={isOpenDialog}
      onTouchOutside={() => setIsOpenDialog(false)}
      dialogStyle={styles(colors).dialog}>
      <DialogContent>
        <View style={styles(colors).container}>
          <TouchableOpacity onPress={openPicker}>
            <View style={styles(colors).buttonCantainer}>
              <Typography
                text="Pin"
                size={17}
                customStyles={styles(colors).button}
              />
              <Icon name={'Icon-32'} size={21} color={'#374151'} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={openCameraPhoto}>
            <View style={styles(colors).buttonCantainer}>
              <Typography
                text="Edit"
                size={17}
                customStyles={styles(colors).button}
              />
              <Icon name={'Icon-54'} size={21} color={'#374151'} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={openCameraVideo}>
            <View style={styles(colors).cancelButton}>
              <Typography
                text="Delete"
                size={17}
                customStyles={styles(colors).buttonDelete}
              />
              <Icon name={'Icon-53'} size={21} color={'#DC2626'} />
            </View>
          </TouchableOpacity>
        </View>
      </DialogContent>
    </Dialog>
  );
};

const styles = theme =>
  StyleSheet.create({
    dialog: {
      position: 'absolute',
      bottom: '4%',
      width: '70%',
      height: 145,
      borderRadius: 20,
      paddingTop: '2%',
      backgroundColor: '#FFFFFF',
    },
    container: {
      flexDirection: 'column',
      width: '100%',
    },
    buttonCantainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderColor: 'rgba(60, 60, 67, 0.29);',
      borderStyle: 'solid',
      padding: 12,
    },
    button: {
      color: '#1F2937',
      textAlign: 'center',
    },
    buttonDelete: {
      color: '#DC2626',
      textAlign: 'center',
    },
    cancelButton: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      color: '#60A5FA',
      textAlign: 'center',
      padding: 12,
    },
  });

export default ContextMenuModal;
