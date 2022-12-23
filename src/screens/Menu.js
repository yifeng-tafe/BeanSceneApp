import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, TouchableOpacity, ScrollView, FlatList, Modal } from 'react-native';
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
import { GetCategories } from '../../utils/Api'


class Menu extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            modalVisible: false,
            modalDeleteVisible: false,
            id: '',
            name: '',
            color: '#BC62FF',
            imageURL: '',
            modalCreateButtonVisible: true,
            modalDeleteButtonsVisible: true
        }
    }

    componentDidMount() {
        loc(this);
    }

    componentWillUnMount() {
        rol();
    }

    displayConnectionMessage() {

        // Get network connection status
        NetInfo.fetch().then(status => {

            // Check if not connected to the Internet
            if (!status.isConnected) {

                console.log("show flash message")

                // Display the flash message
                showMessage({
                    message: "No internet connection",
                    description: "You will only see cached data until you have an active internet connection again.",
                    type: "warning",
                    duration: 4000,
                    floating: true,
                    icon: "warning",
                    autoHide: true,
                    message: ''
                })
            }
        })
    }

    addCategory = () => {
        // Display message...
        this.displayConnectionMessage()

        // Cancel if no internet connection
        // if (!(NetInfo.fetch()).isConnected) {
        //     this.setModalCreateVisible(false);
        //     return
        // }


        console.log("add category");

        var category = {
            name: this.state.name,
            color: this.state.color,
            imageURL: this.state.imageURL,

        }
        var url = "http://localhost:5731/API/Category/addCategory"
        var headers = new Headers({
            Authorization: 'Basic ' + btoa('test:test')
        });

        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        var options = { method: 'POST', headers: headers, body: JSON.stringify(category) };

        fetch(url, options)
            .then(response => response.json())
            .then((json) => {
                console.log(json);

                this.setState({
                    data: json,
                    message: "Added Successfully",
                    modalCreateButtonVisible: false
                })
            })
    }

    deleteCategory=()=>{
        console.log("delete Category");
        console.log(this.state.id)
        var url="http://localhost:5731/API/Category/deleteCategory/"+this.state.id;
        
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

    setModalCreateVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    setModalDeleteVisible = (visible) => {
        this.setState({ modalDeleteVisible: visible });
    }

    resetMessage = () => {
        this.setState({ message: '' })
    }


    // search=()=>{
    //     console.log("search");
    //     var text=this.state.searchText;

    //     if(text){
    //     console.log("inside"+text);
    //         var url="http://localhost:5731/API/Staff/" + text
    //         console.log(url);

    //         var headers = new Headers({
    //             Authorization: 'Basic ' + btoa('test:test')
    //         }
    //         );

    //         var options={headers:headers};

    //         fetch(url,options)

    //         .then(response => response.json())
    //         .then((json) =>{
    //             console.log(json);

    //             this.setState({
    //                 data:json
    //             })
    //         })
    //     }
    // }

    componentDidMount() {
        // fetch('https://jsonplaceholder.typicode.com/users')

        var url = "http://localhost:5731/API/Category";

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



    render() {
        const { modalVisible, modalDeleteVisible } = this.state
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
                width: 120,
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
                fontSize: 32,
                fontWeight: 'bold',
                paddingLeft: 30,
                paddingTop: 30,
                position: 'absolute',
                top: 0,
                left: 0,
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
            listVewStyle: {
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                width: wp('90%'),
                justifyContent: 'space-evenly'
            },
            overlayContainer: {
                width: wp('60%'),
                height: hp('70%'),
                backgroundColor: 'white',
                borderRadius: 24,
                flex: 'row',
                justifyContent: 'center',
                alignItems: 'center'


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
            messageText: {
                fontSize: 20,
                textAlign: 'center',
                color: 'red',
                marginBottom: 80
            }


        })

        const renderData = ({ item }) => {
            var url = "data:image/png;base64," + item.imageURL
            return (
                <TouchableOpacity style={{ marginTop: 30, flexDirection: 'row', width: 350, height: 250, position: 'relative' }} onLongPress={() => {
                    this.state.id = item.id,
                        this.state.name = item.name,
                        this.state.color = item.color,
                        this.state.imageURL = item.imageURL,
                        this.setModalDeleteVisible(true)
                }} onPress={() => this.props.navigation.navigate('Food', { id: item.id, name: item.name })}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: 300, height: 200, marginBottom: 30, borderRadius: 20, backgroundColor: item.color, }}>
                    </View>
                    <Text style={styles.listText}>{item.name}</Text>
                    <Image source={{ uri: url }} style={{ height: 150, width: 200, alignItems: 'flex-end', justifyContent: 'flex-end', position: 'absolute', bottom: 10, right: 10 }} />
                </TouchableOpacity>
            )
        };

        return (
            this.displayConnectionMessage(),
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.backButtonContainer}>
                        <TouchableOpacity style={{ height: 40, width: 40, borderRadius: 8, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }} onPress={() => this.props.navigation.navigate('Management')}>
                            <Ionicons name={'ios-arrow-back'} size={35} color='white' />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 32 }}>
                            Menu Management
                        </Text>
                    </View>
                    <View style={styles.createButtonContainer}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', height: 40, borderRadius: 8, backgroundColor: '#1E90FF', width: 110, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.setModalCreateVisible(true)}>
                            <Ionicons name={'ios-add'} size={35} color='white' />
                            <Text style={{ color: 'white', fontSize: 24 }}>
                                New
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* <View style={styles.searchContainer}>
                    <TextInput placeholder='search staff...' style={{flex:1,borderTopLeftRadius:8, borderBottomLeftRadius:8,backgroundColor:'#333333',height:48, paddingLeft:10, fontSize:20,color:'white'}} value={this.state.searchText} onChangeText={text=>this.setState({searchText:text})}>
                    </TextInput>
                    <TouchableOpacity  style={{width:150, height:48,flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'#BC62FF', borderTopRightRadius:8,borderBottomRightRadius:8}} onPress={()=>this.search()}>
                        <Ionicons name={'ios-search'} size={28} color='white' style={{paddingRight:10}}/>
                        <Text style={{fontSize:24, color:'white'}}>
                            Search
                        </Text>
                    </TouchableOpacity>
                </View> */}
                <View style={styles.contentContainer}>
                    <ScrollView>
                        <FlatList contentContainerStyle={styles.listVewStyle} data={this.state.data} renderItem={renderData} keyExtractor={(item) => item.id}></FlatList>
                        {this.state.flatList}
                    </ScrollView>
                </View>
                <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { Alert.alert("Modal has been closed."); this.setModalCreateVisible(!modalVisible); }}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <View style={styles.overlayContainer}>
                            <ScrollView vertical={true} showsHorizontalScrollIndicator={false}>
                                <Text style={styles.overlayTitle}>
                                    Create New Category
                                </Text>
                                <View style={{ padding: 40, alignItems: 'center' }}>
                                    {/* <TouchableOpacity style={styles.photoSection}>
                                        <Ionicons name="ios-camera" size={50} color='grey' />
                                        <Text style={{ color: 'grey', fontsize: 32 }}>Upload Image</Text>
                                    </TouchableOpacity> */}
                                    <View style={{ width: '100%', marginTop: 40 }}>
                                        <Text style={styles.inputLabel}>Category Name:</Text>
                                        <TextInput style={styles.inputLine} onChangeText={text => this.setState({ name: text })}></TextInput>
                                        {/* <Text style={styles.inputLabel}>Color Code:</Text>
                                        <TextInput style={styles.inputLine} onChangeText={text => this.setState({ color: text })}></TextInput> */}


                                    </View>
                                </View>
                                {this.state.modalCreateButtonVisible
                                    ?
                                    (<View style={{ flexDirection: 'row', width: wp('60%'), justifyContent: 'space-evenly', marginBottom: 40 }}>
                                        <TouchableOpacity style={[styles.editButton, { backgroundColor: '#FF3E6C' }]} onPress={() => {
                                            this.resetMessage(),
                                                this.setModalCreateVisible(false)
                                        }}>
                                            <Text style={styles.buttonText}>Cancel</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.editButton, { backgroundColor: '#51DC8B' }]} onPress={() => {
                                            this.addCategory()
                                            console.log("press save button")
                                        }}>
                                            <Text style={styles.buttonText}>Save</Text>
                                        </TouchableOpacity>
                                    </View>)
                                    :
                                    <View style={{ flexDirection: 'column', width: wp('60%'), alignItems: 'center', marginBottom: 40 }}>
                                        <Text style={[styles.messageText, { marginBottom: 40 }]}>{this.state.message}</Text>
                                        <TouchableOpacity style={[styles.editButton, { backgroundColor: '#1E90FF' }]} onPress={() => {
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
                                                Do you want to delete this Category?
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

                                                this.deleteCategory(),
                                                    this.resetMessage(),
                                                    this.setModalDeleteVisible(false)
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

export default Menu;

