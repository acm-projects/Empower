
# Empower
People use technology every day to help them with tasks and it has become an integral part of life now. There are constantly new and exciting tools and advancements that help people in their day-to-day lives from the best planning and note-taking apps to the most efficient search engines, and complicated software that enables you to create whatever you can imagine. But all of these don’t matter to people who can’t access them. Empower is an app that allows people with disabilities to turn their phones into their most powerful too. With AI and modern technologies, we can help people with disabilities access information easier, navigate smartphones efficiently, and get insights into the world around them. 

## MVP

 - Speech-to-text function that allows users to talk to the app, where
   the resulting words are input into different fields
- Text-to-speech function to help communicate information to the user
- Chatbot to help answer a general range of questions, similar to OpenAI’s ChatGPT
- Help the Empower user connect to people around them.

## Stretch Goals
- Use facial detection with the camera to allow the user to move a cursor around the screen with either head or eye movements.
- Object detection and description with the camera


## Schedule
### Introduction

 1. Install basic components (VS Code, Git, etc.)
 2. Finalize the tech stack.
	 - AWS should stay, but things like React Native vs. Flutter may turn out differently.
	 - Once finalized, install necessary components like React Native.
Lay out the MVP and stretch goals.

### Frontend
1. Get Figma and begin wireframing based on the MVP and stretch goals we laid out.
	- To start this, create a user login page and home page, and make sure that the transition between those makes sense.
2. Begin adding further functionality, like the speech-to-text and the text-to-speech areas.
	- Create a page that can record audio and show the generated text. 

### Backend

1. Learn how to use Transcribe, Polly, and S3. In particular, learn how S3 can be integrated with React.
	- AWS accounts need to be set up here.
2. Set up a user login, storing the user information in a secure database like S3.
3. Create the functions to convert a text file into an audio file using Polly, and vice versa using Transcribe.

### Integration & Ending
1. Begin integration of the front-end and back-end.
	- Link up the user login page so that it can take people to the home screen on their account.
	- Trigger the Transcribe function from speech and display the transcribed text.
	- Trigger the Polly function from text and generate a downloadable audio file.

### Presentation
- Start working on the presentation about a month before presentation night.
- Prepare a live demo if possible. Most things are being done through AWS, so it should be relatively easy to live demo.

## Tech Stack

### IDE
- We will be using [Visual Studio Code](https://code.visualstudio.com/download). This is because it is a very common and relatively lightweight text editor, and has easy integration with Git.
### Version Control
- Since projects are hosted on GitHub, we will be using [Git](https://git-scm.com/).
### Front-end
- [Figma](https://www.figma.com/)
	- Figma will be used for wireframing.
	- [Tutorial for Figma](https://www.youtube.com/watch?v=II-6dDzc-80)
- React Native
	- The end goal seems most doable with a mobile app, and React Native allows for the most versatility when creating a mobile app. It is more complicated than Flutter, but it is very powerful.
	- [Tutorial for React Native] (https://www.youtube.com/watch?v=0-S5a0eXPoc)
		
### Back-end
- React Native
- DynamoDB (In continuation with the AWS approach)

### APIs
- Amazon Transcribe (AWS)
	- The speech-to-text function of Empower can be done through Amazon Transcribe. With the AWS Free Tier, 60 minutes can be transcribed per month. Given how most test videos will be between 1-2 minutes, this allows at least 30 attempts at transcribing audio files per month. Further costs are not large; a minute of audio would cost around three cents.
- Amazon Polly (AWS)
	- Text-to-speech can be done with Amazon Polly, another product of AWS. It has the ability to produce natural-sounding human speech from text.
- Amazon S3 (AWS)
	- Transcribe and Polly rely on S3 to store audio and text files, so S3 will be used to store audio and text data.
- Amazon CloudFront (AWS)
	- CloudFront can be used to quickly retrieve files from S3 and deliver them to the app for use.
- ChatGPT (OpenAI)
	- This is for the general-purpose chatbot. 


## Software to Install
- Figma (If a desktop app is easier)
- React Native
- Git
- VS Code
- Node.js

## Competition/"""INSPIRATION"""
1. Speech Assistant AAC
	- TTS app for the speech-impaired. The biggest feature is that common phrases and categories can be placed on buttons.

2. Dragon
	- This is an incredibly strong competitor. Its speech-to-text capabilities are incredibly strong, as it is able to learn the user’s voice and adapt as necessary.

3. Built-in dictation apps
	- This is a general field for things like Google Docs speech-to-text, Apple Dictation, Windows Dictation, etc.


