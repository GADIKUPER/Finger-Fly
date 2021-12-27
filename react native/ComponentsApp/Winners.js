import React,{useEffect,useState} from 'react';
import {StyleSheet,View,Text,Image,FlatList} from 'react-native';

function Winner(){
   
    const [isLoading,setisLoading] = useState(true)
    const [dataSource,setdataSource] = useState([])
    useEffect(() => {
        fetch('http://ruppinmobile.tempdomain.co.il/site06/api/Users/Get').then((response) =>response.json())
        .then((responseJson) =>{
            setisLoading(false)
            setdataSource(responseJson)
        })
       
    }, [])

   const _renderItem=({item}) => (
       <View style={styles.ite}>
        <Image source={item.PictureUri} style={{marginLeft:0,height:50,width:50}}/> 
             <Text style={{marginTop:-10,marginLeft:60,fontSize:20}} >
             {item.FirstName}  {item.LastName}  Score:{item.Score}</Text>
            
         
         </View>
    );
        return(
            <View style={styles.container}>
                <FlatList
                data={dataSource}
                renderItem={_renderItem}
                keyExtractor={(item,index) => index}/>
            </View>
        )
    }
    
    const styles=StyleSheet.create({
    container:{
        flex:1,
        
        backgroundColor:'#F5FCFF'
    },
    welcome:{
        fontSize:20,
        textAlign:'center',
        margin:10
    },
    ite: {
      padding:5,
      borderBottomWidth:1,
      borderBottomColor:'#eee'
    }
    })
    
export default Winner;