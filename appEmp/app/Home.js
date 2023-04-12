import { StyleSheet, Text, View, Image, Pressable, Button } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {useRouter, useSearchParams} from 'expo-router'
import { globalElements } from './../ui/globalUI.js';
import {StatusBar} from 'expo-status-bar';

let checkStatus = false;

export const colorBlindMode = (checkStatus) => {
  (checkStatus? checkStatus = false: checkStatus = true);
  return checkStatus;
}

const Home = () => {
  const router = useRouter();
  const {name} = useSearchParams();
  return (
    <LinearGradient
      colors={[globalElements.index0, globalElements.index1, globalElements.index2]}
      style={homePage.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <Button title="Color blind mode" onPress={colorBlindMode}/>
      <View style={homePage.topContainer}>
        <View>
          <Image source={require('./../assets/anon.png')} resizeMode="contain" style={{width: 50, height: 50, borderRadius: 25,}}/>
        </View>
          <Text style={{fontSize: 30, position: 'absolute', paddingLeft: 40, style: 'inline'}}>Welcome,  
            <Text style={{fontWeight: 'bold', fontStyle: 'italic'}}> {name}</Text>
          </Text>
        </View>
        <View style={{backgroundColor: 'white', height: 3, width: 450, alignSelf: 'center'}}></View>
      <View style={homePage.main}>

        <Pressable style={homePage.buttons} onPress={()=>router.push('./Social')}>
          <Text style={homePage.subtitle}>Social</Text>
        </Pressable>

        <Pressable style={homePage.buttons} onPress={()=>router.push('./TextToSpeech')}>
          <Text style={homePage.subtitle}>Text-To-Speech</Text>
        </Pressable>

        <Pressable style={homePage.buttons} onPress={()=>router.push('./SpeechToText')}>
          <Text style={homePage.subtitle}>Speech-To-Text</Text>
        </Pressable>

        <Pressable style={homePage.buttons} onPress={()=>router.push('./Chatbot')}>
          <Text style={homePage.subtitle}>Chatbot</Text>
        </Pressable>

      </View>
  </LinearGradient>
  );
}

const homePage = StyleSheet.create({
  container: {
    flex: 1,
    padding: 60,
  },
  main: {
    maxWidth: 960,
    alignContent: 'center',
    alignSelf: 'center',
    paddingTop: 100,
    justifyContent: 'space-around',
    height: 500
    
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderBottomWidth: 1,
  },
  buttons: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    height: 60,
  }
});

export default Home;