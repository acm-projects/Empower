import React, { useState } from 'react';
import { Text, TextInput, View, Button, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Speech from 'expo-speech';
import {useRouter} from 'expo-router'
import { globalElements } from '../ui/globalUI.js';

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const router = useRouter();

  const speak = () => {
    Speech.speak(text, { language: 'en' });
  };

  return (
    <LinearGradient
      colors={[globalElements.index0, globalElements.index1, globalElements.index2]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      >
        <Button title="Back" onPress={()=>router.back()} style={{alignSelf: 'left'}}/>
        <View style={styles.main}>
          <Text style={styles.title}>Text To Speech</Text>
          <TextInput
          style={styles.input}
          onChangeText={setText}
          value={text}
          placeholder="Enter Text Here"
          placeholderTextColor="#fff"
          />
          <Button title="Speak" onPress={speak} />
        </View>
      </LinearGradient>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
  main: {
    maxWidth: 960,
    alignContent: 'center',
    alignSelf: 'center',
    paddingTop: 100,
    backgroundColor: 'transparent'
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 50,
  },
  input: {
    alignSelf: 'center',
    borderColor: '#fff',
    borderWidth: 2,
    padding: 12,
    margin: 10,
    width: 350,
    color: "#fff",
    backgroundColor: 'transparent',
    borderRadius: 30,
  }
});

export default TextToSpeech;

/*import React, { useState } from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import * as Speech from 'expo-speech';

const TextToSpeech = () => {
  const [text, setText] = useState('');

  const speak = () => {
    Speech.speak(text, { language: 'en' });
  };

  return (
    <View>
      <TextInput
        style={{ height: '50%', borderColor: 'gray', borderWidth: 1 }}
        onChangeText={setText}
        value={text}
      />
      <Button title="Speak" onPress={speak} />
    </View>
  );
};
*/