import { styles } from './../userInterface/interface.js';


function validPassword(password){
    let caps = false, lows = false, puncts = false, digs = false;
    [...password].forEach((c) => {
        if(c === '\"' || c === '\'' || c === '/' || c === '\\' || c === ':' || c === ';' || c === ' ')
            return false;

        if(c >= 48 && c <= 57)
            digs = true;
        else if(c >= 65 && c <= 90)
            caps = true;
        else if(c >= 97 && c <= 122)
            lows = true; 
        else
            puncts = true;
    });

    if(digs && caps && lows && puncts && password.length >= 7)
        return true;
    return false;

}

export function setInfo(u, p){
    if(u.length >= 7 && validPassword(p))
        return true;
    return false;
}