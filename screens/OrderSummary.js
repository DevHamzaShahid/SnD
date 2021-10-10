import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Title from '../components/Title';
import { connect } from 'react-redux';
import { BallIndicator } from 'react-native-indicators';
import ToggleSwitch from 'toggle-switch-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { emptyCart } from '../container/actions/CartActions';
class OrderSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false,
            loading: false,
            userID: '',
            Phone_num1: '',
            Code_num1: '',
            Address:'',
            // phonenumber: '03203070000',
            // location: '123045',
            // product_id:this.props.cartItems.id,
            // qty:this.props.cartItems.quantity,
            // rate:this.props.cartItems.price
            // sale:[{ "product_id": "MQ==", "qty": 2, "rate": "200" }, { "product_id": "MQ==", "qty": 2, "rate": "121" }]
        }
    }
    completeOrder = async () => {
        console.log('API request')
        console.log('cartitems:', this.props.cartItems)
        let formData = new FormData();
        // formData.append('user_id', this.state.userID);
        formData.append('phone_number', this.state.Phone_num1);
        formData.append('current_location', this.state.code_num1);
        const my_cart = [];
        this.props.cartItems.map(item => {
            my_cart.push({
                product_id: item.id,
                qty: item.quantity,
                rate: item.price
            })
        })
        formData.append('sale_detail', JSON.stringify(my_cart));

        this.setState({ loading: true });
        const response = await fetch('https://admin.sndgreens.com/api/saveorder',
            {
                method: 'POST',
                body: formData
            }
        );
        const responseJson = await response.json();
        console.log(responseJson.status)
        if (responseJson.status == 200) {
            alert(responseJson.message)
            this.setState({ loading: false });
            this.props.emptyCart();
            this.props.navigation.navigate('Drawer')
        }
        else {
            this.setState({ loading: fasle });
            alert('Please login First')
        }
        // if (responseJson.msg == 'verify') {
        //     this.setState({ loading: false })
        //     alert('order successfully placed')
        //     // console.log(responseJson.message);
        //     this.props.emptyCart();
        //     this.props.navigation.navigate('Home')
        // }
        // else {
        //     this.setState({ loading: false })
        //     alert('Error')
        // }
    }
    checkUser = async () => {
        var Phone_nu = await AsyncStorage.getItem('Phone');
        var code_nu = await AsyncStorage.getItem('Code');
        // var Address_1 = await AsyncStorage.getItem('Address');

        console.log(Phone_nu)
        this.setState({ Phone_num1: Phone_nu })
        this.setState({ Code_num1: code_nu })
    }
    componentDidMount() {
        this.checkUser();
    }
    componentDidMount(){
        this.checkUser();
    }
    render() {
        return (
            <View style={{}}>
                <Title
                    title={'Order Summary'}
                    navigation={this.props.navigation}
                    badge={this.props.totalItems + ''}
                    onPress={() => this.props.navigation.goBack()}
                />
                <View style={{ marginTop: 20, backgroundColor: '#fff', alignSelf: 'center', borderRadius: 15, width: '90%' }}>
                    <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 20, marginTop: 10, color: 'orange' }}>PRODUCT NAMES</Text>
                    <FlatList
                        data={this.props.cartItems}
                        renderItem={({ item, index }) => (
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ justifyContent: 'flex-start' }}><Text style={{ paddingLeft: 15, fontSize: 15, fontWeight: 'bold' }}>{item.name}</Text></View>
                                <View style={{ justifyContent: 'flex-end' }}><Text style={{ paddingRight: 15, fontSize: 15 }}>RS {item.price * item.quantity}</Text></View>
                            </View>
                        )}
                    />
                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ justifyContent: 'flex-start' }}><Text style={{ paddingLeft: 15, fontSize: 15, fontWeight: 'bold' }}>{this.props.cartItems[0].name}</Text></View>
                        <View style={{ justifyContent: 'flex-end' }}><Text style={{ paddingRight: 15, fontSize: 15 }}>{this.props.cartItems[0].price * this.props.cartItems[0].quantity}</Text></View>
                    </View> */}
                    <View style={{ borderBottomColor: '#f2eded', width: '90%', marginTop: 10, alignSelf: 'center', borderBottomWidth: 2 }} />
                    <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 20, marginTop: 10, color: 'orange' }}>SHIPPING TO</Text>
                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}> */}
                    {/* <View style={{ justifyContent: 'flex-start' }}><Text style={{ paddingLeft: 15, fontSize: 15, fontWeight: 'bold' }}>Name</Text></View>
                        <View style={{ justifyContent: 'flex-end' }}><Text style={{ paddingRight: 15, fontSize: 15 }}>{this.props.route.params.FirstName} {this.props.route.params.LastName}</Text></View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                        <View style={{ justifyContent: 'flex-start' }}><Text style={{ paddingLeft: 15, fontSize: 15, fontWeight: 'bold' }}>Email</Text></View>
                        <View style={{ justifyContent: 'flex-end' }}><Text style={{ paddingRight: 15, fontSize: 15 }}>{this.props.route.params.email}</Text></View>
                    </View> */}

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                        <View style={{ justifyContent: 'flex-start' }}><Text style={{ paddingLeft: 15, fontSize: 15, fontWeight: 'bold' }}>Phone No.</Text></View>
                        <View style={{ justifyContent: 'flex-end' }}><Text style={{ paddingRight: 15, fontSize: 15 }}>{this.state.Phone_num1}</Text></View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                        <View style={{ justifyContent: 'flex-start' }}><Text style={{ paddingLeft: 15, fontSize: 15, fontWeight: 'bold' }}>Address</Text></View>
                        <View style={{ justifyContent: 'flex-end' }}><Text style={{ paddingRight: 15, fontSize: 15 }}>{}</Text></View>
                    </View>

                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                        <View style={{ justifyContent: 'flex-start' }}><Text style={{ paddingLeft: 15, fontSize: 15, fontWeight: 'bold' }}>City</Text></View>
                        <View style={{ justifyContent: 'flex-end' }}><Text style={{ paddingRight: 15, fontSize: 15 }}>{this.props.route.params.city}</Text></View>
                    </View> */}

                    <View style={{ borderBottomColor: '#f2eded', width: '90%', marginTop: 10, alignSelf: 'center', borderBottomWidth: 2 }} />

                    <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 20, marginTop: 10, color: 'orange' }}>PRICE INFO</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ justifyContent: 'flex-start' }}><Text style={{ paddingLeft: 15, fontSize: 15, fontWeight: 'bold' }}>Subtotal</Text></View>
                        <View style={{ justifyContent: 'flex-end' }}><Text style={{ paddingRight: 15, fontSize: 15 }}>{this.props.total}</Text></View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                        <View style={{ justifyContent: 'flex-start' }}><Text style={{ paddingLeft: 15, fontSize: 15, fontWeight: 'bold' }}>Shipping</Text></View>
                        <View style={{ justifyContent: 'flex-end' }}><Text style={{ paddingRight: 15, fontSize: 15 }}>RS 0</Text></View>
                    </View>
                    <View style={{ borderBottomColor: '#f2eded', width: '90%', marginTop: 10, alignSelf: 'center', borderBottomWidth: 2 }} />

                    <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 20, marginTop: 10, color: 'orange' }}>TOTAL</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ justifyContent: 'flex-start' }}><Text style={{ paddingLeft: 15, fontSize: 15, fontWeight: 'bold' }}>Total Amount</Text></View>
                        <View style={{ justifyContent: 'flex-end' }}><Text style={{ paddingRight: 15, fontSize: 15 }}>{this.props.total + 0}</Text></View>
                    </View>
                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                        <View style={{ justifyContent: 'flex-start' }}><Text style={{ paddingLeft: 15, fontSize: 15, fontWeight: 'bold' }}>Apply Discount Code</Text></View>
                        <View style={{ justifyContent: 'flex-end' }}><ToggleSwitch
                            isOn={this.state.toggle}
                            onColor="#84c708"
                            offColor="gray"
                            style={{ paddingRight: 15 }}
                            //label="Example label"
                            //labelStyle={{ color: "black", fontWeight: "900" }}
                            size="Small"
                            onToggle={isOn => this.setState({ toggle: !this.state.toggle })}
                        />
                        </View>
                    </View> */}
                    {this.state.loading ? <BallIndicator color='orange' /> : null
                    }
                    <View style={{ marginBottom: 15, flexDirection: 'row', marginTop: 20, alignSelf: 'center', justifyContent: 'space-between', }}>

                        <TouchableOpacity onPress={() => this.completeOrder()} style={{ justifyContent: 'center', width: '90%', backgroundColor: 'orange', borderRadius: 10, height: 45 }}>
                            <View>
                                <Text style={{ alignSelf: 'center', color: '#fff' }}>Complete Order</Text>
                            </View>
                        </TouchableOpacity>


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
    emptyCart
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);