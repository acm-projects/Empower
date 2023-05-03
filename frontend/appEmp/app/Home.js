/*import { StyleSheet, Text, View, Image, Pressable, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useContext } from "react";
import { useRouter, useSearchParams, Link } from "expo-router";
import { globalElements } from "../ui/globalUI.js";
import { StatusBar } from "expo-status-bar";

const Home = ({ navigation }) => {
  const router = useRouter();

  function handleClick() {
    setGlobalElements({
      index0: index0 === "#8f3289" ? "#8AA9DC" : "#8f3289",
      index1: index1 === "#562878" ? "#FF8EBD" : "#562878",
      index2: index2 === "#38328f" ? "#C3FFAD" : "#38328f",
    });
  }

  return (
    <LinearGradient
      colors={[
        globalElements.index0,
        globalElements.index1,
        globalElements.index2,
      ]}
      style={homePage.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <Button title="Color blind mode" onPress={handleClick} />
      <View style={homePage.topContainer}>
        <View>
          <Image
            source={require("../assets/anon.png")}
            resizeMode="contain"
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              marginBottom: 10,
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            position: "absolute",
            paddingLeft: 40,
            marginLeft: 50,
            color: "white",
          }}
        >
          Welcome!
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "white",
          height: 3,
          width: 450,
          alignSelf: "center",
        }}
      ></View>
      <View style={homePage.main}>
        <Pressable
          style={homePage.buttons}
          onPress={() => navigation.navigate("Social")}
        >
          <Text style={homePage.subtitle}>Social</Text>
        </Pressable>

        <Pressable
          style={homePage.buttons}
          onPress={() => navigation.navigate("TextToSpeech")}
        >
          <Text style={homePage.subtitle}>Text-To-Speech</Text>
        </Pressable>

        <Pressable
          style={homePage.buttons}
          onPress={() => navigation.navigate("Chatbot")}
        >
          <Text style={homePage.subtitle}>Chatbot</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

const homePage = StyleSheet.create({
  container: {
    flex: 1,
    padding: 60,
  },
  main: {
    maxWidth: 960,
    alignContent: "center",
    alignSelf: "center",
    paddingTop: 100,
    justifyContent: "space-around",
    height: 500,
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    borderBottomWidth: 1,
  },
  buttons: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: "#e2caf1",
    height: 60,
  },
});

export default Home;

//e2caf1

//text
//dark gray
*/

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";

import background from "../assets/homeBack3.jpeg";
import { LinearGradient } from "expo-linear-gradient";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.backgroundImage}
      ></ImageBackground>
      <View style={styles.contentContainer}>
        <LinearGradient
          colors={["#FFC0CB", "#4c00b0"]}
          style={styles.contentContainer}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("TextToSpeech");
              }}
            >
              <Text style={styles.buttonText}>Text to Speech</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("Chatbot");
              }}
            >
              <Text style={styles.buttonText}>Chatbot</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("Social");
              }}
            >
              <Text style={styles.buttonText}>Social</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("SpeechToText");
              }}
            >
              <Text style={styles.buttonText}>Speech To Text</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#170E49",
  },
  button: {
    width: "70%",
    backgroundColor: "#4c00b0",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 60,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: -40,
    borderBottomRightRadius: -40,
    marginLeft: -35,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#4c00b0",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 0,
    borderWidth: 0,
    overflow: "hidden",
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 70,
  },
});

export default HomeScreen;
