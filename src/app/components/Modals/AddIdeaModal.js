import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dialog, {DialogContent, SlideAnimation} from 'react-native-popup-dialog';
import {useTheme} from '@react-navigation/native';
import Typography from '../Typography';
import Icon from 'src/components/Icons';
import {ReactNativeFile} from 'apollo-upload-client';
import {Formik} from 'formik';
import SplitLine from 'src/components/SplitLine';
import Input from 'src/components/Input';
import FilePicker from 'src/components/FilePicker';
import Button from 'src/components/Button';

import {useMutation} from '@apollo/react-hooks';
import {UPLOAD_FILE, CREATE_THREAD} from '../../queries/mutations';
import {GET_CHAPTER_THREADS} from 'src/queries/queries';

const AddIdeaModal = ({isOpenDialog, onCancel, chapterId}) => {
  const {colors} = useTheme();
  const [account_uuid, setAcount] = useState();
  const [attachmentFileId, setAttachmentFileId] = useState(null);
  const [error, setErrors] = useState();
  const [documentFile, setDocumentFile] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('@account_id').then(id => {
      setAcount(id);
    });
  }, []);

  const [CreateThread, {data, loading}] = useMutation(CREATE_THREAD, {
    refetchQueries: [
      {
        query: GET_CHAPTER_THREADS,
        variables: {
          account_uuid: account_uuid,
          chapter_uuid: chapterId,
          type: 'idea',
        },
      },
    ],
  });

  const [uploadFile, {data: resFile, loading: statusLoad}] =
    useMutation(UPLOAD_FILE);

  const onUploadFile = async mediaFile => {
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
  };

  const handleSubmit = values => {
    if (!attachmentFileId) {
      setErrors('Please add documet');
      return false;
    }
    CreateThread({
      variables: {
        chapter_uuid: chapterId,
        attachment_uuid: attachmentFileId,
        type: 'idea',
        description: values.description,
      },
    }).then(res => {
      onCancel();
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
        <Typography
          text="Add Idea"
          size={20}
          type={'bold'}
          customStyles={{color: colors.inputText}}
        />
        <TouchableOpacity
          style={styles(colors).close}
          onPress={() => onCancel()}>
          <Icon name="Icon-36" color={colors.inputText} size={25} />
        </TouchableOpacity>
        <Formik
          initialValues={{description: '', file: {}}}
          onSubmit={values => {
            handleSubmit(values);
          }}>
          {props => {
            const {
              values,
              errors,
              touched,
              handleSubmit,
              setFieldTouched,
              handleChange,
            } = props;
            return (
              <View style={styles(colors).form}>
                <SplitLine
                  label={'MAin info'}
                  theme={colors.splitLine}
                  styles={{marginBottom: 16}}
                />
                <Input
                  name={'description'}
                  label={'Small description'}
                  placeholder={'Enter Small description'}
                  onChangeText={handleChange('description')}
                  onBlur={name => setFieldTouched('description')}
                  value={values.description}
                  error={errors.description}
                  touched={touched.description}
                  theme={colors}
                />
                <SplitLine
                  label={'Documentation'}
                  theme={colors.splitLine}
                  styles={{marginBottom: 16, marginTop: 40}}
                />
                <FilePicker
                  onFileChange={file => {
                    onUploadFile(file);
                  }}
                  theme={colors}
                />
                {error && (
                  <Typography
                    text={error}
                    variant="delete"
                    theme={colors.typography}
                    customStyles={{fontSize: 12}}
                  />
                )}
                <View style={styles(colors).submit}>
                  <Button
                    onPress={handleSubmit}
                    text="Sign in"
                    theme={colors.button}
                  />
                </View>
              </View>
            );
          }}
        </Formik>
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
      paddingTop: 24,
      paddingLeft: 16,
      paddingRight: 16,
    },
    close: {
      position: 'absolute',
      right: 16,
      top: 24,
    },
    form: {
      marginTop: '15%',
    },
    submit: {
      marginTop: 48,
    },
  });
};

export default AddIdeaModal;
