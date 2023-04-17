import { useContext } from 'react';
import {Button} from 'react-native'
import globalElements from './globalUI';

function ToggleButton() {

  return (
    <Button onClick={handleClick} title='Toggle Global Elements'/>
  );
}

export default ToggleButton;