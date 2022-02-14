import React, { Component } from 'react';
import { ScrollView,TouchableOpacity,Text,Pressable, View,StyleSheet,Image,Modal,ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

class QuestionsContent extends Component {
  constructor(){
    super();
    this.state={
      loader:true
    }
  }
  state = {
    chapters: [],
    noOfChapters: 0,
   }
  componentDidMount() {
    const { chapterId } = this.props.route.params;
    axios.get(`https://rto-patente.herokuapp.com/api/get-all-chapte-content/`+chapterId)
   .then(res => {
      const chapters     = res.data;
      const noOfChapters = res.length;
      this.setState({ chapters, noOfChapters});
     })
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
        {this.state.chapters.map((data, index) => {
          return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('QuestionBank',{chapterId:data.id,totalQ:data.noOfQuestions})}>
              <View style = {styles.box1} >
                <View style = {styles.box12}>
                  <Image source={{uri: 'https://freepngimg.com/thumb/paper_sheet/50192-9-exam-image-hq-image-free-png.png'}}
                  style={{width: 50, height: 50}} />
                  <Text style = {styles.boxfont}>{data.chapterTitle}</Text>
                </View>
                <View  style = {styles.box13} >
                  <Text  style = {styles.boxsubfont} numberOfLines={4}>{data.chapterSubTitle}</Text>
                  <Pressable onPress={() => this.props.navigation.navigate('QuestionBank',{chapterId:data.id,totalQ:data.noOfQuestions})}>
                    <Text style = {styles.boxfontcolor}><Icon name="angle-right" size={25} color="#4F7942"/></Text>
                  </Pressable>
                </View>
                <View  style = {styles.box12} >
                  <View  style = {styles.box14} >
                    <Text  style = {styles.boxbutton} >{data.noOfQuestions} Questions</Text>
                  </View>
                  {/* <Pressable>
                  <View  style = {styles.box15} >
                    <Text  style = {styles.boxbutton} >Open chapter</Text>
                  </View>
                  </Pressable> */}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}  
      </ScrollView>
       }
       </ScrollView> 
    );
  }
}
export default QuestionsContent

const styles = StyleSheet.create ({
    box1:{
      marginTop: 10,
      borderRadius:5,
    //   height:100,
      backgroundColor:'#fff',
      padding:15,
      width:'100%'
        },
        scroll:{
            padding: 10,
            backgroundColor:'#ccc'
            
         },
          boxfont:{
            flex: 1, 
            flexWrap: 'wrap',
            fontSize: 20,
            color: '#000',
            fontWeight:'800',
            margin: 10
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
            flexDirection:'row'
          },
          box13:{
            display:'flex',
            justifyContent:'space-between',
            flexDirection:'row'
          },
          box14:{
            borderRadius:100,
            padding:10,
            backgroundColor:'#4F7942',
          },
          box15:{
            borderRadius:100,
            padding:10,
            backgroundColor:'#CD212A',
          },
          boxbutton:{
            fontSize:18,
            fontWeight:'800',
            textAlign:'center',
            color:'#fff'
          },
 })