import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Button, Image} from 'react-native';
import { 
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
        } from 'react-native-responsive-screen';


import Icon from 'react-native-vector-icons/Ionicons'
import Staff from '../screens/Staff'
import NetInfo from "@react-native-community/netinfo";
import { showMessage } from "react-native-flash-message";


class Management extends Component{
    componentDidMount() {
        loc(this);
    }
      
    componentWillUnMount() {
    rol();
    }

    
    displayConnectionMessage(){
        
        // Get network connection status
        NetInfo.fetch().then(status => {

            // Check if not connected to the Internet
            if (!status.isConnected){

                console.log("show flash message")

                // Display the flash message
                showMessage({
                    message: "No internet connection",
                    description: "You will only see cached data until you have an active internet connection again.",
                    type:"warning",
                    duration:4000,
                    floating:true,
                    icon:"warning",
                    autoHide:true,
                })
            }
        })
    }

    render(){

        const styles=StyleSheet.create({
            container:{
                flex:1,
                backgroundColor:'black',
                alignItems: 'center',
                justifyContent: 'center',
            },
            menuContainer:{
                height:wp('30%'),
                flexDirection:'row',            
            },
            colorBlock:{
                width:wp("20%"),
                backgroundColor:'#51DC8B',
                marginHorizontal:wp('10%'),
                borderRadius:20,
                flexDirection:'column',
                alignItems:'center',
                
            },
            menuTitle:{
                textAlign:'center',
                fontWeight:'bold',
                fontSize:wp('4%'),
                color:'white'
            },
            title:{
                fontSize:wp('5%'),
                fontWeight:'bold',
                color:'white',
            },
            formContainer:{
                flex:1,
                alignItems:'center',
            },
            textInput:{
                borderRadius:6,
                backgroundColor:'#333333',
                width:wp("33.33%"),
                marginBottom:20,
                height:hp('4%'),
                paddingLeft:10,
                lineHeight:30,
                justifyContent:'center'
                
        
            },
            buttonContainer:{
                backgroundColor:'#1E90FF',
                justifyContent:'center',
                alignItems:'center',
                width:wp("33.33%"),
                borderRadius:6,
                height:hp('4%'),
            },
            LoginButton:{
               
                fontWeight:'bold',
                fontSize:16,
                color:'white',
                textAlign:'center',
                lineHeight:16,
                justifyContent:'center'
            }
        })

        return(
            this.displayConnectionMessage(),
            <View style={styles.container}>
                <View style={styles.menuContainer}>
                    <TouchableOpacity style={styles.colorBlock} onPress={()=>{this.props.navigation.navigate('Menu')}}>
                        <View style={{height:'70%', justifyContent:'center', alignItems:'center',}}>
                            <Icon size="150px" name="document-text-outline" color='white'/>
                        </View >
                        <Text style={styles.menuTitle}>
                            Menu
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.colorBlock,{backgroundColor:'#61BFC2'}]} onPress={()=>{this.props.navigation.navigate('Staff')}}>
                    <View style={{height:'70%', justifyContent:'center', alignItems:'center',}}>
                            <Icon size="150px" name="person-outline" color='white'/>
                        </View >
                        <Text style={styles.menuTitle}>
                            Staff
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
};

export default Management;

