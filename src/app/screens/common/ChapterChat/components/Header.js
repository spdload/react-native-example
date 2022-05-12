import React, {useState} from 'react';
import {StyleSheet, Platform, View, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import * as routes from 'src/constants/routes';

// UI
import ButtonBack from 'src/components/ButtonBack';
import Typography from 'src/components/Typography';
import ChapterInfoModal from 'src/components/Modals/ChapterInfoModal';

const Header = ({navigation, details, type = 'chapter'}) => {
  const {title} = details;
  const [openInfo, setOpenInfo] = useState(false);
  const {colors} = useTheme();
  return (
    <View style={css(colors).header}>
      <ButtonBack
        text="Back"
        pressAction={() => {
          navigation.navigate(routes.HOME);
        }}
      />
      <View>
        <Typography
          customStyles={
            type === 'chapter'
              ? css(colors).titleHeader
              : css(colors).titleThread
          }
          text={title}
          size={18}
          type="bold"
        />
      </View>
      <TouchableOpacity
        style={css(colors).info}
        onPress={() => setOpenInfo(true)}>
        <Typography text="Info" customStyles={{color: '#60A5FA'}} />
      </TouchableOpacity>
      <ChapterInfoModal
        navigation={navigation}
        isOpenDialog={openInfo}
        details={details}
        onCancel={() => setOpenInfo(false)}
      />
    </View>
  );
};

const css = props => {
  return StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: Platform.OS === 'ios' ? '10%' : '1%',
      paddingRight: 10,
      width: '100%',
    },
    titleHeader: {
      paddingTop: 10,
    },
    titleThread: {
      paddingTop: 10,
    },
    info: {
      paddingVertical: 10,
      color: props.text.primary,
    },
  });
};

export default Header;
