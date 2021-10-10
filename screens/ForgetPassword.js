import { NavigationContainer } from '@react-navigation/native';
import React, { Component, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper';
import { BallIndicator } from 'react-native-indicators';
const image = require('../backgroundImage.png');

class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            // hide: true,
            // loading: false
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
                        <View style={{ justifyContent: 'flex-end', paddingRight: 15, paddingTop: 10 }}><TouchableOpacity onPress={(value) => { this.props.navigation.goBack() }}><Text style={{ color: 'orange', fontWeight: 'bold', fontSize: 18 }}>Back</Text></TouchableOpacity></View>
                    </View>
                    {/* CARD */}

                    <View style={{ marginTop: 20, paddingTop: 20, paddingBottom: 20, backgroundColor: '#fff', alignSelf: 'center', borderRadius: 15, width: '90%', multiline: 'true' }}>
                        <View style={{ marginBottom: 10, justifyContent: 'center', alignSelf: 'center' }}>
                            <Image
                                source={image}
                                style={{ height: 100, width: 100 }}
                            />
                        </View>
                        <Text style={{ alignSelf: 'center', marginBottom: 20, fontWeight: 'bold', color: 'orange', fontSize: 18 }}>Sign In</Text>
                        {/* {this.state.loading ? <BallIndicator color='orange' /> :null
        } */}
                        <TextInput
                            label="Email"
                            underlineColor={'transparent'}
                            style={{ width: '90%', color: 'green', alignSelf: 'center', borderWidth: 0.5, borderTopEndRadius: 10, borderTopStartRadius: 10, borderBottomEndRadius: 10, borderBottomStartRadius: 10, backgroundColor: '#fff', borderColor: 'green' }}
                            // right={<TextInput.Icon name="eye" />}
                            onChangeText={(value) => { this.setState({ email: value }); }}
                        />

                        <TouchableOpacity onPress={() => { console.log('send') }}>
                            <View style={{ marginTop: 12, width: '90%', alignSelf: 'center', borderRadius: 10, backgroundColor: 'orange', justifyContent: 'center', height: 60 }}><Text style={{ alignSelf: 'center', fontWeight: 'bold', color: '#fff', fontSize: 15 }}>Send</Text>
                            </View>
                        </TouchableOpacity>

                    </View>


                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('Login') }}>
                        <View style={{ borderColor: 'orange', borderRadius: 12, borderWidth: 2, justifyContent: 'center', width: '55%', marginTop: 40, height: 50, alignSelf: 'center' }}>
                            <Text style={{ color: 'orange', alignSelf: 'center', fontWeight: 'bold' }}>Sign In?</Text>
                        </View>
                    </TouchableOpacity>

                </ScrollView>

            </View>

        );
    }

}

export default ForgetPassword;