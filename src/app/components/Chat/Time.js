import React from 'react';
import {Time} from 'react-native-gifted-chat';

export const renderTime = props => {
  return (
    <Time
      {...props}
      timeTextStyle={{
        left: {
          color: '#627D98',
          fontSize: 10,
          top: 5,
          left: -40,
          paddingLeft: '15%',
        },
        right: {
          color: '#627D98',
          fontSize: 10,
          top: 5,
          right: -5,
        },
      }}
    />
  );
};
