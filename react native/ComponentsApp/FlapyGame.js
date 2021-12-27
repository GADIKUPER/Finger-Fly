import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,Dimensions,TouchableWithoutFeedback,TouchableOpacity,ImageBackground,Image } from 'react-native';
import Bird from '../Components/Bird';
import Obstacles from '../Components/Obstacles'
import city from '../assets/Images/backgroundcity.jpg'
import replay from '../assets/Images/replay.png'
import {Restart} from 'react-native-restart';
import backHome from '../assets/Images/backhome.png'
import AsyncStorage from '@react-native-async-storage/async-storage';

const FlapyGame=props=> {

  // בודק את גודל המסך 
   const screenWidth = Dimensions.get("screen").width
   const screenHight = Dimensions.get("screen").height
  const birdLeft = screenWidth / 2
  const [BirdBottom,setBirdBottom] = useState(screenHight/2)
  const [ObstaclesLeft,setObstaclesLeft] = useState(screenWidth) // מחשב את המכשול העליון
  const [ObstaclesLeft2,setObstaclesLeft2] = useState(screenWidth + screenWidth/2 +30) // משחב אתה המשכשול התחתון
  const [ObstaclesNegHeight,setObstaclesNegHeight] = useState(0) // באופן רנדומלי הוא יכוון את גובה המכשול העליון ומאיפה הוא מתחיל
  const [ObstaclesNegHeight2,setObstaclesNegHeight2] = useState(0) // באופן רנדומלי הוא יכוון את גובה המכשול התחתון ומאיפה הוא מתחיל
  const [isGameOver,setIsGameOver] = useState(false)
  const [score,setScore] = useState(1)
  // const [max,setMax] = useStata(0)
  const obstaclesWidth = 60
  const obstaclesHight = 300
  const gap = 200
  const gravity = 3
  let gameTimeId
  let gameObstacleId 
  let gameObstacleId2
  
  const [visible, setVisible] = useState(false);

  // ירידה של התמונה על גבי המסך בקפיצות של 3 על פי גודל המסך
  useEffect(()=>{
    // תנאי להמשיך לרדת עד שהוא יגיע ל 0 אבל בגלל שנתנו לא 
    // קפיצות של 3 הוא יגיע ל -1  
    if (BirdBottom>0){
      gameTimeId = setInterval(()=>{
        setBirdBottom(BirdBottom => BirdBottom - gravity)
      },30)// מילישניות
      return ()=>{
        clearInterval(gameTimeId)
      }
    }
  },[BirdBottom])
  console.log(BirdBottom);

  // התחלת מכשולים 
  useEffect(()=>{
    if(ObstaclesLeft>-obstaclesWidth){
      gameObstacleId = setInterval(()=>{
        setObstaclesLeft(ObstaclesLeft => ObstaclesLeft - 5)
      },30)
      return ()=> {
        clearInterval(gameObstacleId)
      }
    }
    else{
      setObstaclesLeft(screenWidth)
      setObstaclesNegHeight( - Math.random() * 200)
      setScore(score => score + 1)
    }
    
  },[ObstaclesLeft])

   // 2 התחלת מכשולים 
   useEffect(()=>{
    if(ObstaclesLeft2>-obstaclesWidth){
      gameObstacleId2 = setInterval(()=>{
        setObstaclesLeft2(ObstaclesLeft2 => ObstaclesLeft2 - 5)
      },30)
      return ()=> {
        clearInterval(gameObstacleId2)
      }
    }
    else{
      setObstaclesLeft2(screenWidth)
      setObstaclesNegHeight2( - Math.random() * 100 )
      setScore(score => score + 1)
    }
    
  },[ObstaclesLeft2])

  // בדיקת התנגשות במכשול
  useEffect (()=>{
    if((BirdBottom < (ObstaclesNegHeight + obstaclesHight + 30) || //בודק שהוא לא נוגע במכשול העליון  כלומר בתקרה בקצה העליון של המסך
       BirdBottom > (ObstaclesNegHeight + obstaclesHight + gap - 30)) && //או במכשול העליון או בגג של מכשול עליון
      (ObstaclesLeft > screenWidth/2 -30 && 
       ObstaclesLeft< screenWidth/2 + 30)
         ||
         (BirdBottom < (ObstaclesNegHeight2 + obstaclesHight + 30) || //בודק שהוא לא נוגע במכשול העליון  כלומר בתקרה בקצה ההתחתון של המסך
         BirdBottom > (ObstaclesNegHeight2 + obstaclesHight + gap - 30)) && //או במכשול התחתון או בגג של מכשול תחתון
         (ObstaclesLeft2 > screenWidth/2 -30 && 
         ObstaclesLeft2< screenWidth/2 + 30))  
         {
            handleUpdadeScore(score);
            gameOver();
            
         }
  })

  const handleUpdadeScore =async(score)=>{
    let userId = await AsyncStorage.getItem('UserID')
    UpdateScore(userId,score)
  }
  function UpdateScore(id,score){
    fetch('http://ruppinmobile.tempdomain.co.il/site06/api/Users/UpdateScore', {
      method: 'PUT',
      body: JSON.stringify({id,score}),
      headers: {
        // Header Defination
        'Content-Type':
        'application/x-www-form-urlencoded;charset=UTF-8',
      
      },
    })
  }

   const gameOver = () => {
    clearInterval(gameTimeId)
    clearInterval(gameObstacleId)
    clearInterval(gameObstacleId2)
    setIsGameOver(true)
  }

  // פונקציה לקפיצה האובייקט
  const jump =() =>{
    if(!isGameOver && (BirdBottom < screenHight)){
      setBirdBottom(BirdBottom => BirdBottom + 50)
      console.log('Jumping');
    }
  }
   const onButtonClick=()=>{
    Restart();
    
  };
  return (
    
    <TouchableWithoutFeedback onPress={jump}>

      <View style={styles.container}>
      <ImageBackground source={city} style={styles.image}>
      <Text style={{marginTop:-550,marginLeft:200,fontSize:50}}>{score}</Text>
      {isGameOver &&  <View style={{ 
       backgroundColor: "#dcdcdc",
       alignItems: "center",
       justifyContent: 'space-evenly',
    marginTop:350,borderRadius:30}}>
      <Text style={{fontSize:50,color:'orange'}}>Game Over</Text>
      <Text style={{fontSize:30,color:'black'}}>Score: {score}</Text>
      <TouchableOpacity  
            onPress={() => props.navigation.navigate('HomePage')}>
      <Image
            source={backHome}
            style={{
             width: 50,
             height: 100,
             resizeMode: 'contain',
             marginTop:40,
             marginRight:160
            }}
            />
         </TouchableOpacity>
         <TouchableOpacity  
            onPress={onButtonClick}>
      <Image
            source={replay}
            style={{
             width: 50,
             height: 100,
             resizeMode: 'contain',
             marginTop:-90,
             marginLeft:160
            }}
            />
         </TouchableOpacity>
          </View>}
     
      
      <Bird 
        BirdBottom = {BirdBottom}
        birdLeft = {birdLeft}
      />
      
       <Obstacles
         color = {'green'}
         obstaclesWidth = {obstaclesWidth}
         obstaclesHight = {obstaclesHight}
         randomBottom = {ObstaclesNegHeight}
         gap = {gap}
         ObstaclesLeft = {ObstaclesLeft}
    />
      <Obstacles
         color ={'yellow'}
         obstaclesWidth = {obstaclesWidth}
         obstaclesHight = {obstaclesHight}
         randomBottom = {ObstaclesNegHeight2}
         gap = {gap}
         ObstaclesLeft = {ObstaclesLeft2}
    />
    </ImageBackground>
    </View>
    </TouchableWithoutFeedback>
  );
}
export default FlapyGame;
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
