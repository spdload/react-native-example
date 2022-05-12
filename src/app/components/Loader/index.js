import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Spinner from '../../../assets/images/loader.gif';

const Loader = () => (
  <View opacity={0.3} style={[styles.container, styles.horizontal]}>
    <Image source={Spinner} style={styles.spiner} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: 'black',
    zIndex: 10,
    elevation: 30,
    width: '100%',
    height: '100%',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
  spiner: {
    width: 50,
    height: 50,
  },
});

export default Loader;
