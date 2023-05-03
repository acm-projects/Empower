import React, { useState } from "react";
import { Text, TextInput, View, Button, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { globalElements } from "../ui/globalUI.js";
import axios from "axios";
import { Audio } from "expo-av";

const TextToSpeech = ({ navigation }) => {
  const [text, setText] = useState("");

  const handleSpeak = async () => {
    try{
      const response = await axios.post("http://localhost:3000/polly", {text});
      const audio = new Audio.Sound();
      const url = response.data;

      const audioBlob = new Blob([url], {type: "audio/mpeg"});
      const audioURL = URL.createObjectURL(audioBlob);
      
      await audio.loadAsync({uri: audioURL}, {shouldCorrectPitch: true});
      await audio.playAsync();


    }catch(error){
      console.error(error);
    }
  }

  return (
    <LinearGradient
      colors={[
        globalElements.index0,
        globalElements.index1,
        globalElements.index2,
      ]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
      <View style={styles.main}>
        <Text style={styles.title}>Text To Speech</Text>
        <TextInput
          style={styles.input}
          onChangeText={setText}
          value={text}
          placeholder="Enter Text Here"
          placeholderTextColor="#fff"
        />
        <Button title="Speak" onPress={() => handleSpeak()} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
  main: {
    maxWidth: 960,
    alignContent: "center",
    alignSelf: "center",
    paddingTop: 100,
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 50,
  },
  input: {
    alignSelf: "center",
    borderColor: "#fff",
    borderWidth: 2,
    padding: 12,
    margin: 10,
    width: 350,
    color: "#fff",
    backgroundColor: "transparent",
    borderRadius: 30,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  }
});

export default TextToSpeech;