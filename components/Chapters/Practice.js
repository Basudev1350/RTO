import React, { Component } from 'react';
import { ScrollView,TouchableOpacity,Text,Pressable, View,StyleSheet,Image,Modal,ActivityIndicator,  Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

class Practice extends Component {
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
  render() {
    return (
      <ScrollView  style = {styles.scroll}>
      {
      this.state.loader ?
      <ActivityIndicator size={100} color="green" marginTop={200} /> :
      <ScrollView>
        {this.state.chapters.map((data, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => this.props.navigation.navigate('PracticeContent',{chapterId:data.id})}>
              <View style = {styles.box1} >
                <View style = {styles.box12}>
                  <View  style = {styles.box14} >
                    <Text  style = {styles.boxbutton} >{index+1}</Text>
                  </View>
                  {/* <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/5453/5453711.png'}}
                  style={{width: 50, height: 50}} /> */}
                  <Text style = {styles.boxfont}>{data.chapterTitle}</Text>
                  <Pressable style={{justifyContent: 'center',alignItems: 'center'}} onPress={() => this.props.navigation.navigate('PracticeContent',{chapterId:data.id})}>
                    <Text style = {styles.boxfontcolor}><Icon name="angle-right" size={25} color="#4F7942"/></Text>
                  </Pressable>
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
export default Practice;

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
          borderRadius: 100,
          backgroundColor:'#4F7942',
          marginRight:2,
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
})