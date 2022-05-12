import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Dialog, {SlideAnimation} from 'react-native-popup-dialog';
import {useTheme} from '@react-navigation/native';
import Typography from '../Typography';
import Icon from '../Icons';
import Radio from '../Radio';
import SplitLine from '../SplitLine';
import Button from '../Button';
import {navigationRef} from '../../AppContainer';
import * as routes from 'src/constants/routes';

const TakePartModal = ({isOpenDialog, colors, setIsOpenDialog}) => {
  const [selected, setSelected] = useState(0);

  // const {colors} = useTheme();
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
        <View style={styles(colors).container}>
          <View style={styles(colors).header}>
            <View style={styles(colors).titleHeader}>
              <Typography
                text="Deal's Title"
                theme={colors?.typography}
                size={18}
                type="bold"
              />

              <TouchableOpacity onPress={() => setIsOpenDialog(false)}>
                <Icon name={'Icon-36'} size={28} color={'#D1D5DB'} />
              </TouchableOpacity>
            </View>
            <Typography
              text="Choose in what role you want to participate in this deal"
              theme={colors?.typography}
              size={14}
            />
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
          <View style={styles(colors).radioContainer}>
            <Radio
              selected={selected}
              options={[
                {
                  value: 'Participate',
                  description: 'A small description of the role',
                },
                {
                  value: 'Watching',
                  description: 'A small description of the role',
                },
              ]}
              horizontal={false}
              onChangeSelect={(opt, i) => {
                setSelected(i);
              }}
            />
          </View>
          <SplitLine />
          <View style={styles(colors).buttons}>
            <Button
              onPress={() =>
                navigationRef.current.navigate(routes.CHAT, {
                  type: 'idea',
                  id: '1',
                  title: 'Deals title',
                  count: `${4}`,
                })
              }
              theme={colors}
              text="Take Part"
            />
            <Button text="Open Discussion" />
          </View>
        </View>
      </Dialog>
    </>
  );
};

const styles = props =>
  StyleSheet.create({
    radioContainer: {
      padding: 20,
    },
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

export default TakePartModal;
