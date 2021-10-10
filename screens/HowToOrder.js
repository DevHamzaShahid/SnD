import React, { Component } from 'react';
import {View,Text} from 'react-native';
import { WebView } from 'react-native-webview';
import Title from '../components/Title';
class HowToOrder extends Component {
    render() {
        return (
            <View style={{flex:1}}>
            <Title
                    title={'How To Order'}
                    // navigation={this.props.navigation}
                    // badge={this.props.totalItems + ''}
                    onPress={() => this.props.navigation.goBack()}
                />
            <WebView
              source={{
                uri: 'https://github.com/facebook/react-native'
              }}
              style={{ marginTop: 12 }}
            />
            </View>
        );
    }
}
export default HowToOrder;