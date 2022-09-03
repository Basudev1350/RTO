import React, { Component } from 'react';
import { ScrollView,Text, View,StyleSheet,ActivityIndicator,ImageBackground,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

class Questionbank extends Component { 
  constructor(){
    super();
    this.state={
      loader:true,
      cardNo:'',
      cardNo2:'',
      translated:'',
      translated2:''
    }
  }
  state = {
    questions: [],
    noOfQuestion: 0,
   }
   componentDidMount() {
    const { chapterId } = this.props.route.params;
    console.log(chapterId);
    axios.get(`https://rto-patente.herokuapp.com/api/get-question-and-asnwer/test/`+chapterId)
      .then(res => {
        const questions = res.data;
        const noOfQuestion = res.length;
        this.setState({ questions, noOfQuestion});
      })
      setTimeout(()=>{
        this.setState({loader:false})
      },3000)
   }
   benlang(data,index){
    axios.get('https://rto-patente.herokuapp.com/api/show-token')
        .then(response =>{
          axios.post('https://rto-patente.herokuapp.com/api/translate-data-bengali', 
          {
            _token:response.data,
            data:data })
          .then(response2 => this.setState({ translated :response2.data , cardNo : index}));
         
        });
   
  }
  benlang2(data,index){
    axios.get('https://rto-patente.herokuapp.com/api/show-token')
        .then(response =>{
          axios.post('https://rto-patente.herokuapp.com/api/translate-data-bengali', 
          {
            _token:response.data,
            data:data })
          .then(response2 => this.setState({ translated2 :response2.data , cardNo2 : index}));
         
        });
   
  }
  englang(data,index){
    axios.get('https://rto-patente.herokuapp.com/api/show-token')
        .then(response =>{
          axios.post('https://rto-patente.herokuapp.com/api/translate-data-english', 
          {
            _token:response.data,
            data:data })
          .then(response2 => this.setState({ translated :response2.data , cardNo : index}));
         
        });
   
  }
  englang2(data,index){
    axios.get('https://rto-patente.herokuapp.com/api/show-token')
        .then(response =>{
          axios.post('https://rto-patente.herokuapp.com/api/translate-data-english', 
          {
            _token:response.data,
            data:data })
          .then(response2 => this.setState({ translated2 :response2.data , cardNo2 : index}));
         
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
        {this.state.questions.map((data, index) => {
         return (
          <View key={index} style = {styles.box1}>
            <View  style = {styles.box12} >
              <Text style = {styles.boxfontNo} >Q {index+1}:</Text>
              <Text  style = {styles.boxfont} >{data.question}</Text>
            </View>
            <View  style = {styles.box12} >
            <Text style = {styles.boxsubfont}> {this.state.cardNo == index ? this.state.translated : null } </Text>
            </View>
            <View style = {styles.box12} >
              <Text style = {styles.boxsubfontAns} >Ans:</Text>
              <Text style = {styles.boxsubfont} >{data.getcorrectansid.answer}</Text>
              <Text style = {styles.boxsubfont}> {this.state.cardNo2 == index ? this.state.translated2 : null } </Text>
            </View>
            <View  style = {styles.box12} > 
                  <TouchableOpacity style = {styles.box15} onPress ={()=>this.benlang(data.question,index) || this.benlang2(data.getcorrectansid.answer,index)}  >  
                    <Icon name="language" size={23} color="#fff" /> 
                    <Text style = {styles.buttontext}>Bengali</Text>  
                  </TouchableOpacity> 
                  <TouchableOpacity style = {styles.box15} onPress ={()=>this.englang(data.question,index) || this.englang2(data.getcorrectansid.answer,index)}  >  
                    <Icon name="language" size={23} color="#fff" /> 
                    <Text style = {styles.buttontext}>English</Text>  
                  </TouchableOpacity> 
                </View>
          </View>
         );
      })}  
        </ScrollView>
         }
         </ScrollView>  
      </ImageBackground>  
    );
  }
}
export default Questionbank;

const styles = StyleSheet.create ({
    box1:{
      marginTop: 5,
      backgroundColor:'#fff',
      width:'100%',
      paddingRight:'5%',
      paddingLeft:'5%',
      paddingTop:'2%',
      paddingBottom:'3%',
      borderRadius:5,
      borderColor:'#96271f',
      borderWidth:0.5,
      shadowColor:'#96271f',
      shadowOpacity:0.3,
      shadowRadius: 0.4,
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
        },
        scroll:{
            padding: 10,
            backgroundColor:'transparent'
         },
         box2:{
            marginTop: 10
          },
          boxfontNo:{
            fontSize: 16,
            margin: 5,
            fontWeight: '900'
          },
          boxfont:{
            flex:1,
            fontSize: 16,
            margin: 5,
            fontWeight: '900'
          },
          boxsubfont:{
            fontSize: 16,
            textAlign: 'left',
            margin: 5,
            fontWeight: '900'
          },
          boxsubfontAns:{
            fontSize: 16,
            textAlign: 'left',
            margin: 5,
            color: '#228b22',
            fontWeight: '900'
          },
          box12:{
            display:'flex',
            flexDirection:'row'
        },
        box3:{
          borderRadius:10,
          width:'40%',
          backgroundColor:'#008080'
        },
        buttontext:{
          fontSize:15,
          fontWeight:'800',
          textAlign:'center',
          color:'#fff',
          marginLeft:5
         },
 })