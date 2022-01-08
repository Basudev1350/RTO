import React, { Component } from 'react';
import { ScrollView,Text, View,StyleSheet } from 'react-native';
import axios from 'axios';

class QuestionbankComponent extends Component {
  
  state = {
    questions: [],
    noOfQuestion: 0,
   }
   componentDidMount() {
    axios.get(`https://877c-2405-201-8012-1026-2532-a5e9-4c36-f1c4.ngrok.io/api/get-question-and-asnwer/test`)
   .then(res => {
      const questions = res.data;
      const noOfQuestion = res.length;
      this.setState({ questions, noOfQuestion});
     })
   }
  render() {
    return (
        <ScrollView style = {styles.scroll} >
        {this.state.questions.map((data, index) => {
         return (
           <View style = {styles.box1}>
          <View  style = {styles.box12} >
             <Text style = {styles.boxfont} >Q.: {index}</Text>
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
       
    );
  }
}
export default QuestionbankComponent;

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
          boxfont:{
            fontSize: 20,
            margin: 10,
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