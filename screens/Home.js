import React, { Component } from 'react';
import { FlatList, Text, Image, View, StatusBar, StyleSheet, ScrollView, Linking, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import Title from '../components/Title';
import { SliderBox } from '../components/SliderBox';
import { LinearTextGradient } from "react-native-text-gradient";
import { BASE_URL, IMG_BASE_URL } from '../Global';
import Loading from '../components/Loading';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import AddressInformation from './AddressInformation';
import { LogBox } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import Modal from "react-native-modal";
// import { Dimensions } from 'react-native';
const image = require('../assets/BG-2.jpg');
const { width } = Dimensions.get('window');
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            category: [],
            images: [],
            sliderImageUrl: '',
            Buttonbundle: '',
            Buttonoffer: '',
            Bundle: [],
            Phone_Number: '',
            phoneboolean: false,
            showReview: '',
            Stars: '',
            fb: '',
            ytb: '',
            twitter: '',
            linked: '',
            insta: ''

        }
    }
    async getSocialLinks() {
        let response = await fetch('https://admin.sndgreens.com/api/getlinks', {
            method: 'POST',
        });
        let responseJson = await response.json();
        this.setState({
            loading: false,
            fb: responseJson.facebook,
            insta: responseJson.instagram,
            twitter: responseJson.twitter,
            linked: responseJson.linkedin,
            ytb: responseJson.youtube,

        });
    }

    checkUser = async () => {
        var Phone_num = await AsyncStorage.getItem('Phone');
        this.setState({ Phone_Number: Phone_num })
        // await AsyncStorage.removeItem('Phone')
        console.log(Phone_num);
        if (Phone_num != null) {
            this.setState({ phoneboolean: true })
        }
        else {
            // this.props.navigation.navigate('AddressInformation')
            this.setState({ phoneboolean: false })

        }
    }
    ReviewSwiper(item) {
        // this.setState({Stars:item})
        var icons = [];

        for (var i = 1; i <= item.stars; i++) {
            icons.push(i)
        }

        // console.log('len', icons.length)

        return (

            <View style={[styles.child, { flex: 1, backgroundColor: '#fff', paddingLeft: 10, borderRadius: 15, marginTop: 10, paddingBottom: 12 }]}>

                <TouchableOpacity >
                    <Text style={{ fontWeight: 'bold', color: '#00904A' }}>{item.name}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>

                        {icons.map((val) => {

                            return (

                                <Icon name='star' size={14} color='#00904A' style={{ paddingRight: 8, paddingTop: 4 }} />

                            )
                        })}

                        <Text style={{ marginLeft: 50, color: '#00904A' }}>{item.date}</Text>

                    </View>
                    <Text style={styles.text, { color: '#00904A' }}>{item.review}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    async TakeReview() {
        let formData = new FormData();
        var Phone_num = await AsyncStorage.getItem('Phone');
        formData.append('phone_number', Phone_num);
        let response = await fetch('https://admin.sndgreens.com/api/takereview', {
            method: 'POST',
            body: formData
        });
        let responseJson = await response.json();
        console.log('------------------------------------------------------', responseJson)
        if (responseJson.review == 1) {
            this.timeoutHandle = setTimeout(() => {
                // Add your logic for the transition
                this.props.navigation.navigate('GetReview')
            }, 15000);
        }

    }
    componentDidMount() {

        // this.timeoutHandle = setTimeout(()=>{
        //     // Add your logic for the transition
        //     this.props.navigation.navigate('GetReview') 
        // }, 16000);    
        this.checkUser();
        this.TakeReview();
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        this.getCategoryData();
        this.getButtons();
        this.getBundle();
        this.getReviews();
        this.getSocialLinks();
    }
    async getReviews() {
        let response = await fetch('https://admin.sndgreens.com/api/getreview', {
            method: 'POST',
        });
        let responseJson = await response.json();
        this.setState({
            loading: false,
            showReview: responseJson

        });
    }
    async getButtons() {
        let response = await fetch('https://admin.sndgreens.com/api/buttons', {
            method: 'POST',
        });
        let responseJson = await response.json();
        console.log('dataaaaa-------------------------')
        console.log('dataaaaa', responseJson.bundle)
        this.setState({
            loading: false,
            Buttonbundle: responseJson.bundle,
            Buttonoffer: responseJson.offers
        });
        // console.log('butttton',this.state.Buttons)
    }
    async getBundle() {
        let response = await fetch('https://admin.sndgreens.com/api/getbundle', {
            method: 'POST',
        });
        let responseJson = await response.json();
        this.setState({
            loading: false,
            Bundle: responseJson
        });
    }
    async getCategoryData() {
        let responseSlider = await fetch(`${BASE_URL}getsliders`, {
            method: 'POST',
        });
        let responseJsonSlider = await responseSlider.json();
        responseJsonSlider.data.map((val) => {
            this.state.images.push(responseJsonSlider.base_url_galleries + val.photo);
        });
        let formData = new FormData();
        formData.append('phone', this.state.Phone_Number);
        let response = await fetch('https://admin.sndgreens.com/api/categories', {
            method: 'POST',
            body: formData
        });
        let responseJson = await response.json();
        console.log('number:', responseJson)
        this.setState({
            loading: false,
            category: responseJson
        });
    }
    renderItem(item) {
        // console.log('datacat', this.state.category)
        return (

            <TouchableOpacity onPress={() => this.props.navigation.navigate('Products', { 'cat_id': item.id, cat_name: item.service_name })}>
                <View style={{ width: Dimensions.get('window').width / 3, paddingTop: 8, paddingBottom: 8, marginTop: 10, marginVertical: 10, marginLeft: 1.5, justifyContent: 'center', borderRadius: 15 }}>
                    {/* <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('AddCart',
                            { product: item, img_url: item.file_name })
                    }}> */}
                    <View style={{ flexDirection: 'row', alignSelf: 'center', paddingTop: 10, paddingBottom: 10 }}>

                        <Image
                            style={{ height: 100, width: '75%', borderRadius: 80 }}
                            source={{ uri: item.file_name }}
                        />

                        {/* <View style={{ justifyContent: 'center', paddingLeft: 7, paddingRight: 15 }}>
                            <LinearTextGradient
                                style={{ fontWeight: "bold", fontSize: 16, }}
                                locations={[0, 1]}
                                colors={["orange", "green"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0.4, y: 0 }}
                            >
                                <Text style={{}}>{item.service_name}</Text>
                            </LinearTextGradient>

                        </View> */}

                    </View>
                    {/* </TouchableOpacity> */}
                    {/*
                     <View style={{ flexDirection: 'row', marginLeft: 15 }}>

                        <Image
                            style={{ height: 150, width: 150 }}
                            source={{ uri: item.file_name }}
                        />

                        <View style={{ justifyContent: 'center', paddingLeft: 15, paddingRight: 15 }}>
                            <LinearTextGradient
                                style={{ fontWeight: "bold", fontSize: 23, }}
                                locations={[0, 1]}
                                colors={["orange", "green"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0.4, y: 0 }}
                            >
                                <Text style={{}}>{item.service_name}</Text>
                            </LinearTextGradient>

                        </View>
                    </View> */}
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        // var icons = [];

        // for (var i = 1; i <= this.state.Stars; i++) {
        //     icons.push(i)
        // }
        // console.log('len', icons.length)
        //    console.log('imggggg',this.state.Buttons.offers.image)
        return (
            <View style={{ flex: 1, height: '100%' }}>
                {this.state.Phone_Number ?
                    <View style={{ backgroundColor: '#fff' }}>
                        <StatusBar
                            animated={true}
                            backgroundColor="#84c708"
                        />
                        <Image
                            source={image}
                            style={{ flex: 1, height: '100%', width: '100%', position: 'absolute' }}
                        />
                        <Title
                            title={'Home'}
                            drawer={true}
                            badge={this.props.totalItems + ''}
                            navigation={this.props.navigation}
                            onPress={() => this.props.navigation.openDrawer()}
                        />
                        {/* <ScrollView> */}
                        <ScrollView>
                            <SliderBox
                                // ImageComponent={FastImage}
                                images={this.state.images}
                                // sliderBoxHeight={200}
                                onCurrentImagePressed={index =>
                                    console.warn(`image ${index} pressed`)
                                }
                                dotColor="#FFEE58"
                                inactiveDotColor="#90A4AE"
                                paginationBoxStyle={{
                                    position: 'absolute',
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                    justifyContent: 'center'

                                }}
                                autoplay
                                circleLoop
                                ImageComponentStyle={{ height: 120 }}
                                imageLoadingColor="#2196F3"
                            />
                            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: 'green', fontSize: 18, fontWeight: 'bold', padding: 4 }}>Offers</Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Offers')}>
                                    <Icon name='arrow-forward-circle' size={34} color='green' style={{ paddingRight: 8, paddingTop: 4 }} />
                                </TouchableOpacity>
                            </View> */}
                            {this.state.loading ? <Loading /> :
                                <View style={styles.boxWithShadow, { flex: 1, flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => {
                                        this.props.navigation.navigate('Offers')
                                    }}>
                                        <View style={{ backgroundColor: '#fff', borderRadius: 10, width: Dimensions.get('window').width / 2.05, marginTop: 10, marginLeft: 5, paddingBottom: 10 }}>
                                            <Image
                                                style={{ margin: 5, alignSelf: 'center', height: 170, marginTop: 20, width: '90%' }}
                                                source={{ uri: this.state.Buttonoffer.image }}
                                            />
                                            <Text style={{ padding: 15, fontSize: 15, color: '#00904A', alignSelf: 'center', fontWeight: 'bold' }}>
                                                {this.state.Buttonoffer.title}
                                            </Text>
                                            {/* <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                                                            <Text style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 5, fontSize: 10, color: '#000' }}>
                                                                PKR-{item.sale_rate}
                                                                <Text>/{item.unit}</Text>
                                                            </Text>
                                                            <Text style={{ paddingLeft: 10, textDecorationLine: 'line-through', paddingRight: 10, paddingBottom: 5, fontSize: 7, color: 'red' }}>
                                                                PKR-{item.old_rate}
                                                            </Text>
                                                        </View> */}


                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        this.props.navigation.navigate('Bundles')
                                    }}>
                                        <View style={{ backgroundColor: '#fff', borderRadius: 10, width: Dimensions.get('window').width / 2.08, marginTop: 10, marginLeft: 5, paddingBottom: 10, marginRight: 5 }}>
                                            <Image
                                                style={{ margin: 5, alignSelf: 'center', height: 170, marginTop: 20, width: '90%' }}
                                                source={{ uri: this.state.Buttonoffer.image }}
                                            />
                                            <Text style={{ padding: 15, fontSize: 15, color: '#00904A', alignSelf: 'center', fontWeight: 'bold' }}>
                                                {this.state.Buttonbundle.title}
                                            </Text>
                                            {/* <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                                                            <Text style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 5, fontSize: 10, color: '#000' }}>
                                                                PKR-{item.sale_rate}
                                                                <Text>/{item.unit}</Text>
                                                            </Text>
                                                            <Text style={{ paddingLeft: 10, textDecorationLine: 'line-through', paddingRight: 10, paddingBottom: 5, fontSize: 7, color: 'red' }}>
                                                                PKR-{item.old_rate}
                                                            </Text>
                                                        </View> */}


                                        </View>
                                    </TouchableOpacity>
                                </View>

                                // <FlatList
                                //     nestedScrollEnabled={true}
                                //     data={this.state.Buttons}
                                //     // horizontal
                                //     numColumns={2}
                                //     renderItem={({ item, index }) => {

                                //         return (
                                //             <View style={styles.boxWithShadow, { flex: 1 }}>
                                //                 <TouchableOpacity onPress={() => {
                                //                     this.props.navigation.navigate('AddCart',
                                //                         { product: item, img_url: item.file_name, ProductDetail: item.detail })
                                //                 }}>
                                //                     <View style={{ backgroundColor: '#fff', borderRadius: 10, width: '95%', margin: 6,paddingBottom:30 }}>
                                //                         <Image
                                //                             style={{ margin: 5, alignSelf: 'center', height: 170, marginTop: 20, width: '90%' }}
                                //                             source={{ uri: item.image }}
                                //                         />
                                //                         <Text style={{ padding:15, fontSize: 15, color: 'orange', alignSelf:'center',fontWeight: 'bold' }}>
                                //                             {item.title}
                                //                         </Text>
                                //                         {/* <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                                //                             <Text style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 5, fontSize: 10, color: '#000' }}>
                                //                                 PKR-{item.sale_rate}
                                //                                 <Text>/{item.unit}</Text>
                                //                             </Text>
                                //                             <Text style={{ paddingLeft: 10, textDecorationLine: 'line-through', paddingRight: 10, paddingBottom: 5, fontSize: 7, color: 'red' }}>
                                //                                 PKR-{item.old_rate}
                                //                             </Text>
                                //                         </View> */}


                                //                     </View>
                                //                 </TouchableOpacity>

                                //             </View>
                                //         );
                                //     }
                                //     }
                                // />
                            }
                            <Text style={{ color: '#00904A', fontSize: 18, fontWeight: 'bold', padding: 4 }}>Products</Text>

                            {this.state.loading ? <Loading /> :
                                <FlatList
                                    // nestedScrollEnabled={true}
                                    numColumns={3}
                                    // progressViewOffset={100}
                                    data={this.state.category}
                                    renderItem={({ item }) => this.renderItem(item)}
                                />

                            }
                            <SwiperFlatList
                                autoplay
                                autoplayDelay={2}
                                autoplayLoop
                                // circleLoop
                                // index={0}
                                // showPagination
                                data={this.state.showReview}
                                renderItem={({ item }) => this.ReviewSwiper(item)}
                            // renderItem={({ item }) => (

                            //     <View style={[styles.child, { flex: 1, backgroundColor: '#fff', paddingLeft: 10, borderRadius: 25, marginTop: 10, paddingBottom: 12 }]}>

                            //         <TouchableOpacity >
                            //             <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                            //             <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            //                 {this.checkStars(item)}
                            //                 {icons.map((val) => {

                            //                     return (

                            //                         <Icon name='star' size={14} color='orange' style={{ paddingRight: 8, paddingTop: 4 }} />

                            //                     )
                            //                 })}

                            //                 <Text style={{ marginLeft: 50 }}>{item.date}</Text>

                            //             </View>

                            //             <Text style={styles.text}>{item.review}</Text>


                            //         </TouchableOpacity>
                            //     </View>
                            // )}
                            />
                            {/* <TouchableOpacity onPress={()=>this.navigation.navigate('')}><View style={{height:200,width:200, backgroundColor:'red'}}></View></TouchableOpacity> */}
                            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: 'green', fontSize: 18, fontWeight: 'bold', padding: 4 }}>Bundles</Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Bundles')}>
                                    <Icon name='arrow-forward-circle' size={34} color='green' style={{ paddingRight: 8, paddingTop: 4 }} />
                                </TouchableOpacity>
                            </View> */}
                            {/* {this.state.loading ? <Loading /> :
                                <FlatList
                                    nestedScrollEnabled={true}
                                    data={this.state.Bundle}
                                    horizontal
                                    // numColumns={2}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <View style={styles.boxWithShadow, { flex: 1, marginBottom: 150 }}>
                                                <TouchableOpacity onPress={() => {
                                                    this.props.navigation.navigate('AddCart',
                                                        { product: item, img_url: item.file_name, ProductDetail: item.detail })
                                                }}>
                                                    <View style={{ backgroundColor: '#fff', borderRadius: 10, width: '95%', margin: 6 }}>
                                                        <Image
                                                            style={{ margin: 5, alignSelf: 'center', height: 100, marginTop: 20, width: 100 }}
                                                            source={{ uri: item.file_name }}
                                                        />
                                                        <Text style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 10, fontSize: 15, color: 'orange', fontWeight: 'bold' }}>
                                                            {item.product_name}
                                                        </Text>
                                                        <Text style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 10, fontSize: 12, color: '#000' }}>
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

                            } */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 }}>

                                <Icon name='logo-facebook' onPress={() => { Linking.openURL(this.state.fb) }} size={30} color='#4267B2' style={{ paddingRight: 8, paddingTop: 4 }} />
                                <Icon name='logo-twitter' onPress={() => { Linking.openURL(this.state.twitter) }} size={30} color='#00acee ' style={{ paddingRight: 8, paddingTop: 4 }} />

                                <Icon name='logo-instagram' onPress={() => { Linking.openURL(this.state.insta) }} size={30} color='#fb3958' style={{ paddingRight: 8, paddingTop: 4 }} />

                                <Icon name='logo-linkedin' onPress={() => { Linking.openURL(this.state.linked) }} size={30} color='#0e76a8' style={{ paddingRight: 8, paddingTop: 4 }} />

                                <Icon name='logo-youtube' onPress={() => { Linking.openURL(this.state.ytb) }} size={30} color='#FF0000' style={{ paddingRight: 8, paddingTop: 4 }} />

                            </View>
                            <View style={{ marginBottom: 150 }}></View>
                        </ScrollView>
                        <View style={{ flexDirection: 'row', marginTop: (Dimensions.get('window').height / 2) * 1.81, position: 'absolute', backgroundColor: '#84c708', width: '100%', height: '6%' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                                <Icon name='home' size={30} color='orange' style={{ paddingLeft: '5%', paddingTop: '2%' }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('AllProducts')}>
                                <Icon name='logo-bitbucket' size={30} color='#fff' style={{ paddingLeft: '20%', paddingTop: '2%' }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('MyAccount')}>
                                <Icon name='person' size={30} color='#fff' style={{ paddingLeft: '20%', paddingTop: '2%' }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Cart')}>
                                <Icon name='cart' size={30} color='#fff' style={{ paddingLeft: '20%', paddingTop: '2%' }} />
                            </TouchableOpacity>
                        </View>
                    </View> : <AddressInformation />}

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
    },
    // container: {flex:1 ,backgroundColor: 'white' },
    child: { width, },
    text: { fontSize: 15, marginTop: 6 },

})
const mapStateToProps = (state) => ({
    totalItems: state.cart.totalItems
})
const mapDispatchToProps = {
}
export default connect(mapStateToProps)(Home)