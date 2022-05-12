import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useLazyQuery, useQuery} from '@apollo/client';
import {GET_PROFILE_ENTITY} from 'src/queries/queries';

export function useRole() {
  const [userRole, setRole] = useState();
  const [account_uuid, setAccount] = useState();

  const [GetCompanyEntity, {data}] = useLazyQuery(GET_PROFILE_ENTITY, {
    variables: {account_uuid},
  });

  useEffect(() => {
    AsyncStorage.getItem('@account_id').then(id => {
      setAccount(id);
      GetCompanyEntity();
    });
  }, []);

  useEffect(() => {
    if (data) {
      const {role} = data?.rearden_profile[0];
      setRole(role);
    }
  }, [data]);

  return [userRole];
}
