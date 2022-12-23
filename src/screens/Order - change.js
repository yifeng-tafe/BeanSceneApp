import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, TouchableOpacity, Modal, ImageBackground, ScrollView,FlatList } from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';

import { Ionicons } from '@expo/vector-icons';
import { interpolate, set } from 'react-native-reanimated';
import NetInfo from "@react-native-community/netinfo";
import { showMessage } from "react-native-flash-message";
import { render } from 'react-dom';

const ListItem = ({ item, handleDecrement, handleIncrement }) => (
    <View style={{flexDirection:'row',justifyContent:'space-between', flex:1, marginBottom:20}}>
        <View style={{flexDirection:'row'}}>
            <View style={{width:120, height:100}}>
                <Image source={{uri:item.ImageURL}} style={{height:100, width:120}} />
            </View>
            <View style={{height:"100%", width:wp('40%'),flexDirection:'column',justifyContent:'space-between',paddingHorizontal:15}}>
                <Text style={{fontWeight:'bold', fontSize:24}}>{item.Name}</Text>
                <Text style={{fontSize:24}}>AUD$<br></br>{item.Price}</Text>
            </View>
        </View>
        <View style={{flexDirection:'row',alignItems:'center'}}>
            <View>
                <TouchableOpacity style={{alignItems:'center', justifyContent:'center', width:50, height:50, borderRadius:25,backgroundColor:'#1E90FF'}} onPress={handleDecrement}>
                    <Ionicons name="remove-outline" size={36} color={'white'}/>
                </TouchableOpacity>
            </View>
            <View style={{marginHorizontal:20}}>
                <TextInput value={item.Quantity} style={{textAlign:'center',height:100,width:50, fontSize:100}}>
                    
                </TextInput>
            </View>
            <View>
                <TouchableOpacity style={{alignItems:'center', justifyContent:'center', width:50, height:50, borderRadius:25,backgroundColor:'#1E90FF'}} onPress={handleIncrement}>
                    <Ionicons name="add-outline" size={36} color={'white'}/>
                </TouchableOpacity>
            </View>
            
        </View>
        <View>
            <TouchableOpacity style={{justifyContent:'center',width:80,height:'100%',backgroundColor:'#51DC8B',borderRadius:4,alignItems:'center'}} onPress={()=>{
                this.state.foodName = item.Name;
                this.state.totalPrice = this.state.quantity * item.Price;
                this.state.imageURL = item.ImageURL;
                this.addFoodOrder();
                
                
                }}>
                <Text style={{color:'white', fontWeight:'bold'}}>Add</Text>
            </TouchableOpacity>
        </View>
    </View>
);


