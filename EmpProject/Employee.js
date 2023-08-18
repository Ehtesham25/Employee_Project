import React, {useEffect, useState}from "react";
import { Text, View, ScrollView, FlatList,Image,StyleSheet,ActivityIndicator } from "react-native";
import { Card,FAB } from 'react-native-paper';
import image from "../assets/pi.png";



const Employee = ({navigation}) => {
 
 const[mydata,setData]=  useState([]);
 const[loading, setLoading]= useState(true)
  
 const fetchData=()=>{
  fetch("http://10.0.2.2:3000/")
  .then(res=>res.json())
  .then(result=>{
    setData(result)
    setLoading(false)
  })

 }
       useEffect(() => {
         fetchData()
  
 }, [])
   
  
  const MyList = ((item)=>{
    return(
      
      <Card  style={styles.myCard} onPress={()=>navigation.navigate("Profile",{item})}>
        <View style={styles.CardView}>
        <Image style={{width:60, height:60, borderRadius:30}} source={image} />   
        <View style={{marginLeft:10}}>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={{marginLeft:4, fontSize:20}}>{item.position}</Text>
        </View>
        </View>
      </Card>
      
    )
  })
  return (
   
    <>
   
      <ScrollView>
        <View>
        
          {/* loading?<ActivityIndicator size="large" color="#00ff00" />: */}
          <FlatList
          data={mydata}
        
          renderItem={({item})=>{
           return MyList(item)
          }}
          keyExtractor={item=>item._id}
          onRefresh={fetchData}
          refreshing={loading}
          
        /> 
        
            
        </View>
     
      </ScrollView>
      <FAB
    style={styles.fab}
    large
    icon="plus"
    onPress={() => navigation.navigate("Create")}
  />
    </>
  );
        }
export default Employee;

const styles= StyleSheet.create({
  myCard:{
    margin:5,
    

  },
  CardView:{
    flexDirection:'row',
  },
  text:{
      fontSize:30,
      marginLeft:4
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor:'#41A541',
    fontSize:30,
  },
 
})
