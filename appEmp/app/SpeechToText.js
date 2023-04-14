

/*import React, { useState } from 'react';
import { Text, View, Button } from 'react-native';
import * as SpeechRecognition from 'expo-speech-recognition';

const SpeechToText = () => {
  const [text, setText] = useState('');

  const startRecognition = async () => {
    try {
      await SpeechRecognition.requestPermissionsAsync();
      await SpeechRecognition.startListeningAsync(result => {
        setText(result.transcription);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const stopRecognition = async () => {
    try {
      await SpeechRecognition.stopListeningAsync();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text>{text}</Text>
      <Button title="Start" onPress={startRecognition} />
      <Button title="Stop" onPress={stopRecognition} />
    </View>
  );
};

export default SpeechToText;*/