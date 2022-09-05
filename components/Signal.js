import React, { Component } from 'react';
import { ScrollView,Text, View,StyleSheet, ActivityIndicator,StatusBar,Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
class signal extends Component {
  constructor(){
    super();
    this.state={
      loader:true,
      errorMessage: '',
      location: {},
      signals: [],
      noOfSignals: 0,
    }
  }
  state = {
    signals: [],
    noOfSignals: 0,
   }
  componentDidMount(){
    setTimeout(()=>{
      this.setState({loader:false})
    },3000)
    axios.get(`http://lmpatente.srkptechnologies.com/api/get-all-signals/`)
      .then(res => {
        const signals = res.data;
        const noOfSignals = res.length;
        this.setState({ signals, noOfSignals});
      })
      setTimeout(()=>{
        this.setState({loader:false})
      },3000)
  }
  render() {
    return (
    <ScrollView  style = {styles.scroll}>
          {/* <View style = {styles.box1}>
              <Image
            style={{width: 100, height: 100}} 
            source={require('./img/s41.png')}
           />
            <Text style = {styles.boxfontNo} >Stop</Text>
          </View>
          <View style = {styles.box1}>
              <Image
            style={{width: 100, height: 100}} 
            source={require('{data.signalPath}')}
           />
            <Text style = {styles.boxfontNo} >SOS</Text>
          </View> */}
            {
      this.state.loader ?
      <ActivityIndicator size={100} color="green" marginTop={200} /> :
        <ScrollView>
        {this.state.signals.map((data, index) => {
  
         return (
          <View style = {styles.box1}>
           <Text style = {styles.boxfontNo} >Q {index+1}:</Text>
           <Image source={{uri: data.signalPath}}
                    style={{width: 100,height:100}}/>
           <Text  style = {styles.boxfontNo} >{data.signalName}</Text>
         </View>
       
         );
      })}  
        </ScrollView>
         }
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
        marginTop: 15,
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