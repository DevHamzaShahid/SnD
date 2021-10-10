import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import Title from '../components/Title';
import { TextInput } from 'react-native-paper';
import DropDown from '../components/Dropdown';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { BallIndicator } from 'react-native-indicators';
const logo = require('../assets/logo.png');

// const image = require('../backgroundImage.png');
class AddressInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Current_location: '',
            Phone: '',
            loading: false
            // Address: '',
            // City: '',
            // Zipcode: '',
            // Province: '',
            // Country: '',
        }
    }
    checkFields = async () => {
        console.log('API request', this.props);

        //return;
        let formData = new FormData();
        // formData.append('user_id', this.state.userID);
        formData.append('phone_number', this.state.Phone);
        formData.append('code', this.state.Current_location);

        this.setState({ loading: true });
        const response = await fetch('https://admin.sndgreens.com/api/signin',
            {
                method: 'POST',
                body: formData
            }
        );
        const responseJson = await response.json();
        if (this.state.Current_location == '' || this.state.Phone == '') {
            this.setState({ loading: false })
            alert('Complete All Fields')


        }
        else {
            if (responseJson.msg == 'verify') {
                await AsyncStorage.setItem('Phone', this.state.Phone);
                await AsyncStorage.setItem('Code', this.state.Current_location);
               
                this.setState({ loading: false })
                // alert('Number verified')
                // console.log(responseJson.message);
                // this.props.emptyCart();
                this.props.navigation.navigate('Drawer');
            }
            else {
                this.setState({ loading: false })
                alert('Error')
            }
            // this.props.navigation.navigate('OrderSummary', { Current_loc: this.state.Current_location, PhoneNo: this.state.Phone })
        }

    }
    // async checkFields() {


    //     if (this.state.Current_location == '' || this.state.Phone == '') {
    //         alert('Complete All Fields')
    //     }
    //     else {
    //         this.props.navigation.navigate('OrderSummary', { Current_loc: this.state.Current_location, PhoneNo: this.state.Phone })
    //     }
    // }
    async componentDidMount(){
        var Phone_num = await AsyncStorage.getItem('Phone');
        if (Phone_num == null) {
            this.props.navigation.navigate('AddressInformation')
        }
        else {
            this.props.navigation.navigate('Drawer')
        }
    }
    render() {
        return (
            <View>
                <View style={{ marginBottom: 10, alignSelf: 'center', marginTop: 50 }}>
                    <Image
                        source={logo}
                        style={{ height: 100, width: 100 }}
                    />
                    <Text style={{ alignSelf: 'center', color: 'orange', fontSize: 20, fontWeight: 'bold' }}>SignIn</Text>
                </View>
                <ScrollView>
                    <View style={{ backgroundColor: '#fff', paddingBottom: 100, marginTop: 20, borderRadius: 10, width: '90%', alignSelf: 'center' }}>
                        <View style={{ marginTop: 15 }}><Text style={{ alignSelf: 'center', color: 'orange', fontSize: 20, fontWeight: 'bold' }}>DETAILS</Text></View>
                        <TextInput
                            label="Phone number"
                            underlineColor={'transparent'}
                            style={{ width: '90%', height: 50, color: 'green', alignSelf: 'center', borderWidth: 0.5, borderTopEndRadius: 10, borderTopStartRadius: 10, borderBottomEndRadius: 10, borderBottomStartRadius: 10, backgroundColor: '#fff', borderColor: 'green', marginTop: 15 }}
                            // right={<TextInput.Icon name="eye" />}
                            onChangeText={(value) => this.setState({ Phone: value })}
                        />
                        <TextInput
                            label="Password"
                            underlineColor={'transparent'}
                            secureTextEntry
                            style={{ width: '90%', height: 50, color: 'green', alignSelf: 'center', borderWidth: 0.5, borderTopEndRadius: 10, borderTopStartRadius: 10, borderBottomEndRadius: 10, borderBottomStartRadius: 10, backgroundColor: '#fff', borderColor: 'green', marginTop: 15 }}
                            // right={<TextInput.Icon name="eye" />}
                            onChangeText={(value) => this.setState({ Current_location: value })}
                        />

                    </View>
                    {this.state.loading ? <BallIndicator color='orange' /> : null
                    }
                    <TouchableOpacity onPress={() => this.checkFields()}>
                        <View style={{ backgroundColor: 'orange', width: '90%', justifyContent: 'center', alignSelf: 'center', marginTop: 10, height: 50, borderRadius: 10 }}><Text style={{ color: '#fff', fontSize: 20, alignSelf: 'center' }}>Next</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
                        <View style={{ backgroundColor: '#fff', borderWidth: 1, borderColor: 'orange', width: '90%', justifyContent: 'center', alignSelf: 'center', marginTop: 10, height: 50, borderRadius: 10 }}><Text style={{ color: 'orange', fontSize: 20, alignSelf: 'center' }}>SignUp</Text></View>
                    </TouchableOpacity>
                </ScrollView>
            </View >
        );
    }
}

const mapStateToProps = (state) => ({
    totalItems: state.cart.totalItems
})

const mapDispatchToProps = {

}
export default connect(mapStateToProps)(AddressInformation);