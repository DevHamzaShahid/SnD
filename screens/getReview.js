import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { BallIndicator } from 'react-native-indicators';

class GetReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stars: '',
            review: '',
            phone: '',
            loading: false

        }
    }

    async componentDidMount() {
        var Phone_num = await AsyncStorage.getItem('Phone');
        this.setState({ phone: Phone_num })
        //   this.SendReview();
    }
    async SendReview() {
        if (this.state.review == '' || this.state.stars == 0) {
            alert('please add review or stars')
        }
        let formData = new FormData();
        formData.append('phone', this.state.phone);
        formData.append('review', this.state.review);
        formData.append('stars', this.state.stars);
        this.setState({ loading: true })
        let response = await fetch('https://admin.sndgreens.com/api/review', {
            method: 'POST',
            body: formData
        });
        let responseJson = await response.json();
        this.setState({ loading: false })

        // console.log('number:', responseJson)
        // alert(responseJson.msg)
        if (responseJson.msg == "your Review added successfully Thanks") {
            alert(responseJson.msg)
            this.props.navigation.goBack()
        }
        else {
            alert(responseJson.msg)
        }
    }
    render() {
        //    alert(this.state.review)
        return (
            <View style={{ justifyContent: 'center' }}>
                <Text style={{ fontSize: 40, alignSelf: 'center', color: '#00904A', marginTop: Dimensions.get('window').height / 10 }}> Rate Us!</Text>
                <View style={{ marginTop: Dimensions.get('window').height / 30, width: '90%', height: Dimensions.get('window').height / 1.8, borderRadius: 15, borderWidth: 1, alignSelf: 'center' }}>
                    {/* <AirbnbRating /> */}

                    <AirbnbRating
                        style={{ marginTop: 50 }}
                        count={5}
                        reviews={["Terrible", "Bad", "Good", "Very Good", "Unbelievable"]}
                        defaultRating={0}
                        size={40}
                        onFinishRating={(value) => this.setState({ stars: value })}
                    />
                    <TextInput
                        label="Review"
                        underlineColor={'transparent'}
                        style={{ marginTop: 50, width: '90%', color: 'green', alignSelf: 'center', borderWidth: 0.5, borderTopEndRadius: 10, borderTopStartRadius: 10, borderBottomEndRadius: 10, borderBottomStartRadius: 10, backgroundColor: '#fff', borderColor: 'green' }}
                        theme={{ colors: { label: 'green' } }}
                        onChangeText={(value) => this.setState({ review: value })}

                    />
                    {this.state.loading ? <BallIndicator color='orange' /> : null
                    }
                    <TouchableOpacity onPress={() => this.SendReview()}><View style={{ justifyContent: 'center', backgroundColor: '#00904A', width: 100, borderRadius: 15, marginTop: 40, height: 50, alignSelf: 'center' }}>
                        <Text style={{ color: '#fff', alignSelf: 'center' }}>Done</Text>
                    </View></TouchableOpacity>

                </View>


            </View>
        );
    }
}

export default GetReview;