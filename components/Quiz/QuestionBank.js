import React, { Component } from 'react';
import { ScrollView,Text, View,StyleSheet,ActivityIndicator } from 'react-native';
import axios from 'axios';

class Questionbank extends Component { 
  constructor(){
    super();
    this.state={
      loader:true
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
      },5000)
   }
  render() {
    return (
      <ScrollView  style = {styles.scroll}>
      {
      this.state.loader ?
      <ActivityIndicator size={100} color="green" marginTop={200} /> :
        <ScrollView>
        {this.state.questions.map((data, index) => {
         return (
          <View style = {styles.box1}>
            <View  style = {styles.box12} >
              <Text style = {styles.boxfontNo} >Q.: {index+1}</Text>
              <Text  style = {styles.boxfont} >{data.question}</Text>
            </View>
            <View style = {styles.box12} >
              <Text style = {styles.boxsubfont} >Ans :</Text>
              <Text style = {styles.boxsubfont} >{data.getcorrectansid.answer}</Text>
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
export default Questionbank;

const styles = StyleSheet.create ({
    box1:{
      marginTop: 5,
      backgroundColor:'#fff',
      width:'100%',
      paddingRight:'10%',
      paddingTop:'2%',
      paddingBottom:'3%',
      borderRadius:5
        },
        scroll:{
            padding: 10,
            backgroundColor:'#ccc'
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
          box12:{
            display:'flex',
            flexDirection:'row'
        },
        box3:{
          borderRadius:10,
          width:'40%',
          backgroundColor:'#008080'
        },
        boxbutton:{
          fontSize:18,
          color:'rgb(241, 226, 226)',
          fontWeight:'800',
          textAlign:'center',
          margin:10,
          color:'#fff'
          }
 })