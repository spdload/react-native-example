import React, {useEffect} from 'react';
import {StatusBar, Platform} from 'react-native';
import AppContainer from './src/app/AppContainer';
import SplashScreen from 'react-native-splash-screen';
import client from './src/app/graphql/connect';
import {ApolloProvider} from '@apollo/client';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <ApolloProvider client={client}>
       {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
      <AppContainer />
    </ApolloProvider>
  );
};

export default App;
