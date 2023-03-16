import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import { createStackNavigator, createNativeStackNavigation } from '@react-navigation/stack';
import { Text, View, Image, TextInput, Button, FlatList} from 'react-native';
import { Signin, Signup, Home } from './screenNavigation.js';

const Stack = createStackNavigator();

export const allScreens = {
  loginPage: 2, 
  signupPage: 3,
  mainPage: 4
}

export function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={`${allScreens.loginPage}`} component={Signin} options={{ headerShown: false }}/>
        <Stack.Screen name={`${allScreens.signupPage}`} component={Signup} options={{ headerShown: false }}/>
        <Stack.Screen name={`${allScreens.mainPage}`} component={Home} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
    );
}
//first: <Stack.Screen name={`${loginPage}`} component={Signin}/>

export default App;