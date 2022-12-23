import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, TextInput, Image, ScrollView, FlatList} from 'react-native';
import { widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons'


class Search extends Component{

    constructor(){
        super();
        this.state={
            data:[]
        }
    }

    // componentDidMount(){
    //     // fetch('https://jsonplaceholder.typicode.com/users')
    //     fetch('http://localhost:8156/API/Products/search/iphone')
    //     .then(response => response.json())
    //     .then((jason) =>{
    //         console.log(jason);

    //         this.setState({
    //             data:jason
    //         })
    //     })
    // }

    search=(text)=>{
        if(text){

            var url="http://localhost:12443/API/Menu/search/" + text
            fetch(url)
            .then(response => response.json())
            .then((json) =>{
                console.log(json);
                
                this.setState({
                    data:json
                })
            })
        }
    }
    
    render(){
        
        




        const renderData=({item})=>{
            var url = "data:image/png;base64,"+item.ImageURL
            return(
                <View style={{height:100,flexDirection:'row',justifyContent:'space-between',marginBottom:30,marginRight:15}}>
                    <View style={{flex:3,padding:10}}>
                        <View style={{marginBottom:2}}>  
                            <Text style={{fontSize:16,fontWeight:'bold',maringBottom:5}}>{item.Name}</Text>
                        </View>
                        <View style={{marginBottom:5}}>
                            <Text style={{fontSize:12,maringBottom:5}}>{item.Description}</Text>
                        </View>
                        <View>
                            <Text style={{fontSize:16}}>AU${item.Price}</Text>
                        </View>
                    </View>
                    <View style={{flex:1,paddingmar:5,marginRight:20}}>
                    
                    <Image style={{height:100,width:100,marginRight:10}} source={{uri: url}}/>
                    
                    </View>    

                </View>
            )

        };


        return(
            <View style={{flex:1}}>
                
                <View style={{alignItems:'center'}}>
                    <Icon style={{padding:10}} name="ios-search" size={20} color="#000"/>
                    <TextInput placeholder="Search Menu" onChangeText={(text)=>this.search(text)} style={{height:40,backgroundColor:'white',color:'blcak',borderRadius:4, width:wp("80%"),marginTop:20,marginBottom:20}}></TextInput>
                </View>
                {/* {
                    this.state.data.map((item, index) => (
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderBottomColor:'white',borderBottomWidth:1,padding:5}}>
                            <Text>{item.id}</Text>
                            <Text>{item.name}</Text>
                            <Text>{item.price}</Text>
                        </View>
                        ))
                } */}

                <ScrollView style={{marginRight:0}}>
                    <FlatList data={this.state.data} renderItem={renderData} keyExtractor={(item)=>item.id}></FlatList>
                </ScrollView>
            </View>
        )
    }
}

export default Search;

// const styles=StyleSheet.create({
//     contain:{
//         borderWidth:2,
//         borderColor:'grey'
//     }
// })
