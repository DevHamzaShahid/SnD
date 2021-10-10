import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Title from '../components/Title';
import { connect } from 'react-redux';
import { BallIndicator } from 'react-native-indicators';
import AsyncStorage from '@react-native-community/async-storage';
// const image = require('../backgroundImage.png');
const image = require('../assets/BG-2.jpg');

class MyOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Phone: '',
            OrderData: '',
            loading: false,
        }
    }
    CheckOrder = async () => {
        var j = await AsyncStorage.getItem('Phone');
        console.log('numberrrrr',j)
        // var phonee = JSON.stringify(j);
        // this.setState({ userID: userId.id })
        this.setState({Phone:j})

        // console.log(this.state.userID);
        let formData = new FormData();
        formData.append('phone_number', this.state.Phone);
        this.setState({ loading: true });
        const response = await fetch('https://admin.sndgreens.com/api/getallorder',
            {
                method: 'POST',
                body: formData
            }
        );
        const responseJson = await response.json();
        this.setState({ loading: false });
        console.log(responseJson)
        this.setState({ OrderData: responseJson })
    }
    componentDidMount() {
        this.CheckOrder();
    }
    render() {
        console.log('orderdata', this.state.OrderData)
        return (
            <View style={{flex:1}}>
                <Title
                    title={'My Orders'}
                    navigation={this.props.navigation}
                    badge={this.props.totalItems + ''}
                    onPress={() => this.props.navigation.goBack()}
                />
                    {this.state.loading ? <BallIndicator color='orange' /> : null
                    }
                <FlatList
                    data={this.state.OrderData}
                    renderItem={({ item, index }) => (       
                          
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('OrderDetails', { OrderId: item.sale_id, OrderDataa: item })}>
                            <View style={{ marginTop: 20, backgroundColor: '#fff', alignSelf: 'center', borderRadius: 15, width: '90%' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                                    <View style={{ justifyContent: 'flex-start' }}><Text style={{ paddingLeft: 15, fontSize: 15, fontWeight: 'bold' }}>Order #{item.sale_id}</Text></View>
                                    <View style={{ justifyContent: 'flex-end' }}><Text style={{ paddingRight: 15, fontSize: 15, color: 'orange', fontWeight: 'bold' }}>{item.status}</Text></View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                                    <View style={{ justifyContent: 'flex-start' }}><Text style={{ paddingLeft: 15, fontSize: 15, }}>{item.orderItems} Item</Text></View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, marginBottom: 10 }}>
                                    <View style={{ justifyContent: 'flex-start' }}><Text style={{ paddingLeft: 15, fontSize: 15, }}>{item.date_sale}</Text></View>
                                    <View style={{ justifyContent: 'flex-end' }}><Text style={{ paddingRight: 15, fontSize: 18, color: 'gray', fontWeight: 'bold' }}>PKR {item.totalBill}</Text></View>
                                </View>
                            </View>

                        </TouchableOpacity>
                    )}
                />
            </View>
        )
    }
}
const mapStateToProps = (state) => ({
    cartItems: state.cart.cart,
    total: state.cart.total,
    totalItems: state.cart.totalItems
})
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(MyOrder);