import React, { Component } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Title from '../components/Title';
import { BASE_URL } from '../Global';
const image = require('../assets/BG-2.jpg');
import Loading from '../components/Loading';
import { connect } from 'react-redux';

class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            products: [],
        }
    }

    componentDidMount() {
        this.getProductData();
    }

    async getProductData() {
        let formData = new FormData();
        formData.append('categories_id', this.props.route.params.cat_id);
        let response = await fetch('https://admin.sndgreens.com/api/getproductsbycatid', {
            method: 'POST',
            body: formData
        });
        let responseJson = await response.json();
        console.log(responseJson)
        this.setState({
            loading: false,
            // thumbnail_base_url: responseJson.file_name,
            // img_base_url: responseJson.base_url_galleries,
            products: responseJson

        });
    }

    render() {
        return (
            // <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Image
                    source={image}
                    style={{ height: '100%', width: '100%', position: 'absolute' }}

                />
                <Title
                    title={this.props.route.params.cat_name}
                    badge={this.props.totalItems + ''}
                    navigation={this.props.navigation}
                    onPress={() => this.props.navigation.goBack()}
                />
                {this.state.loading ? <Loading /> :
                    <FlatList
                        data={this.state.products}
                        numColumns={2}
                        renderItem={({ item, index }) => {
                            console.log('unit',item)
                            return (
                                
                                <View style={styles.boxWithShadow, { flex: 1 }}>
                                    <TouchableOpacity onPress={() => {
                                        this.props.navigation.navigate('AddCart',
                                            { product: item, img_url: item.file_name })
                                    }}>
                                        <View style={{ backgroundColor: '#fff', borderRadius: 10, width: '95%', margin: 5 }}>
                                            <Image
                                                style={{ margin: 5, alignSelf: 'center', height: 150, marginTop: 20, width: '90%' }}
                                                source={{ uri: item.file_name }}
                                            />
                                            <Text style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 10, fontSize: 18, color: 'orange', fontWeight: 'bold' }}>
                                                {item.product_name}
                                            </Text>
                                            <Text style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 10, fontSize: 14, color: '#000' }}>
                                                PKR-{item.sale_rate}
                                                <Text>/{item.unit}</Text>
                                            </Text>
                                        </View>
                                    </TouchableOpacity>

                                </View>
                            );
                        }
                        }
                    />
                }
            </View>

        );
    }

}

const styles = StyleSheet.create({
    boxWithShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5
    }
})

const mapStateToProps = (state) => ({
    totalItems: state.cart.totalItems
})

const mapDispatchToProps = {
}


export default connect(mapStateToProps)(Products);