import React, { Component } from 'react';
import { View, Text, FlatList, StatusBar, Image, StyleSheet, TouchableOpacity,Dimensions } from 'react-native';
import { Checkbox } from 'react-native-paper';
import Title from '../components/Title';
import Loading from '../components/Loading';

const image = require('../assets/BG-2.jpg');

class AllProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            AllProd: ''
        }
    }
    async CheckAllProduct() {
        let formData = new FormData();
        // formData.append('categories_id', this.props.route.params.cat_id);
        let response = await fetch('https://admin.sndgreens.com/api/allproducts', {
            method: 'POST',
            // body: formData
        });

        let responseJson = await response.json();

        this.setState({ AllProd: responseJson, loading: false })
        console.log('allprod', responseJson)
    }
    componentDidMount() {
        this.CheckAllProduct();
    }
    render() {
        return (
            <View style={{ flex: 1,paddingBottom:100}}>
                {/* {this.state.Phone_Number ? */}
                <View style={{ backgroundColor: '#fff' }}>
                    <StatusBar
                        animated={true}
                        backgroundColor="#84c708"
                    />
                    <Image
                        source={image}
                        style={{flex:1, height: Dimensions.get('window').height, width: '100%', position: 'absolute' }}
                    />
                    <Title
                        title={'All Products'}
                        // drawer={true}
                        badge={this.props.totalItems + ''}
                        navigation={this.props.navigation}
                        onPress={() => this.props.navigation.goBack()}
                    />


                    {this.state.loading ? <Loading /> :
                        <FlatList
                        
                            data={this.state.AllProd}
                            numColumns={2}
                            renderItem={({ item, index }) => {
                                // console.log('discount', item.discount)
                                return (
                                    <View style={styles.boxWithShadow, { flex: 1 }}>
                                        <TouchableOpacity onPress={() => {
                                            this.props.navigation.navigate('AddCart',
                                                { product: item, img_url: item.file_name })
                                        }}>
                                            <View style={{backgroundColor: '#fff', borderRadius: 10, width: '95%', margin: 5 }}>
                                                <Image
                                                    style={{ margin: 5, alignSelf: 'center', height: 150, marginTop: 20, width: '90%' }}
                                                    source={{ uri: item.file_name }}
                                                />
                                                <Text style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 10, fontSize: 18, color: 'orange', fontWeight: 'bold' }}>
                                                    {item.product_name}
                                                </Text>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 5, fontSize: 15, color: '#000' }}>
                                                        PKR-{item.sale_rate}
                                                        <Text>/{item.unit}</Text>
                                                    </Text>
                                                    {/* <Text style={{ paddingLeft: 10, textDecorationLine: 'line-through', paddingRight: 10, paddingBottom: 5, fontSize: 12, color: 'red' }}>
                                                        PKR-{item.old_rate}
                                                    </Text> */}
                                                </View>
                                            </View>
                                        </TouchableOpacity>

                                    </View>
                                );
                            }
                            }
                        />
                        
                    }

                </View>
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
        elevation: 5,

    }
})

export default AllProducts;