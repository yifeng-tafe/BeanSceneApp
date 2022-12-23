import React, { Component } from 'react';
import { Picker, StyleSheet, View, Text, TextInput, Button, Image, Modal, TouchableOpacity, ScrollView, FlatList, ImageBackground } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import { showMessage } from "react-native-flash-message";
import NetInfo from "@react-native-community/netinfo";




class Staff extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            searchText: '',
            modalVisible: false,
            modalViewVisible: false,
            modalEditVisible: false,
            modalDeleteVisible: false,
            modalDeleteButtonsVisible: true,
            modalEditButtonsVisible: true,
            modalCreateButtonVisible: true,
            id: '',
            firstname: '',
            lastname: '',
            email: '',
            mobile: '',
            username:'',
            password:'',
            imageURL: '',
            role:'staff',
            message: '',
            url: '',
            visible:false,
            
        }
    }

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

    search = () => {
        console.log("search");
        var text = this.state.searchText;
        if (text) {
            console.log("inside" + text);
            var url = "http://localhost:5731/API/Staff/" + text
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
                        data: json
                    })
                })
        }
    }

    updateStaff=()=>{
        console.log("update staff");
        var staff={
            id:this.state.id,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            mobile: this.state.mobile,
            imageURL: this.state.imageURL
        }
        var url="http://localhost:5731/API/Staff/updateStaff" 
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

    addStaff=()=>{
        // Display message...
        this.displayConnectionMessage()

        // Cancel if no internet connection
        // if (!(NetInfo.fetch()).isConnected) {
        //     this.setModalCreateVisible(false);
        //     return
        // }

        
        console.log("add staff");

        var product={
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            mobile: this.state.mobile,
            username: this.state.username,
            password: this.state.password,
            role: this.state.role,
            imageURL: '',
        }
        var url="http://localhost:5731/API/Staff/addStaff" 
        var headers = new Headers({
            Authorization: 'Basic ' + btoa('test:test')
        });

        headers.append('Accept', 'application/json');
        headers.append('Content-Type','application/json');
        var options={method:'POST', headers:headers, body:JSON.stringify(product)};

        fetch(url,options)
        .then(response => response.json())
        .then((json) =>{
            console.log(json);

            this.setState({
                data:json,
                message:"Added Successfully",
                modalCreateButtonVisible:false
            })
        })
    }

    deleteStaff=()=>{
        console.log("delete staff");
        console.log(this.state.id)
        var url="http://localhost:5731/API/Staff/deleteStaff/"+this.state.id;
        
        var headers = new Headers({
            Authorization: 'Basic ' + btoa('test:test')
        });
        
        var options={method:'DELETE', headers:headers};

        fetch(url,options)
        .then(response => response.json())
        .then((json) =>{
            console.log(json);

            this.setState({
                data:json,
                modalDeleteButtonsVisible: false,
                message:"Deleted Successfully"
            })
        })
    }


    // state = {
    //     modalCreateVisible: false,
    //     modalViewVisible: false,
    //     modalEditVisible: false,
    //     modalDeleteVisible: false,
    // };


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

    resetMessage = ()=>{
        this.setState({message:''})
    }

    

    styles = StyleSheet.create({
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
                alignItems: 'center'
            },
            backButtonContainer: {


            },
            titleContainer: {
                marginLeft: 20,
                justifyContent: 'center',
                alignContent: 'center'


            },
            createButtonContainer: {
                width: 120,
                marginLeft: 30,
                textAlignVertical: 'center',
                flexDirection:'row'

            },
            searchContainer: {
                width: wp('90%'),
                height: 48,
                marginTop: 20,
                flexDirection: 'row'
            },
            contentContainer: {
                width: wp('90%'),
                flex: 1
            },
            listText: {
                color: 'white',
                fontSize: 28,
                paddingLeft: 40,
            },
            crudButton: {
                backgroundColor: 'grey',
                height: 44,
                width: 44,
                borderRadius: 8,
                marginLeft: 16,
                alignItems: 'center',
                justifyContent: 'center',
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

    render() {
        const styles = this.styles
        const {modalVisible, modalViewVisible, modalEditVisible, modalDeleteVisible, } = this.state
        const renderData = ({ item }) => {
            
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{ height: 100, width: 100, borderRadius: 50 }} source={{uri:"data:image/png;base64," + item.imageURL}}/>
                        <Text style={styles.listText}>{item.firstname} {item.lastname}</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={[styles.crudButton, { backgroundColor: "#61BFC2" }]} onPress={() => {
                            this.setModalViewVisible(true),
                                this.setState({
                                    id:item.id,
                                    firstname: item.firstname,
                                    lastname: item.lastname,
                                    email: item.email,
                                    mobile: item.mobile,
                                    imageURL: item.imageURL,
                                    url: "data:image/png;base64," + item.imageURL
                                })
                        }}>
                            <Ionicons name={"ios-eye"} color="white" size={28} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.crudButton, { backgroundColor: "#51DC8B" }]} onPress={() => {
                            this.setModalEditVisible(true),
                            this.setState({
                                id:item.id,
                                firstname: item.firstname,
                                lastname: item.lastname,
                                email: item.email,
                                mobile: item.mobile,
                                imageURL: item.imageURL,
                                url: "data:image/png;base64," + item.imageURL,
                                modalEditButtonsVisible:true
                            })

                        }}>
                            <Ionicons name={"ios-pencil"} color="white" size={28} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.crudButton, { backgroundColor: "#FF3E6C" }]} onPress={() => {
                            this.setModalDeleteVisible(true)
                            this.setState({
                                id:item.id,
                                modalDeleteButtonsVisible:true
                            })}}>
                            <Ionicons name={"ios-trash"} color="white" size={28} />
                        </TouchableOpacity>
                    </View>
                </View>
            )

        };
        

        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.backButtonContainer}>
                        <TouchableOpacity style={{ height: 40, width: 40, borderRadius: 8, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }} onPress={() => this.props.navigation.navigate('Management')}>
                            <Ionicons name={'ios-arrow-back'} size={35} color='white' />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 32 }}>
                            Staff Management
                        </Text>
                    </View>
                    <View style={styles.createButtonContainer}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', height: 40, borderRadius: 8, backgroundColor: '#1E90FF', width: 110, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.setModalCreateVisible(true)}>
                            <Ionicons name={'ios-add'} size={35} color='white' />
                            <Text style={{ color: 'white', fontSize: 24 }}>
                                New
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', height: 40, borderRadius: 8, backgroundColor: '#51DC8B', width: 110, alignItems: 'center', justifyContent: 'center', marginLeft:20}} onPress={() => {
                            this.state.searchText = " "
                            
                            this.search()
                            this.state.searchText =''
                        }}>
                            <Text style={{ color: 'white', fontSize: 24 }}>
                                Show All
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.searchContainer}>
                    <TextInput placeholder='search staff...' style={{ flex: 1, borderTopLeftRadius: 8, borderBottomLeftRadius: 8, backgroundColor: '#333333', height: 48, paddingLeft: 10, fontSize: 20, color: 'white' }} value={this.state.searchText} onChangeText={text => this.setState({ searchText: text })}>
                    </TextInput>
                    <TouchableOpacity style={{ width: 150, height: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#BC62FF', borderTopRightRadius: 8, borderBottomRightRadius: 8 }} onPress={() => this.search()}>
                        <Ionicons name={'ios-search'} size={28} color='white' style={{ paddingRight: 10 }} />
                        <Text style={{ fontSize: 24, color: 'white' }}>
                            Search
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.contentContainer}>
                    <ScrollView>
                        <FlatList data={this.state.data} renderItem={renderData} keyExtractor={(item) => item.id}></FlatList>
                    </ScrollView>
                </View>
                <View>
                <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { Alert.alert("Modal has been closed."); this.setModalCreateVisible(!modalVisible); }}>
                <View style={{ alignItems: 'center' }}>
                    <View style={styles.overlayContainer}>
                        <ScrollView vertical={true} showsHorizontalScrollIndicator={false}>
                            <Text style={styles.overlayTitle}>
                                Create New Staff
                            </Text>
                            <View style={{ padding: 40, alignItems: 'center' }}>
                                <TouchableOpacity style={styles.photoSection}>
                                    <Ionicons name="ios-camera" size={50} color='grey' />
                                    <Text style={{ color: 'grey', fontsize: 32 }}>Upload Image</Text>
                                </TouchableOpacity>
                                <View style={{ width: '100%', marginTop: 40 }}>
                                    <Text style={styles.inputLabel}>First Name</Text>
                                    <TextInput style={styles.inputLine} onChangeText={text=>this.setState({firstname:text})}></TextInput>
                                    <Text style={styles.inputLabel}>Last Name</Text>
                                    <TextInput style={styles.inputLine} onChangeText={text=>this.setState({lastname:text})}></TextInput>
                                    <Text style={styles.inputLabel}>Email Address</Text>
                                    <TextInput style={styles.inputLine} onChangeText={text=>this.setState({email:text})}></TextInput>
                                    <Text style={styles.inputLabel}>Mobile Phone</Text>
                                    <TextInput style={styles.inputLine} onChangeText={text=>this.setState({mobile:text})}></TextInput>
                                    <Text style={styles.inputLabel}>Username</Text>
                                    <TextInput style={styles.inputLine} onChangeText={text=>this.setState({username:text})}></TextInput>
                                    <Text style={styles.inputLabel}>Password</Text>
                                    <TextInput style={styles.inputLine} onChangeText={text=>this.setState({password:text})}></TextInput>
                                    <Text style={styles.inputLabel}>Role</Text>
                                    <View style={{width:350}}>
                                        <Picker style={{fontSize:28}} selectedValue={this.state.role} onValueChange={(value)=>this.setState({role:value})}>
                                            <Picker.Item label="Staff" value="staff"></Picker.Item>
                                            <Picker.Item label="Manager" value="manager"></Picker.Item>
                                        </Picker>
                                    </View>
                                </View>
                            </View>
                            { this.state.modalCreateButtonVisible
                            ?
                            (<View style={{ flexDirection: 'row', width: wp('60%'), justifyContent: 'space-evenly', marginBottom: 40 }}>
                                <TouchableOpacity style={[styles.editButton, { backgroundColor: '#FF3E6C' }]} onPress={() => {
                                    this.resetMessage(),
                                    this.setModalCreateVisible(false)}}>
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.editButton, { backgroundColor: '#51DC8B' }]} onPress={() => {
                                    this.addStaff()
                                    console.log("press save button")
                                    }}>
                                    <Text style={styles.buttonText}>Save</Text>
                                </TouchableOpacity>
                            </View>)
                            :
                            <View style={{ flexDirection: 'column', width: wp('60%'), alignItems:'center', marginBottom: 40 }}>
                                    <Text style={[styles.messageText,{marginBottom:40}]}>{this.state.message}</Text>
                                    <TouchableOpacity style={[styles.editButton, {backgroundColor: '#1E90FF' }]} onPress={() => {
                                this.setModalCreateVisible(false),
                                this.resetMessage()
                                }}>
                                    <Text style={styles.buttonText}>Back</Text>
                                </TouchableOpacity>
                                </View>
                            }               
                        </ScrollView>
                    </View>
                </View>
            </Modal>
            <Modal animationType="slide" transparent={true} visible={modalEditVisible} onRequestClose={() => { Alert.alert("Modal has been closed."); this.setModalEditVisible(!modalEditVisible); }}>
                <View style={{ alignItems: 'center' }}>
                    <View style={styles.overlayContainer}>
                        <ScrollView vertical={true} showsHorizontalScrollIndicator={false}>
                            <Text style={styles.overlayTitle}>
                                {this.state.firstname} {this.state.lastname}
                            </Text>
                            <View style={{ padding: 40, alignItems: 'center' }}>
                                <TouchableOpacity style={styles.photoSection}>
                                    <ImageBackground style={{
                                        width: wp('30%'),
                                        height: wp('30%'),
                                        borderRadius: wp('30%') / 2, alignItems: 'flex-end', justifyContent: "flex-end"
                                    }} source={{ uri: this.state.url }} resizeMethod="scale" imageStyle={{ borderRadius: wp('35%') / 2 }}>
                                        <Ionicons style={{ marginBottom: 10, padding: 15, backgroundColor: '#cccccc', borderRadius: '50%' }} name="pencil" size={50} color='white' />
                                    </ImageBackground>
                                </TouchableOpacity>
                                <View style={{ width: '100%', marginTop: 40 }}>
                                    <Text style={styles.inputLabel}>First Name:</Text>
                                    <TextInput style={styles.inputLine} placeholder="First Name" value={this.state.firstname} onChangeText={text => this.setState({firstname: text })}></TextInput>
                                    <Text style={styles.inputLabel}>Last Name:</Text>
                                    <TextInput style={styles.inputLine} placeholder="Last Name" value={this.state.lastname} onChangeText={text => this.setState({ lastname: text })}></TextInput>
                                    <Text style={styles.inputLabel}>Email Address:</Text>
                                    <TextInput style={styles.inputLine} placeholder="Email Address" value={this.state.email} onChangeText={text => this.setState({ email: text })}></TextInput>
                                    <Text style={styles.inputLabel}>Mobile Phone:</Text>
                                    <TextInput style={styles.inputLine} placeholder="Mobile Phone" value={this.state.mobile} onChangeText={text => this.setState({ mobile: text })}></TextInput>
                                </View>
                            </View>
                            
                            { this.state.modalEditButtonsVisible ?   
                                (<View style={{ flexDirection: 'row', width: wp('60%'), justifyContent: 'space-evenly', marginBottom: 40 }}>
                                <TouchableOpacity style={[styles.editButton, { backgroundColor: '#FF3E6C' }]} onPress={() => {
                                    this.resetMessage(),
                                    this.setModalEditVisible(false)}}>
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.editButton, { backgroundColor: '#51DC8B' }]} onPress={() => {
                                    // this.setModalEditVisible(false),
                                    
                                    this.updateStaff()
                                    }}>
                                    <Text style={styles.buttonText}>Save</Text>
                                </TouchableOpacity>
                                </View>)
                                :
                                <View style={{ flexDirection: 'row', width: wp('60%'), justifyContent: 'space-evenly', marginBottom: 40 }}>
                                    <Text style={styles.messageText}>{this.state.message}</Text>
                                    <TouchableOpacity style={[styles.editButton, {backgroundColor: '#1E90FF' }]} onPress={() => {
                                this.setModalEditVisible(false),
                                this.resetMessage()
                                }}>
                                    <Text style={styles.buttonText}>Back</Text>
                                </TouchableOpacity>
                                </View>
                            }    
                            
                            
                        </ScrollView>
                    </View>
                </View>
            </Modal>
            <Modal animationType="slide" transparent={true} visible={modalViewVisible} onRequestClose={() => { Alert.alert("Modal has been closed."); this.setModalViewVisible(!modalViewVisible); }}>
                <View style={{ alignItems: 'center' }}>
                    <View style={styles.overlayContainer}>
                        <ScrollView vertical={true} showsHorizontalScrollIndicator={false}>
                            <Text style={styles.overlayTitle}>
                                {this.state.firstname} {this.state.lastname}
                            </Text>
                            <View style={{ padding: 40, alignItems: 'center' }}>
                                <TouchableOpacity style={styles.photoSection}>
                                    <ImageBackground style={{
                                        width: wp('30%'),
                                        height: wp('30%'),
                                        borderRadius: wp('30%') / 2, alignItems: 'flex-end', justifyContent: "flex-end"
                                    }} source={{ uri: this.state.url }} resizeMethod="scale" imageStyle={{ borderRadius: wp('35%') / 2 }}>
                                    </ImageBackground>
                                </TouchableOpacity>
                                <View style={{ width: '100%', marginTop: 40 }}>
                                    <Text style={styles.inputLabel}>First Name:</Text>
                                    <Text style={styles.inputLine}>{this.state.firstname}</Text>
                                    <Text style={styles.inputLabel}>Last Name:</Text>
                                    <Text style={styles.inputLine}>{this.state.lastname}</Text>
                                    <Text style={styles.inputLabel}>Email Address:</Text>
                                    <Text style={styles.inputLine}>{this.state.email}</Text>
                                    <Text style={styles.inputLabel}>Mobile Phone:</Text>
                                    <Text style={styles.inputLine}>{this.state.mobile}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', width: wp('60%'), justifyContent: 'space-evenly', marginBottom: 40 }}>
                                <TouchableOpacity style={[styles.editButton, { backgroundColor: '#1E90FF' }]} onPress={() => this.setModalViewVisible(false)}>
                                    <Text style={styles.buttonText}>Back</Text>
                                </TouchableOpacity>
                            </View>

                        </ScrollView>
                    </View>
                </View>
            </Modal>
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
                                        Do you want to delete this staff?
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                    <TouchableOpacity style={[styles.editButton, { backgroundColor: '#FF3E6C' }]} onPress={() => {
                                        this.resetMessage(),
                                        this.setModalDeleteVisible(false)}}>
                                        <Text style={styles.buttonText}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.editButton, { backgroundColor: '#51DC8B' }]} onPress={() => {
                                        // this.setModalDeleteVisible(false),
                                        this.deleteStaff()
                                    }}>
                                        <Text style={styles.buttonText}>Confirm</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>)
                            :
                            <View style={{flexDirection:'column', height:'80%',justifyContent:'space-evenly',alignItems:'center'}}>
                            <Text style={{color:'white',fontSize:60, fontWeight:'bold', marginBottom:5}}>{this.state.message}</Text>
                            <TouchableOpacity style={[styles.editButton, {backgroundColor: '#1E90FF' }]} onPress={() => {
                                this.setModalDeleteVisible(false),
                                this.resetMessage()
                                }}>
                                    <Text style={styles.buttonText}>Back</Text>
                                </TouchableOpacity>
                                </View> 
                        }
                    </View>
                </View>
            </Modal>
                </View>
            </View>
        )
    }
};

export default Staff;

