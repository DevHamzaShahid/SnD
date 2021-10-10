import React, { Component } from 'react';
import { View, Text, Linking, TouchableOpacity } from 'react-native';
import Title from '../components/Title';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
class ContactUS extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      Addres: '',
      email: '',
      PhoneNumber: '',
      Time: '',
      
    }
  }
  async Contact() {
    let formData = new FormData();
    // formData.append('categories_id', this.props.route.params.cat_id);
    let response = await fetch('https://admin.sndgreens.com/api/contactus', {
      method: 'POST',
      // body: formData
    });
    let responseJson = await response.json();
    console.log(responseJson)
    this.setState({
      Addres: responseJson.Address,
      PhoneNumber: responseJson.Contact,
      email: responseJson.Email,
      Time: responseJson.Timing

    });
  }

  componentDidMount() {
    this.Contact();
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Title
          title={'Contact Us'}
          // navigation={this.props.navigation}
          // badge={this.props.totalItems + ''}
          onPress={() => this.props.navigation.goBack()}
        />
        <TouchableOpacity onPress={()=>{Linking.openURL('tel:'+this.state.PhoneNumber)}}>
        <View style={{ alignSelf: 'center', marginTop: 25 }}>
          <Icon style={{ alignSelf: 'center' }} name='phone' size={40} color='#84c708' />
          <Text style={{ alignSelf: 'center', fontSize: 22, color: '#84c708', fontWeight: 'bold' }}>
            Contact Number:
          </Text>
          <Text style={{ alignSelf: 'center' }}>{this.state.PhoneNumber}</Text>
        </View>
        </TouchableOpacity>
        <View style={{ alignSelf: 'center', marginTop: 25 }}>
          <Icon style={{ alignSelf: 'center' }} name='card-account-details-outline' size={40} color='#84c708' />
          <Text style={{ alignSelf: 'center', fontSize: 22, color: '#84c708', fontWeight: 'bold' }}>
            Address:
          </Text>
          <Text style={{ alignSelf: 'center',width:300 }}>{this.state.Addres}</Text>
        </View>
        <View style={{ alignSelf: 'center', marginTop: 25 }}>
          <Icon style={{ alignSelf: 'center' }} name='email' size={40} color='#84c708' />
          <Text style={{ alignSelf: 'center', fontSize: 22, color: '#84c708', fontWeight: 'bold' }}>
            Email:
          </Text>
          <Text style={{ alignSelf: 'center' }}>{this.state.email}</Text>
        </View>
        <View style={{ alignSelf: 'center', marginTop: 25 }}>
          <Icon style={{ alignSelf: 'center' }} name='clock-time-eleven-outline' size={40} color='#84c708' />
          <Text style={{ alignSelf: 'center', fontSize: 22, color: '#84c708', fontWeight: 'bold' }}>
            Timmings:
          </Text>
          <Text style={{ alignSelf: 'center' }}>{this.state.Time}</Text>
        </View>
        {/* <WebView
              source={{
                uri: 'https://github.com/facebook/react-native'
              }}
              style={{ marginTop: 12 }}
            /> */}
      </View>
    );
  }
}
export default ContactUS;