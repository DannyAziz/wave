/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import SearchContextProvider from '@lib/utils/context';

import {ThemeProvider} from 'styled-components';
import {lightTheme, darkTheme} from '@lib/utils/theme';

import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

import Search from '@lib/views/search';
import Filter from '@lib/views/filter';
import Asset from '@lib/views/asset';

import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Reanimated 2']);
const headers = {
  'x-api-key': '2f6f419a083c46de9d83ce3dbe7db601',
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
  const isDarkMode = useColorScheme() === 'dark';
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
                  getId={({params}) =>
                    params.data.asset
                      ? params.data.asset.relayId
                      : params.data.assetBundle.relayId
                  }
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
