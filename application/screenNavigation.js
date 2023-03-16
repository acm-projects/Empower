import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { useNavigation, navigate, CommonActions} from '@react-navigation/native';
import { Text, View, Image, TextInput, Button } from 'react-native';
import { styles } from './userInterface/interface.js';
import { setInfo } from './userInfo/setUserInfo.js';
import { allScreens } from './App.js'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry.js';
import * as LocalAuthentication from 'expo-local-authentication';
/*

const allScreens = {
  loginPage: 2, 
  signupPage: 3,
  mainPage: 4
}

*/
//get face id
const onFaceId = async () => {
  try {
  // Checking if device is compatible
  const isCompatible = await LocalAuthentication.hasHardwareAsync();
  if (!isCompatible) {
    throw new Error('Your device isn\'t compatible.')
  }
  // Checking if device has biometrics records
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();
  if (!isEnrolled) {
    throw new Error('No Faces / Fingers found.')
  }
  // Authenticate user
  await LocalAuthentication.authenticateAsync();
  Alert.alert('Authenticated', 'Welcome back !')
  } catch (error) {
  Alert.alert('An error as occured', error?.message);
  }
}

export function Signin({navigation}){
    const [username, setUsername] = useState('Username');
    const [password, setPassword] = useState('Password');
    const validate = () => {
      if(setInfo(username, password)){
        navigation.navigate(`${allScreens.mainPage}`, { username: username });
      }
    };
    return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.sectionTitles}>Empower</Text>
          <View style={styles.items}>
            { /* This is where login login buttons will go so that user can put information down + other stuff */ }
            <TextInput style={styles.input} 
                placeholder='Username' 
                onChangeText={(val) => setUsername(val)}
            />
            <TextInput style={styles.input} 
                placeholder='Password'
                onChangeText={(val) => setPassword(val)}
            />
            
            <Button title="Login" onPress={validate}/>
            <Text>{username} and {password}</Text>
            <Button title="FaceId" style={styles.signUp} onPress={onFaceId}></Button>
            <Text>Don't have an account?</Text><Button title = "sign up" style={{fontWeight: 'bold'}}></Button> 
            <Button title="Settings"></Button>

          </View>
      </View>
    </View>
    );
};

export function Signup({navigation}){
    return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.sectionTitles}>Welcome New user</Text>
          <View style={styles.items}>
            { /* This is where login login buttons will go so that user can put information down + other stuff */ }

            
          </View>
      </View>
    </View>
    );
}

export function Home({route, navigation}){
  const { username } = route.params;
  return (
  <View style={styles.container}>
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitles}>Welcome, {username}</Text>
        <View style={styles.items}>

        </View>
    </View>
  </View>
  );
}

