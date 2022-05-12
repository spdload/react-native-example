import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Icon from '../Icons';
import Typography from '../Typography';
import DocumentPicker from 'react-native-document-picker';

import apolloClient from 'src/graphql/connect';
import {UPLOAD_FILE} from 'src/queries/mutations';

const FilePicker = ({onFileChange, deleteAttachment, theme}) => {
  const {
    name,
    colors: {photoPicker: colors},
  } = useTheme();

  const [isFilePicked, setIsFilePicked] = useState(false);
  const [isFile, setFile] = useState(null);

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
      onFileChange(res[0]);
      setIsFilePicked(true);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  // const handleDelete = () => {
  //   setFile(null);
  //   onFileChange(null);
  //   setIsFilePicked(false);
  //   deleteAttachment();
  // };
  return (
    <>
      {!isFilePicked ? (
        <TouchableOpacity onPress={documentSelect}>
          <View
            style={styles(theme?.photoPicker || colors).wrapperWithoutPhoto}>
            <Icon
              name="Icon-43"
              size={32}
              color={name === 'dark' ? '#fff' : '#475569'}
            />
            <View
              style={styles(theme?.photoPicker || colors).contentWithoutPhoto}>
              <Typography
                text="Upload a file"
                customStyles={{color: '#93C5FD', marginBottom: 8}}
              />
              <Typography
                text="PDF, DOC, DOCX, ... file (up to 15MB)"
                size={12}
                theme={theme?.typography}
              />
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles(theme?.photoPicker || colors).wrapperWithPhoto}>
          <Icon
            name="Icon-42"
            size={32}
            color={name === 'dark' ? '#fff' : '#475569'}
          />
          <View style={styles(theme?.photoPicker || colors).contentWithPhoto}>
            <Typography text={isFile.name} customStyles={{color: '#93C5FD'}} />
            <TouchableOpacity onPress={() => handleDelete()}>
              <Icon
                name="Icon-30"
                size={32}
                color={name === 'dark' ? '#fff' : '#475569'}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

const styles = props => {
  return StyleSheet.create({
    wrapperWithoutPhoto: {
      backgroundColor: props.bg,
      display: 'flex',
      flexDirection: 'row',
      padding: 24,
      alignItems: 'center',
      marginTop: 8,
      marginBottom: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderStyle: 'dashed',
      borderColor: props.br,
    },
    wrapperWithPhoto: {
      backgroundColor: props.bg,
      display: 'flex',
      flexDirection: 'row',
      padding: 24,
      alignItems: 'center',
      marginTop: 8,
      marginBottom: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: props.br,
    },
    contentWithPhoto: {
      width: '95%',
      padding: 5,
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
    },
    contentWithoutPhoto: {
      marginLeft: 10,
    },
  });
};

export default FilePicker;
