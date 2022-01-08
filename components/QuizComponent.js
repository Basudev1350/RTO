import React, { Component } from 'react';
import { ScrollView,TouchableOpacity,Text, View,StyleSheet,Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
// import {Speech} from 'expo';
// import Tts from 'react-native-tts';
class QuizComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { index: 0,
       questions:  [],
       noOfQuestion: 0, };
  }
  onPress = () => {
    let i = this.state.index < this.state.questions.length ? this.state.index += 1 : 0;
    this.setState({ index: i });
  };
   componentDidMount() {
    axios.get(`https://877c-2405-201-8012-1026-2532-a5e9-4c36-f1c4.ngrok.io/api/get-question-and-asnwer/test`)
   .then(res => {
      const questions = res.data;
      this.setState({ questions:questions});
     })
   }
   render() {
      return (
        <ScrollView style = {styles.scroll}>
          {this.state.questions.slice(this.state.index, this.state.index+1).map((data,index) => {
          return (
            <View style = {styles.box2}>
            <View style = {styles.box4}>
            <View style = {styles.box5}>
            <Text style = {styles.boxfont}>{data.question}</Text>
            <TouchableOpacity >
            <Icon name="volume-up" size={30} />
            </TouchableOpacity>
            </View>
            <View style = {styles.box5}>
            <Image source={{uri: 'https://icon2.cleanpng.com/20180129/cve/kisspng-traffic-light-road-transport-vehicle-icon-traffic-light-5a6edd7da83ee4.9381976715172151016891.jpg'}}
            style={{width: 100,height:100}} />
            <TouchableOpacity style = {styles.languagebutton} >
            <Icon name="language" size={30} color={'#fff'}/>
            </TouchableOpacity>
            </View>
            </View>
            <TouchableOpacity style = {styles.box1}>
                <Text style = {styles.boxsubfont}>a ) {data.getchoice1stid.answer}</Text>  
            </TouchableOpacity>
            <TouchableOpacity style = {styles.box1}>
              <Text style = {styles.boxsubfont}>b ) {data.getchoice2ndid.answer}</Text>  
            </TouchableOpacity >
            <TouchableOpacity style = {styles.box1}>
              <Text style = {styles.boxsubfont}>c)  {data.getchoice3rdid.answer}</Text>  
            </TouchableOpacity>
            <TouchableOpacity style = {styles.box1}>
              <Text style = {styles.boxsubfont}>d ) {data.getchoice4thid.answer}</Text>  
            </TouchableOpacity>
          </View>
          );
        })}
         
          <View style = {styles.box12}>
            <View style = {styles.show}>
            <View style = {styles.right}>
            <Text style = {styles.boxfontcolor}><Icon name="check" size={25} color="#fff" />
            : 0</Text>
            </View>  
            <View style = {styles.wrong}>
            <Text style = {styles.boxfontcolor}><Icon name="close" size={25} color="#fff"/>
              : 0</Text>
            </View>
            </View> 
            <TouchableOpacity>
            <Image source={{uri: 'https://image.flaticon.com/icons/png/512/224/224641.png'}}
            style={{width: 50, height: 50}} />
            </TouchableOpacity>
            <TouchableOpacity style = {styles.box3} onPress={this.onPress} >
            <Text style = {styles.boxbutton}>Next</Text>  
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    }
  }
export default QuizComponent;

const styles = StyleSheet.create ({
        scroll:{
            backgroundColor:'#ccc'
         },
         box3:{
           borderRadius:10,
           width:'40%',
           backgroundColor:'#008080'
         },
         languagebutton:{
          backgroundColor:'#008080',
          borderRadius:30,
          padding:10,
          height:50,
          width:50,
          // shadowOffset:{
          //   width:30,
          //   height:30
          // },
          // shadowOpacity:5,
          // shadowRadius:25,
          // shadowColor:'blue'
         },
         box2:{
            marginTop: 20,
            padding:10
          },
          box1:{
              borderTopColor:'#000',
              borderTopWidth:1,
              backgroundColor:'#fff',
              paddingRight:'10%',
              paddingTop:'2%'
         },
         box4:{
          backgroundColor:'#fff',
          paddingRight:'10%',
          paddingTop:'2%'
         },
         boxfont:{
            fontSize: 20,
            fontWeight:'800',
            margin: 10
          },
          boxfontcolor:{
            fontSize: 20,
            fontWeight:'800',
            color:'#fff',
            margin: 10
          },
          boxsubfont:{
            fontSize: 18,
            fontWeight:'800',
            margin: 10
          },
          box5:{
            flexDirection:'row',
            justifyContent:'space-between',
          },
          box12:{
            backgroundColor:'#fff',
            display: 'flex',
            flexDirection:'row',
            justifyContent:'space-around',
            paddingTop:'5%',
            paddingBottom:'5%'
        },
        right:{
          backgroundColor:"#008080",
          borderTopStartRadius:10,
          borderBottomStartRadius:10
        },
        wrong:{
          backgroundColor:"#d12828",
          borderTopEndRadius:10,
          borderBottomEndRadius:10
        },
        show:{
          display:'flex',
          flexDirection:'row',
          justifyContent:'center'
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