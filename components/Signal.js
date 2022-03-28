import React, { Component } from 'react';
import { ScrollView,Text, View,StyleSheet, ActivityIndicator,StatusBar,Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
class signal extends Component {
  constructor(){
    super();
    this.state={
      loader:true,
      errorMessage: '',
      location: {}
    }
  }
  componentDidMount(){
    setTimeout(()=>{
      this.setState({loader:false})
    },3000)
  }
  render() {
    return (
    <ScrollView  style = {styles.scroll}>
          <View style = {styles.box1}>
              <Text style = {styles.boxfontNo} >1.</Text>
              <Image
            style={{width: 100, height: 100}} 
            source={require('./img/s41.png')}
           />
            <Text style = {styles.boxfontNo} >Stop</Text>
          </View>
          <View style = {styles.box1}>
              <Text style = {styles.boxfontNo} >2.</Text>
              <Image
            style={{width: 100, height: 100}} 
            source={require('./img/s220.png')}
           />
            <Text style = {styles.boxfontNo} >SOS</Text>
          </View>
    </ScrollView>   
    );
  }
}
export default signal;

const styles = StyleSheet.create ({
    scroll:{
        padding: 10,
        backgroundColor:'#ccc'
     },
    box1:{
        marginTop: 12,
        backgroundColor:'#fff',
        width:'100%',
        paddingRight:'10%',
        paddingTop:'2%',
        paddingBottom:'3%',
        borderRadius:5,
        display:'flex',
        flexDirection:'row'
          },
          box12:{
            display:'flex',
            flexDirection:'row'
        },
        boxfontNo:{
            fontSize: 20,
            margin: 5,
            fontWeight: '900',
            marginTop:30,
          }
 })