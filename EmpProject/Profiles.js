import React from "react";
import LinearGradient from "react-native-linear-gradient";
import {Title,Card,Button} from "react-native-paper";

import image from "../assets/pi.png";
import {View, Text,StyleSheet,Image, Platform, Linking, Alert,} from "react-native"
import Icon  from "react-native-vector-icons/MaterialCommunityIcons";
import Email from "react-native-vector-icons/MaterialCommunityIcons";
import Phone from "react-native-vector-icons/AntDesign";
import Salary from "react-native-vector-icons/MaterialIcons";


const Profiles =({navigation,route})=>{
  
    const{_id,name,position,city,email,salary,contact,picture}= route.params.item;
  
    const deleteRec=()=>{
        fetch("http://10.0.2.2:3000/delete",{
            method:"post",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:_id
            })
        })
        .then(res=>res.json()).
        then(empdelete=>{
            Alert.alert(`${empdelete.name} is Deleted!!` )
            props.navigation.navigate("Home")

        })
       
       props.navigation.navigate("Home")

    }
    const openDial=()=>{
        if(Platform.OS==="android")
        {
            Linking.openURL(`tel:${contact}`)
        }
       else{
           Linking.openURL(`telepromt:${contact}`)
       }
    }
    return(
        <>
        <View style={styles.container}>
           <LinearGradient
                colors={['#0033ff','#6bc1ff']}
                style={{height:'20%'}}   />  
                <View  style={{alignItems:'center',marginTop:-50}}>
                <Image style={{width:140, height:140, borderRadius:70,}}
                    source={image} /> 
                    <Title style={{fontSize:25}}>{name}</Title>
                    <Text style={{fontSize:17}}>{position}</Text>
                </View>
                <Card style={styles.cardStyle}>
                    <View >
                    <Title><Icon name="city" size={35} color="#1B54FF" />{city}</Title>
                    </View></Card>
                    <Card onPress={()=>Linking.openURL(`mailto:${email}`)} style={styles.cardStyle}>
                    <View >
                    <Title ><Email name="email" color="#1B54FF" size={35}/>{email}</Title>
                    </View></Card>
                    <Card onPress={openDial} style={styles.cardStyle}>
                    <View >
                    <Title ><Phone name="phone" color="#1B54FF" size={35}/>{contact}</Title>
                    </View></Card>
                    <Card style={styles.cardStyle}>
                    <View >
                    <Title ><Salary name="monetization-on" color="#1B54FF" size={30}/>{salary}</Title>
                    </View></Card>
                    <View style={{flexDirection:'row',justifyContent:'space-around', padding:10}}>
                    <Button icon="account-edit" mode='contained' style={{marginTop:5,backgroundColor:"#006aff",margin:10}} 
                    onPress={() =>navigation.navigate("Create",{_id,name,position,city,email,salary,contact})}>
                   Edit
                </Button>
                <Button icon="delete-forever" mode='contained' style={{marginTop:5,backgroundColor:"#006aff",margin:10}} onPress={() => deleteRec()  }>
                   Delete Employee
                </Button>

                    </View>
                   
                </View>    
                </>
    )
}
export default Profiles;

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    cardStyle:{
        margin:6,
        height:50,
    }
});
