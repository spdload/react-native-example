import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import {useTheme} from '@react-navigation/native';
import Typography from '../Typography';

const CameraGalleryModal = ({
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
                text="Gallery"
                size={18}
                customStyles={styles(colors).button}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={openCameraPhoto}>
            <View style={styles(colors).buttonCantainer}>
              <Typography
                text="Take a Photo"
                size={18}
                customStyles={styles(colors).button}
              />
            </View>
          </TouchableOpacity>
          {openCameraVideo && (
            <TouchableOpacity onPress={openCameraVideo}>
              <View style={styles(colors).buttonCantainer}>
                <Typography
                  text="Take a Video"
                  size={18}
                  customStyles={styles(colors).button}
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
        <View>
          <TouchableOpacity onPress={() => setIsOpenDialog(false)}>
            <Typography
              text="Cancel"
              size={18}
              customStyles={styles(colors).cancelButton}
            />
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
      bottom: '5%',
      width: '98%',
      borderRadius: 20,
      paddingTop: '2%',
      backgroundColor: theme.bg,
    },
    container: {
      flexDirection: 'column',
      width: '100%',
    },
    buttonCantainer: {
      borderBottomWidth: 1,
      borderColor: theme.br,
      borderStyle: 'solid',
      padding: 15,
    },
    button: {
      color: '#60A5FA',
      textAlign: 'center',
    },
    cancelButton: {
      color: '#60A5FA',
      textAlign: 'center',
      padding: 15,
    },
  });

export default CameraGalleryModal;
