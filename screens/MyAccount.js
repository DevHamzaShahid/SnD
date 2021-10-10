import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, ImageBackground, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-community/async-storage';
const image = require('../assets/BG-2.jpg');
class MyAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone_number: '',
            address: '',
            email: '',
            name: '',
        }
    }
    async getUser() {
        var g = await AsyncStorage.getItem('Phone');
        //     this.setState({phone_number:g})
        let formData = new FormData();
        formData.append('phone_number', g);
        let response = await fetch('https://admin.sndgreens.com/api/accountdetail', {
            method: 'POST',
            body: formData
        });
        let responseJson = await response.json();
        console.log(JSON.stringify(responseJson))
        this.setState({
            loading: false,
            phone_number: responseJson.customer_phone,
            address: responseJson.customer_address,
            email: responseJson.customer_email,
            name: responseJson.customer_name,
            // phone_number: responseJson
        });
    }
    componentDidMount() {
        this.getUser()
    }
    render() {
        return (
            <ScrollView>
                <View style={{ height: Dimensions.get('window').height, flex: 1, alignItems: 'center', alignContent: 'center' }}>
                    <Image
                        source={image}
                        style={{ height: '100%', width: '100%', position: 'absolute' }}
                    />
                    <View style={{ backgroundColor: '#84c708', width: '100%', height: 70 }}>

                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                            <View style={{ padding: 20, justifyContent: 'flex-start' }}><Icon name='keyboard-backspace' size={28} color='#fff' onPress={() => { this.props.navigation.goBack() }} /></View>
                            <Text style={{ color: '#fff', fontSize: 20 }}>My Account</Text>
                            <View style={{ padding: 20, justifyContent: 'flex-end' }}></View>
                        </View>

                    </View>

                    <View style={{ marginTop: 20, marginBottom: 20, paddingBottom: 20, backgroundColor: '#fff', width: '90%', alignSelf: 'center', borderRadius: 10 }}>
                        <Text style={{ paddingLeft: 14, paddingRight: 14, fontSize: 15, marginTop: 20 }}>Full Name</Text>
                        <Text style={{ paddingLeft: 14, paddingRight: 14, fontSize: 17, color: 'gray' }}>{this.state.name}</Text>
                        <Text style={{ paddingLeft: 14, paddingRight: 14, fontSize: 15, marginTop: 20 }}>Email</Text>
                        <Text style={{ paddingLeft: 14, paddingRight: 14, fontSize: 17, color: 'gray' }}>{this.state.email}</Text>
                        <Text style={{ paddingLeft: 14, paddingRight: 14, fontSize: 15, marginTop: 20 }}>Phone Number</Text>
                        <Text style={{ paddingLeft: 14, paddingRight: 14, fontSize: 17, color: 'gray' }}>{this.state.phone_number}</Text>
                        <Text style={{ paddingLeft: 14, paddingRight: 14, fontSize: 15, marginTop: 20 }}>Address</Text>
                        <Text style={{ paddingLeft: 14, paddingRight: 14, fontSize: 15, marginTop: 20 }}>{this.state.address}</Text>

                        {/* 
                        <TextInput
                            style={{ fontSize: 17, alignSelf: 'center', paddingLeft: 15, paddingRight: 15, borderWidth: 1, borderRadius: 14, width: '95%', marginTop: 5, color: 'black' }}
                            onChangeText={(value) => { console.log(value) }}
                            multiline={true}
                            placeholderTextColor={'gray'}
                            placeholder="Street"

                        /> */}
                        {/* <Text style={{ paddingLeft: 14, paddingRight: 14, fontSize: 15, marginTop: 20 }}>City/Country</Text>
                        <Text style={{ paddingLeft: 14, paddingRight: 14, fontSize: 17, color: 'gray' }}>AbC/XYZ</Text> */}
                        {/* <Text style={{ paddingLeft: 14, paddingRight: 14, fontSize: 15, marginTop: 20 }}>Alternative Address</Text>
                        <TextInput
                            style={{ fontSize: 17, alignSelf: 'center', paddingLeft: 15, paddingRight: 15, borderWidth: 1, borderRadius: 14, width: '95%', marginTop: 5, color: 'black' }}
                            onChangeText={(value) => { console.log(value) }}
                            multiline={true}
                            placeholderTextColor={'gray'}
                            placeholder="Street"
                        />
                        <Text style={{ paddingLeft: 14, paddingRight: 14, fontSize: 15, marginTop: 20 }}>City/Country</Text>
                        <Text style={{ paddingLeft: 14, paddingRight: 14, fontSize: 17, color: 'gray' }}>AbC/XYZ</Text> */}
                        {/* 
                        <View style={{ backgroundColor: 'orange', width: '95%', height: 50, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 14, marginTop: 20 }}><Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>Reset Password</Text></View>

                        <View style={{ backgroundColor: '#fff', width: '95%', height: 50, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 14, borderWidth: 1, borderColor: 'orange', marginTop: 20 }}><Text style={{ fontSize: 16, color: 'orange', fontWeight: 'bold' }}>Logout</Text></View> */}

                    </View>

                </View>

            </ScrollView>

        );
    }
}

export default MyAccount;