import React, { Component } from 'react';
import {View, Image,ActivityIndicator,ImageBackground,StyleSheet} from 'react-native';
class Welcome extends Component {
    componentDidMount(){
        setTimeout(()=>{
            this.props.navigation.replace('Home')
        },3000)
      }
  render() {
    return (
      <ImageBackground
      style={{
        flex:1,
        height: '100%',
        padding:0,
        width: '100%',
        backgroundSize: 'cover',
        justifyContent:'center',
        backgroundColor:'#fff',
        zIndex: -1,
      }}
      
    >
        <View style={{  flex: 1, justifyContent: "center",  alignItems: "center" }}>
         <Image
            style={{width: 270, height: 270}} 
            source={require('../assets/rto2.png')}
          />
          <ActivityIndicator size={50} color="green" marginTop={10} /> 
        </View>
        </ImageBackground>  
    );
  }
}
export default Welcome;
