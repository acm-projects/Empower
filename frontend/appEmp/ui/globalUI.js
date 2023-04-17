import { colorBlindMode } from "./../app/Home.js";



const globalElements = {
    index0: '#8f3289', 
    index1: '#562878', 
    index2: '#38328f'
};

if(colorBlindMode){
    globalElements.index0 = '#8f3289';
    globalElements.index1 = '#562878';
    globalElements.index2 = '#38328f';
}else{
    globalElements.index0 = '#8AA9DC';
    globalElements.index1 = '#FF8EBD';
    globalElements.index2 = '#C3FFAD';
}


export {globalElements};