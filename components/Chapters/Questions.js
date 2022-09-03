import React, { Component } from 'react';
import { ScrollView,TouchableOpacity,Text,Pressable, View,StyleSheet,Image,Modal,ActivityIndicator,  Alert ,ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

class Questions extends Component {
  constructor(){
    super();
    this.state={
      loader:true,
      translated:"",
      cardNo:''
    }
  }
  state = {
    chapters: [],
    noOfChapters: 0,
   }
  componentDidMount() {
    axios.get('https://rto-patente.herokuapp.com/api/get-all-chapters/')
    .then(res => {
      if(res != null)
      {
        const chapters     = res.data;
        const noOfChapters = res.length;
        this.setState({ chapters, noOfChapters,loader:false});
      }
    }).catch(error => {
      Alert.alert("OOps ! Server issue");
      this.props.navigation.navigate('Home');
    });
  }
  englang(data,index){
    axios.get('https://rto-patente.herokuapp.com/api/show-token')
        .then(response =>{
          axios.post('https://rto-patente.herokuapp.com/api/translate-data-english', 
          {
            _token:response.data,
            data:data })
          .then(response2 => this.setState({translated : response2.data , cardNo : index}));
         
        });
   
  }
  benlang(data,index){
    axios.get('https://rto-patente.herokuapp.com/api/show-token')
        .then(response =>{
          axios.post('https://rto-patente.herokuapp.com/api/translate-data-bengali', 
          {
            _token:response.data,
            data:data })
          .then(response2 => this.setState({translated : response2.data , cardNo : index}));
         
        });
   
  }
  engitlang(data,index){
    axios.get('https://rto-patente.herokuapp.com/api/show-token')
        .then(response =>{
          axios.post('https://rto-patente.herokuapp.com/api/translate-data-eng-to-italy', 
          {
            _token:response.data,
            data:data })
          .then(response2 => this.setState({ translated :response2.data , cardNo : index}));
         
        });
   
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
            zIndex: -1,
          }}
          source={require('../img/bg.jpg')}
        >
      <ScrollView  style = {styles.scroll}>
      {
      this.state.loader ?
      <ActivityIndicator size={100} color="green" marginTop={200} /> :
      <ScrollView>
        {this.state.chapters.map((data, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => this.props.navigation.navigate('QuestionsContent',{chapterId:data.id})}>
              <View style = {styles.box1} >
                <View style = {styles.box12}>
                  <View  style = {styles.box14} >
                    <Text  style = {styles.boxbutton} >{index+1}</Text>
                  </View>
                  {/* <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/5453/5453711.png'}}
                  style={{width: 50, height: 50}} /> */}
              
                  <Text style = {styles.boxfont}> {this.state.cardNo !== index ?  data.chapterTitle : this.state.translated  }</Text>
                  <Pressable style={{justifyContent: 'center',alignItems: 'center'}} onPress={() => this.props.navigation.navigate('QuestionsContent',{chapterId:data.id})}>
                    <Text style = {styles.boxfontcolor}><Icon name="angle-right" size={25} color="#4F7942"/></Text>
                  </Pressable>
                </View>
             
                <View style = {styles.box12}>
                  <TouchableOpacity style = {styles.box15} onPress ={()=>this.englang(data.chapterTitle,index)} >  
                    <Icon name="language" size={22} color="#fff" />
                    <Text style = {styles.buttontext}>English</Text>  
                  </TouchableOpacity> 
                  <TouchableOpacity style = {styles.box15} onPress ={()=>this.benlang(data.chapterTitle,index)} >  
                    <Icon name="language" size={22} color="#fff" />
                    <Text style = {styles.buttontext}>Bengali</Text>  
                  </TouchableOpacity> 
                  <TouchableOpacity style = {styles.box15} onPress ={()=>this.engitlang(data.chapterTitle,index)} >  
                    <Icon name="language" size={22} color="#fff" />
                    <Text style = {styles.buttontext}>Italy</Text>  
                  </TouchableOpacity> 
                </View>
              </View>
            </TouchableOpacity>
          );
        })}  
      </ScrollView>
       }
       </ScrollView> 
      </ImageBackground>
    );
  }
}
export default Questions

const styles = StyleSheet.create ({
  box1:{
    marginTop: 10,
    borderRadius:5,
  //   height:100,
    backgroundColor:'#fff',
    padding:15,
    width:'100%',
    borderColor:'#96271f',
    borderWidth:0.5,
    shadowColor:'#96271f',
    shadowOpacity:0.3,
    shadowRadius: 0.4,
  },
      scroll:{
          padding: 10,
          backgroundColor:'transparent'
       },
        boxfont:{
          alignContent:'center',
          flex: 1, 
          flexWrap: 'wrap',
          fontSize: 16,
          color: '#000',
          fontWeight:'500',
          margin: 5
        },
        boxsubfont:{
          fontSize: 16,
          textAlign: 'left',
          margin: 5,
          fontWeight: '600'
        },
        boxsmallfont:{
          fontSize: 13,
          textAlign: 'left',
          margin: 5,
          fontWeight: '900'
        },
        boxfontcolor:{
          fontSize: 16,
          fontWeight:'900',
          textAlign: 'right',
        },
        box12:{
          display:'flex',
          flexDirection:'row',
          marginTop:15
        },
        box13:{
          padding:0,
          display:'flex',
          justifyContent:'space-between',
          flexDirection:'row'
        },
        box14:{
          borderRadius: 0,
          backgroundColor:'#4F7942',
          width: 50,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        },
        boxbutton:{
          fontSize:18,
          fontWeight:'800',
          textAlign:'center',
          color:'#fff'
        },
        buttontext:{
          fontSize:15,
        fontWeight:'800',
        textAlign:'center',
        color:'#fff',
        marginLeft:5
         },
      
          box15:{
          display:'flex',
          flexDirection:'row',
          justifyContent:'space-around',
          borderRadius:100,
          paddingLeft:8,
          paddingRight:8,
          paddingTop:5,
          paddingBottom:5,
          backgroundColor:'#4F7942',
          borderColor:'#4F7942',
          borderWidth:0.9,
          shadowColor:'#96271f',
          shadowOpacity:0.3,
          shadowRadius: 0.4,
          marginRight:5,
          width:'25%'
          }
 })