import React from 'react';
import { View, Text } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function TitleInput(props) {

    return (
        <View style={{ paddingLeft: 14, paddingRight: 14 }}>
            <Text
                style={{ color: '#000000', fontSize: 15, paddingLeft: 2, paddingBottom: 7 }}
            >{props.title}</Text>
            <Input
                containerStyle={{ paddingLeft: 1 }}
                multiline={props.multiline}
                placeholder={props.placeholder}
                // placeholder={props.title}
                keyboardType={props.keyboardType ? props.keyboardType : 'default'}
                editable={props.disabled !== true}
                // placeholderTextColor={'#1a75bc'}
                // floatingPlaceholder
                maxLength={100}
                secureTextEntry={props.secureTextEntry ? props.secureTextEntry : false}
                onChangeText={text => console.log(text)}//props.onChangeText(text)
                onFocus={() => {
                    props.onFocus ? props.onFocus() : null;
                }}
                inputStyle={{
                    fontSize: wp('3.7%'),
                    color: '#000000',
                }}
                inputContainerStyle={{
                    height: props.multiline ? 'auto' : hp('5.9%'),
                    width: '100%',
                    borderWidth: 1,
                    borderRadius: 10,
                }}
            />
        </View>
    );
}