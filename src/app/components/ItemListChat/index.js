import React, {useState} from 'react';
import moment from 'moment';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Typography from '../Typography';
import ReadArrow from '../../../assets/images/read-msg';
import UnreadArrow from '../../../assets/images/unread-msg';

import DefaultUserImage from '../DefaultUserImage';
import SplitLine from '../SplitLine';
import Swipeout from 'react-native-swipeout';
import Icon from '../Icons';
import ApproveDeleteModal from '../Modals/ApproveDeleteModal';

const ItemChatList = ({
  userName,
  isRead,
  avatarUrl,
  dateTime,
  msg,
  showSplitLine,
  navigation,
  id,
}) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [iconMuted, setIconName] = useState('Icon-50');

  const formatDate = () => {
    if (moment(new Date()).isSame(dateTime, 'year')) {
      if (moment(new Date()).isSame(dateTime, 'week')) {
        if (moment(new Date()).isSame(dateTime, 'day')) {
          return moment(dateTime).format('HH:MM');
        } else {
          return moment(dateTime).format('dd');
        }
      } else {
        return moment(dateTime).format('DD.MM');
      }
    } else {
      return moment(dateTime).format('YYYY');
    }
  };

  const date = formatDate();

  return (
    <View style={css.container}>
      <Swipeout
        autoClose
        backgroundColor="transparent"
        right={[
          {
            backgroundColor: '#374151',
            component: (
              <View style={css.swipeButton}>
                <Icon name={iconMuted} size={25} color={'#FFF'} />
                <Typography text="Mute" size={14} variant="contrast" />
              </View>
            ),
            onPress: () => {
              {
                if (iconMuted == 'Icon-50') {
                  setIconName('Icon-51');
                }
                if (iconMuted == 'Icon-51') {
                  setIconName('Icon-50');
                }
              }
            },
          },
          {
            type: 'delete',
            component: (
              <View style={css.swipeButton}>
                <Icon name={'Icon-53'} size={25} color={'#FFF'} />
                <Typography text="Delete" size={14} variant="contrast" />
              </View>
            ),
            onPress: () => {
              setIsOpenDialog(true);
            },
          },
        ]}>
        <TouchableOpacity onPress={() => navigation()}>
          <View style={css.content}>
            <View style={css.item}>
              <View style={css.photoContainer}>
                {avatarUrl ? (
                  <Image
                    style={css.photo}
                    source={{
                      uri: avatarUrl,
                    }}
                  />
                ) : (
                  <DefaultUserImage />
                )}
              </View>
              <View style={css.blocs}>
                <View style={css.firstBlock}>
                  <Typography text={userName} size={16} variant="primary" />
                  <View style={css.arrows}>
                    {/* {isRead ? <ReadArrow style={css.icon} /> : <UnreadArrow />} */}
                    {dateTime && (
                      <Typography text={date} size={14} variant="gray" />
                    )}
                  </View>
                </View>

                <View style={css.secondBlock}>
                  <Typography
                    text={msg}
                    size={14}
                    variant="gray"
                    linesNumbers={1}
                  />
                </View>
              </View>
            </View>
            {showSplitLine ? null : <SplitLine />}
          </View>
        </TouchableOpacity>
      </Swipeout>
      <ApproveDeleteModal
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
        id={id}
      />
    </View>
  );
};

const css = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginLeft: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  content: {
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },
  item: {
    flexDirection: 'row',
    marginTop: 10,
  },
  firstBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondBlock: {
    paddingTop: 2,
    maxWidth: 244,
  },
  photoContainer: {
    marginRight: 10,
  },
  photo: {
    height: 43,
    width: 43,
    borderRadius: 8,
  },
  blocs: {
    flexDirection: 'column',
    width: 306,
    marginBottom: 15,
  },
  arrows: {
    flexDirection: 'row',
  },
  swipeButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  icon: {
    marginRight: 5,
  },
});

export default ItemChatList;
