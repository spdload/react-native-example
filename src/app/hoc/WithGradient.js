import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const WithGradient = Component => props => {
  return (
    <LinearGradient
      colors={['#1D4ED8', '#421273']}
      start={{x: 0.1, y: 0}}
      end={{x: 0.9, y: 1}}>
      <Component {...props} />
    </LinearGradient>
  );
};

export default WithGradient;
