import React, { useState,useEffect } from "react";
import {View,Modal, StyleSheet,Alert,KeyboardAvoidingView} from "react-native";
import { TextInput,Button } from 'react-native-paper';
import { launchCamera,launchImageLibrary} from 'react-native-image-picker';

const Create =({navigation,route})=>{

  const editFunc=(type)=>{
    if(route.params){
      switch (type) {
        case "name":
          return route.params.name
          
          case "city":
            return route.params.city

            case "email":
              return route.params.email
              
              case "contact":
                return route.params.contact

                case "salary":
                  return route.params.salary

                  case "position":
                    return route.params.position
      }

    }
    else{
      return " "
    }
  }  
  const EditRecordFunc=()=>{
    fetch("http://10.0.2.2:3000/update",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        id:route.params._id,
        name,
        city,
        email,
        contact,
        salary,
        position
      })
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
    })
    navigation.navigate("Home")
  }
 

    const[name, setName]= useState(editFunc("name"));
    const[city, setCity]= useState(editFunc("city"));
    const[email, setEmail]= useState(editFunc("email"));
    const[contact, setContact]= useState(editFunc("contact"));
    const[salary, setSalary]= useState(editFunc("salary"));
    const[position, setPosition]= useState(editFunc("position"));
    const[model, setModel]= useState(false);
    const[enable, Setenable]= useState(false)

   
//    const pickImageHandler = () => {
      
       
//         ImagePicker.launchCamera({title: "Pick an Image", maxWidth: 800, maxHeight: 600}, res => {
//           if (res.didCancel) {
//             console.log("User cancelled!");
//           } else if (res.error) {
//             console.log("Error", res.error);
//           } else {
//             console.log( "uri", res.uri);
           
    
//           }
//         });
//       }
    

        const selectImage=()=> {
          let options = {
            title: 'You can choose one image',
            maxWidth: 256,
            maxHeight: 256,
            saveToPhotos:true,
            storageOptions: {
              skipBackup: true
            }
          };
      
          launchImageLibrary(options,response => {
            console.log(response );
      
            if (response.didCancel) {
              console.log('User cancelled photo picker');
              Alert.alert('You did not select any image');
            }  if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            }  if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
                console.log("done");
              let source = { uri: response.uri };
              console.log({ source });
              // let newFile={
              //     uri:response.uri,
              //     type:response.type,
              //     name:response.fileName
              // }
             
            }
          });
        }
        // const HandleUpload =(image)=>{
        //      const data=new FormData();
        //      data.append("file",image)
        //      data.append("upload_preset",'empApp')
        //      data.append("cloud_name",'ehtesham25')
        //      fetch(" https://api.cloudinary.com/v1_1/ehtesham25/image/upload",{
        //          method:"post",
        //          body:data
        //      }).then(res=>res.json()).
        //      then(data=>{
                
        //            console.log(data);
        //      })
        // }

          const submitDataFunc =()=>{
            fetch("http://10.0.2.2.:3000/send-data",{
              method:"post",
              headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify({
                name:name,
                email:email,
                city:city,
                salary:salary,
                contact:contact,
                position:position
              })
            }).then(res=>res.json())
              .then(data=>{
              Alert.alert(`${data.name} Saved Successfuly!!`)
             
            })
            navigation.navigate("Home")
          }
         
          
    return(
        <>
         <KeyboardAvoidingView  style={styles.inputstyle} behavior="position" enabled={enable}>
             <View >
        <TextInput mode='outlined' label="Name"
        value={name}
         onChangeText={(text)=>setName(text)}
         theme={theme}
         onFocus={()=>Setenable(false)}
           />

          <TextInput mode='outlined' label="City"
          value={city}
          theme={theme}
          onFocus={()=>Setenable(false)}
         onChangeText={(text)=>setCity(text)}  />

          <TextInput mode='outlined' label="Email"
          value={email}
          theme={theme}
          keyboardType='email-address'
         onChangeText={(text)=>setEmail(text)}
         onFocus={()=>Setenable(false)}  />

          <TextInput mode='outlined' label="contact"
          value={contact}
          theme={theme}
          keyboardType='phone-pad'
          onFocus={()=>Setenable(false)}
         onChangeText={(text)=>setContact(text)}  />

         <TextInput mode='outlined' label="Salary"
         value={salary}
         theme={theme}
         onFocus={()=>Setenable(true)}
         keyboardType='number-pad'
         onChangeText={(text)=>setSalary(text)}  />
           <TextInput mode='outlined' label="position"
           onFocus={()=>Setenable(true)}
         value={position}
         theme={theme}
         onChangeText={(text)=>setPosition(text)}  />

{/* <Button icon="upload" mode='contained' style={{marginTop:5}} onPress={() => selectImage()}>
                   Upload Image
                </Button> */}
                {route.params?
                  <Button icon="content-save" mode='contained' style={{marginTop:5}} onPress={() =>EditRecordFunc() }>
                   Update-details
                </Button>:
                <Button icon="content-save" mode='contained' style={{marginTop:5}} onPress={() =>submitDataFunc() }>
                   Save
                </Button>

                }               
            <Modal
            animationType='slide'
            transparent={true}
            visible={model}
            onRequestClose={()=>{setModel(false)}}
            >
             <View style={styles.modelContent}>
                <View style={{flexDirection:'row', justifyContent:'space-around', padding:10}}>
                <Button icon="camera" mode='contained' onPress={() => selectImage()}>
                    Camera
                </Button>
                <Button icon="camera-image" mode='contained' onPress={() => setModel(false)}>
                    gellary
                </Button>
                </View>
               
                <Button icon="cancel"  onPress={() => setModel(false)}>
                    Cancel
                </Button>
               
          </View>
          </Modal>
          
        </View>      
        </KeyboardAvoidingView>      
        </>
    )
}
export default Create;

const theme={
    colors:{
        primary:"#006aff"
    }
}

const styles= StyleSheet.create({
    modelContent:{
        position:'absolute',
        bottom:8,
        width:'100%',
        backgroundColor:'white',
    },
    inputstyle:{
        margin:5,
    
    }
   
})
