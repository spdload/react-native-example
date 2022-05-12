import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Dialog, {DialogContent, SlideAnimation} from 'react-native-popup-dialog';
import {useTheme} from '@react-navigation/native';
import * as routes from 'src/constants/routes';
// UI
import Typography from '../Typography';
import ButtonWithIcon from 'src/components/ButtonWithIcon';
import Icon from 'src/components/Icons';
import colors from '../Dropdown/constants/colors';

const ProductInfoModal = ({data, isOpenDialog, onCancel, title}) => {
  const {colors} = useTheme();
  const {c_name, product_name, img_src} = data;
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles(colors).title}>
            <Typography
              text={title}
              size={20}
              type={'bold'}
              customStyles={{color: colors.inputText}}
            />
          </View>
          <TouchableOpacity
            style={styles(colors).close}
            onPress={() => onCancel()}>
            <Icon name="Icon-36" color={colors.inputText} size={25} />
          </TouchableOpacity>
          <View>
            <Typography
              text={c_name}
              size={18}
              customStyles={styles(colors).descriptionTitle}
            />
            <Typography
              type="primary"
              text={product_name}
              customStyles={styles(colors).description}
              size={25}
            />
          </View>
          <View style={styles(colors).imageContainer}>
            <Image
              style={styles(colors).productImg}
              source={{
                uri: `${img_src}`
              }}
            />
          </View>
          <View>
            <Typography
              text="Description"
              size={14}
              customStyles={styles(colors).descriptionTitle}
            />
            <Typography
              text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic."
              customStyles={styles(colors).description}
              size={14}
            />
          </View>
          <View style={styles(colors).document}>
            <View style={styles(colors).documentTitle}>
              <Icon name="Icon-15" size={32} color={'#9CA3AF'} />
              <Typography
                text="Doc"
                customStyles={styles(colors).description}
                size={14}
              />
            </View>
            <TouchableOpacity>
              <Icon name="Icon-60" size={32} color={'#60A5FA'} />
            </TouchableOpacity>
          </View>
          <View style={styles(colors).cardShadow}>
            <View style={styles(colors).cardContainer}>
              <View style={styles(colors).cardHeader}>
                <View style={styles(colors).logoContainer}>
                  <Image
                    style={styles(colors).logo}
                    resizeMode={'contain'}
                    source={{
                      uri: 'https://i.ibb.co/qRn1pGt/Logo.png',
                    }}
                  />
                  <Typography
                    text="Small Description about company... nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat massa dictumst amet."
                    // customStyles={styles(colors).description}
                    size={14}
                  />
                </View>
              </View>

              <View style={styles(colors).cardFooter}>
                <Typography
                  text="Contact us"
                  size={14}
                  customStyles={styles(colors).contacts}
                />
                <Typography
                  text="support@example.com"
                  size={14}
                  customStyles={styles(colors).contacts}
                />
                <Typography
                  text="+1(55)123-4567"
                  size={14}
                  customStyles={styles(colors).contacts}
                />
              </View>
            </View>
          </View>
        </ScrollView>
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
      paddingLeft: 15,
      paddingRight: 15,
    },
    title: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 16,
      marginBottom: 21,
    },
    close: {
      position: 'absolute',
      right: 16,
      top: 24,
    },
    description: {
      color: theme.inputText,
    },
    contacts: {
      marginBottom: 5,
      color: '#fff',
    },
    descriptionTitle: {
      textTransform: 'uppercase',
      color: theme.typography.focus,
      marginBottom: 5,
    },
    imageContainer: {
      marginTop: 16,
      marginBottom: 16,
    },
    document: {
      marginTop: 15,
      flexDirection: 'row',
      padding: 10,
      alignItems: 'center',
      backgroundColor: theme.headerBackground,
      justifyContent: 'space-between',
      borderRadius: 8,
    },
    documentTitle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    productImg: {
      borderRadius: 8,
      width: '100%',
      height: 201,
    },

    cardShadow: {
      borderRadius: 16,
      backgroundColor: 'transparent',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      marginBottom: 50,
    },

    cardContainer: {
      marginTop: 16,
      borderRadius: 16,
      overflow: 'hidden',
    },

    cardHeader: {
      padding: 16,
      backgroundColor: '#ffffff',
    },
    cardFooter: {
      padding: 16,
      backgroundColor: '#1D4ED8',
    },
    logo: {
      height: 40,
      width: 200,
      marginBottom: 10,
    },
  });
};

export default ProductInfoModal;
