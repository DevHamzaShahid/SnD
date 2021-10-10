import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Title from '../components/Title';
import { connect } from 'react-redux';
class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        console.log("products", this.props.route.params.OrderDataa.sale_id);
    }
    render() {
        return (
            <View>
                <Title
                    title={'Order Details'}
                    navigation={this.props.navigation}
                    badge={this.props.totalItems + ''}
                    onPress={() => this.props.navigation.goBack()}
                />

                <View style={{ marginTop: 20, backgroundColor: '#fff', alignSelf: 'center', borderRadius: 15, width: '90%' }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                        <View style={{ justifyContent: 'flex-start' }}><Text style={{ paddingLeft: 15, fontSize: 15, fontWeight: 'bold' }}>Order #{this.props.route.params.OrderId}</Text></View>
                        <View style={{ justifyContent: 'flex-end' }}><Text style={{ paddingRight: 15, fontSize: 15, color: 'orange', fontWeight: 'bold' }}>Pending</Text></View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                        <View style={{ justifyContent: 'flex-start' }}><Text style={{ paddingLeft: 15, fontSize: 15, }}>13:41</Text></View>

                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                        <View style={{ justifyContent: 'flex-start' }}><Text style={{ paddingLeft: 15, fontSize: 15, }}>2021-08-16</Text></View>
                        <View style={{ justifyContent: 'flex-end' }}><Text style={{ paddingRight: 15, fontSize: 15 }}>PKR {this.props.route.params.OrderDataa.totalBill}</Text></View>
                    </View>

                    <View style={{ borderBottomColor: '#f2eded', width: '90%', marginTop: 10, alignSelf: 'center', borderBottomWidth: 2 }} />

                    <Text style={{ paddingLeft: 15, fontWeight: 'bold', fontSize: 15, marginTop: 10, }}>SHIPPING ADDRESS</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ justifyContent: 'flex-start' }}><Text style={{ paddingLeft: 15, fontSize: 15, marginTop: 10 }}>{this.props.route.params.OrderDataa.address}</Text></View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                        <View style={{ justifyContent: 'flex-start' }}><Text style={{ paddingLeft: 15, fontSize: 15, }}>{this.props.route.params.OrderDataa.address}</Text></View>
                    </View>
                    <View style={{ borderBottomColor: '#f2eded', width: '90%', marginTop: 10, alignSelf: 'center', borderBottomWidth: 2 }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 }}>
                        <View style={{ justifyContent: 'flex-start' }}><Text style={{ fontSize: 15, fontWeight: 'bold' }}>Products</Text></View>
                        <View style={{ justifyContent: 'center' }}><Text style={{ fontSize: 15, fontWeight: 'bold' }}>Price x Quantity</Text></View>
                        <View style={{ justifyContent: 'flex-end' }}><Text style={{ paddingRight: 15, fontSize: 15, fontWeight: 'bold' }}>Total</Text></View>
                    </View>

                    <FlatList
                        data={this.props.route.params.OrderDataa.sale_id}
                        renderItem={({ item, index }) => {
                            console.log(item);
                            return (
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 }}>
                                    <View style={{ justifyContent: 'flex-start' }}><Text style={{ fontSize: 15, }}>{item.rate}</Text></View>
                                    <View style={{ justifyContent: 'center' }}><Text style={{ fontSize: 15, }}>{item.price} x {item.quantity}</Text></View>
                                    <View style={{ justifyContent: 'flex-end' }}><Text style={{ paddingRight: 15, fontSize: 15 }}>{item.price * item.quantity}</Text></View>
                                </View>
                            )
                        }}
                    />
                    <View style={{ borderBottomColor: '#f2eded', width: '90%', marginTop: 10, alignSelf: 'center', borderBottomWidth: 2 }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                        <View style={{ justifyContent: 'flex-start' }}><Text style={{ paddingLeft: 15, fontSize: 15, fontWeight: 'bold' }}>SUBTOTAL</Text></View>
                        <View style={{ justifyContent: 'flex-end' }}><Text style={{ paddingRight: 15, fontSize: 15, }}>{this.props.route.params.OrderDataa.totalBill}</Text></View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                        <View style={{ justifyContent: 'flex-start' }}><Text style={{ paddingLeft: 15, fontSize: 15, fontWeight: 'bold' }}>DISCOUNT</Text></View>
                        <View style={{ justifyContent: 'flex-end' }}><Text style={{ paddingRight: 15, fontSize: 15, }}>PKR 0</Text></View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                        <View style={{ justifyContent: 'flex-start' }}><Text style={{ paddingLeft: 15, fontSize: 15, fontWeight: 'bold' }}>SHIPPING</Text></View>
                        <View style={{ justifyContent: 'flex-end' }}><Text style={{ paddingRight: 15, fontSize: 15, }}>PKR 0</Text></View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                        <View style={{ justifyContent: 'flex-start' }}><Text style={{ paddingLeft: 15, fontSize: 15, fontWeight: 'bold' }}>GRAND TOTAL</Text></View>
                        <View style={{ justifyContent: 'flex-end' }}><Text style={{ paddingRight: 15, fontSize: 15, }}>PKR {this.props.route.params.OrderDataa.totalBill}</Text></View>
                    </View>

                    <View style={{ marginBottom: 15, flexDirection: 'row', marginTop: 20, alignSelf: 'center', justifyContent: 'space-between', }}>

                        {/* <TouchableOpacity onPress={() => console.log('sacv')} style={{ justifyContent: 'center', width: '90%', backgroundColor: 'orange', borderRadius: 10, height: 45 }}>
                            <View>
                                <Text style={{ alignSelf: 'center', color: '#fff', fontWeight: 'bold' }}>REORDER</Text>
                            </View>
                        </TouchableOpacity> */}
                    </View>
                </View>
            </View>
        );
    }
}
const mapStateToProps = (state) => ({
    cartItems: state.cart.cart,
    total: state.cart.total,
    totalItems: state.cart.totalItems
})

const mapDispatchToProps = {

}


export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);