import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { BallIndicator } from 'react-native-indicators';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
// const image = require('../backgroundImage.png');
const image = require('../assets/BG-2.jpg');

const logo = require('../assets/logo.png');
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            PhoneNo: '',
            A_ddress: '',
            password: '',
            confirmpassword: '',
            hide: true,
            loading: false,
            micon: 'eye-off'
            // confirmPassword: ''
        }
    }
    icon() {
        console.log('icon')
        if (this.state.micon == 'eye') {
            this.setState({ hide: this.state.hide = true })
            this.setState({ micon: 'eye-off' })
        }

        else {
            this.setState({ hide: this.state.hide = false })
            this.setState({ micon: 'eye' })
        }

    }
    saveData = async () => {
        console.log('API request')
        if (this.state.email == '' || this.state.name == '' || this.state.password == '' || this.state.confirmpassword == '') {
            alert('Complete All Fields');
            return;
        }
        if (this.state.password != this.state.confirmpassword) {
            alert('Password does not match')
        }
        else {
            let formData = new FormData();
            formData.append('name', this.state.name);
            formData.append('email', this.state.email);
            formData.append('phone', this.state.PhoneNo);
            formData.append('address', this.state.A_ddress);
            formData.append('password', this.state.password);
            // formData.append('password', this.state.password);


            this.setState({ loading: true });
            const response = await fetch('https://admin.sndgreens.com/api/register',
                {
                    method: 'POST',
                    body: formData
                }
            );
            const responseJson = await response.json();
            console.log(responseJson);
            if (responseJson.msg == 'User save successfully wait for Admin approved') {
                this.setState({ loading: false });
                // await AsyncStorage.setItem('Address',this.state.A_ddress);

                // console.log("message")
                alert(responseJson.msg);
                this.props.navigation.goBack();
            }
            else {
                this.setState({ loading: false });
                alert('User already Exists')
            }
        }
    }
    render() {

        return (
            <View style={{ flex: 1, }}>
                <Image
                    source={image}
                    style={{ height: '100%', width: '100%', position: 'absolute' }}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 15 }}>
                    <View style={{ justifyContent: 'flex-start',padding:10 }}><TouchableOpacity onPress={(value) => { this.props.navigation.goBack() }}>
                    <Icon name='keyboard-backspace' size={34} color='orange' />

                    </TouchableOpacity></View>
                    {/* <View style={{ justifyContent: 'flex-end', paddingRight: 15, paddingTop: 10 }}><TouchableOpacity onPress={(value) => { this.props.navigation.navigate('Home') }}><Text style={{ color: 'orange', fontWeight: 'bold', fontSize: 18 }}>Skip</Text></TouchableOpacity></View> */}
                </View>
                {/* CARD */}
                <ScrollView>
                    <View style={{ marginTop: 20, paddingTop: 20, paddingBottom: 20, backgroundColor: '#fff', alignSelf: 'center', borderRadius: 15, width: '90%', multiline: 'true' }}>
                        <View style={{ marginBottom: 10, justifyContent: 'center', alignSelf: 'center' }}>
                            <Image
                                source={logo}
                                style={{ height: 100, width: 100 }}
                            />
                        </View>
                        <Text style={{ alignSelf: 'center', marginBottom: 20, fontWeight: 'bold', color: 'orange', fontSize: 18 }}>SIGN UP</Text>

                        <View style={{ marginTop: 10 }} />

                        <TextInput
                            label="Name"
                            underlineColor={'transparent'}
                            style={{ width: '90%', color: 'green', alignSelf: 'center', borderWidth: 0.5, borderTopEndRadius: 10, borderTopStartRadius: 10, borderBottomEndRadius: 10, borderBottomStartRadius: 10, backgroundColor: '#fff', borderColor: 'green' }}
                            // right={<TextInput.Icon name="eye" />}
                            onChangeText={(value) => {
                                this.setState({ name: value });
                            }}
                        />
                        <View style={{ marginTop: 10 }} />
                        <TextInput
                            label="Email"
                            underlineColor={'transparent'}
                            style={{ width: '90%', color: 'green', alignSelf: 'center', borderWidth: 0.5, borderTopEndRadius: 10, borderTopStartRadius: 10, borderBottomEndRadius: 10, borderBottomStartRadius: 10, backgroundColor: '#fff', borderColor: 'green' }}
                            // right={<TextInput.Icon name="eye" />}
                            onChangeText={(value) => {
                                this.setState({ email: value });
                            }}
                        />
                        <View style={{ marginTop: 10 }} />
                        <TextInput
                            label="Phone No."
                            keyboardType={'numeric'}
                            underlineColor={'transparent'}
                            style={{ width: '90%', color: 'green', alignSelf: 'center', borderWidth: 0.5, borderTopEndRadius: 10, borderTopStartRadius: 10, borderBottomEndRadius: 10, borderBottomStartRadius: 10, backgroundColor: '#fff', borderColor: 'green' }}

                            onChangeText={(value) => { this.setState({ PhoneNo: value }) }}
                            theme={{ colors: { label: 'green' } }}
                        />
                        <View style={{ marginTop: 10 }} />
                        <TextInput
                            label="Address"
                            // secureTextEntry={this.state.hide}
                            underlineColor={'transparent'}
                            style={{ width: '90%', color: 'green', alignSelf: 'center', borderWidth: 0.5, borderTopEndRadius: 10, borderTopStartRadius: 10, borderBottomEndRadius: 10, borderBottomStartRadius: 10, backgroundColor: '#fff', borderColor: 'green' }}
                            // right={<TextInput.Icon name={this.state.micon} onPress={() => { this.icon() }} />}
                            onChangeText={(value) => {
                                this.setState({ A_ddress: value });
                            }}
                            theme={{ colors: { label: 'green' } }}
                        />
                    
                        <View style={{ marginTop: 10 }} />
                        <TextInput
                            label="Password"
                            secureTextEntry={this.state.hide}
                            underlineColor={'transparent'}
                            style={{ width: '90%', color: 'green', alignSelf: 'center', borderWidth: 0.5, borderTopEndRadius: 10, borderTopStartRadius: 10, borderBottomEndRadius: 10, borderBottomStartRadius: 10, backgroundColor: '#fff', borderColor: 'green' }}
                            right={<TextInput.Icon name={this.state.micon} onPress={() => { this.icon() }} />}
                            onChangeText={(value) => this.setState({password: value })}
                            theme={{ colors: { label: 'green' } }}
                        />
                        <View style={{ marginTop: 10 }} />
                            <TextInput
                            label=" Confirm Password"
                            secureTextEntry={this.state.hide}
                            underlineColor={'transparent'}
                            style={{ width: '90%', color: 'green', alignSelf: 'center', borderWidth: 0.5, borderTopEndRadius: 10, borderTopStartRadius: 10, borderBottomEndRadius: 10, borderBottomStartRadius: 10, backgroundColor: '#fff', borderColor: 'green' }}
                            right={<TextInput.Icon name={this.state.micon} onPress={() => { this.icon() }} />}
                            onChangeText={(value) => this.setState({ confirmpassword: value })}
                            theme={{ colors: { label: 'green' } }}
                        />
                        {this.state.loading ? <BallIndicator color='orange' /> : null
                        }
                        <TouchableOpacity onPress={() => { this.saveData() }}>
                            <View style={{ marginTop: 12, width: '90%', alignSelf: 'center', borderRadius: 10, backgroundColor: 'orange', justifyContent: 'center', height: 60 }}><Text style={{ alignSelf: 'center', fontWeight: 'bold', color: '#fff', fontSize: 15 }}>Create Account</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </ScrollView>

            </View>
        );
    }
}


export default SignUp;