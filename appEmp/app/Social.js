import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import {UserBubble} from '../empowerTags/userBubble';
import { globalElements } from './../ui/globalUI.js';
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
  Button,
  ScrollView,
} from 'react-native';

const Social = () => {
  return (
    <SafeAreaView>
      <ScrollView style={social.container}>
        <View>
          <MapView provider={PROVIDER_GOOGLE} style={social.map}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  boldText: {
    fontSize: 25,
    color: 'red',
    marginVertical: 16,
    textAlign: 'center'
  },
});

const social = StyleSheet.create({
  container: {
    flex: 1,

  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
  },
});


export default Social;