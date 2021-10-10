import React, { Component } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Title from '../components/Title';
import { connect } from 'react-redux';
import Loading from '../components/Loading';

// const image = require('../backgroundImage.png');
const image = require('../assets/BG-2.jpg');

class Bundles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            Bundle: []
        }
    }
    componentDidMount() {
        this.getBundles();
    }
    async getBundles() {
        let formData = new FormData();
        // formData.append('categories_id', this.props.route.params.cat_id);
        let response = await fetch('https://admin.sndgreens.com/api/getbundle', {
            method: 'POST',
            // body: formData
        });
        let responseJson = await response.json();
        console.log(responseJson)
        this.setState({
            loading: false,
            // thumbnail_base_url: responseJson.file_name,
            // img_base_url: responseJson.base_url_galleries,
            Bundle: responseJson

        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Image
                    source={image}
                    style={{ height: '100%', width: '100%', position: 'absolute' }}

                />
                <Title
                    title={'Bundles'}
                    //   drawer={true}
                    badge={this.props.totalItems + ''}
                    navigation={this.props.navigation}
                    onPress={() => this.props.navigation.goBack()}
                />
                {this.state.loading ? <Loading /> :
                    <FlatList
                        data={this.state.Bundle}
                        numColumns={2}
                        renderItem={({ item, index }) => {
                            // console.log('discount', item.discount)
                            return (
                                <View style={styles.boxWithShadow, { flex: 1 }}>
                                    <TouchableOpacity onPress={() => {
                                        this.props.navigation.navigate('AddCart',
                                            { product: item, img_url: item.file_name ,ProductDetail:item.detail})
                                    }}>
                                        <View style={{ backgroundColor: '#fff', borderRadius: 10, width: '95%', margin: 5 }}>
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

                                            </View>
                                            {/* <View style={{ borderColor: 'orange', borderWidth: 1,width:'90%',alignSelf:'center', borderRadius:10,height:100 }}>
                                                <Text style={{ padding: 3, color: 'orange', fontWeight: 'bold' }}> Detail</Text>
                                                <Text style={{ padding: 5, color: 'green', }}>
                                                    {item.detail}
                                                    {item.detail}
                                                    {item.detail}
                                                    {item.detail}
                                                    {item.detail}
                                                </Text>
                                            </View> */}
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

export default Bundles;