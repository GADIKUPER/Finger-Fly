import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import flapy from '../assets/Images/flapy.png'
const Bird = ({BirdBottom,birdLeft}) =>{
    const birdWidth = 50
    const birdHight = 60
    return(
        
            <Image source={flapy} style={{ position:'absolute',
        
            width:birdWidth,
            height: birdHight,
            bottom: BirdBottom - (birdHight/2),
            left: birdLeft - (birdWidth/2)}}/>
       
        
    )
}

const styles=StyleSheet.create({
    container:{
       

    },
});

export default Bird;