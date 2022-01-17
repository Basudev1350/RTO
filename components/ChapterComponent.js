import React, { Component } from 'react';
import { ScrollView,TouchableOpacity,Image,Text, View,StyleSheet } from 'react-native';


class ChapterComponent extends Component {
  render() {
    return (
       <ScrollView style = {styles.scroll}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('QuizComponent')}>
          <View style = {styles.box1} >
          <View style = {styles.box12}>
           <Image source={{uri: 'https://freepngimg.com/thumb/paper_sheet/50192-9-exam-image-hq-image-free-png.png'}}
           style={{width: 50, height: 50}} />
          <Text style = {styles.boxfont}>Chapter 1</Text>
          </View>
          </View>
          </TouchableOpacity>
          <TouchableOpacity>
          <View style = {styles.box1} >
          <View style = {styles.box12}>
          <Image source={{uri: 'https://freepngimg.com/thumb/paper_sheet/50192-9-exam-image-hq-image-free-png.png'}}
           style={{width: 50, height: 50}} />
          <Text style = {styles.boxfont}>Chapter 2</Text>
          </View>
          </View>    
          </TouchableOpacity>
       </ScrollView>
    );
  }
}
export default ChapterComponent;

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
            fontSize: 20,
            color: '#000',
            fontWeight:'800',
            margin: 10
          },
          box12:{
            display:'flex',
            flexDirection:'row'
        }
 })