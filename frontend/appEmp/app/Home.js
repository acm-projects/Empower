import { StyleSheet, Text, View, Image, Pressable, Button } from "react-native";
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
