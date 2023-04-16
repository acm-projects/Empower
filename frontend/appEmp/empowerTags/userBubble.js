import { View, Text} from 'react-native';
import React from 'react';

const UserBubble = ({text}) => {
    console.log(text);
    return (
        <View style={{
        alignSelf: 'center',
        flex: 'row',
        backgroundColor: '#fff',
        height: 30,
        width: '70%',
        alignContent: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 10}}>
            <Text>{text}</Text>
        </View>
    );
}

export default UserBubble;