import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as routes from '../constants/routes';

import {useLazyQuery, useQuery} from '@apollo/client';
import {GET_INIVITATIN_STATUS} from 'src/queries/queries';

import Loader from 'src/components/Loader';

const ControllerIsAuth = ({navigation}) => {
  const [account_uuid, setAccount] = useState();

  const [InvitationStatus, {called, loading, data}] = useLazyQuery(
    GET_INIVITATIN_STATUS,
    {
      variables: {account_uuid},
    },
  );

  useEffect(() => {
    checkIsRemember();
  }, []);

  useEffect(() => {
    if (data?.rearden_invite) {
      switch (data?.rearden_invite[0]?.status) {
        case 'accepted':
          return navigation.navigate(routes.HOME);
        case 'pending':
          return navigation.navigate(routes.EMAIL_VERIFY);
        case 'initial':
          return navigation.navigate(routes.MEMBERSHIP_APPLICATION);
        default:
          return <Loader />;
      }
    }
  }, [data, navigation]);

  const checkIsRemember = async () => {
    const isRemember = await AsyncStorage.getItem('@remeberUser');
    if (isRemember) {
      checkStatus();
    } else {
      navigation.navigate(routes.SIGN_IN);
    }
  };

  const checkStatus = async () => {
    const account = await AsyncStorage.getItem('@account_id');
    if (account) {
      setAccount(account);
      InvitationStatus();
    }
  };

  return <Loader />;
};

export default ControllerIsAuth;
