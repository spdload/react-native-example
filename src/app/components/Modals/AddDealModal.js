import React, {useState, useEffect, useReducer} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Dialog, {DialogContent, SlideAnimation} from 'react-native-popup-dialog';
import {useTheme} from '@react-navigation/native';
import Typography from '../Typography';
import Icon from 'src/components/Icons';
import {Formik, yupToFormErrors} from 'formik';
import SplitLine from 'src/components/SplitLine';
import Input from 'src/components/Input';
import FilePicker from 'src/components/FilePicker';
import Button from 'src/components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ReactNativeFile} from 'apollo-upload-client';
import {CreateDealSchema} from 'src/components/Forms/validation';

import {useMutation} from '@apollo/react-hooks';
import {UPLOAD_FILE, CREATE_THREAD} from '../../queries/mutations';

const CreateDealsIdeasModal = ({isOpenDialog, onCancel, chapterId}) => {
  const {colors} = useTheme();
  const [account_uuid, setAcount] = useState();
  const [attachmentFileId, setAttachmentFileId] = useState(null);
  const [error, setErrors] = useState();

  useEffect(() => {
    AsyncStorage.getItem('@account_id').then(id => {
      setAcount(id);
    });
  }, []);

  const [uploadFile, {data: resFile, loading: statusLoad}] =
    useMutation(UPLOAD_FILE);

  const [CreateThread, {data, loading}] = useMutation(CREATE_THREAD);

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
        type: 'deal',
        name: values.title,
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
          text="Add Deal"
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
          initialValues={{title: '', file: {}}}
          validationSchema={CreateDealSchema}
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
                  name={'title'}
                  label={'Deal’s Title'}
                  placeholder={'Enter your Deal’s Title'}
                  onChangeText={handleChange('title')}
                  onBlur={name => setFieldTouched('title')}
                  value={values.title}
                  error={errors.title}
                  touched={touched.title}
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
                    text="Send"
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

export default CreateDealsIdeasModal;
