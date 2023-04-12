import { config } from 'dotenv';

//import { userInput } from './../appEmp/app/Chatbot.js';
config();


import {Configuration, OpenAIApi} from 'openai';

//gives access to the open api
const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.API_KEY
}))

openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: "What is the definition of a triple integral, and show one example"}]
}).then(res => {
    console.log(res.data.choices[0].message.content);
    const chatbotResponse = res.data.choices[0].message.content;
});