class Order - change extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            orderData:[],
            searchText:'',
            searchOrder:'',
            orderNumber:'',
            guestTitle: '',
            guestName: '',
            areaName: '',
            tableNumber: '',
            requirement:'',
            numberOfGuest:'',
            orderTime:'',
            orderStatus:'',
            orderDetailNumber: Math.floor(Math.random() *100000) +1 ,
            foodName:'',
            quantity:0,
            totalPrice:0,
            imageURL:'',
            foodStatus:'',
            modalVisible: false,
            modalTableNameVisible: false,
            modalGuestNameVisible: false,
            modalGuestNumberVisible: false,
            modalRequirementVisible: false,
            modalFoodOrderVisible: false,
            modalDeleteButtonsVisible: true,
            modalEditButtonsVisible: true,
            mrVisible: false,
            msVisible: false,
            mrsVisible: false,
            mrVisible: false,
            msVisible: false,
            mrsVisible: false,
            drVisible: false,
            greyMrButton: {
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                backgroundColor: 'grey',
                width: '18%',
                height: 60,
                borderRadius: 8
            },
            greyMsButton: {
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                backgroundColor: 'grey',
                width: '18%',
                height: 60,
                borderRadius: 8
            },
            greyMrsButton: {
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                backgroundColor: 'grey',
                width: '18%',
                height: 60,
                borderRadius: 8
            },
            greyDrButton: {
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                backgroundColor: 'grey',
                width: '18%',
                height: 60,
                borderRadius: 8
            },
            greyMainButton: {
                alignItems: 'center', justifyContent: 'center', color: 'white', backgroundColor: 'grey', width: '28%', height: 60, borderRadius: 8
            },
            greyOutsideButton: {
                alignItems: 'center', justifyContent: 'center', color: 'white', backgroundColor: 'grey', width: '28%', height: 60, borderRadius: 8
            },
            greyBalconyButton: {
                alignItems: 'center', justifyContent: 'center', color: 'white', backgroundColor: 'grey', width: '28%', height: 60, borderRadius: 8
            },
            greyTableNumber1Button: {
                alignItems: 'center', justifyContent: 'center', color: 'white', backgroundColor: 'grey', width: 60, height: 60, borderRadius: 8
            },
            greyTableNumber2Button: {
                alignItems: 'center', justifyContent: 'center', color: 'white', backgroundColor: 'grey', width: 60, height: 60, borderRadius: 8
            },
            greyTableNumber3Button: {
                alignItems: 'center', justifyContent: 'center', color: 'white', backgroundColor: 'grey', width: 60, height: 60, borderRadius: 8
            },
            greyTableNumber4Button: {
                alignItems: 'center', justifyContent: 'center', color: 'white', backgroundColor: 'grey', width: 60, height: 60, borderRadius: 8
            },
            greyTableNumber5Button: {
                alignItems: 'center', justifyContent: 'center', color: 'white', backgroundColor: 'grey', width: 60, height: 60, borderRadius: 8
            },
            greyTableNumber6Button: {
                alignItems: 'center', justifyContent: 'center', color: 'white', backgroundColor: 'grey', width: 60, height: 60, borderRadius: 8
            },
            greyTableNumber7Button: {
                alignItems: 'center', justifyContent: 'center', color: 'white', backgroundColor: 'grey', width: 60, height: 60, borderRadius: 8
            },
            greyTableNumber8Button: {
                alignItems: 'center', justifyContent: 'center', color: 'white', backgroundColor: 'grey', width: 60, height: 60, borderRadius: 8
            },
            greyTableNumber9Button: {
                alignItems: 'center', justifyContent: 'center', color: 'white', backgroundColor: 'grey', width: 60, height: 60, borderRadius: 8
            },
            greyTableNumber10Button: {
                alignItems: 'center', justifyContent: 'center', color: 'white', backgroundColor: 'grey', width: 60, height: 60, borderRadius: 8
            },



        }
    }

    componentDidMount() {
        loc(this);

    }

    componentWillUnMount() {
        rol();
    }
    setModalTableNameVisible = (visible) => {
        this.setState({ modalTableNameVisible: visible });
    }
    setModalGuestNameVisible = (visible) => {
        this.setState({ modalGuestNameVisible: visible });
    }
    setModalGuestNumberVisible = (visible) => {
        this.setState({ modalGuestNumberVisible: visible });
    }
    setModalRequirementVisible = (visible) => {
        this.setState({ modalRequirementVisible: visible });
    }
    setModalFoodOrderVisible = (visible) => {
        this.setState({ modalFoodOrderVisible: visible });
    }
    setModalDeleteVisible = (visible) => {
        this.setState({ modalDeleteVisible: visible });
    }

    resetMessage = () => {
        this.setState({ message: '' })
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
                    description: "You can not add a new order until \nyou have an active internet connection again.",
                    type:"danger",
                    duration:5000,
                    floating:true,
                    icon:"danger",
                    autoHide:false,
                })
            }
        })
    }
    

    search=()=>{
        console.log("search");
        var text=this.state.searchText;

        if(text){
        console.log("inside"+text);
            var url="http://localhost:5731/API/Food/" + text
            console.log(url);
            
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
    }

    addFoodOrder = () => {
        console.log("add orderDetail");

        // Display message...
        this.displayConnectionMessage()

        // Cancel if no internet connection
        //if ((NetInfo.fetch()).isConnected) return

        
        var orderDetail={
            OrderNumber:this.state.orderDetailNumber,
            FoodName: this.state.foodName,
            Quantity: this.state.quantity,
            TotalPrice: this.state.totalPrice,
            ImageURL: this.state.imageURL,
            FoodStatus:"Ordered"
        }
        var url="http://localhost:5731/API/OrderDetail/addOrderDetail" 
        var headers = new Headers({
            Authorization: 'Basic ' + btoa('test:test')
        });

        headers.append('Accept', 'application/json');
        headers.append('Content-Type','application/json');
        var options={method:'POST', headers:headers, body:JSON.stringify(orderDetail)};

        fetch(url,options)
        .then(response => response.json())
        .then((json) =>{
            console.log(json);

            this.setState({
                data:json,
                message:"Added Successfully",
                totalPrice: 0,
            })
        })
     }

    getDetailOrder = (text) => {
        console.log("get detail order by OrderNumber");
        // var text=this.state.searchOrder;

        if(text){
        console.log("inside"+text);
            var url="http://localhost:5731/API/OrderDetail/" + text
            console.log(url);
            
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
                    orderData:json
                })
            })
        }
    }

    deleteDetailOrder=(text)=>{
        console.log("delete Detail Order");
        console.log(text)
        var url="http://localhost:5731/API/OrderDetail/deleteOrderDetail/"+text;
        
        var headers = new Headers({
            Authorization: 'Basic ' + btoa('test:test')
        });
        
        var options={method:'DELETE', headers:headers};

        fetch(url,options)
        .then(response => response.json())
        .then((json) =>{
            console.log(json);

            this.setState({
                orderData:json,
                modalDeleteButtonsVisible: false,
                message:"Deleted Successfully"
            })
        })
    }

    addOrder=()=>{
        console.log("add order");

        // Display message...
        this.displayConnectionMessage()

        // Cancel if no internet connection
        //if ((NetInfo.fetch()).isConnected) return

        
        var order={
            OrderTime:this.state.orderTime,
            OrderNumber:this.state.orderNumber,
            OrderDetailNumber:this.state.orderDetailNumber,
            GuestTitle: this.state.guestTitle,
            GuestName: this.state.guestName,
            AreaName: this.state.areaName,
            TableNumber: this.state.tableNumber,
            NumberOfGuest:this.state.numberOfGuest,
            Requirement:this.state.requirement,
            OrderStatus:"In-Progress"
        }
        var url="http://localhost:5731/API/Order/addOrder" 
        var headers = new Headers({
            Authorization: 'Basic ' + btoa('test:test')
        });

        headers.append('Accept', 'application/json');
        headers.append('Content-Type','application/json');
        var options={method:'POST', headers:headers, body:JSON.stringify(order)};

        fetch(url,options)
        .then(response => response.json())
        .then((json) =>{
            console.log(json);

            this.setState({
                data:json,
                message:"Added Successfully"
            })
        })
    }

    handleDecrement = (item, index) => {
        this.state.data[index].quantity -=  - 1;
        

        // const nextData = [...this.state.data];
        // nextData[index].quantity -= 1;
        // this.setState({nextData});
    }

    handleIncrement = (item, index) => {
        const nextData = [...this.state.data];
        nextData[index].quantity += 1;
        this.setState({nextData});
    }



    render() {
        const inActiveTableNumberStyle = {
            alignItems: 'center', justifyContent: 'center', color: 'white', backgroundColor: 'grey', width: 60, height: 60, borderRadius: 8
        }
        const ActiveTableNumberStyle = {
            alignItems: 'center', justifyContent: 'center', color: 'white', backgroundColor: '#FFAB1E', width: 60, height: 60, borderRadius: 8
        }

        const inActiveAreaButtonStyle = {
            alignItems: 'center', justifyContent: 'center', color: 'white', backgroundColor: 'grey', width: '28%', height: 60, borderRadius: 8
        }
        const ActiveAreaButtonStyle = {
            alignItems: 'center', justifyContent: 'center', color: 'white', backgroundColor: '#1E90FF', width: '28%', height: 60, borderRadius: 8
        }
        const inActiveButtonStyle = {
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            backgroundColor: 'grey',
            width: '18%',
            height: 60,
            borderRadius: 8
        }

        const ActiveButtonStyle = {
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            backgroundColor: '#1E90FF',
            width: '18%',
            height: 60,
            borderRadius: 8
        }

        const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: 'black',
                alignItems: 'center'


            },
            bannerContainer: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: wp("90%"),
            },
            timeDateArea: {
                width: wp("90%"),
            },
            timeArea: {
                width: wp("90%"),
            },
            timeText: {
                color: 'white',
                fontSize: 60,
                fontWeight: '500'
            },
            dateArea: {
                flexDirection: 'row',
                alignItems: 'space-between',


            },
            dateText: {
                color: 'white',
                fontSize: 36,

            },
            buttonContainer: {
                flexDirection: 'row',
                width: wp('45%')


            },
            editButton: {
                width: 120,
                height: 40,
                borderRadius: 20,
                textAlign: 'center',
                justifyContent: 'center',
            },
            buttonText: {
                fontSize: 20,
                color: 'white',
                fontWeight: 'bold'
            },
            overlayContainer: {
                width: wp('60%'),
                height: hp('80%'),
                backgroundColor: 'white',
                borderRadius: 24,

            },
            overlayTitle: {
                width: "100%",
                fontSize: 48,
                fontWeight: 'bold',
                marginTop: 40,
                marginBottom: 40,
                alignItems: 'center',
                paddingVertical: 30,
                flexDirection: 'row',
                justifyContent: 'center',
                textAlign: 'center'
            },
            overlayDate: {
                fontSize: 20,
                color: '#848383',
                marginBottom: hp('3%')
            },
            overlayText: {
                fontSize: 20,
                paddingBottom: hp('10%'),
                textAlign: 'center'
            },
            background: {
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
            },
            inputLabel: {
                color: 'grey',
                fontSize: 28,
                textAlign: 'left',
                marginVertical: 5,
            },
            inputLine: {
                color: 'black',
                fontSize: 36,
                textAlign: 'left',
                marginVertical: 20,
                borderBottomColor: 'grey',
                borderBottomWidth: 1
            },
            photoSection: {
                width: wp('30%'),
                height: wp('30%'),
                borderRadius: wp('30%') / 2,
                borderWidth: 1,
                borderColor: 'grey',
                alignItems: 'center',
                justifyContent: 'center'
            },
            editButton: {
                width: 120,
                height: 60,
                borderRadius: 8,
                textAlign: 'center',
                justifyContent: 'center',
            },
            buttonText: {
                fontSize: 20,
                color: 'white',
                fontWeight: 'bold'
            },
            messageText: {
                fontSize: 20,
                textAlign: 'center',
                color: 'red',
                marginBottom: 10
            },
            ActiveButton: {
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                backgroundColor: '#1E90FF',
                width: '18%',
                height: 60,
                borderRadius: 8
            },
            InActiveButton: {
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                backgroundColor: 'grey',
                width: '18%',
                height: 60,
                borderRadius: 8
            },
            searchContainer:{
                width:wp('90%'),
                height:48,
                marginTop:20,
                flexDirection:'row'
            },
        })
        
        const { modalTableNameVisible, modalGuestNameVisible, modalGuestNumberVisible, modalRequirementVisible, modalFoodOrderVisible, modalDeleteVisible, mrVisible, mrsVisible, msVisible, foodName,  } = this.state;
        const renderOrder=({item})=>{
            return(
                <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between'}}>
                    <View>
                        <Text style={{fontSize:18, color:'white', marginBottom:10}}>{item.FoodName}</Text>
                    </View>
                    <View>
                        <Text style={{fontSize:18, color:'white', marginBottom:10}}>x {item.Quantity}</Text>
                    </View>
                </View>
            )
        };
        const renderData=({item, index})=>{
            // var url = "data:image/png;base64," + item.ImageURL
            var url = item.ImageURL;
            return(
                <View style={{flexDirection:'row',justifyContent:'space-between', flex:1, marginBottom:20}}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{width:120, height:100}}>
                            <Image source={{uri:url}} style={{height:100, width:120}} />
                        </View>
                        <View style={{height:"100%", width:wp('40%'),flexDirection:'column',justifyContent:'space-between',paddingHorizontal:15}}>
                            <Text style={{fontWeight:'bold', fontSize:24}}>{item.Name}</Text>
                            <Text style={{fontSize:24}}>AUD$<br></br>{item.Price}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <View>
                            <TouchableOpacity style={{alignItems:'center', justifyContent:'center', width:50, height:50, borderRadius:25,backgroundColor:'#1E90FF'}} onPress={()=> this.handleDecrement()}>
                                <Ionicons name="remove-outline" size={36} color={'white'}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginHorizontal:20}}>
                            <TextInput value={this.state.quantity} style={{textAlign:'center',height:100,width:50, fontSize:100}}>
                                
                            </TextInput>
                        </View>
                        <View>
                            <TouchableOpacity style={{alignItems:'center', justifyContent:'center', width:50, height:50, borderRadius:25,backgroundColor:'#1E90FF'}} onPress={()=> this.handleIncrement()}>
                                <Ionicons name="add-outline" size={36} color={'white'}/>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                    <View>
                        <TouchableOpacity style={{justifyContent:'center',width:80,height:'100%',backgroundColor:'#51DC8B',borderRadius:4,alignItems:'center'}} onPress={()=>{
                            this.state.foodName = item.Name;
                            this.state.totalPrice = this.state.quantity * item.Price;
                            this.state.imageURL = item.ImageURL;
                            this.addFoodOrder();
                            
                            
                            }}>
                            <Text style={{color:'white', fontWeight:'bold'}}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                
            )
        };

        const orderDT = new Date();
        const orderD = orderDT.toDateString();
        const orderT = orderDT.toLocaleTimeString();
        const dateTime = orderD+"-"+orderT+"-";
        this.state.orderNumber = dateTime + this.state.areaName + this.state.tableNumber + "-" + global.firstname;
        this.state.orderTime = orderT;
        
        return (
            <View style={styles.container}>
                <View style={styles.bannerContainer}>
                    <View style={styles.timeDateArea}>
                        <View sytle={styles.timeArea}>
                            <Text style={styles.timeText}>{orderT}</Text>
                        </View>
                        <View style={styles.dateArea}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.dateText}>{orderD}</Text>
                            </View>
                            <View style={{ justifyContent: "center" }}><TouchableOpacity style={[styles.editButton, { backgroundColor: '#FF3E6C' }]} onPress={()=>{
                                this.deleteDetailOrder(this.state.orderDetailNumber);
                                this.setState({
                                    guestTitle:'',
                                    guestName:'',
                                    areaName:'',
                                    tableNumber:'',
                                    numberOfGuest:'',
                                    requirement:''
                                })
                                // this.props.navigation.navigate('Home')
                                }}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            </View>
                            <View style={{ marginLeft: 30, justifyContent: "center" }}>
                                <TouchableOpacity style={[styles.editButton, { backgroundColor: '#51DC8B' }]} onPress={()=>{
                                    console.log(orderD)
                                    this.setState({
                                        orderTime: orderT,
                                        orderNumber:orderD+"-"+orderT+"-"+this.state.areaName+this.state.tableNumber+"-"+global.firstname,
                                        guestTitle: this.state.guestTitle,
                                        guestName: this.state.guestName,
                                        areaName: this.state.areaName,
                                        tableNumber: this.state.tableNumber,
                                        numberOfGuest:this.state.numberOfGuest,
                                        requirement:this.state.requirement,
                                    }),
                                    this.addOrder();
                                    this.props.navigation.navigate('Reports')
                                }}>
                                    <Text style={styles.buttonText}>Confirm</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ width: wp('90%'), flexDirection: 'row', flex: 1, marginTop: 30, marginBottom: 80 }}>
                    <View style={{ flex: 1, flexDirection: 'column', height: '100%', borderRadius: 8, marginRight: 24 }}>
                        <TouchableOpacity style={{ flexDirection: 'column', flex: 1, borderRadius: 8, backgroundColor: '#333333', marginBottom: 12, paddingHorizontal: 12 }} onPress={() => {
                            this.setModalTableNameVisible(true),
                                this.setState({
                                    modalEditButtonsVisible: true
                                })
                        }}>
                            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-start' }}>
                                <Text style={{ color: 'white', fontSize: 96, fontWeight: 'bold' }}>{this.state.areaName}{this.state.tableNumber}</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-end', flexDirection: 'row', paddingBottom: 12 }}>
                                <View style={{ backgroundColor: '#FFAB1E', height: 60, width: 60, borderRadius: 4, alignItems: 'center', justifyContent: 'center' }}>
                                    <Ionicons name="tv" size={42} color="white"></Ionicons>
                                </View>
                                <View style={{ flexDirection: 'column', marginLeft: 15 }}>
                                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', fontStyle: 'italic' }}>Area & Table</Text>
                                    <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold' }}>Name</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'column', flex: 1, borderRadius: 8, backgroundColor: '#333333', marginTop: 12, paddingHorizontal: 12 }} onPress={()=>this.setModalGuestNumberVisible(true)}>
                            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-start' }}>
                                <Text style={{ color: 'white', fontSize: 96, fontWeight: 'bold' }}>{this.state.numberOfGuest}</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-end', flexDirection: 'row', paddingBottom: 12 }}>
                                <View style={{ backgroundColor: '#BC62FF', height: 60, width: 60, borderRadius: 4, alignItems: 'center', justifyContent: 'center' }}>
                                    <Ionicons name="people" size={42} color="white"></Ionicons>
                                </View>
                                <View style={{ flexDirection: 'column', marginLeft: 15 }}>
                                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', fontStyle: 'italic' }}>Number of </Text>
                                    <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold' }}>Guest(s)</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', height: '100%', borderRadius: 8, marginHorizontal: 12 }}>
                        <TouchableOpacity style={{ flexDirection: 'column', flex: 1, borderRadius: 8, backgroundColor: '#333333', marginBottom: 12, paddingHorizontal: 12 }} onPress={() => {
                            this.setModalGuestNameVisible(true)
                        }}>
                            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-start' }}>
                                <Text style={{ textAlign: 'right', width: '100%', color: 'white', fontSize: 48, fontWeight: 'bold' }}>{this.state.guestTitle} {this.state.guestName}</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-end', flexDirection: 'row', paddingBottom: 12 }}>
                                <View style={{ backgroundColor: '#FF3E6C', height: 60, width: 60, borderRadius: 4, alignItems: 'center', justifyContent: 'center' }}>
                                    <Ionicons name="text" size={42} color="white"></Ionicons>
                                </View>
                                <View style={{ flexDirection: 'column', marginLeft: 15 }}>
                                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', fontStyle: 'italic' }}>Guest's</Text>
                                    <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold' }}>Name</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'column', flex: 1, borderRadius: 8, backgroundColor: '#333333', marginTop: 12, paddingHorizontal: 12 }}  onPress={() => {
                            this.setModalRequirementVisible(true)
                        }}>
                            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-start' }}>
                                <Text numberOfLines = {2} style={{ width:'100%', textAlign:'right',color: 'white', fontSize: 48, fontWeight: 'bold' }}>{this.state.requirement}</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-end', flexDirection: 'row', paddingBottom: 12 }}>
                                <View style={{ backgroundColor: '#F24E1E', height: 60, width: 60, borderRadius: 4, alignItems: 'center', justifyContent: 'center' }}>
                                    <Ionicons name="flag" size={42} color="white"></Ionicons>
                                </View>
                                <View style={{ flexDirection: 'column', marginLeft: 15 }}>
                                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', fontStyle: 'italic' }}>Requirement</Text>
                                    <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold' }}>Note</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ flex: 1, height: '100%', borderRadius: 8, backgroundColor: '#333333', marginLeft: 24, }} onPress={()=>this.setModalFoodOrderVisible(true)}>
                        <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', paddingVertical: 12, paddingHorizontal: 12 }}>
                            <View style={{ backgroundColor: '#61BFC2', height: 60, width: 60, borderRadius: 4, alignItems: 'center', justifyContent: 'center' }}>
                                <Ionicons name="fast-food" size={42} color="white"></Ionicons>
                            </View>
                            <View style={{ flexDirection: 'column', marginLeft: 15 }}>
                                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', fontStyle: 'italic' }}>Food</Text>
                                <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold' }}>Order</Text>
                            </View>
                        </View>
                        <View style={{ paddingHorizontal: 12, marginTop: 20, width:'100%' }}>
                            <FlatList contentContainerStyle={{width:'100%'}} data={this.state.orderData} renderItem={renderOrder} keyExtractor={(item)=>item._id}></FlatList>
                        </View>
                    </TouchableOpacity>
                </View>
                <Modal animationType="slide" transparent={true} visible={modalTableNameVisible} onRequestClose={() => { Alert.alert("Modal has been closed."); this.setModalTableNameVisible(!modalTableNameVisible); }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={styles.overlayContainer}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={styles.overlayTitle}>
                                    Select Table Area & Number
                                </Text>
                                <View style={{ width: '70%', alignItems: 'center', flexDirection: 'column' }}>
                                    <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>


                                        <TouchableOpacity style={this.state.greyMainButton} onPress={() => this.setState({
                                                greyMainButton: ActiveAreaButtonStyle,
                                                greyOutsideButton: inActiveAreaButtonStyle,
                                                greyBalconyButton: inActiveAreaButtonStyle,
                                                areaName: 'M'
                                            })}>
                                            <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold' }}>Main</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={this.state.greyOutsideButton} onPress={() => this.setState({
                                                greyMainButton: inActiveAreaButtonStyle,
                                                greyOutsideButton: ActiveAreaButtonStyle,
                                                greyBalconyButton: inActiveAreaButtonStyle,
                                                areaName: 'O'
                                            })}>
                                            <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold' }}>Outside</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={this.state.greyBalconyButton} onPress={() => this.setState({
                                                greyMainButton: inActiveAreaButtonStyle,
                                                greyOutsideButton: inActiveAreaButtonStyle,
                                                greyBalconyButton: ActiveAreaButtonStyle,
                                                areaName: 'B'
                                            })}>
                                            <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold' }}>Balcony</Text>
                                        </TouchableOpacity>

                                    </View>
                                    <View style={{ marginTop: 40, width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <TouchableOpacity style={this.state.greyTableNumber1Button}>
                                            <Text style={{ color: 'white', fontSize: 32, fontWeight: 'bold'}} onPress={()=>this.setState({
                                                tableNumber:'1',
                                                greyTableNumber1Button:ActiveTableNumberStyle,
                                                greyTableNumber2Button:inActiveTableNumberStyle,
                                                greyTableNumber3Button:inActiveTableNumberStyle,
                                                greyTableNumber4Button:inActiveTableNumberStyle,
                                                greyTableNumber5Button:inActiveTableNumberStyle,
                                                greyTableNumber6Button:inActiveTableNumberStyle,
                                                greyTableNumber7Button:inActiveTableNumberStyle,
                                                greyTableNumber8Button:inActiveTableNumberStyle,
                                                greyTableNumber9Button:inActiveTableNumberStyle,
                                                greyTableNumber10Button:inActiveTableNumberStyle

                                            })}>1</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={this.state.greyTableNumber2Button}  onPress={()=>this.setState({
                                                tableNumber:'2',
                                                greyTableNumber1Button:inActiveTableNumberStyle,
                                                greyTableNumber2Button:ActiveTableNumberStyle,
                                                greyTableNumber3Button:inActiveTableNumberStyle,
                                                greyTableNumber4Button:inActiveTableNumberStyle,
                                                greyTableNumber5Button:inActiveTableNumberStyle,
                                                greyTableNumber6Button:inActiveTableNumberStyle,
                                                greyTableNumber7Button:inActiveTableNumberStyle,
                                                greyTableNumber8Button:inActiveTableNumberStyle,
                                                greyTableNumber9Button:inActiveTableNumberStyle,
                                                greyTableNumber10Button:inActiveTableNumberStyle

                                            })}>
                                            <Text style={{ color: 'white', fontSize: 32, fontWeight: 'bold' }}>2</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={this.state.greyTableNumber3Button}  onPress={()=>this.setState({
                                                tableNumber:'3',
                                                greyTableNumber1Button:inActiveTableNumberStyle,
                                                greyTableNumber2Button:inActiveTableNumberStyle,
                                                greyTableNumber3Button:ActiveTableNumberStyle,
                                                greyTableNumber4Button:inActiveTableNumberStyle,
                                                greyTableNumber5Button:inActiveTableNumberStyle,
                                                greyTableNumber6Button:inActiveTableNumberStyle,
                                                greyTableNumber7Button:inActiveTableNumberStyle,
                                                greyTableNumber8Button:inActiveTableNumberStyle,
                                                greyTableNumber9Button:inActiveTableNumberStyle,
                                                greyTableNumber10Button:inActiveTableNumberStyle

                                            })}>
                                            <Text style={{ color: 'white', fontSize: 32, fontWeight: 'bold' }}>3</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={this.state.greyTableNumber4Button}  onPress={()=>this.setState({
                                                tableNumber:'4',
                                                greyTableNumber1Button:inActiveTableNumberStyle,
                                                greyTableNumber2Button:inActiveTableNumberStyle,
                                                greyTableNumber3Button:inActiveTableNumberStyle,
                                                greyTableNumber4Button:ActiveTableNumberStyle,
                                                greyTableNumber5Button:inActiveTableNumberStyle,
                                                greyTableNumber6Button:inActiveTableNumberStyle,
                                                greyTableNumber7Button:inActiveTableNumberStyle,
                                                greyTableNumber8Button:inActiveTableNumberStyle,
                                                greyTableNumber9Button:inActiveTableNumberStyle,
                                                greyTableNumber10Button:inActiveTableNumberStyle

                                            })}>
                                            <Text style={{ color: 'white', fontSize: 32, fontWeight: 'bold' }}>4</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={this.state.greyTableNumber5Button}  onPress={()=>this.setState({
                                                tableNumber:'5',
                                                greyTableNumber1Button:inActiveTableNumberStyle,
                                                greyTableNumber2Button:inActiveTableNumberStyle,
                                                greyTableNumber3Button:inActiveTableNumberStyle,
                                                greyTableNumber4Button:inActiveTableNumberStyle,
                                                greyTableNumber5Button:ActiveTableNumberStyle,
                                                greyTableNumber6Button:inActiveTableNumberStyle,
                                                greyTableNumber7Button:inActiveTableNumberStyle,
                                                greyTableNumber8Button:inActiveTableNumberStyle,
                                                greyTableNumber9Button:inActiveTableNumberStyle,
                                                greyTableNumber10Button:inActiveTableNumberStyle

                                            })}>
                                            <Text style={{ color: 'white', fontSize: 32, fontWeight: 'bold' }}>5</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ marginTop: 32, marginBottom: 60, width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <TouchableOpacity style={this.state.greyTableNumber6Button}  onPress={()=>this.setState({
                                                tableNumber:'6',
                                                greyTableNumber1Button:inActiveTableNumberStyle,
                                                greyTableNumber2Button:inActiveTableNumberStyle,
                                                greyTableNumber3Button:inActiveTableNumberStyle,
                                                greyTableNumber4Button:inActiveTableNumberStyle,
                                                greyTableNumber5Button:inActiveTableNumberStyle,
                                                greyTableNumber6Button:ActiveTableNumberStyle,
                                                greyTableNumber7Button:inActiveTableNumberStyle,
                                                greyTableNumber8Button:inActiveTableNumberStyle,
                                                greyTableNumber9Button:inActiveTableNumberStyle,
                                                greyTableNumber10Button:inActiveTableNumberStyle

                                            })}>
                                            <Text style={{ color: 'white', fontSize: 32, fontWeight: 'bold' }}>6</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={this.state.greyTableNumber7Button}  onPress={()=>this.setState({
                                                tableNumber:'7',
                                                greyTableNumber1Button:inActiveTableNumberStyle,
                                                greyTableNumber2Button:inActiveTableNumberStyle,
                                                greyTableNumber3Button:inActiveTableNumberStyle,
                                                greyTableNumber4Button:inActiveTableNumberStyle,
                                                greyTableNumber5Button:inActiveTableNumberStyle,
                                                greyTableNumber6Button:inActiveTableNumberStyle,
                                                greyTableNumber7Button:ActiveTableNumberStyle,
                                                greyTableNumber8Button:inActiveTableNumberStyle,
                                                greyTableNumber9Button:inActiveTableNumberStyle,
                                                greyTableNumber10Button:inActiveTableNumberStyle

                                            })}>
                                            <Text style={{ color: 'white', fontSize: 32, fontWeight: 'bold' }}>7</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={this.state.greyTableNumber8Button}  onPress={()=>this.setState({
                                                tableNumber:'8',
                                                greyTableNumber1Button:inActiveTableNumberStyle,
                                                greyTableNumber2Button:inActiveTableNumberStyle,
                                                greyTableNumber3Button:inActiveTableNumberStyle,
                                                greyTableNumber4Button:inActiveTableNumberStyle,
                                                greyTableNumber5Button:inActiveTableNumberStyle,
                                                greyTableNumber6Button:inActiveTableNumberStyle,
                                                greyTableNumber7Button:inActiveTableNumberStyle,
                                                greyTableNumber8Button:ActiveTableNumberStyle,
                                                greyTableNumber9Button:inActiveTableNumberStyle,
                                                greyTableNumber10Button:inActiveTableNumberStyle

                                            })}>
                                            <Text style={{ color: 'white', fontSize: 32, fontWeight: 'bold' }}>8</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={this.state.greyTableNumber9Button}  onPress={()=>this.setState({
                                                tableNumber:'9',
                                                greyTableNumber1Button:inActiveTableNumberStyle,
                                                greyTableNumber2Button:inActiveTableNumberStyle,
                                                greyTableNumber3Button:inActiveTableNumberStyle,
                                                greyTableNumber4Button:inActiveTableNumberStyle,
                                                greyTableNumber5Button:inActiveTableNumberStyle,
                                                greyTableNumber6Button:inActiveTableNumberStyle,
                                                greyTableNumber7Button:inActiveTableNumberStyle,
                                                greyTableNumber8Button:inActiveTableNumberStyle,
                                                greyTableNumber9Button:ActiveTableNumberStyle,
                                                greyTableNumber10Button:inActiveTableNumberStyle

                                            })}>
                                            <Text style={{ color: 'white', fontSize: 32, fontWeight: 'bold' }}>9</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={this.state.greyTableNumber10Button}  onPress={()=>this.setState({
                                                tableNumber:'10',
                                                greyTableNumber1Button:inActiveTableNumberStyle,
                                                greyTableNumber2Button:inActiveTableNumberStyle,
                                                greyTableNumber3Button:inActiveTableNumberStyle,
                                                greyTableNumber4Button:inActiveTableNumberStyle,
                                                greyTableNumber5Button:inActiveTableNumberStyle,
                                                greyTableNumber6Button:inActiveTableNumberStyle,
                                                greyTableNumber7Button:inActiveTableNumberStyle,
                                                greyTableNumber8Button:inActiveTableNumberStyle,
                                                greyTableNumber9Button:inActiveTableNumberStyle,
                                                greyTableNumber10Button:ActiveTableNumberStyle

                                            })}>
                                            <Text style={{ color: 'white', fontSize: 32, fontWeight: 'bold' }}>10</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <TouchableOpacity style={[styles.editButton, { backgroundColor: '#51DC8B' }]} onPress={() => {
                                        this.setModalTableNameVisible(false)
                                    }}>
                                        <Text style={styles.buttonText}>Save</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal animationType="slide" transparent={true} visible={modalGuestNameVisible} onRequestClose={() => { Alert.alert("Modal has been closed."); this.setModalGuestNameVisible(!modalGuestNameVisible); }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={styles.overlayContainer}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={styles.overlayTitle}>
                                    Enter the Guest Name
                                </Text>
                                <View style={{ width: '70%', alignItems: 'center', flexDirection: 'column' }}>
                                    <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <TouchableOpacity style={this.state.greyMrButton} onPress={{}}>
                                            <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold' }} onPress={() => this.setState({
                                                guestTitle: "Mr.",
                                                greyMrButton: ActiveButtonStyle,
                                                greyMsButton: inActiveButtonStyle,
                                                greyMrsButton: inActiveButtonStyle,
                                                greyDrButton: inActiveButtonStyle,
                                            })}>Mr.</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={this.state.greyMsButton} onPress={{}}>
                                            <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold' }} onPress={() => this.setState({
                                                guestTitle: "Ms.",
                                                greyMsButton: ActiveButtonStyle,
                                                greyMrButton: inActiveButtonStyle,
                                                greyMrsButton: inActiveButtonStyle,
                                                greyDrButton: inActiveButtonStyle,
                                            })}>Ms.</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={this.state.greyMrsButton} onPress={{}}>
                                            <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold' }} onPress={() => this.setState({
                                                guestTitle: "Mrs.",
                                                greyMrsButton: ActiveButtonStyle,
                                                greyMsButton: inActiveButtonStyle,
                                                greyMrButton: inActiveButtonStyle,
                                                greyDrButton: inActiveButtonStyle,
                                            })}>Mrs.</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={this.state.greyDrButton} onPress={{}}>
                                            <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold' }} onPress={() => this.setState({
                                                guestTitle: "Dr.",
                                                greyDrButton: ActiveButtonStyle,
                                                greyMsButton: inActiveButtonStyle,
                                                greyMrButton: inActiveButtonStyle,
                                                greyMrsButton: inActiveButtonStyle,
                                            })}>Dr.</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ marginBottom: 80, marginTop: 40, width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <TextInput style={{ paddingLeft: 10, fontSize: 40, width: '100%', height: 60, borderColor: 'black', borderWidth: 1, borderRadius: 4 }} value={this.state.guestName} onChangeText={(text) => this.setState({
                                            guestName: text
                                        })}>

                                        </TextInput>
                                    </View>

                                    <View style={{ flexDirection: 'row', width: wp('60%'), justifyContent: 'space-evenly', marginBottom: 80 }}>

                                        <TouchableOpacity style={[styles.editButton, { backgroundColor: '#51DC8B' }]} onPress={() => {
                                            this.setModalGuestNameVisible(false)
                                        }}>
                                            <Text style={styles.buttonText}>Save</Text>
                                        </TouchableOpacity>
                                    </View>



                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal animationType="slide" transparent={true} visible={modalRequirementVisible} onRequestClose={() => { Alert.alert("Modal has been closed."); this.setModalRequirementVisible(!modalRequirementVisible); }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={styles.overlayContainer}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={styles.overlayTitle}>
                                    Special Requirement
                                </Text>
                                <View style={{ width: '70%', alignItems: 'center', flexDirection: 'column' }}>
                                    <View style={{ marginBottom: 80, marginTop: 40, width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <TextInput multiline={true} numberOfLines={4} style={{paddingLeft: 10, fontSize: 40, width: '100%', borderColor: 'black', borderWidth: 1, borderRadius: 4 }} value={this.state.requirement} onChangeText={(text) => this.setState({
                                            requirement: text
                                        })}>
                                        </TextInput>
                                    </View>
                                    <View style={{ flexDirection: 'row', width: wp('60%'), justifyContent: 'space-evenly', marginBottom: 80 }}>
                                        <TouchableOpacity style={[styles.editButton, { backgroundColor: '#F24E1E' }]} onPress={() => {
                                                this.setState({requirement:''})
                                            }}>
                                            <Text style={styles.buttonText}>Clear</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.editButton, { backgroundColor: '#51DC8B' }]} onPress={() => {
                                            this.setModalRequirementVisible(false)
                                        }}>
                                            <Text style={styles.buttonText}>Save</Text>
                                        </TouchableOpacity>
                                        
                                    </View>




                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal animationType="slide" transparent={true} visible={modalGuestNumberVisible} onRequestClose={() => { Alert.alert("Modal has been closed."); this.setModalGuestNumberVisible(!modalGuestNumberVisible); }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={styles.overlayContainer}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={styles.overlayTitle}>
                                    Number of Guests
                                </Text>
                                <View style={{ width: '70%', alignItems: 'center', flexDirection: 'column' }}>
                                    <View style={{ marginBottom: 80, marginTop: 40, width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <TextInput style={{textAlign:'center',paddingLeft: 10, fontSize: 80, width: '100%', borderColor: 'black', borderWidth: 1, borderRadius: 4 }} value={this.state.numberOfGuest} onChangeText={(text) => this.setState({
                                            numberOfGuest: text
                                        })}>
                                        </TextInput>
                                    </View>
                                    <View style={{ flexDirection: 'row', width: wp('60%'), justifyContent: 'space-evenly', marginBottom: 80 }}>
                                        <TouchableOpacity style={[styles.editButton, { backgroundColor: '#51DC8B' }]} onPress={() => {
                                            this.setModalGuestNumberVisible(false)
                                        }}>
                                            <Text style={styles.buttonText}>Save</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal animationType="slide" transparent={true} visible={modalFoodOrderVisible} onRequestClose={() => { Alert.alert("Modal has been closed."); this.setModalFoodOrderVisible(!modalFoodOrderVisible); }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={[styles.overlayContainer,{width:wp('90%'), height:hp('100%'), alignItems:'center'}]}>
                            <View style={{width:'90%',flexDirection:'row', justifyContent:'space-between'}}>
                                <Text style={{textAlign:'left',width: "100%",fontSize: 48,fontWeight: 'bold',marginBottom: 0,paddingVertical: 10,flexDirection: 'row',justifyContent: 'center'}}>
                                    Order Food
                                </Text>
                                <View style={{justifyContent:'center', alignItems:'center'}}>
                                    <Ionicons name="cart-outline" size={60} color={'#1E90FF'}/>
                                </View>
                            </View>
                            <View style={{width:'90%',height:60,flexDirection:'row',marginTop:10}}>
                                <TextInput placeholder='search food...' style={{flex:1,borderTopLeftRadius:8, borderBottomLeftRadius:8,borderColor:'#333333', borderWidth:2,height:60, borderRightColor:'white',paddingLeft:10, fontSize:32,color:'black'}}  onChangeText={text=>this.setState({searchText:text})}>
                                </TextInput>
                                <TouchableOpacity  style={{width:150, height:60,flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'#BC62FF', borderTopRightRadius:8,borderBottomRightRadius:8}} onPress={()=>this.search()}>
                                    <Ionicons name={'ios-search'} size={28} color='white' style={{paddingRight:10}}/>
                                    <Text style={{fontSize:24, color:'white'}}>
                                            Search
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flex:1,width:'90%', marginTop:20}}>
                                {/* <ScrollView>
                                    <FlatList contentContainerStyle={{width:'100%'}} data={this.state.data} renderItem={renderData} keyExtractor={item=>item._id}></FlatList>
                                </ScrollView> */}
                                
                            <ScrollView>
                                <FlatList 
                                contentContainerStyle={{width:'100%'}} 
                                data={this.state.data} 
                                renderItem={({ item, index }) => (
                                    <ListItem
                                      item={item}
                                      handleDecrement={()=> this.handleDecrement(item.index)}
                                      handleIncrement={()=> this.handleIncrement(item.index)}
                                    />
                                )} 
                                keyExtractor={item=>item._id} />
                            </ScrollView>
                            
                                
                            </View>
                            <View style={{ width: '70%', alignItems: 'center', flexDirection: 'column' }}>
                                
                                <View style={{ flexDirection: 'row', width: wp('60%'), justifyContent: 'space-evenly', marginBottom: 40 }}>
                                    <TouchableOpacity style={[styles.editButton, { backgroundColor: '#51DC8B' }]} onPress={() => {
                                        this.setModalFoodOrderVisible(false),
                                        this.getDetailOrder(this.state.orderDetailNumber);
                                    }}>
                                        <Text style={styles.buttonText}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
};


export default Order;


