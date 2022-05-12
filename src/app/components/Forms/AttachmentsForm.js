import React, {useState, useEffect, useReducer} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Image,
  PermissionsAndroid,
} from 'react-native';

import {useTheme} from '@react-navigation/native';
import {useMutation} from '@apollo/react-hooks';
import {ReactNativeFile} from 'apollo-upload-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as routes from '../../constants/routes';
import {
  ATTACHMENTS_DELETE,
  UPLOAD_PHOTO,
  UPLOAD_FILE,
  FINISHED_STEP,
} from '../../queries/mutations';

import PhotoVideoPicker from '../PhotoVideoPicker';
import FilePicker from '../FilePicker';
import SplitLine from '../SplitLine';
import Button from '../../components/Button';
import Typography from '../Typography';
import ProgressBar from '../../../assets/images/progress-bar.gif';
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PHOTO': {
      const file = action.payload.file;
      const newState = {...state};
      newState.photo = {
        file,
        state: 'initial',
      };
      return newState;
    }
    case 'ADD_MEDIA': {
      const file = action.payload.file;
      const newState = {...state};
      newState.media = {
        file,
        state: 'initial',
      };

      return newState;
    }
    default:
      return state;
  }
};

const AttachmentsForm = props => {
  const {name} = useTheme();
  const {goPrev, goNext} = props;
  const [state, dispatch] = useReducer(reducer, {photo: null, media: null});
  const [uploadPhoto, {data, loading: statusPhoto}] = useMutation(UPLOAD_PHOTO);
  const [uploadFile, {data: resFile, loading: statusFile}] =
    useMutation(UPLOAD_FILE);
  const [finishStep, {data: resFinish, loading: statusFinish}] =
    useMutation(FINISHED_STEP);
  const [deleteFile, {data: resDelete}] = useMutation(ATTACHMENTS_DELETE);
  const [attachmentPhotoId, setAttachmentPhotoId] = useState(null);
  const [attachmentFileId, setAttachmentFileId] = useState(null);
  const [account_uuid, setAcount] = useState();
  const [profile_uuid, setProfile] = useState();

  useEffect(() => {
    AsyncStorage.getItem('@profile').then(id => {
      setProfile(id);
    });
    AsyncStorage.getItem('@account_id').then(id => {
      setAcount(id);
    });
  }, []);

  const onDeletePhoto = values => {
    setAttachmentPhotoId(null);
    deleteFile({variables: {attachment_uuid: attachmentPhotoId}}).then(data =>
      //ToDo
      console.error('DEL RES PHOTO', data),
    );
  };

  const onDeleteFile = values => {
    setAttachmentFileId(null);
    deleteFile({variables: {attachment_uuid: attachmentFileId}}).then(data =>
      //ToDo alert execeptions
      console.error('DEL RES FILE', data),
    );
  };
  async function onUploadPhoto(mediaFile) {
    try {
      const result = await uploadPhoto({
        variables: {
          account_uuid: account_uuid,
          file: new ReactNativeFile({
            uri: mediaFile.path,
            type: mediaFile.mime,
            name: mediaFile.path.substr(mediaFile.path.lastIndexOf('/') + 1),
          }),
        },
      });
      setAttachmentPhotoId(result.data.uploadFile.attachment?.id);
    } catch (e) {
      //ToDo alert execeptions
      console.trace('Error', e);
    }
  }

  async function handleSubmit() {
    try {
      const result = await finishStep({
        variables: {
          profileId: profile_uuid,
          accountId: account_uuid,
          profile: {
            step_name: 'finished',
            avatar_id: attachmentPhotoId,
            cv_id: attachmentFileId,
          },
        },
      });
      props.navigation.navigate(routes.EMAIL_VERIFY);
    } catch (e) {
      //ToDo alert execeptions.
      console.trace('Error', e);
    }
  }

  async function onUploadFile(mediaFile) {
    try {
      const result = await uploadFile({
        variables: {
          account_uuid: account_uuid,
          file: new ReactNativeFile({
            uri: mediaFile.fileCopyUri,
            type: mediaFile.type,
            name: mediaFile.name,
          }),
        },
      });
      setAttachmentFileId(result.data.uploadFile.attachment?.id);
    } catch (e) {
      //ToDo Error handler
      console.trace('Error', e);
    }
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.select({
        ios: () => 40,
        android: () => 0,
      })()}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <View style={styles.inner}>
            <View style={styles.wrapper}>
              <Typography text="Photo:" />
              <PhotoVideoPicker
                onMediaChange={file => {
                  dispatch({type: 'ADD_PHOTO', payload: {file}});
                  onUploadPhoto(file);
                }}
                deleteAttachment={() => onDeletePhoto()}
              />
              {statusPhoto && (
                <View style={styles.spinnerContainer}>
                  <Image source={ProgressBar} style={styles.spiner} />
                </View>
              )}
              <Typography text="Add avatar (up to 5 MB)" size={12} />
              <SplitLine styles={{marginTop: 10, marginBottom: 40}} />
              <Typography text="Resume/bio/CV:" />
              <FilePicker
                onFileChange={file => {
                  dispatch({type: 'ADD_MEDIA', payload: {file}});
                  onUploadFile(file);
                }}
                deleteAttachment={() => onDeleteFile()}
              />
              {statusFile && (
                <View style={styles.spinnerContainer}>
                  <Image source={ProgressBar} style={styles.spiner} />
                </View>
              )}
            </View>
          </View>
          <View
            style={{
              ...styles.controls,
              backgroundColor: name === 'dark' ? '#1F2937' : '#F8FAFC',
            }}>
            <View style={styles.buttonWrapper}>
              <Button
                text="Next"
                disabled={statusPhoto || statusFile}
                onPress={() => handleSubmit()}
              />
            </View>
          </View>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  wrapper: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
  controls: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#1F2937',
    paddingTop: 20,
    marginTop: 56,
    paddingBottom: 56,
    paddingLeft: 8,
    paddingRight: 8,
  },
  buttonWrapper: {
    flex: 1,
    paddingRight: 8,
    paddingLeft: 8,
  },
  sropsownWrapper: {
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 24,
  },
  spinnerContainer: {
    paddingHorizontal: 0,
    marginBottom: 10,
  },
  spiner: {
    width: 360,
    height: 2,
  },
});

export default AttachmentsForm;
