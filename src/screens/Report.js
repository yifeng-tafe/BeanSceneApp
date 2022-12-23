import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, TouchableOpacity, ScrollView, FlatList, Modal } from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';

import { Ionicons } from '@expo/vector-icons';
import NetInfo from "@react-native-community/netinfo";
import { showMessage } from "react-native-flash-message";
import { set } from 'react-native-reanimated';




class Order extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            curTime: '',
            active:0,
            statusText:'In-Progress',
            modalDeleteVisible: false,
            modalDeleteButtonsVisible: true,
            id:'',
            orderTime:'',
            orderNumber:'',
            orderDetailNumber:'',
            guestTitle: '',
            guestName: '',
            areaName: '',
            tableNumber: '',
            requirement:'',
            numberOfGuest:'',
            orderStatus:'',
            isManager:false,
           
        }
    }

    componentDidMount() {
        loc(this);
        this.getOrderDetail(this.state.statusText);
        console.log(global.role);
        if (global.role == "Manager")
        {
            console.log(global.role );
            this.setState({
                isManager:true
            })
        }

    }

    componentWillUnMount() {
        rol();
    }
    setModalDeleteVisible = (visible) => {
        this.setState({ modalDeleteVisible: visible });
    }

    getOrderDetail (text) {
        // fetch('https://jsonplaceholder.typicode.com/users')
        console.log('getOrder')
        // console.log(this.props.route.params)
        var url="http://localhost:5731/API/Order/Status/" + text;
        console.log(url)    
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

    resetMessage = ()=>{
        this.setState({message:''})
    }

    setOrderStatus = () => {
        console.log("update order status");
        var order = {
            Id: this.state.id,
            OrderTime: this.state.orderTime,
            OrderNumber: this.state.orderNumber,
            OrderDetailNumber: this.state.orderDetailNumber,
            GuestTitle: this.state.guestTitle,
            GuestName: this.state.guestName,
            AreaName: this.state.areaName,
            TableNumber: this.state.tableNumber,
            NumberOfGuest: this.state.numberOfGuest,
            Requirement: this.state.requirement,
            OrderStatus: "Cancelled",
        }
        var url = "http://localhost:5731/API/Order/updateOrder"
        var headers = new Headers({
            Authorization: 'Basic ' + btoa('test:test')
        }
        );
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        var options = { method: 'POST', headers: headers, body: JSON.stringify(order) };

        fetch(url, options)
            .then(response => response.json())
            .then((json) => {
                console.log(json);

                this.setState({
                    orderData: json,
                    message: "Updated Successfully",
                    modalEditButtonsVisible: false,
                })
                console.log("update finished!")
            })
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

    




    render() {
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
            blueButtonActive: {
                width: 160,
                height: 40,
                borderRadius: 20,
                textAlign: 'center',
                justifyContent: 'center',
                backgroundColor: '#1E90FF'
                
            },
            greenButtonActive: {
                width: 160,
                height: 40,
                borderRadius: 20,
                textAlign: 'center',
                justifyContent: 'center',
                backgroundColor: '#51DC8B'
                
            },
            redButtonActive: {
                width: 160,
                height: 40,
                borderRadius: 20,
                textAlign: 'center',
                justifyContent: 'center',
                backgroundColor: '#FF3E6C'
                
            },
            editButtonInactive: {
                width: 160,
                height: 40,
                borderRadius: 20,
                textAlign: 'center',
                justifyContent: 'center',
                backgroundColor: '#333333'
            },
            buttonTextActive: {
                fontSize: 20,
                color: 'white',
                fontWeight: 'bold'
            },
            buttonTextInactive: {
                fontSize: 20,
                color: 'black',
                fontWeight: 'bold'
            },
            overlayContainer: {
                width: wp('60%'),
                height: hp('100%'),
                backgroundColor: 'white',
                borderTopRightRadius: 24,
                borderTopLeftRadius: 24

            },
            overlayTitle: {
                width: "100%",
                fontSize: 36,
                fontWeight: 'bold',
                marginBottom: hp('3%'),
                borderBottomColor: 'grey',
                borderBottomWidth: 1.5,
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
            deleteContainer: {
                width: wp('60%'),
                height: wp('35%'),
                backgroundColor: '#F08B42',
                borderRadius: 24,
                flex: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            },
            deleteText: {
                color: 'white',
                fontWeight: 'bold',
                fontSize: wp('5%'),
                textAlign: 'center',

            },
            messageText:{
                fontSize:20, 
                textAlign:'center', 
                color:'red', 
                marginBottom:80
            }
        })
        const {modalDeleteVisible} = this.state
        const renderData=({item})=>{
            // var url = "data:image/png;base64," + item.ImageURL
            var url = item.ImageURL
            return(
                <View style={{flexDirection: 'column', height: '100%', borderRadius: 8,}}>
                    <TouchableOpacity style={{width:wp('90%')}} onLongPress={() => {
                            this.state.id = item.Id,
                            this.state.orderTime = item.OrderTime,
                            this.state.orderNumber = item.OrderNumber,
                            this.state.orderDetailNumber = item.OrderDetailNumber,
                            this.state.guestTitle = item.GuestTitle,
                            this.state.guestName = item.GuestName,
                            this.state.areaName = item.AreaName,
                            this.state.tableNumber = item.TableNumber,
                            this.state.requirement = item.Requirement,
                            this.state.numberOfGuest = item.NumberOfGuest,
                            this.state.orderStatus = item.OrderStatus
                            this.setModalDeleteVisible(true)}} onPress={()=>this.props.navigation.navigate('OrderDetail', {id:item.Id, orderTime:item.OrderTime, orderNumber:item.OrderNumber, orderDetailNumber:item.OrderDetailNumber, guestTitle:item.GuestTitle, guestName:item.GuestName, areaName:item.AreaName, tableNumber:item.TableNumber, numberOfGuest:item.NumberOfGuest, requirement:item.Requirement, orderStatus:item.OrderStatus, foodOrder:item.FoodOrder, refresh: ()=>{this.getOrderDetail();},})}>
                            <View>
                                <Text style={{color:'white', fontSize:18}}>{item.OrderNumber}</Text>
                            </View>
                            <View style={{flex:1, flexDirection:'row', flex: 1, borderRadius: 8, backgroundColor: '#333333', marginBottom:24,padding:12 }}>
                                <View style={{flex:1,alignItems:'center',justifyContent:'flex-start',flexDirection:'row'}}>
                                    <View style={{backgroundColor:'#FFAB1E', height:60, width:60, borderRadius:4,alignItems:'center',justifyContent:'center',marginRight:12}}>
                                        <Ionicons name="tv" size={42} color="white"></Ionicons>
                                    </View>
                                    <Text style={{color:'white', fontSize:48, fontWeight:'bold'}}>{item.AreaName}{item.TableNumber}</Text>
                                </View>
                                <View style={{flex:1,alignItems:'center',justifyContent:'flex-start',flexDirection:'row'}}>
                                    <View style={{backgroundColor:'#BC62FF', height:60, width:60, borderRadius:4,alignItems:'center',justifyContent:'center',marginRight:12}}>
                                        <Ionicons name="people" size={42} color="white"></Ionicons>
                                    </View>
                                    <Text style={{color:'white', fontSize:48, fontWeight:'bold'}}>{item.NumberOfGuest}</Text>
                                </View>
                                <View style={{flex:1,alignItems:'center',justifyContent:'flex-start',flexDirection:'row'}}>
                                    <View style={{backgroundColor:'#FF3E6C', height:60, width:60, borderRadius:4,alignItems:'center',justifyContent:'center',marginRight:12}}>
                                        <Ionicons name="time" size={42} color="white"></Ionicons>
                                    </View>
                                    <Text style={{color:'white', fontSize:24, fontWeight:'bold'}}>{item.OrderTime}</Text>
                                </View>
                                <View style={{flex:1,alignItems:'center',justifyContent:'flex-start',flexDirection:'row'}}>
                                    <View style={{backgroundColor:'#61BFC2', height:60, width:60, borderRadius:4,alignItems:'center',justifyContent:'center',marginRight:12}}>
                                        <Ionicons name="person" size={42} color="white"></Ionicons>
                                    </View>
                                    <Text style={{color:'white', fontSize:18, fontWeight:'bold'}}>{item.GuestTitle}{item.GuestName}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                </View>
                
                
            )
        };

        const orderDT = new Date();
        const orderD = orderDT.toDateString();
        const orderT = orderDT.toLocaleTimeString();        

        return (
            this.displayConnectionMessage(),
            
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
                            <View style={{ justifyContent: "center" }}>
                                <TouchableOpacity style={this.state.active === 0 ? styles.blueButtonActive : styles.editButtonInactive} onPress={()=>{
                                    this.state.active = 0
                                    this.state.statusText='In-Progress'
                                    this.componentDidMount()
                                    }}>
                                <Text style={this.state.active === 0 ? styles.buttonTextActive : styles.buttonTextInactive}>In-Progress</Text>
                            </TouchableOpacity>
                            </View>
                            
                           
                            {this.state.isManager ?    
                                (<View style={{flexDirection:'row'}}>
                                    <View style={{ marginLeft: 30, justifyContent: "center" }}>
                                        <TouchableOpacity style={this.state.active === 1 ? styles.greenButtonActive : styles.editButtonInactive} onPress={()=>{
                                            this.state.active = 1
                                            this.state.statusText='Completed'
                                            this.componentDidMount()
                                            }}>
                                            <Text style={this.state.active === 1 ? styles.buttonTextActive : styles.buttonTextInactive}>Completed</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ marginLeft: 30, justifyContent: "center" }}>
                                        <TouchableOpacity style={this.state.active === 2 ? styles.redButtonActive : styles.editButtonInactive} onPress={()=>{
                                            this.state.active = 2
                                            this.state.statusText='Cancelled'
                                            this.componentDidMount()
                                            
                                        }}>
                                            <Text style={this.state.active === 2 ? styles.buttonTextActive : styles.buttonTextInactive}>Cancelled</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                )
                                :
                                <View><Text></Text></View>
                            }              
                        </View>
                    </View>
                </View>
                <View style={{ width: wp('90%'), flexDirection: 'row', flex: 1, marginTop: 30, marginBottom: 80 }}>
                    <View style={{flexDirection: 'column', height: '100%', borderRadius: 8,}}>
                        <ScrollView>
                            <FlatList data={this.state.data} renderItem={renderData} keyExtractor={(item)=>item._id}></FlatList>
                        </ScrollView>
                        {/* <TouchableOpacity style={{width:wp('90%')}}>
                            <View>
                                <Text style={{color:'white', fontSize:'18'}}>Order ID:031020221903M1Tom</Text>
                            </View>
                            <View style={{flex:1, flexDirection:'row', flex: 1, borderRadius: 8, backgroundColor: '#333333', marginBottom: 12,padding:12 }}>
                                <View style={{flex:1,alignItems:'center',justifyContent:'flex-start',flexDirection:'row'}}>
                                    <View style={{backgroundColor:'#FFAB1E', height:60, width:60, borderRadius:4,alignItems:'center',justifyContent:'center',marginRight:12}}>
                                        <Ionicons name="time-outline" size={54} color="white"></Ionicons>
                                    </View>
                                    <Text style={{color:'white', fontSize:48, fontWeight:'bold'}}>M1</Text>
                                </View>
                                <View style={{flex:1,alignItems:'center',justifyContent:'flex-start',flexDirection:'row'}}>
                                    <View style={{backgroundColor:'#BC62FF', height:60, width:60, borderRadius:4,alignItems:'center',justifyContent:'center',marginRight:12}}>
                                        <Ionicons name="time-outline" size={54} color="white"></Ionicons>
                                    </View>
                                    <Text style={{color:'white', fontSize:48, fontWeight:'bold'}}>5</Text>
                                </View>
                                <View style={{flex:1,alignItems:'center',justifyContent:'flex-start',flexDirection:'row'}}>
                                    <View style={{backgroundColor:'#FF3E6C', height:60, width:60, borderRadius:4,alignItems:'center',justifyContent:'center',marginRight:12}}>
                                        <Ionicons name="time-outline" size={54} color="white"></Ionicons>
                                    </View>
                                    <Text style={{color:'white', fontSize:48, fontWeight:'bold'}}>19:30</Text>
                                </View>
                                <View style={{flex:1,alignItems:'center',justifyContent:'flex-start',flexDirection:'row'}}>
                                    <View style={{backgroundColor:'#61BFC2', height:60, width:60, borderRadius:4,alignItems:'center',justifyContent:'center',marginRight:12}}>
                                        <Ionicons name="time-outline" size={54} color="white"></Ionicons>
                                    </View>
                                    <Text style={{color:'white', fontSize:48, fontWeight:'bold'}}>M1</Text>
                                </View>
                            </View>
                        </TouchableOpacity> */}
                    </View>
                    
                        
                </View>
                <Modal animationType="slide" transparent={true} visible={modalDeleteVisible} onRequestClose={() => { Alert.alert("Modal has been closed."); this.setModalDeleteVisible(!modalDeleteVisible); }}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <View style={styles.deleteContainer}>
                            {
                                // condition ? true : false
                                this.state.modalDeleteButtonsVisible
                                    ?
                                    (<View style={{ flex: 'column', height: '100%', width: '100%', justifyContent: 'space-evenly', padding: 40 }}>
                                        <View style={{ alignItems: 'center', }}>
                                            <Text style={styles.deleteText}>
                                                Do you want to delete this order?
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                            <TouchableOpacity style={[styles.editButton, { backgroundColor: '#FF3E6C' }]} onPress={() => {
                                                this.resetMessage(),
                                                    this.setModalDeleteVisible(false)
                                            }}>
                                                <Text style={styles.buttonText}>Cancel</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={[styles.editButton, { backgroundColor: '#51DC8B' }]} onPress={(item) => {
                                            
                                            this.setOrderStatus(),
                                            this.resetMessage(),
                                            this.setModalDeleteVisible(false)
                                            this.componentDidMount()
                                        }}>
                                                <Text style={styles.buttonText}>Confirm</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>)
                                    :
                                    <View style={{ flexDirection: 'column', height: '80%', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                        <Text style={{ color: 'white', fontSize: 60, fontWeight: 'bold', marginBottom: 5 }}>{this.state.message}</Text>
                                        <TouchableOpacity style={[styles.editButton, { backgroundColor: '#1E90FF' }]} >
                                            <Text style={styles.buttonText}>Back</Text>
                                        </TouchableOpacity>
                                    </View>
                            }
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
};

export default Order;


