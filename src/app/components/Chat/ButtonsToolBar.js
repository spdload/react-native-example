import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from '../Icons';
import {useTheme} from '@react-navigation/native';
import CameraGalleryModal from '../Modals/CameraGalleryModal';
import CreateDealsIdeasModal from 'src/components/Modals/CreateDealsIdeasModal';
import AddDealModal from 'src/components/Modals//AddDealModal';
import AddIdeaModal from 'src/components/Modals/AddIdeaModal';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';

const ButtonsToolbar = ({showEmoji, onSend, text, type, chapterId}) => {
  const {colors} = useTheme();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isPhotoCreated, setPhotoCreated] = useState(false);

  // ModalsContrals
  const [deaslDialog, setDeaslDialog] = useState(false);
  const [createDeal, setCreateDeal] = useState(false);
  const [createIdea, setCreateIdea] = useState(false);

  const [isFilePicked, setIsFilePicked] = useState(false);
  const [isFile, setFile] = useState(null);
  const openPicker = () => {
    ImagePicker.openPicker({
      size: 5000000,
      width: 300,
      height: 300,
      mediaType: 'photo',
      compressImageMaxWidth: 1200,
      compressImageMaxHeight: 1200,
    }).then(image => {
      setSelectedImage(image);
      setPhotoCreated(true);
    });
    setIsOpenDialog(false);
  };
  const openCameraPhoto = () => {
    ImagePicker.openCamera({
      mediaType: 'photo',
      cropping: false,
    }).then(image => {
      setSelectedImage(image);
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
      setPhotoCreated(true);
    });
    setIsOpenDialog(false);
  };

  const documentSelect = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
        ],
      });
      setFile(res[0]);
      setIsFilePicked(true);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  return (
    <>
      <View style={css(colors).buttonsPanel}>
        <View style={css(colors).attachmentsButtons}>
          {type === 'chapter' && (
            <TouchableOpacity
              style={css(colors).icon}
              onPress={() => setDeaslDialog(true)}>
              <Icon name="Icon-33" size={24} color={colors.chatToolbar.icons} />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={css(colors).icon} onPress={documentSelect}>
            <Icon name="Icon-43" size={24} color={colors.chatToolbar.icons} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsOpenDialog(true)}>
            <Icon name="Icon-57" size={24} color={colors.chatToolbar.icons} />
          </TouchableOpacity>
        </View>
        <View style={css(colors).rightPanel}>
          <TouchableOpacity
            onPress={() => showEmoji(true)}
            style={css(colors).emojiKeyboard}>
            <Icon name="Icon-34" size={24} color={colors.chatToolbar.icons} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={text?.length ? () => onSend(text, true) : () => null}>
            <Icon
              name="Icon-11"
              size={24}
              color={text?.length ? colors.chatToolbar.sendIcon : 'grey'}
            />
          </TouchableOpacity>
        </View>
      </View>
      <CameraGalleryModal
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
        openPicker={openPicker}
        openCameraPhoto={openCameraPhoto}
        openCameraVideo={openCameraVideo}
      />
      <CreateDealsIdeasModal
        isOpenDialog={deaslDialog}
        setIsOpenDialog={() => setDeaslDialog(false)}
        createDealAction={() => setCreateDeal(true)}
        createIdeaAction={() => setCreateIdea(true)}
      />
      <AddDealModal
        chapterId={chapterId}
        isOpenDialog={createDeal}
        onCancel={() => setCreateDeal(false)}
      />
      <AddIdeaModal
        chapterId={chapterId}
        isOpenDialog={createIdea}
        onCancel={() => setCreateIdea(false)}
      />
    </>
  );
};

const css = props => {
  return StyleSheet.create({
    buttonsPanel: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 4,
    },
    attachmentsButtons: {
      flexDirection: 'row',
      width: 110,
    },
    icon: {
      marginRight: 10,
    },
    rightPanel: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 70,
    },
    emojiKeyboard: {
      opacity: 0,
    },
  });
};
export default ButtonsToolbar;
