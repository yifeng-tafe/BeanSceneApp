import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, TouchableOpacity, ScrollView, FlatList, Modal, ImageBackground, Picker } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import { set } from 'react-native-reanimated';
import NetInfo from "@react-native-community/netinfo";
import { showMessage } from "react-native-flash-message";



class OrderDetail extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            orderData: [],
            searchText: '',
            orderTime: '',
            orderNumber: '',
            orderDetailNumber: '',
            imageURL: '',
            guestTitle: '',
            guestName: '',
            areaName: '',
            tableNumber: '',
            numberOfGuest: '',
            requirement: '',
            foodOrder: '',
            id: '',
            orderNumber: '',
            foodName: '',
            quantity: '',
            totalPrice: '',
            imageURL: '',
            orderStatus: '',
            sum: 0,
            modalVisible: false,
            modalViewVisible: false,
            modalEditVisible: false,
            modalDeleteVisible: false,
            modalDeleteButtonsVisible: true,
            modalEditButtonsVisible: true,
            modalCreateButtonVisible: true,
            isInProgress:false
        }
    }

    componentDidMount() {
        loc(this);
    }


    componentWillUnMount() {
        rol();
    }

    componentDidMount() {
        // fetch('https://jsonplaceholder.typicode.com/users')
        console.log('getOrder')
        console.log(this.props.route.params)
        var url = "http://localhost:5731/API/Order/" + this.props.route.params.id;
        console.log(url)
        var headers = new Headers({
            Authorization: 'Basic ' + btoa('test:test')
        }
        );

        var options = { headers: headers };

        fetch(url, options)
            .then(response => response.json())
            .then((json) => {
                console.log(json);

                this.setState({
                    data: json,

                })


            })
        this.getDetailOrder(this.props.route.params.orderDetailNumber);
        if (this.props.route.params.orderStatus == "In-Progress")
        {
            this.state.isInProgress = true
        }

    }

    setOrderStatus = () => {
        console.log("update order");
        var staff={
            Id:this.state.id,
            OrderTime: this.state.orderTime,
            OrderNumber: this.state.orderNumber,
            OrderDetailNumber: this.state.orderDetailNumber,
            GuestTitle: this.state.guestTitle,
            GuestName: this.state.guestName,
            AreaName: this.state.areaName,
            TableNumber: this.state.tableNumber,
            NumberOfGuest: this.state.numberOfGuest,
            Requirement: this.state.requirement,
            OrderStatus: "Completed",
        }
        var url="http://localhost:5731/API/Order/updateOrder" 
        var headers = new Headers({
            Authorization: 'Basic ' + btoa('test:test')
        }
        );
        headers.append('Accept', 'application/json');
        headers.append('Content-Type','application/json');
        var options={method:'POST', headers:headers, body:JSON.stringify(staff)};

        fetch(url,options)
        .then(response => response.json())
        .then((json) =>{
            console.log(json);

            this.setState({
                data:json,
                message:"Updated Successfully",
                modalEditButtonsVisible: false,
            })
        })
    }

    

    getDetailOrder = (text) => {
        console.log("get detail order by OrderNumber");
        // var text=this.state.searchOrder;

        if (text) {
            console.log("inside" + text);
            var url = "http://localhost:5731/API/OrderDetail/" + text
            console.log(url);

            var headers = new Headers({
                Authorization: 'Basic ' + btoa('test:test')
            }
            );

            var options = { headers: headers };

            fetch(url, options)

                .then(response => response.json())
                .then((json) => {
                    console.log(json);

                    this.setState({
                        orderData: json
                    })
                })
        }
    }


    setModalCreateVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }
    setModalViewVisible = (visible) => {
        this.setState({ modalViewVisible: visible });
    }
    setModalEditVisible = (visible) => {
        this.setState({ modalEditVisible: visible });
    }
    setModalDeleteVisible = (visible) => {
        this.setState({ modalDeleteVisible: visible });
    }

    resetMessage = () => {
        this.setState({ message: '' })
    }

    render() {

        const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: 'black',
                alignItems: 'center'
            },
            headerContainer: {
                width: wp('90%'),
                height: hp('8%'),
                marginTop: hp('3%'),
                flexDirection: 'row',
                alignItems: 'center',
            },
            backButtonContainer: {


            },
            titleContainer: {
                marginLeft: 20,
                justifyContent: 'center',
                alignContent: 'center'
            },
            createButtonContainer: {
                marginLeft: 30,
                textAlignVertical: 'center'

            },
            searchContainer: {
                width: wp('90%'),
                height: 48,
                marginTop: 20,
                flexDirection: 'row'
            },
            contentContainer: {
                marginTop: 40,
                flexDirection: 'row',
                width: wp("90%")

            },
            listText: {
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold',


            },
            crudButton: {
                height: 30,
                width: 70,
                borderRadius: 4,
                marginLeft: 0,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 5
            },
            listVewStyle: {
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                width: wp('90%'),
                justifyContent: 'flex-start'
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
                width: '100%',
                height: wp('30%'),
                borderRadius: 4,
                alignItems: 'center',
                justifyContent: 'center'
            },
            editButton: {
                width: 160,
                height: 40,
                borderRadius: 20,
                textAlign: 'center',
                justifyContent: 'center',
                backgroundColor: '#1E90FF'
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
            messageText: {
                fontSize: 20,
                textAlign: 'center',
                color: 'red',
                marginBottom: 80
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
            buttonTextActive: {
                fontSize: 20,
                color: 'white',
                fontWeight: 'bold'
            },

        })

        const renderDetailOrder = ({ item }) => {

            return (
                <View style={{ flexDirection: 'row', marginBottom: 20, width: '100%' }}>
                    <View>
                        <Image source={{ uri: item.ImageURL }} style={{ width: 160, height: 120 }} />
                    </View>
                    <View style={{ flex: 1, borderColor: 'white', borderBottomWidth: 1, borderStyle: 'dashed', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ width: '35%', flexDirection: 'column', justifyContent: 'space-between', marginLeft: 20, paddignRight: 20, borderRightWidth: 1, borderColor: 'white' }}>
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{item.FoodName}</Text>
                            <Text style={{ color: 'white', fontSize: 50, fontWeight: 'bold' }}>X{item.Quantity}</Text>
                        </View>
                        <View style={{ marginLeft: 20, borderRightWidth: 1, borderColor: 'white', borderStyle: 'dashed', paddingRight: 20, }}>
                            <View>
                                <Text style={{ color: 'white', fontSize: 18, fontStyle: 'italic' }}>Status</Text>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                    <TouchableOpacity style={{ backgroundColor: '#1E90FF', width: 80, height: 30, borderRadius: 15, justifyContent: 'center' }}>
                                        <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>{item.FoodStatus}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ marginLeft: 20, }}>
                                <View>
                                    <Text style={{ color: 'white', fontSize: 18, fontStyle: 'italic' }}>Change Status</Text>
                                </View>
                                <View style={{ flexDirection: 'column' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity style={{ marginVertical: 10, backgroundColor: '#1E90FF', width: 80, height: 30, borderRadius: 15, justifyContent: 'center' }}>
                                            <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Ordered</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ marginVertical: 10, marginLeft: 10, backgroundColor: '#BC62FF', width: 80, height: 30, borderRadius: 15, justifyContent: 'center' }}>
                                            {/* onPress={()=>{
                                            this.state.id =item.Id;
                                            this.state.orderNumber =item.OrderNumber;
                                            this.state.foodName =item.FoodName;
                                            this.state.imageURL =item.ImageURL;
                                            this.state.quantity =item.Quantity;
                                            this.state.totalPrice = item.TotalPrice;
                                            this.state.foodStatus ='Cooking';
                                            this.setFoodStatus();
                                            }}> */}
                                            <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Cooking</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ marginVertical: 10, marginLeft: 10, backgroundColor: '#51DC8B', width: 80, height: 30, borderRadius: 15, justifyContent: 'center' }} >
                                            {/* onPress={()=>{
                                            this.state.id =item.Id;
                                            this.state.orderNumber =item.OrderNumber;
                                            this.state.foodName =item.FoodName;
                                            this.state.imageURL =item.ImageURL;
                                            this.state.quantity =item.Quantity;
                                            this.state.totalPrice = item.TotalPrice;
                                            this.state.foodStatus ='Served';
                                            this.setFoodStatus();
                                            }}> */}
                                            <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Served</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <TouchableOpacity style={{ backgroundColor: '#FF3E6C', width: 80, height: 30, borderRadius: 15, justifyContent: 'center' }}>
                                            <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>cancel</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                <Text style={{ color: 'white', fontSize: 36, textAlign: 'right' }}>${item.TotalPrice}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }

        const { orderData } = this.state;
        let sum = 0;
        orderData.forEach((item) => sum += parseFloat(item.TotalPrice))

        return (
            <View style={styles.container}>

                <View style={styles.headerContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.backButtonContainer}>
                                <TouchableOpacity style={{ height: 40, width: 40, borderRadius: 8, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }} onPress={() => this.props.navigation.navigate('Orders')}>
                                    <Ionicons name={'ios-arrow-back'} size={35} color='white' />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.titleContainer}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 32 }}>
                                    Order Id: {this.props.route.params.orderNumber}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={(this.props.route.params.orderStatus === 'In-Progress' ? styles.blueButtonActive : styles.greenButtonActive) || (this.props.route.params.orderStatus === 'Cancelled' ? styles.redButtonActive : styles.redButtonActive)} onPress={() => { }}>
                            <Text style={styles.buttonTextActive}>
                                {this.props.route.params.orderStatus}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ width: wp('90%'), marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', flex: 1, borderRadius: 8, backgroundColor: '#333333', marginBottom: 12, padding: 12 }}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                            <View style={{ backgroundColor: '#FFAB1E', height: 60, width: 60, borderRadius: 4, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                                <Ionicons name="tv" size={42} color="white"></Ionicons>
                            </View>
                            <Text style={{ color: 'white', fontSize: 48, fontWeight: 'bold' }}>{this.props.route.params.areaName}{this.props.route.params.tableNumber}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                            <View style={{ backgroundColor: '#BC62FF', height: 60, width: 60, borderRadius: 4, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                                <Ionicons name="people" size={42} color="white"></Ionicons>
                            </View>
                            <Text style={{ color: 'white', fontSize: 48, fontWeight: 'bold' }}>{this.props.route.params.numberOfGuest}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                            <View style={{ backgroundColor: '#FF3E6C', height: 60, width: 60, borderRadius: 4, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                                <Ionicons name="time" size={42} color="white"></Ionicons>
                            </View>
                            <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>{this.props.route.params.orderTime}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                            <View style={{ backgroundColor: '#61BFC2', height: 60, width: 60, borderRadius: 4, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                                <Ionicons name="cash" size={42} color="white"></Ionicons>
                            </View>
                            <Text style={{ color: 'white', fontSize: 48, fontWeight: 'bold' }}>${sum}</Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                            <View style={{ flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Text style={{ color: 'white', fontStyle: 'italic', fontSize: 28 }}>Guest Name:</Text>
                                    <TextInput editable={false} style={{ marginLeft: 20, color: 'white', fontWeight: 'bold', fontSize: 28, width: 200, height: 50, paddingLeft: 10, backgroundColor: '#333333', borderRadius: 8 }} value={this.props.route.params.guestTitle + this.props.route.params.guestName}></TextInput>
                                </View>
                                {this.state.isInProgress ?
                                (<View>
                                    <TouchableOpacity style={[styles.greenButtonActive, {width:200}]} onPress={()=>{
                                        this.state.id = this.props.route.params.id,
                                        this.state.orderTime = this.props.route.params.orderTime,
                                        this.state.orderNumber = this.props.route.params.orderNumber,
                                        this.state.orderDetailNumber = this.props.route.params.orderDetailNumber,
                                        this.state.guestTitle = this.props.route.params.guestTitle,
                                        this.state.guestName = this.props.route.params.guestName,
                                        this.state.areaName = this.props.route.params.areaName,
                                        this.state.tableNumber = this.props.route.params.tableNumber,
                                        this.state.numberOfGuest = this.props.route.params.numberOfGuest,
                                        this.state.requirement = this.props.route.params.requirement,
                                        this.setOrderStatus(),
                                        //this.props.navigation.state.params.refresh();
                                        this.props.navigation.navigate('Orders')
                                        
                                        

                                    }}>
                                        <Text style={styles.buttonTextActive}>                                
                                            Order Completed
                                        </Text>
                                    </TouchableOpacity>
                                </View>)
                                :
                                <Text></Text>
                                }
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                            <Text style={{ color: 'white', fontStyle: 'italic', fontSize: 28 }}>Special Requirements:</Text>
                            <TextInput multiline={true} editable={false} style={{ marginLeft: 20, color: 'white', fontWeight: 'bold', fontSize: 28, paddingLeft: 10, backgroundColor: '#333333', borderRadius: 8 }} numberOfLines={3} value={this.props.route.params.requirement}></TextInput>
                        </View>
                    </View>

                </View>

                <View style={{ width: wp('90%'), backgroundColor: '#333333', borderRadius: 8, padding: 20, marginTop: 40 }}>
                    <ScrollView>
                        <FlatList data={this.state.orderData} renderItem={renderDetailOrder} keyExtractor={(item) => item._id}></FlatList>
                    </ScrollView>
                    <View style={{ marginTop: 40, borderBottomColor: 'white', borderBottomWidth: 1, borderStyle: 'dashed' }}>
                        <Text style={{ marginBottom: 20, textAlign: 'right', fontSize: 44, color: 'white', fontWeight: 'bold' }}>Total:  AUD$ {sum}</Text>
                    </View>
                </View>
                
            </View>

        )
    }
};

export default OrderDetail;

