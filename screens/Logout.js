import AsyncStorage from '@react-native-community/async-storage';
import React, { Component, Alert } from 'react';
import { View, Text,BackHandler } from 'react-native';
class Logout extends Component {
  constructor(props) {
        super(props);
        this.state = {
            load: false

        }
    }
    checkUser = async () => {
        // var user = await AsyncStorage.getItem('userData');
        // this.setState({ data: user })
        // console.log(user)
        await AsyncStorage.removeItem('Phone')
        var Phone_num = await AsyncStorage.getItem('Phone');
        // this.setState({ Phone_Number: Phone_num })
        // await AsyncStorage.removeItem('Phone')
        // console.log(Phone_num);
        if (Phone_num == null) {
            console.log('phone',Phone_num)
            //    this.props.navigation.navigate('Login');
            Alert.alert(
                "Logout",
                "App will close",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => BackHandler.exitApp() }
                ]
              );
            
            // this.setState({ load: true })
        }
        else {
            // this.setState({ load: false })
            // return
            this.props.navigation.goBack();
        }
    }
    componentDidMount() {
        this.checkUser();
    }
    render() {
        return (
            <View>
                <Text></Text>
            </View>
        );
    }
}

export default Logout;