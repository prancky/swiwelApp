/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/store/store';

import AuthNavigation from './src/navigations/NavigationContainer';
import FlashMessage from 'react-native-flash-message';
export default class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthNavigation store={store} />
          <FlashMessage position="bottom" duration={4500} icon="auto" />
        </PersistGate>
      </Provider>
    );
  }
}
