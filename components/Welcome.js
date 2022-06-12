import React, { Component } from 'react';
import {View, Image,ActivityIndicator} from 'react-native';
class Welcome extends Component {
    componentDidMount(){
        setTimeout(()=>{
            this.props.navigation.replace('Home')
        },3000)
      }
  render() {
    return (
        <View style={{  flex: 1, justifyContent: "center",  alignItems: "center" }}>
         <Image
            style={{width: 270, height: 270}} 
            source={require('../assets/rto1.png')}
          />
          <ActivityIndicator size={50} color="green" marginTop={10} /> 
        </View>
    );
  }
}
export default Welcome;

