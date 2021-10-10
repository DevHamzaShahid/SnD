import React, { Component } from 'react';
import { View, FlatList, StatusBar, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Title from '../components/Title';
import { connect } from 'react-redux';
import { removeItem } from '../container/actions/CartActions';
import Icon from 'react-native-vector-icons/EvilIcons';
class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    checkout() {
        if(this.props.totalItems==0){
            alert('Your Cart is empty')
        }
        else{
            this.props.navigation.navigate('OrderSummary')
        }
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <StatusBar
                    animated={true}
                    backgroundColor="#84c708"
                />
                <Title
                    title='Cart'
                    badge={this.props.totalItems + ''}
                    onPress={() => this.props.navigation.goBack()}
                />

                <FlatList
                    data={this.props.cartItems}
                    renderItem={({ item, index }) => (
                        <View style={styles.card}>
                            <View style={{ flex: 1, justifyContent: 'center', }}>
                                <Image
                                    source={{ uri: item.thumbnail }}
                                    style={{ height: 70, width: 70, alignSelf: 'center', marginLeft: 30 }} />
                            </View>
                            <View style={{ flex: 4 }}>
                                <View style={styles.textItem}>
                                    <Text style={styles.textLabel}>Product</Text>
                                    <Text style={styles.textValue}>{item.name}</Text>
                                </View>
                                <View style={styles.textItem}>
                                    <Text style={styles.textLabel}>Quantity</Text>
                                    <Text style={styles.textValue}>{item.quantity}</Text>
                                </View>
                                <View style={styles.textItem}>
                                    <Text style={styles.textLabel}>Unit Price</Text>
                                    <Text style={styles.textValue}>{item.price}</Text>
                                </View>
                                <View style={styles.textItem}>
                                    <Text style={styles.textLabel}>Total</Text>
                                    <Text style={styles.textValue}>{item.price * item.quantity}</Text>
                                </View>
                            </View>
                            <View style={{ justifyContent: 'center' }}>
                                <Icon name="trash" size={35} color="orange" onPress={() => { this.props.removeItem(item) }} />
                            </View>
                        </View>
                    )}
                />

                <TouchableOpacity onPress={() => this.checkout()} style={styles.checkout}>
                    <Text style={{ color: '#fff', fontSize: 16 }} >Checkout (PKR {this.props.total}) </Text>
                </TouchableOpacity>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    card: {
        borderRadius: 5,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 10,
        marginVertical: 10,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10
    },
    textItem: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    textLabel: {
        color: 'orange',
        marginRight: 10,
        flex: 1,
        textAlign: 'right',
    },
    textValue: {
        flex: 2
    },
    checkout: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
        marginLeft: '15%',
        position: 'absolute',
        bottom: 10,
        height: 50,
        backgroundColor: 'orange',
        borderRadius: 20
    }
})

const mapStateToProps = (state) => ({
    cartItems: state.cart.cart,
    total: state.cart.total,
    totalItems: state.cart.totalItems
})

const mapDispatchToProps = {
    removeItem
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
