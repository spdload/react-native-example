import {ApolloClient, ApolloLink, HttpLink, InMemoryCache} from 'apollo-boost';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {WebSocketLink} from 'apollo-link-ws';
import {getMainDefinition, getMutationDefinition} from 'apollo-utilities';
import {onError} from 'apollo-link-error';
import {setContext} from 'apollo-link-context';
import {split} from 'apollo-link';
import {GRAPHQL_URL, GRAPHQL_URL_SOCKET, GRAPHQL_URL_FILES} from '@env';
import {createUploadLink} from 'apollo-upload-client';

const httpLink = new HttpLink({
  uri: `${GRAPHQL_URL}`,
});

const wsLink = new WebSocketLink({
  uri: `ws://${GRAPHQL_URL_SOCKET}`,
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        'x-hasura-admin-secret': '1234',
      },
    },
  },
});

const uploadLink = createUploadLink({
  uri: `${GRAPHQL_URL_FILES}`,
  headers: async () => {
    const token = await AsyncStorage.getItem('@authorization');
    return {
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  },
});

const cache = new InMemoryCache();

const mediaLink = setContext(async (_, {headers}) => {
  const token = await AsyncStorage.getItem('@autorization');
  return {
    headers: {
      ...(token && {authorization: `Bearer ${token} `}),
      ...(!token && {'x-hasura-admin-secret': '1234'}),
    },
  };
});

const authLink = setContext(async (_, {headers}) => {
  const token = await AsyncStorage.getItem('@autorization');
  return {
    headers: {
      ...(token && {authorization: `Bearer ${token} `}),
      ...(!token && {'x-hasura-admin-secret': '1234'}),
    },
  };
});
const httpUploadLinkHeaders = mediaLink.concat(uploadLink);

const httpAuthLinkHeaders = authLink.concat(httpLink);

const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors) {
    graphQLErrors.map(({message, locations, path}) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

const httpUploadLink = split(
  ({query}) => {
    const mainDefinition = getMainDefinition(query);
    if (mainDefinition.operation === 'query') {
      return false;
    } else {
      const definition = getMutationDefinition(query).variableDefinitions;
      const hasFiles = definition?.find(el =>
        [el.type?.name?.value, el.type?.type?.name?.value].includes('ID'),
      );

      const test = definition?.find(el => [
        el.type?.name?.value,
        el.type?.type?.name?.value,
      ]);
      // Dispatch to file server
      return hasFiles;
    }
  },
  httpUploadLinkHeaders,
  httpAuthLinkHeaders,
);

const link = split(
  ({query}) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpUploadLink,
);

export default new ApolloClient({
  link: ApolloLink.from([link, errorLink]),
  cache,
});
