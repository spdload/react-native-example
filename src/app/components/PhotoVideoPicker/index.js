import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {useTheme} from '@react-navigation/native';
import Icon from '../Icons';
import Typography from '../Typography';
import CameraGalleryModal from '../Modals/CameraGalleryModal';
import Swipeout from 'react-native-swipeout';

const PhotoVideoPicker = ({onMediaChange, deleteAttachment}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isPhotoCreated, setPhotoCreated] = useState(false);
  const {
    name,
    colors: {photoPicker: colors},
  } = useTheme();

  const openPicker = () => {
    ImagePicker.openPicker({
      size: 5000000,
      width: 300,
      height: 400,
      mediaType: 'photo',
      compressImageMaxWidth: 1200,
      compressImageMaxHeight: 1200,
    }).then(image => {
      setSelectedImage(image);
      onMediaChange(image);
      setPhotoCreated(true);
    });
    setIsOpenDialog(false);
  };
  const openCameraPhoto = () => {
    ImagePicker.openCamera({
      mediaType: 'photo',
      cropping: true,
    }).then(image => {
      setSelectedImage(image);
      onMediaChange(image);
      setPhotoCreated(true);
    });
    setIsOpenDialog(false);
  };
  const openCameraVideo = () => {
    ImagePicker.openCamera({
      mediaType: 'video',
      cropping: false,
    }).then(image => {
      setSelectedImage(image);
      onMediaChange(image);
      setPhotoCreated(true);
    });
    setIsOpenDialog(false);
  };


  const handleDelete = () => {
    setPhotoCreated(false);
    setSelectedImage(null);
    onMediaChange(null);
    deleteAttachment();
  };
  return (
    <>
      {isPhotoCreated ? (
        <TouchableOpacity onPress={() => setIsOpenDialog(true)}>
          <Swipeout
            autoClose
            backgroundColor="transparent"
            right={[
              {
                type: 'delete',
                component: (
                  <View style={styles(colors).deleteButton}>
                    <Icon name={'Icon-53'} size={30} color={'#FFF'} />
                    <Typography variant="contrast" text="Delete" size={15} />
                  </View>
                ),
                onPress: () => handleDelete(),
              },
            ]}>
            <View style={styles(colors).wrapper}>
              <Image
                style={styles(colors).image}
                source={{uri: selectedImage.path}}
              />
            </View>
          </Swipeout>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => setIsOpenDialog(true)}>
          <View style={styles(colors).wrapper}>
            <Icon
              name="Icon-20"
              size={25}
              color={name === 'dark' ? '#fff' : '#475569'}
            />
          </View>
        </TouchableOpacity>
      )}

      <CameraGalleryModal
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
        openPicker={openPicker}
      />
    </>
  );
};

const styles = props => {
  return StyleSheet.create({
    wrapper: {
      backgroundColor: props.bg,
      height: 60,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 8,
      marginBottom: 8,
    },
    image: {
      width: 360,
      height: 60,
    },
    deleteButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
    },
  });
};

export default PhotoVideoPicker;
