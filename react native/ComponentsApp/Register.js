import React, {useState, createRef,useEffect,useRef} from 'react';
import { Camera } from 'expo-camera';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import profile from '../assets/Images/profile.png'
import Loader from '../ComponentsApp/Loader';

const RegisterScreen =  (props) => {

  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Email, setUserEmail] = useState('');
  const [Picture, setPicture] = useState(profile);
  const [Password, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
 
  const {navigation}=props;
  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      console.log(props.route);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;

  },[navigation])

  const [hasPermission,setHasPermission] = useState(null);
  const [
    isRegistraionSuccess,
    setIsRegistraionSuccess
  ] = useState(false);

  const emailInputRef = createRef();
  const passwordInputRef = createRef();


  const handleSubmitButton = () => {
    setErrortext('');
    if (!FirstName) {
      alert('Please fill Name');
      return;
    }
    if (!LastName) {
      alert('Please fill Email');
      return;
    }
    if (!Email) {
      alert('Please fill Email');
      return;
    }
    
    if (!Password) {
      alert('Please fill Password');
      return;
    }
   
    //Show Loader
    setLoading(true);
    var dataToSend = {
      FirstName: FirstName,
      LastName: LastName,
      Email: Email,
      Password: Password ,
      PictureUri: Picture,
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    console.log(dataToSend);
    fetch('http://ruppinmobile.tempdomain.co.il/site06/api/Users/Register', {
      method: 'POST',
      body: formBody,
      headers: {
        //Header Defination
        'Content-Type':
        'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson>0) {
          setIsRegistraionSuccess(true);
          console.log(
            'Registration Successful. Please Login to proceed'
          );
          props.navigation.navigate('Login_Page')
        } else {
          setErrortext(responseJson.msg);
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };
  useEffect(() => {
  (async()=>{
    const {status} = await Camera.requestPermissionsAsync();
    setHasPermission(status === 'granted')
  })();
  }, [])

  if(hasPermission === null){
    return <View/>
  }

  if(hasPermission === false){
    return<Text>false</Text>
  }

  if (isRegistraionSuccess) {
    return (
      <View
      style={{
        flex: 1,
        backgroundColor: 'pink',
        justifyContent: 'center',
      }}>
      <Image
      //   source={require('../Image/success.png')}
        style={{
          height: 150,
          resizeMode: 'contain',
          alignSelf: 'center'
        }}
      />
      <Text style={styles.successTextStyle}>
        Registration Successful
      </Text>
    
    </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: '#307ecc'}}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
          <Image
             source={require('../assets/Images/flapy.png')}
            style={{
              width: '50%',
              height: 100,
              resizeMode: 'contain',
              margin: 30,
            }}
          />
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(FirstName) => setFirstName(FirstName)}
              underlineColorAndroid="#f000"
              placeholder="Enter First name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <TextInput
               style={styles.inputStyle}
               onChangeText={(LastName) => setLastName(LastName)}
               underlineColorAndroid="#f000"
               placeholder="Enter Last name"
               placeholderTextColor="#8b9cb5"
               autoCapitalize="sentences"
               returnKeyType="next"
               onSubmitEditing={() =>
                 emailInputRef.current && emailInputRef.current.focus()
               }
            blurOnSubmit={false}
          />
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(Email) => setUserEmail(Email)}
              underlineColorAndroid="#f000"
              placeholder="Enter Email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(Password) =>
                setUserPassword(Password)
              }
              underlineColorAndroid="#f000"
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              onSubmitEditing={() =>
                ageInputRef.current &&
                ageInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
         
      
        <View>
        <TouchableOpacity  
         onPress={}>
        <Image
            source={Picture}
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
        <View style={styles.SectionStyle}>
        <Image
            // source={props.route.params}
              
            style={{
             width: 50,
             height: 100,
             resizeMode: 'contain',
             margin: 30,
             marginTop:-40,
             marginLeft:0
            }}
           
            />
          
            </View>
          
         
         
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>
              {errortext}
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>Sign Up</Text>
         
          </TouchableOpacity>
        

        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
 export default RegisterScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  container:{
    flex:1,
    justifyContent:'center'
  }
});
 