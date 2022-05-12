import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Bubble} from 'react-native-gifted-chat';

// UI
import Typography from 'src/components/Typography';
import Icon from 'src/components/Icons';
import RepliersList from 'src/components/RepliersList';
import {navigationRef} from '../../AppContainer';
import * as routes from 'src/constants/routes';

// Icons
import LoaderImage from 'app/assets/images/small-loader.gif';
import CheckIcon from 'app/assets/images/check-icon.svg';
import DoubleCheckIcon from 'app/assets/images/double-check.svg';

const DealMessage = ({message, chatProps}) => {
  const renderStatusIndicator = () => {
    if (message?.sending) {
      return <Image source={LoaderImage} style={{width: 14, height: 14}} />;
    }
    if (message?.isRead) {
      return <DoubleCheckIcon fill={'#4B5563'} width={14} />;
    }
    return <CheckIcon fill={'#4B5563'} width={14} />;
  };

  const {
    colors: {systemMessage: colors},
  } = useTheme();
  const {type, deal_title, idea_description} = message;
  // TO DO - redirect to thread
  const handleRedirect = thread_uuid => {
    alert(thread_uuid);
    // if (type === 'deal') {
    //   navigationRef.current.navigate(routes.DEALS_DETAILS, {
    //     type: 'titleD',
    //     id: '1',
    //     titleDeal: `${deal_title}`,
    //     count: `${4}`,
    //   });
    // } else {
    //   navigationRef.current.navigate(routes.IDEAS_DETAILS, {
    //     type: 'idea',
    //     id: '1',
    //     titleDeal: 'Idea',
    //     count: `${4}`,
    //   });
    // }
  };
  const renderTopInfo = () => {
    switch (type) {
      case 'deal':
        return (
          <>
            <Typography customStyles={styles(colors).tag} text="#del" />
            <Typography
              customStyles={styles(colors).title}
              text={deal_title}
              type="bold"
            />
          </>
        );
      case 'idea':
        return (
          <>
            <Typography customStyles={styles(colors).tag} text={'#idea'} />
            <Typography
              customStyles={styles(colors).description}
              text={idea_description}
            />
          </>
        );
    }
  };
  return (
    <>
      <Bubble
        {...chatProps}
        wrapperStyle={{
          left: {
            ...styles(colors).container,
            borderBottomLeftRadius: 0,
          },
          right: {
            ...styles(colors).container,
            borderBottomRightRadius: 0,
          },
        }}
        timeTextStyle={{
          left: {color: '#4B5563'},
          right: {color: '#4B5563', marginRight: 15},
        }}
        renderCustomView={() => {
          return (
            <View style={styles(colors).wrapper}>
              <TouchableOpacity
                onPress={() => handleRedirect(message?.thread_uuid)}>
                {renderTopInfo()}
                <View style={styles(colors).attachment}>
                  <Icon name="Icon-15" size={32} color={'#9CA3AF'} />
                  <Typography
                    text={message?.attachment?.name}
                    customStyles={{color: '#1F2937'}}
                  />
                </View>
                <RepliersList type="deal" deal_title="Title" count={4} />
              </TouchableOpacity>
              {message.user._id === 1 ? (
                <View
                  style={{
                    position: 'absolute',
                    bottom: -12,
                    right: 5,
                    width: 15,
                    height: 15,
                  }}>
                  {renderStatusIndicator()}
                </View>
              ) : (
                <></>
              )}
            </View>
          );
        }}
      />
    </>
  );
};

const styles = theme => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.bg,
      padding: 10,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      marginBottom: 0,
      marginTop: 16,
      width: '80%',
    },
    wrapper: {},
    tag: {
      textAlign: 'right',
      color: '#111827',
      fontSize: 14,
    },
    title: {
      fontSize: 14,
      paddingTop: 8,
      color: '#111827',
      marginBottom: 8,
    },
    description: {
      fontSize: 14,
      paddingTop: 8,
      paddingRight: 25,
      color: '#111827',
      marginBottom: 8,
    },
    attachment: {
      backgroundColor: '#fff',
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 15,
      borderRadius: 8,
      marginBottom: 9,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    bottomBar: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
  });
};

export default DealMessage;
