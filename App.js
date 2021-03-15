import React from "react";
import Employee from "./EmpProject/Employee";
import {View, StyleSheet} from "react-native"
import Create from "./EmpProject/Create";
import Profiles from "./EmpProject/Profiles";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";

const Stack= createStackNavigator();

const MyOption={
  title:"My sweet Home",
  headerTintColor:'white',
  headerStyle:{
    backgroundColor:'#006aff'
  }

}

const App =()=>{
  return(
    <>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Employee} options={MyOption}
         
        />
        <Stack.Screen name="Profile" component={Profiles} options={{...MyOption,title:"Profile Page"}} />
        <Stack.Screen name="Create" component={Create} options={{...MyOption, title:"Create Page"}}/>
      </Stack.Navigator>
    </NavigationContainer>
    
   
    </>
  )
}
export default App;

const styles= StyleSheet.create({
 
  container:{
    flex:1,
    backgroundColor:'#ebebeb'
  
  }
})