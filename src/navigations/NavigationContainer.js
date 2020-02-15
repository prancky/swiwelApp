import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {createAppContainer} from 'react-navigation';
import {HomeScreen, ProfileScreen, SearchScreen, NewsDetails} from '../screens';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();
//<Stack.Screen name="News" component={NewsDetails} />

const HomeBottomNavigator = (): React.ReactElement => (
  <Stack.Navigator
    screenOptions={({route}) => ({
      headerShown: false,
    })}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Detais" component={NewsDetails} />
  </Stack.Navigator>
);

const SearchBottomNavigator = (): React.ReactElement => (
  <Stack.Navigator
    screenOptions={({route}) => ({
      headerShown: false,
      tabBarVisible:
        route.name === 'Home'
          ? true
          : route.name === 'Search'
          ? true
          : route.name === 'Profile'
          ? true
          : false,
    })}>
    <Stack.Screen name="Home" component={SearchScreen} />
    <Stack.Screen name="Detais" component={NewsDetails} />
  </Stack.Navigator>
);

const navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => {
          ({
            headerShown: false,
            tabBarVisible: !route.state ? true : false,
          });
        }}>
        <Tab.Screen name="Home" component={HomeBottomNavigator} />
        <Tab.Screen name="Search" component={SearchBottomNavigator} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default navigation;
