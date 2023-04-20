import { View, Text, StyleSheet, Button } from "react-native";
import React, { useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { globalElements } from "../ui/globalUI.js";
import { useRouter } from "expo-router";

const Chatbot = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const router = useRouter();

  const KEY = "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";

  const handleSend = async (newMessage = []) => {
    try {
      //Get the user's message
      const userMessage = newMessage[0];

      //Add the user's message to the message state
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, userMessage)
      );
      const messageText = userMessage.text.toLowerCase();
      const response = await axios.post(
        "https://api.openai.com/v1/engines/text-davinci-003/completions",
        {
          prompt: newMessage[0].text,
          max_tokens: 1200,
          temperature: 0.2,
          n: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${KEY}`,
          },
        }
      );
      console.log(response.data);

      const answer = response.data.choices[0].text.trim();
      const botMessage = {
        _id: new Date().getTime() + 1,
        text: answer,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "chatbot",
        },
      };

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, botMessage)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LinearGradient
      colors={[
        globalElements.index0,
        globalElements.index1,
        globalElements.index2,
      ]}
      style={chatbot.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <View
        style={{
          backgroundColor: "#F5F5F5",
          padding: 30,
          alignItems: "center",
          justifyContent: "center",
          borderBottomWidth: 40,
          marginTop: 5,
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
          }}
        >
          CHATBOT
        </Text>
        <Button
          title="Back"
          onPress={() => navigation.goBack()}
          style={{ alignSelf: "left" }}
        />
      </View>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => handleSend(newMessages)}
        user={{
          _id: 1,
          name: "user",
        }}
        style={{ paddingBottom: 100 }}
      />
    </LinearGradient>
  );
};

const chatbot = StyleSheet.create({
  container: {
    flex: 1,
  },
  textArea: {
    backgroundColor: "#5A7193",
    height: 600,
    width: 400,
    alignSelf: "center",
    borderRadius: 10,
  },
});

export default Chatbot;
