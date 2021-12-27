import React, {useState,useEffect,useRef} from 'react';
import {FontAwesome} from '../node_modules/@expo/vector-icons'
import { Camera } from 'expo-camera';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,SafeAreaView,
  Modal
} from 'react-native';

const Picture=props=>{
  const [Picture, setPicture] = useState(null);
  const camRef = useRef(null);
  const [type,setType] = useState(Camera.Constants.Type.back);
  const [hasPermission,setHasPermission] = useState(null);
  const [Open, setOpen] = useState(false);

  const [Base64,setBase64] = useState(null)
  useEffect(() => {
    (async()=>{
      const {status} = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted')
    })();
    }, [])

    function UploadImg(){
      let name = Math.random().toString(36).substring(7);
      fetch('http://ruppinmobile.tempdomain.co.il/site06/api/Img/UploadImage', {
        method: 'POST',
        body: JSON.stringify({
          name:name,folder:'Users',base64:Base64
        }),
        headers: {
          //Header Defination
          'Content-Type':
          'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          //Hide Loader
         console.log(Base64);
          console.log(responseJson);
          
          if (responseJson.isOk != true) {
            props.navigation.navigate('RegisterScreen',{path:responseJson.path})
          } 
          console.log(responseJson.isOk);
        })
        .catch((error) => {
          //Hide Loader
         
          console.error(error);
        });
    }
  
    if(hasPermission === null){
      return <View/>
    }
  
    if(hasPermission === false){
      return<Text>false</Text>
    }
    async function takePicture(){
      if(camRef){
        const data = await camRef.current.takePictureAsync({base64:true});
        setPicture(data.uri)
        setBase64(data.base64)
        setOpen(true);
       
      }
    }
        return(
          <SafeAreaView style={styles.container}>
          <Camera style={{flex:1}}
          type={type}
          ref={camRef}>
            <View style={{flex:1,backgroundColor:'transparent',flexDirection:'row'}}>
              <TouchableOpacity style={{position:'absolute',bottom:20,left:20,}}
              onPress = {()=>{
                setType(
                  type === Camera.Constants.Type.back
                  ?Camera.Constants.Type.front:Camera.Constants.Type.back
                );
              }}>
                <Text style={{fontSize:20,marginBottom:13,color:'#FFF'}}>Trocar</Text>
              </TouchableOpacity>
            </View>
          </Camera>
          <TouchableOpacity onPress={takePicture} style={{justifyContent:'center',alignItems:'center',backgroundColor:'#121212',margin:20,borderRadius:10,height:50}}>
            <FontAwesome name="camera" size={23} color="#FFF"/>
          </TouchableOpacity>
          {Picture && 
          <Modal animationType='slide'
          transparent={false}
          visible={Open}>
            <View style={{flex:1,justifyContent:'center',alignItems:'center',margin:20}}>
              <TouchableOpacity style={{margin:10}} onPress={()=>setOpen(false)}>
                <FontAwesome name="window-close" size={50} color="#FF0000"/>
                <Button title="i love this photo" name="image" onPress={UploadImg}></Button>
              </TouchableOpacity>
            <Image style={{width:'100%',height:300,borderRadius:20}}
              source={{uri:Picture}}  />
          
            </View>
          </Modal>}
        </SafeAreaView>
        )
}
export default Picture;
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
 
