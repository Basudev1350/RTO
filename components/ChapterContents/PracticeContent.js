import React, { Component } from 'react';
import {Alert, ScrollView,TouchableOpacity,Text,Pressable, View,StyleSheet,Image,Modal,ActivityIndicator,ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

class PracticeContent extends Component {
  constructor(props){
    super(props);
    this.state={
      questions:  [],
      loader:true,
      cardNo:'',
      cardNo2:'',
      cardNo3:'',
      translated:'',
      translated2:'',
      translated3:'',
      modalVisible: false
    }
  }
  state = {
    chapters: [],
    noOfChapters: 0,
  
   }
   setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
   }

  componentDidMount() {
    const { chapterId } = this.props.route.params;
    axios.get(`https://lmpatente.srkptechnologies.com/api/get-all-chapte-content/`+chapterId)
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
    axios.get('https://lmpatente.srkptechnologies.com/api/show-token')
        .then(response =>{
          axios.post('https://lmpatente.srkptechnologies.com/api/translate-data-english', 
          {
            _token:response.data,
            data:data })
          .then(response2 => this.setState({ translated :response2.data , cardNo : index}));
         
        });
   
  }
  englang2(data,index){
    axios.get('https://lmpatente.srkptechnologies.com/api/show-token')
        .then(response =>{
          axios.post('https://lmpatente.srkptechnologies.com/api/translate-data-english', 
          {
            _token:response.data,
            data:data })
          .then(response2 => this.setState({ translated2 :response2.data , cardNo2 : index}));
         
        });
   
  }
  englang3(data,index){
    axios.get('https://lmpatente.srkptechnologies.com/api/show-token')
        .then(response =>{
          axios.post('https://lmpatente.srkptechnologies.com/api/translate-data-english', 
          {
            _token:response.data,
            data:data })
          .then(response2 => this.setState({ translated3 :response2.data , cardNo3 : index}));
         
        });
   
  }
  benlang(data,index){
    axios.get('https://lmpatente.srkptechnologies.com/api/show-token')
        .then(response =>{
          axios.post('https://lmpatente.srkptechnologies.com/api/translate-data-bengali', 
          {
            _token:response.data,
            data:data })
          .then(response2 => this.setState({ translated :response2.data , cardNo : index}));
         
        });
   
  }
  benlang2(data,index){
    axios.get('https://lmpatente.srkptechnologies.com/api/show-token')
        .then(response =>{
          axios.post('https://lmpatente.srkptechnologies.com/api/translate-data-bengali', 
          {
            _token:response.data,
            data:data })
          .then(response2 => this.setState({ translated2 :response2.data , cardNo2 : index}));
         
        });
   
  }
  benlang3(data,index){
    axios.get('https://lmpatente.srkptechnologies.com/api/show-token')
        .then(response =>{
          axios.post('https://lmpatente.srkptechnologies.com/api/translate-data-bengali', 
          {
            _token:response.data,
            data:data })
          .then(response2 => this.setState({ translated3 :response2.data , cardNo3 : index}));
         
        });
   
  }
  engitlang(data,index){
    axios.get('https://lmpatente.srkptechnologies.com/api/show-token')
        .then(response =>{
          axios.post('https://lmpatente.srkptechnologies.com/api/translate-data-eng-to-italy', 
          {
            _token:response.data,
            data:data })
          .then(response2 => this.setState({ translated :response2.data , cardNo : index}));
         
        });
   
  }
  engitlang2(data,index){
    axios.get('https://lmpatente.srkptechnologies.com/api/show-token')
        .then(response =>{
          axios.post('https://lmpatente.srkptechnologies.com/api/translate-data-eng-to-italy', 
          {
            _token:response.data,
            data:data })
          .then(response2 => this.setState({ translated2 :response2.data , cardNo2 : index}));
         
        });
   
  }
  engitlang3(data,index){
    axios.get('https://lmpatente.srkptechnologies.com/api/show-token')
        .then(response =>{
          axios.post('https://lmpatente.srkptechnologies.com/api/translate-data-eng-to-italy', 
          {
            _token:response.data,
            data:data })
          .then(response2 => this.setState({  translated3 :response2.data , cardNo3 : index}));
         
        });
   
  }
  render() {
    const { modalVisible } = this.state;
    const { chapterId ,totalQ} = this.props.route.params;
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
            <TouchableOpacity key={index} onPress={() => this.props.navigation.navigate('PracticeBank',{chapterId:data.id , totalQ:data.noOfQuestions})}>
              <View style = {styles.box1} >
                <View style = {styles.box12}>
                  <Image source={require('../img/manual.jpg')}
                  style={{width: 50, height: 50}} />
                  <Text style = {styles.boxfont}>{this.state.cardNo !== index ?  data.chapterTitle : this.state.translated }</Text>
                </View>
                <View  style = {styles.box13} >
                 <Text style = {styles.boxfont3}> {this.state.cardNo2 !== index ?  data.chapterSubTitle : this.state.translated2  }</Text>
                 <View >
                  <Pressable onPress={() => this.props.navigation.navigate('ExamBank',{chapterId:data.id , totalQ:data.noOfQuestions})}>
                    <Text style = {styles.boxfontcolor}><Icon name="angle-right" size={25} color="#4F7942"/></Text>
                  </Pressable>
                  </View>
                  </View>
                 <Text style = {styles.boxfont2}> {this.state.cardNo3 !== index ?  data.content : this.state.translated3  }</Text>
                <View  style = {styles.box12} >
                  <View  style = {styles.box14} >
                    <Text  style = {styles.boxbutton} >{data.noOfQuestions} Questions</Text>
                  </View>
                  <TouchableOpacity style = {styles.box15} onPress ={()=>{this.englang(data.chapterTitle,index); this.englang2(data.chapterSubTitle,index); this.englang3(data.content,index);}} >  
                    <Icon name="language" size={23} color="#fff" />
                    <Text style = {styles.buttontext}>English</Text>  
                  </TouchableOpacity> 
                  <TouchableOpacity style = {styles.box15}  onPress ={()=>{this.benlang(data.chapterTitle,index); this.benlang2(data.chapterSubTitle,index); this.benlang3(data.content,index);}}>  
                    <Icon name="language" size={23} color="#fff" />
                    <Text style = {styles.buttontext}>Bengali</Text>  
                  </TouchableOpacity> 
                  <TouchableOpacity style = {styles.box15}  onPress ={()=>{this.engitlang(data.chapterTitle,index); this.engitlang2(data.chapterSubTitle,index); this.engitlang3(data.content,index);}}>  
                    <Icon name="language" size={23} color="#fff" />
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
export default PracticeContent;

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
          flex: 1, 
          flexWrap: 'wrap',
          fontSize: 20,
          color: '#000',
          fontWeight:'800',
          margin: 4
        },
        boxfont2:{
          flex: 1, 
          flexWrap: 'wrap',
          fontSize: 15,
          color: '#000',
          fontWeight:'800',
          marginTop:15,
         marginBottom:10
        },
        boxfont3:{
          flex: 1, 
          flexWrap: 'wrap',
          fontSize: 18,
          color: '#000',
          fontWeight:'800',
          marginTop:5,
         marginBottom:5
        },
        boxsubfont:{
          fontSize: 16,
          textAlign: 'left',
          margin: 5,
          fontWeight: '600'
        },
        boxsmallfont:{
          fontSize: 12,
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
        box15:{
          display:'flex',
          flexDirection:'row',
          justifyContent:'space-around',
          borderRadius:100,
          paddingLeft:6,
          paddingRight:6,
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
        box16:{
          display:'flex',
          justifyContent:'flex-start',
          flexDirection:'row'
        },
        boxbutton:{
          fontSize:15,
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
        // centeredView: {
        //   flex: 1,
        //   justifyContent: 'flex-start',
        //   alignItems: 'flex-start'
        // },
        // modalView: {
        //   margin: 20,
        //   backgroundColor: "white",
        //   borderRadius: 20,
        //   padding: 35,
        //   alignItems: "center",
        //   shadowColor: "#000",
        //   shadowOffset: {
        //   width: 0,
        //   height: 2
        //   },
        //   shadowOpacity: 0.25,
        //   shadowRadius: 4,
        //   elevation: 5
        // },
        // button: {
        //   borderRadius: 20,
        //   padding: 10,
        //   elevation: 2
        // },
        // buttonOpen: {
        //   backgroundColor: "#F194FF",
        // },
        // buttonClose: {
        //   backgroundColor: "#2196F3",
        // },
        // textStyle: {
        //   color: "white",
        //   fontWeight: "bold",
        //   textAlign: "center"
        // },
        // modalText: {
        //   fontSize:18,
        //   marginBottom: 15,
        //   fontWeight: "bold",
        //   textAlign: "left"
        // },
        // centeredView2: {
        //   flex: 1,
        //   justifyContent: "center",
        //   alignItems: "center",
        //   marginTop: 5
        // }
})