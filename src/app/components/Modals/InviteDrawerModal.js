import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Dialog, {SlideAnimation} from 'react-native-popup-dialog';
import {useTheme} from '@react-navigation/native';
import Typography from '../Typography';
import Icon from '../Icons';
import InvateMemberForm from '../Forms/InvateMemberForm';

const InviteDrawerModal = ({isOpenDialog, setIsOpenDialog}) => {
  const {colors} = useTheme();
  return (
    <>
      <Dialog
        visible={isOpenDialog}
        overlayBackgroundColor={'transparent'}
        onTouchOutside={() => setIsOpenDialog(false)}
        dialogAnimation={
          new SlideAnimation({
            slideFrom: 'right',
          })
        }
        dialogStyle={styles(colors).dialog}>
        {/* <DialogContent> */}
        <View style={styles(colors).container}>
          <View style={styles(colors).header}>
            <View style={styles(colors).titleHeader}>
              <Typography
                text="Invate new member"
                theme={colors?.typography}
                size={18}
                type="bold"
              />
              <TouchableOpacity onPress={() => setIsOpenDialog(false)}>
                <Icon name={'Icon-36'} size={28} color={'#D1D5DB'} />
              </TouchableOpacity>
            </View>
            <View>
              <Typography
                customStyles={{color: 'white'}}
                text="Information about the conditions
                  for inviting a new member"
                size={14}
                type="bold"
              />
            </View>
          </View>
          <InvateMemberForm colors={colors} />
        </View>
        {/* </DialogContent> */}
      </Dialog>
    </>
  );
};

const styles = props =>
  StyleSheet.create({
    dialog: {
      position: 'absolute',
      top: '10%',
      right: 0,
      width: '90%',
      height: '100%',
      // paddingTop: '2%',
      backgroundColor: props.background,
    },
    container: {
      // flexDirection: 'column',
      // width: '100%',
    },
    header: {
      padding: 20,
      backgroundColor: props.headerBackground,
    },
    titleHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });

export default InviteDrawerModal;
