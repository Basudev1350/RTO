import React, { Component } from 'react';
import { ScrollView,TouchableOpacity,Image,Text, View,StyleSheet } from 'react-native';


class HomeComponent extends Component {
  render() {
    return (
       <ScrollView style = {styles.scroll}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('QuestionbankComponent')}>
          <View style = {styles.box1} >
          <View style = {styles.box12}>
           <Image source={{uri: 'https://image.flaticon.com/icons/png/512/224/224641.png'}}
           style={{width: 50, height: 50}} />
          <Text style = {styles.boxfont}>Question Bank</Text>
          </View>
          <View style = {styles.box2}>
          <Text style = {styles.boxsubfont}>List of questions & answers and meaning of road signs</Text>
          </View>
          </View>
          </TouchableOpacity>
          <View style = {styles.box1}>
          <View style = {styles.box12}>
           <Image source={{uri: 'https://image.flaticon.com/icons/png/512/1205/1205526.png'}}
           style={{width: 50, height: 50}} />
          <Text style = {styles.boxfont}>Practice</Text>
          </View>
          <View style = {styles.box2}>
          <Text style = {styles.boxsubfont}>Test Your Knowledge without worrying about time</Text>
          </View>
          </View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ChapterComponent')}>
          <View style = {styles.box1} >
          <View style = {styles.box12}>
          <Image source={{uri: 'https://freepngimg.com/thumb/paper_sheet/50192-9-exam-image-hq-image-free-png.png'}}
           style={{width: 50, height: 50}} />
          <Text style = {styles.boxfont}>Exam</Text>
          </View>
          <View style = {styles.box2}>
          <Text style = {styles.boxsubfont}>Time and question bound test exactly same as actual RTO test</Text>
          </View>
          </View>    
          </TouchableOpacity>
       </ScrollView>
    );
  }
}
export default HomeComponent;

const styles = StyleSheet.create ({
    box1:{
      marginTop: 10,
      borderRadius:5,
      height:150,
      backgroundColor:'#fff',
      padding:20,
      width:'100%'
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
            color: '#000',
            fontWeight:'800',
            margin: 10
          },
          boxsubfont:{
            fontSize: 16,
            color: '#000',
            textAlign: 'left',
            marginTop: 5
          },
          box12:{
            display:'flex',
            flexDirection:'row'
        }
 })