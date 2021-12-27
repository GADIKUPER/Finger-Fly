
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import profile from '../assets/Images/profile.png'
import Loader from '../ComponentsApp/Loader';

const EditProfile = (props) => {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Picture, setPicture] = useState(profile);
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
//   const [
//     isEditProfileSuccess,
//     setIsEditProfileSuccess
//   ] = useState(false);

//   const emailInputRef = createRef();
//   const ageInputRef = createRef();
//   const addressInputRef = createRef();
//   const passwordInputRef = createRef();

  const handleSubmitButton = () => {
    setErrortext('');
    if (!FirstName) {
      alert('Please fill FirstName');
      return;
    }
    if (!LastName) {
      alert('Please fill LastName');
      return;
    }
  
    //Show Loader
    // setLoading(true);
    // var dataToSend = {
    //   firstname: FirstName,
    //   lastname: LastName,
    // };
    // var formBody = [];
    // for (var key in dataToSend) {
    //   var encodedKey = encodeURIComponent(key);
    //   var encodedValue = encodeURIComponent(dataToSend[key]);
    //   formBody.push(encodedKey + '=' + encodedValue);
    // }
    // formBody = formBody.join('&');

    fetch('http://ruppinmobile.tempdomain.co.il/site06/api/Users/EditProfile', {
      method: 'PUT',
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
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };
 
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
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
              placeholder="Enter Firstname"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
                 style={styles.inputStyle}
                 onChangeText={(LastName) => setLastName(LastName)}
                 underlineColorAndroid="#f000"
                 placeholder="Enter Lastname"
                 placeholderTextColor="#8b9cb5"
                 autoCapitalize="sentences"
                 returnKeyType="next"
                 onSubmitEditing={() =>
                   emailInputRef.current && emailInputRef.current.focus()
                 }
              blurOnSubmit={false}
            />
          </View>
         
          <View>
        <TouchableOpacity  
         onPress={() => props.navigation.navigate('Picture')}>
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
         
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>
              {errortext}
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>Change Now</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
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
  });
export default EditProfile;