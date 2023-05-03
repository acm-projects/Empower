import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, View, Button } from "react-native";
import axios from "axios";
import { Audio } from "expo-av";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { globalElements } from "../ui/globalUI.js";
import * as FileSystem from 'expo-file-system';


const SpeechToText = ({navigation}) => {  
  const [transcriptionResult, setTranscriptionResult] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);

  
  const handleTranscription = async (uri) => {
    const formData = new FormData();
    formData.append("myFile", {
      uri,
      name: "recording.wav",
      type: "audio/wav",
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/transcribe/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setTranscriptionResult(response.data.results.transcripts[0].transcript);
      
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      
      const recording = new Audio.Recording();

      await recording.prepareToRecordAsync({
        android: {
          extension: '.mp3',
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MP3,
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AMR_WB,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
        },
        ios: {
          extension: '.wav',
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
      });
      await recording.startAsync();
      setRecording(recording);
      setIsRecording(true);
    } catch (error) {
      console.error(error);
    }
  };

  const stopRecording = async (uri) => {
    setIsRecording(false);
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      handleTranscription(uri);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <LinearGradient
      colors={[globalElements.index0, globalElements.index1, globalElements.index2]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
    
    <Button title="Back" onPress={() => navigation.goBack()}/>
    <Text style={styles.present}>Speech-To-Text</Text>
    <View>
      {transcriptionResult? (
        <Text style={styles.result}>{transcriptionResult}</Text>
      ): (<Text style={styles.instructions}>Press the Microphone to Start recording</Text>)}
    </View>
    <View style={styles.biggerBox}>
      <View style={styles.smallerBox}>

      </View>
    </View>
      <TouchableOpacity
        onPressIn={startRecording}
        onPressOut={stopRecording}
        style={styles.button}
      >
        <FontAwesome name={isRecording ? "stop" : "microphone"} size={50} color="white" />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  button: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FF0000",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },result: {
    color: "#fff",
    fontSize: 20,
    marginTop: 20,
    textAlign: "center",
  },
  instructions: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
  },
  present: {
    color: "#fff",
    fontSize: 20,
    marginTop: 20,
    textAlign: "center",
    fontWeight: "bold"
  },
  biggerBox: {
    height:410,
    width: 310,
    backgroundColor: "white",
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center"
  },
  smallerBox: {
    height: 400,
    width: 300,
    backgroundColor: "black",
    alignSelf: "center"
  }
});

export default SpeechToText;