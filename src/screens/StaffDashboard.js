import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Button, TextInput, Image} from 'react-native';
import Header from '../layout/Header'
import {Ionicons} from '@expo/vector-icons'

class StaffDashboard extends Component{
    
    constructor(){
        super();
        this.state={
            data:[]
        }
    }

    componentDidMount(){
        // fetch('https://jsonplaceholder.typicode.com/users')
        
        var url="http://localhost:5731/API/Staff/";
            
        var headers = new Headers({
            Authorization: 'Basic ' + btoa('test:test')
        }
        );
    
        var options={headers:headers};

        fetch(url,options)
      
        .then(response => response.json())
        .then((json) =>{
            console.log(json);

            this.setState({
                data:json
            })
        })
    }

    render(){
        return(
            <View>
                <Header navigation={navigation}></Header>
                <View style={{flexDirection:'row',justifyContent:'space-between',padding:5, backgroundColor:'white',paddingTop:10,paddingBottom:10}}>
                    <Text style={{fontSize:20, fontWeight:'bold'}}>Staff List</Text>
                    <TouchableOpacity style={{backgroundColor:'#e74c3c'}}>
                        <Ionicons name={'ios-add-circle'} size={25} color='white' />
                    </TouchableOpacity>
                </View>
                
                {
                    this.state.data.map((item, index) => (
                        <Text>{item.firstname} {item.lastname} </Text>
                    ))
                }
            </View>
        )
    }
}

export default StaffDashboard;

// const styles=StyleSheet.create({
//     contain:{
//         borderWidth:2,
//         borderColor:'grey'
//     }
// })
