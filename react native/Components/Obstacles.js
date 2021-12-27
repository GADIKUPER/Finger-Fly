import React from 'react';
import { StyleSheet, Text, View ,Image } from 'react-native';
import tree from '../assets/Images/tree.jpg'
import tree2 from '../assets/Images/tree2.jpg'
const Obstacles = ({randomBottom,ObstaclesLeft,obstaclesWidth,obstaclesHight,gap}) =>{

    return(
        <>
            
              <Image source={tree} style={{
                     position:'absolute',
                     
                     width: obstaclesWidth,
                     height: obstaclesHight,
                     left: ObstaclesLeft,
                     bottom:randomBottom + obstaclesHight + gap,     
              }}/>
                <Image source={tree2} style={{
                    position:'absolute',
                   
                    width: obstaclesWidth,
                    height: obstaclesHight,
                    left: ObstaclesLeft,
                    bottom: randomBottom     ,     
              }}/>
              
        
        </>
    )
}
export default Obstacles