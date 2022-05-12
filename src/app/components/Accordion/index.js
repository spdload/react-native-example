import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';


import Icon from '../Icons';
import Typography from '../Typography';
import SplitLine from '../SplitLine';
const Accordion = ({ title, content, showSplitLine }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <View style={styles.accordion}>
      <TouchableOpacity
        style={styles.accordionTitle}
        onPress={() => setIsActive(!isActive)}>
        <View style={styles.accordionTextTitle}>
          <Typography text={title} size={18} />
        </View>
        <View>
          <Icon
            name={'Chevron-left-1'}
            size={18}
            color={'#9CA3AF'}
            style={{
              transform: [{ rotate: isActive ? '90deg' : '-90deg' }],
            }}
          />
        </View>
      </TouchableOpacity>
      {isActive && (
        <View styles={styles.accordionContent}>
          <Typography text={content} size={16} variant="gray" />
        </View>
      )}
      {showSplitLine ? null : <SplitLine />}
    </View>
  );
};

const styles = StyleSheet.create({
  accordion: {
    marginTop: 32,
    padding: 10,
    width: '100%',
  },
  accordionTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  accordionTextTitle: {
    width: '95%',
  },
  accordionContent: {
    height: 15,
  },
  splitLine: {
    marginTop: 24,
  },
});

export default Accordion;
