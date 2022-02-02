import React, { Component } from 'react';
import { ScrollView,TouchableOpacity,Image,Text, View,StyleSheet, ActivityIndicator } from 'react-native';

class Home extends Component {
  constructor(){
    super();
    this.state={
      loader:true
    }
  }
  componentDidMount(){
    setTimeout(()=>{
      this.setState({loader:false})
    },3000)
  }
  render() {
    return (
    <ScrollView  style = {styles.scroll}>
         {
           this.state.loader ?
            <ActivityIndicator size={100} color="green" marginTop={200} /> 
           :<ScrollView>
           <TouchableOpacity onPress={() => this.props.navigation.navigate('Questions')}>
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
         </TouchableOpacity >
         <TouchableOpacity onPress={() => this.props.navigation.navigate('Practice')}>
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
         </TouchableOpacity >
         <TouchableOpacity onPress={() => this.props.navigation.navigate('Exam')}>
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
         }
          </ScrollView>   
    );
  }
}
export default Home;

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