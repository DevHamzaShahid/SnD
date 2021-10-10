import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown';
export default function DropDown(props) {

    return (
        <View style={{}}>

            <ModalDropdown
                style={{ paddingLeft: 30, justifyContent: 'center', borderColor: 'green', borderWidth: props.Borderwidth, borderRadius: 10, width: props.width, height: 48 }}
                isFullWidth={true}
                showsVerticalScrollIndicator={false}
                dropdownTextStyle={{ fontSize: 15, color: 'green', borderColor: 'green', borderWidth: 0.3 }}
                defaultValue={props.DefaultPlaceHolder}
                textStyle={{ fontSize: 15, color: 'green' }}
                onSelect={props.onSelect}
                options={props.options} />
        </View>
    );
}