/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import SearchContextProvider, {SearchContext} from '@lib/utils/context';

import {ThemeProvider} from 'styled-components';
import {lightTheme, darkTheme} from '@lib/utils/theme';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

import Search from '@lib/views/search';
import Filter from '@lib/views/filter';
import Asset from '@lib/views/asset';

import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Reanimated 2']);
const headers = {
  // authority: 'api.opensea.io',
  // pragma: 'no-cache',
  // 'cache-control': 'no-cache',
  // 'sec-ch-ua':
  //   '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
  // accept: '*/*',
  // 'x-build-id': '6CRSlZgsDn3tDxAEyU_Xx',
  // 'sec-ch-ua-mobile': '?0',
  // 'user-agent':
  //   'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
  'x-api-key': '2f6f419a083c46de9d83ce3dbe7db601',
  // 'content-type': 'application/json',
  // origin: 'https://opensea.io',
  // 'sec-fetch-site': 'same-site',
  // 'sec-fetch-mode': 'cors',
  // 'sec-fetch-dest': 'empty',
  // referer: 'https://opensea.io/',
  // 'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
};

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://api.opensea.io/graphql/',
  cache: new InMemoryCache(),
  headers,
  connectToDevTools: true,
});

const NativeStack = createNativeStackNavigator();

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  const isDarkMode = false;
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={`${isDarkMode ? 'light' : 'dark'}-content`} />
      <ApolloProvider client={client}>
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          <SearchContextProvider>
            <NavigationContainer
              theme={{
                colors: {
                  background: isDarkMode ? '#222222' : '#FFFFFF',
                },
              }}>
              <NativeStack.Navigator>
                <NativeStack.Screen
                  name="Search"
                  component={Search}
                  options={{headerShown: false}}
                />
                <NativeStack.Screen
                  name="Filter"
                  component={Filter}
                  options={{
                    presentation: 'modal',
                    headerShown: false,
                  }}
                />
                <NativeStack.Screen
                  name="Asset"
                  component={Asset}
                  options={{headerShown: false}}
                />
              </NativeStack.Navigator>
            </NavigationContainer>
          </SearchContextProvider>
        </ThemeProvider>
      </ApolloProvider>
    </SafeAreaProvider>
  );
};

export default App;
