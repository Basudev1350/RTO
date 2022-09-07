import React, { Component } from 'react';
import { ScrollView,Text, View,StyleSheet, ActivityIndicator,StatusBar,Image,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
class signal extends Component {
  constructor(){
    super();
    this.state={
      loader:true,
      errorMessage: '',
      location: {},
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
    // axios.get(`http://lmpatente.srkptechnologies.com/api/get-all-signals/`)
    //   .then(res => {
    //     const signals = res.data;
    //     const noOfSignals = res.length;
    //     this.setState({ signals, noOfSignals});
    //   })
      axios.get('https://lmpatente.srkptechnologies.com/api/get-all-signals/')
      .then(res => {
        if(res != null)
        {
          const signals     = res.data;
          const noOfSignals = res.length;
          this.setState({ signals, noOfSignals,loader:false});
        }
      }).catch(error => {
        if(error != null)
        {
          const signals     = error.response.data;
          const noOfSignals = error.response.length;
          this.setState({ signals, noOfSignals,loader:false});
        }
        else{
        Alert.alert("OOps ! Server iss");
        this.props.navigation.navigate('Home');
        }
      });
      setTimeout(()=>{
        this.setState({loader:false})
      },3000)
      
  }
  render() {
    return (
      <ScrollView  style = {styles.scroll}>
      {
      this.state.loader ?
      <ActivityIndicator size={100} color="green" marginTop={200} /> :
      <ScrollView>
        {this.state.signals.map((data, index) => {
          return (
              <View style = {styles.box1} >
                <View style = {styles.box12}>
                  <Text style = {styles.boxfontNo} >{index+1}:</Text>
                  <Image source={{uri: data.signalPath}}
                    style={{width: 90,height:90}}/>
                   <Text  style = {styles.boxfontNo} >{data.signalName}</Text>
                </View>
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
            fontSize: 15,
            margin: 5,
            fontWeight: '900',
            marginTop:30,
          }
 })