import { StyleSheet, Text, View, TextInput, Button, ImageBackground, Pressable} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import React, {useState} from 'react';
import {useRouter, useSearchParams, useNavigation} from 'expo-router'
import { globalElements } from './../ui/globalUI.js';

const handleSubmit = (u, p) => {
  const usernameRegex = /^[a-zA-Z0-9]{5,11}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).{7,}$/;
  
  if (usernameRegex.test(u) && passwordRegex.test(p)) {
    ()=>{
      router.push(`./Home?name=${u}`)
    };
    console.log('Valid username and password');
  } else {
    // Invalid username or password
    console.log('Invalid username or password');
  }
};

const Signup = () => {
  const router = useRouter();
  const {name} = useSearchParams();
  const navigation = useNavigation();
  const [username, setUsername] = useState('Username');
  const [password, setPassword] = useState('Password');
  return (
    //<LinearGradient color={[globalStyle.strongGradient,globalStyle.weakGradient]}>
    <LinearGradient
      colors={[globalElements.index0, globalElements.index1, globalElements.index2]}
      style={loginPage.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
    <ImageBackground source={require('./../assets/logo.png')} resizeMode="contain">
      <View style={loginPage.main}>
        <View style={{style: 'inline'}}>
      </View>
          <View style={{padding: 50}}>
            <TextInput style={loginPage.input} 
                  placeholder='Username' 
                  onChangeText={(val) => setUsername(val)}
                  autoCapitalize="none"
              />
              <TextInput style={loginPage.input} 
                  placeholder='Password'
                  onChangeText={(val) => setPassword(val)}
                  autoCapitalize="none"
                  secureTextEntry
              />
          </View>
          <View style={{alignContent: 'center', alignSelf: 'center', justifyContent: 'row'}}>
          
          <Button
            onPress={ ()=>router.push(`./Home?name=${username}`) }
            title="Signup"
            color='black'
          />
          </View>
      </View>
    </ImageBackground>
    </LinearGradient>
  );
}

const loginPage = StyleSheet.create({
  container: {
    flex: 1,
    padding: 100,
  },
  main: {
    maxWidth: 960,
    alignContent: 'center',
    alignSelf: 'center',
    paddingTop: 100
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  input: {
    alignSelf: 'center',
      borderColor: '2 #fff',
      borderWidth: 2,
      padding: 12,
      margin: 10,
      width: 350,
      backgroundColor: 'white',
      borderRadius: 30
  },
  
});

export default Signup;