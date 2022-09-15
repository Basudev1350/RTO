import React, { Component } from 'react';
import { ScrollView,Text, View,StyleSheet, ActivityIndicator,StatusBar,Image,FlatList,TouchableOpacity,ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
class signal extends Component {
  constructor(){
    super();
    this.state={
      loader:true,
      // errorMessage: '',
      // location: {},
    }
  }
  state = {
    // signals: [],
    // noOfSignals: 0,
    data:[]
   };
  componentDidMount(){
    setTimeout(()=>{
      this.setState({loader:false})
    },3000)
    this.fetchData();
      // axios.get('https://lmpatente.srkptechnologies.com/api/get-all-signals/')
      // .then(res => {
      //   if(res != null)
      //   {
      //     const signals     = res.data;
      //     const noOfSignals = res.length;
      //     this.setState({ signals, noOfSignals,loader:false});
      //   }
      // }).catch(error => {
      //   if(error != null)
      //   {
      //     const signals     = error.response.data;
      //     const noOfSignals = error.response.length;
      //     this.setState({ signals, noOfSignals,loader:false});
      //   }
      //   else{
      //   Alert.alert("OOps ! Server iss");
      //   this.props.navigation.navigate('Home');
      //   }
      // });
      setTimeout(()=>{
        this.setState({loader:false})
      },3000)
      
  }
  // componentWillMount(){
  //   this.fetchData();
  // }
  fetchData = async () => {
    const response = await fetch("https://lmpatente.srkptechnologies.com/api/get-all-signals/");
    const json = await response.json();
    this.setState({ data: json})
  };
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
        zIndex: -1,
      }}
      source={require('./img/bg.jpg')}
    >
      <View  style = {styles.scroll}>
      {
      this.state.loader ?
      <ActivityIndicator size={100} color="green" marginTop={0}/> :
          <FlatList
           data={this.state.data}
           keyExtractor={(x,i)=>i}
           renderItem={({item,index}) =>
           <View style = {styles.box1} >
           <View style = {styles.box12}>
             <Text style = {styles.boxfontNo} >{index+1}:</Text>
             <View style = {styles.boximg}>
             <Image source={{uri: item.signalPath, CACHE: 'reload'}}
               style={{width: '100%', height:'100%'}}/>
               </View>
             <View style = {styles.box14}>
              <Text  style = {styles.boxfont} >{item.signalName}</Text>
             </View>
           </View>
         </View>
          }
          />
       }
       </View> 
       </ImageBackground>  
    );
  }
}
export default signal;

const styles = StyleSheet.create ({
    scroll:{
        padding: 10,
     },
    box1:{
        marginTop: 15,
        backgroundColor:'#fff',
        width:'100%',
        paddingRight:'10%',
        paddingTop:'5%',
        paddingBottom:'5%',
        borderRadius:5,
        display:'flex',
        flexDirection:'row',
        borderColor:'#96271f',
        borderWidth:0.5,
        shadowColor:'#96271f',
        shadowOpacity:0.3,
        shadowRadius: 0.4,
          },
        box12:{
          display:'flex',
          width:'100%',
          height: 125,
          flexDirection:'row',
          padding: 10,
          paddingTop:0,
          paddingBottom:0
        },
        boxfontNo:{
          fontSize: 14,
          marginRight:0,
          fontWeight: '900',
          marginTop:30,
        },
        boxfont:{
          fontSize: 14,
          margin:15,
          fontWeight: '800',
          marginTop:30,
          width:'60%'
        },
        boximg:{
          width:'37.5%',
          marginTop:2,
          marginBottom:2,
        },
        box14:{
          width: '100%',
        
        }
 })