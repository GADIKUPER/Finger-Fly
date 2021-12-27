import React,{Component} from 'react';
import { StyleSheet, View,Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from '../ComponentsApp/Login';
import RegisterScreen from '../ComponentsApp/Register'
import HomePage from '../ComponentsApp/HomePage'
import FlapyGame from '../ComponentsApp/FlapyGame'
import BirdRotation from '../Animation/birdRotation';
import EditProfile from '../ComponentsApp/EditProfile';
import Picture from '../ComponentsApp/Picture'
import Winner from '../ComponentsApp/Winners';
import EditPicture from '../ComponentsApp/EditPicture';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

function SplashScreen({navigation}){
  setTimeout(async()=>{
    let UserId = await AsyncStorage.getItem('UserID')
    // UserId = parseInt(UserId)
    if(UserId != undefined && UserId != null){
        navigation.replace('HomePage');
    }
    else{
    navigation.replace('Login_Page');
    }
  },5000);
  return (
    <View style={{backgroundColor:'pink',alignItems:'center',justifyContent:'center',flex:1}}>
      <Text style={{marginTop:10,fontSize:50,fontFamily:'DEBBY'}}>FingerFly</Text>
      <BirdRotation/>
    </View>
  );
}

export default class Navigation extends Component {

  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator>

          {<Stack.Screen 
          name='splash_Screen' 
          component={SplashScreen}
          options={{
            headerShown:false
          }}/>}

          <Stack.Screen 
          name='Login_Page' 
          component={LoginPage} 
          options={{
            headerShown:false
          }}/>
           
        <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: 'Register', //Set Header Title
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      /> 
 <Stack.Screen
        name="Picture"
        component={Picture}
        options={{
          headerShown:false
        }}
      />

    <Stack.Screen
        name="EditPicture"
        component={EditPicture}
        options={{
          headerShown:false
        }}
      />
           <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{
          headerShown:false
        }}
      />

        <Stack.Screen
        name="FlapyGame"
        component={FlapyGame}
        options={{
          headerShown:false
        }}
      />
        <Stack.Screen
        name="Winner"
        component={Winner}
        options={{
          headerShown:false
        }}
      />  
          <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerShown:false
        }}
      />
          
        </Stack.Navigator>
      </NavigationContainer>
      
     )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginBottom: -50,
    marginTop:-20
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
 
});
