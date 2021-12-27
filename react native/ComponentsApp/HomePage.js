import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {StyleSheet,TextInput,View,Text,ScrollView,Image,Keyboard,TouchableOpacity, KeyboardAvoidingView,} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';
import LogoutBtn from '../assets/Images/LogoutBtn.png'
import Startplay from '../assets/Images/Startplay.png'
import profile from '../assets/Images/profile.png'
import podiumBtn from '../assets/Images/podiumBtn.png'
import homepage from '../assets/Images/homepage.png'

const HomePage = props =>{
 
  const LogOut= async()=>{
      await AsyncStorage.removeItem('UserID')
      props.navigation.navigate('Login_Page')
    }
    return(
        <View style={{alignItems: 'center',backgroundColor:'pink', flex:1}}>
           <TouchableOpacity
             onPress={LogOut}
            >
           <Image
            source={LogoutBtn}
            style={{
            width: 40,
            height: 400,
            resizeMode: 'contain',
            margin: 30,
            marginTop:-150,
            marginRight:280,
            borderRadius:50,
            marginLeft:-5
         
            
          }}
        />
           </TouchableOpacity>
        <Text style={{textAlign:'center',fontSize:50,marginTop:-200}}>Wallcome</Text>
         <Image
           source={homepage}
           style={{
            width: '50%',
            height: 400,
            resizeMode: 'contain',
            margin: 30,
            marginTop:-20,
            marginRight:-15,
            borderRadius:50,
            marginLeft:-5
             
            
          }}
        />
        <View style={{
           flexDirection: "row" ,marginLeft: 20, justifyContent: 'space-evenly'
            
          }}>
        <TouchableOpacity 
        onPress={() => props.navigation.navigate('Winner')}>
         
        <Image
            source={podiumBtn}
            style={{
             width: 50,
             height: 100,
             resizeMode: 'contain',
             margin: 30,
             marginTop:-40,
             marginLeft:20
            }}
           
            />
         </TouchableOpacity>
         <TouchableOpacity  
            onPress={() => props.navigation.navigate('FlapyGame')}>
        <Image
            source={Startplay}
            style={{
             width: 150,
             height: 100,
             resizeMode: 'contain',
             margin: 30,
             marginTop:-40,
             marginLeft:10
            }}
           
            />
         </TouchableOpacity>
         <TouchableOpacity  
         onPress={() => props.navigation.navigate('EditProfile')}>
        <Image
            source={profile}
            style={{
             width: 50,
             height: 100,
             resizeMode: 'contain',
             margin: 30,
             marginTop:-40,
             marginLeft:0
            }}
           
            />
         </TouchableOpacity>
        </View>
      </View>
     
    )

}
export default HomePage;

