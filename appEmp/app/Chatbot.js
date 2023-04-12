import React, {useState} from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, KeyboardAvoidingView, TextInput} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { globalElements } from './../ui/globalUI.js';

let userInput;

const Chatbot = () => {

  const [userinput, setUserninput] = useState('ASK AWAY!!!');
    return(
        <LinearGradient
        colors={[globalElements.index0, globalElements.index1, globalElements.index2]}
        style={chatbot.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        >
        <KeyboardAvoidingView>
          <Pressable style={chatbot.back}>
              <Text>This needs to go  back</Text>
          </Pressable>
          <View>
            <ScrollView style={chatbot.textArea}>
              
            </ScrollView>
            <View>

            </View>
          </View>
        </KeyboardAvoidingView>
        </LinearGradient>
    );
}

const chatbot = StyleSheet.create({
  container: {
    flex: 1,
    padding: 100,
  },
  textArea: {
    backgroundColor: '#5A7193',
    height : 600,
    width: 400,
    alignSelf: 'center',
    borderRadius: 10
  }
      
});

export default Chatbot;