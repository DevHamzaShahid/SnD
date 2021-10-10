import { NavigationContainer } from '@react-navigation/native';
import React, { Component, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper';
import { BallIndicator } from 'react-native-indicators';
import { connect } from 'react-redux';
import { login } from '../container/actions/login'
import AsyncStorage from '@react-native-community/async-storage';
// const image = require('../backgroundImage.png');
const logo = require('../assets/logo.png')
const image = require('../assets/BG-2.jpg');

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            hide: true,
            loading: false,
            micon: 'eye-off',
            userData: '',
            userId: ''
        }
    }
    icon() {
        if (this.state.micon == 'eye') {
            this.setState({ hide: this.state.hide = true })
            this.setState({ micon: 'eye-off' })
        }

        else {
            this.setState({ hide: this.state.hide = false })
            this.setState({ micon: 'eye' })
        }
    }
    // checkUser = async () => {
    //     var user = await AsyncStorage.getItem('userData');
    //     console.log(user);
    // }
    saveData = async () => {
        console.log('API request')
        if (this.state.email == '' || this.state.password == '') {
            alert('Complete All Fields');
            return;
        }
        let formData = new FormData();
        formData.append('email', this.state.email);
        formData.append('password', this.state.password);

        this.setState({ loading: true });
        const response = await fetch('https://duaacollection.com/b2b/api/login',
            {
                method: 'POST',
                body: formData
            }
        );
        const responseJson = await response.json();
        if (responseJson.status == 'success') {
            // console.log(this.state.id)
            AsyncStorage.setItem('userData', JSON.stringify(responseJson.user));

            this.setState({ loading: false });
            this.props.navigation.navigate('Home');
        }
        else {
            this.setState({ loading: false });
            alert('enter valid email or password')
        }
    }
    // componentDidMount() {
    //     this.checkUser();
    // }
    // Login = async () => {
    //     // if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    //     if (!this.state.email) {
    //         alert('Please enter a email');
    //     } else if (!this.state.password) {
    //         alert('Please enter a password');
    //     } else {
    //         this.setState({ loading: true })
    //         this.props.login(this.state.email, this.state.password).then(
    //             data => {
    //                 this.setState({ loading: false })
    //             },
    //             error => {
    //                 this.setState({ loading: false })
    //                 alert(error);
    //             },
    //         );
    //     }
    // };

    componentDidUpdate(prevProps) {
        if (this.props.auth != prevProps.auth) {
            // console.log('auth',this.props.auth)
            // console.log('prevauth',prevProps.auth)
            this.CheckUser();
        }
    }

    CheckUser() {

        if (this.props.auth && this.props.auth.status == 'success') {
            // console.log('navigate', this.props);
            this.props.navigation.goBack();
        }
        else {
            alert(this.props.auth[0].message)
        }
    }

    render() {

        return (
            <View style={{ flex: 1, }}>
                <Image
                    source={image}
                    style={{ height: '100%', width: '100%', position: 'absolute' }}
                />
                <ScrollView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 80, paddingRight: 15 }}>
                        <View style={{ justifyContent: 'flex-start' }}></View>
                        <View style={{ justifyContent: 'flex-end', paddingRight: 15, paddingTop: 10 }}><TouchableOpacity onPress={(value) => { this.props.navigation.navigate('Home') }}><Text style={{ color: 'orange', fontWeight: 'bold', fontSize: 18 }}>Skip</Text></TouchableOpacity></View>
                    </View>
                    {/* CARD */}

                    <View style={{ marginTop: 20, paddingTop: 20, paddingBottom: 20, backgroundColor: '#fff', alignSelf: 'center', borderRadius: 15, width: '90%', multiline: 'true' }}>
                        <View style={{ marginBottom: 10, justifyContent: 'center', alignSelf: 'center' }}>
                            <Image
                                source={logo}
                                style={{ height: 100, width: 100 }}
                            />
                        </View>
                        <Text style={{ alignSelf: 'center', marginBottom: 20, fontWeight: 'bold', color: 'orange', fontSize: 18 }}>Sign In</Text>

                        <TextInput
                            label="Email"
                            underlineColor={'transparent'}
                            style={{ width: '90%', color: 'green', alignSelf: 'center', borderWidth: 0.5, borderTopEndRadius: 10, borderTopStartRadius: 10, borderBottomEndRadius: 10, borderBottomStartRadius: 10, backgroundColor: '#fff', borderColor: 'green' }}
                            // right={<TextInput.Icon name="eye" />}
                            onChangeText={(value) => { this.setState({ email: value }); }}
                        />
                        <View style={{ marginTop: 10 }} />
                        <TextInput
                            label="Password"
                            secureTextEntry={this.state.hide}
                            underlineColor={'transparent'}
                            style={{ width: '90%', color: 'green', alignSelf: 'center', borderWidth: 0.5, borderTopEndRadius: 10, borderTopStartRadius: 10, borderBottomEndRadius: 10, borderBottomStartRadius: 10, backgroundColor: '#fff', borderColor: 'green' }}
                            right={<TextInput.Icon name={this.state.micon} onPress={() => { this.icon() }} />}
                            onChangeText={(value) => { this.setState({ password: value }); }}
                            theme={{ colors: { label: 'green' } }}
                        />
                        {this.state.loading ? <BallIndicator color='orange' /> : null
                        }
                        <TouchableOpacity onPress={() => { this.saveData() }}>
                            <View style={{ marginTop: 12, width: '90%', alignSelf: 'center', borderRadius: 10, backgroundColor: 'orange', justifyContent: 'center', height: 60 }}><Text style={{ alignSelf: 'center', fontWeight: 'bold', color: '#fff', fontSize: 15 }}>Login</Text>
                            </View>
                        </TouchableOpacity>


                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ justifyContent: 'flex-start' }}></View>
                            <View style={{ justifyContent: 'flex-end', paddingRight: 15, paddingTop: 10 }}>
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate('ForgetPassword') }}>
                                    <Text style={{ color: 'orange', fontWeight: 'bold' }}>Forget password?</Text>

                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>


                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('SignUp') }}>
                        <View style={{ borderColor: 'orange', borderRadius: 12, borderWidth: 2, justifyContent: 'center', width: '55%', marginTop: 40, height: 50, alignSelf: 'center' }}>
                            <Text style={{ color: 'orange', alignSelf: 'center', fontWeight: 'bold' }}>New to the app?</Text>
                        </View>
                    </TouchableOpacity>

                </ScrollView>

            </View>

        );
    }

}

const mapStateToProps = state => {
    const { loginSuccess, auth, loading } = state.login;
    return { loginSuccess, loading, auth };
};

const mapDispatchToProps = {
    login,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);