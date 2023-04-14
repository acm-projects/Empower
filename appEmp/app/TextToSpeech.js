import React, { useState } from 'react';
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

export default TextToSpeech;

/*import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, TextInput } from 'react-native';
import * as Speech from 'expo-speech';
import React from 'react';



export default function TextToSpeech() {
  const [name, setName] = React.useState("placeholder");


  const listAllVoiceOptions = async () => {
    let voices = await Speech.getAvailableVoicesAsync();
    console.log(voices);
  };

  React.useEffect(listAllVoiceOptions);


  const speakGreeting = () => {
      const greeting = `Hi ${name}`;
      const options = {
        voice: "com.apple.speech.synthesis.voice.Fred",
        pitch: 1.5,
        rate: 0.7
      };
      Speech.speak(greeting, options, name)
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} onChangeText={(val) => setName(val)} autoCapitalize="none"/>
      <Button title="Speak" onPress={speakGreeting} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    alignSelf: 'stretch',
    height: 20,
    borderBottomWidth: 2,
    borderBottomColor: "red",
    margin: 8
  }
});*/