import { StyleSheet } from 'react-native';

//this will store common patters in the application
const userInterface = {
    backgroundColor: '#292B35',
    loginButtonColor: '#B05555',
    inputs: '#EDD0D0',
    textColor: '#fff',
    textShadowColor: 'black',
    fontFamily: 'Poppins'
}
/* 
All items with values that come from user interface are values that will be changed when the color blind
mode is switched to true
*/

//values are going to be definef here amd it will define the values that will be returned to be utilized in App.js
const color = {
    textColor: 'red'
}

const container = {
    flex: 1,
    backgroundColor: userInterface.backgroundColor,
}

const wrapper = {
    paddingTop: 80,
    paddingHorizontal: 20,
}

const sectionTitles = {
    fontSize: 24,
    fontWeight: 'bold',
    color: userInterface.textColor,
    textShadowColor: userInterface.textShadowColor,
    alignSelf: 'center',
    fontStyle: userInterface.fontFamily
}

const items = {
    loginButtonColor: userInterface.loginButtonColor,
    inputs: userInterface.inputs,
    paddingTop:150
}

const input = {
    alignSelf: 'center',
    borderColor: '2 #fff',
    borderWidth: 2,
    padding: 8,
    margin: 10,
    width: 300,
    backgroundColor: '#fffd',
    fontStyle: userInterface.fontFamily
}

const buttons = {
    display: 'flex',
    alignSelf: 'center',
}

const homeWrapper = {
    paddingTop: 40,
    paddingHorizontal: 20,
}

const homeInterface = {
    fontSize: 24,
    fontWeight: 'bold',
    color: userInterface.textColor,
    textShadowColor: userInterface.textShadowColor,
    alignSelf: 'left', 
    display: 'fit-screen'
}

const warningText = {
    fontSize: 10,
    color: '#fc1303',
    alignSelf: 'center', 
    display: 'fit-screen',
    fontStyle: userInterface.fontFamily
}

const signUp = {
    paddingTop: 70
}

//using '.' because some elements are going to change in accordance to if the user is colorblin
//or needs a different color scheme to look at the app
export const styles = StyleSheet.create({
    container: {
      flex: container.flex,
      backgroundColor: container.backgroundColor
    },
  
    wrapper: {
      paddingTop: wrapper.paddingTop,
      paddingHorizontal: wrapper.paddingHorizontal,
    },
  
    sectionTitles: {
      fontSize: sectionTitles.fontSize,
      fontWeight: sectionTitles.fontWeight,
      color: sectionTitles.textColor,
      textShadowColor: sectionTitles.textShadowColor,
      alignSelf: sectionTitles.alignSelf
    },
  
    items: {
      loginButtonColor: items.loginButtonColor,
      inputs: items.inputs,
      paddingTop:items.paddingTop
    },
  
    input: {
      alignSelf: input.alignSelf,
      borderColor: input.borderColor,
      borderWidth: input.borderWidth,
      padding: input.padding,
      margin: input.margin,
      width: input.width,
      backgroundColor: input.backgroundColor,
    },
    
    buttons: {
      display: buttons.display,
      alignSelf: buttons.alignSelf,
    },

    homeWrapper: {
        paddingTop: homeWrapper.paddingTop,
        paddingHorizontal: homeWrapper.paddingHorizontal
    },

    homeInterface: {
        fontSize: homeInterface.fontSize,
        fontWeight: homeInterface.fontWeight,
        color: homeInterface.textColor,
        textShadowColor: homeInterface.textShadowColor,
        alignSelf: homeInterface.alignSelf, 
        display: homeInterface.display
    },

    warningText: {
        fontSize: warningText.fontSize,
        color: warningText.color,
        alignSelf: warningText.alignSelf,
        display: warningText.display,
        fontStyle: warningText.fontStyle
    },

    signUp: {
        paddin: signUp.paddingTop
    }
});