import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "./app/SignIn";
import Home from "./app/Home";
import Social from "./app/Social";
import TextToSpeech from "./app/TextToSpeech";
import Chatbot from "./app/Chatbot";
import Signup from "./app/Signup";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="signIn" component={SignIn} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Social" component={Social} />
        <Stack.Screen name="TextToSpeech" component={TextToSpeech} />
        <Stack.Screen name="Chatbot" component={Chatbot} />
        <Stack.Screen name="SignUp" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
