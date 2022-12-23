import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, Switch, Modal, ScrollView, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';



class PersonalDetail extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            searchText:'',
            modalEditVisible: false,
            id: global.id,
            firstname: global.firstname,
            lastname: global.lastname,
            email: global.email,
            mobile: global.mobile,
            role: global.role,
            imageURL: global.imageURL,
            message:'',
            
            
        }
    }
    componentDidMount() {
        loc(this);
    }

    componentWillUnMount() {
        rol();
    }
    
    
    
    render() {
        const {modalEditVisible} = this.state
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: 'black',
                alignItems: 'center',
                flexDirection: 'column'
            },
            imageContainer: {
                alignItems: 'center',
                width: wp('90%'),
                height: hp('25%'),
                marginTop: hp('1%')
            },
            profileContainer: {
                height: hp('25%'),
                width: wp('70%'),
                marginTop: 100,
                alignItems:'center'
                
                
            },
            settingContainer: {
                height: hp('25%'),
                width: wp('90%'),
                alignItems: 'center',
                paddingTop: hp('4%')
            },
            buttonContainer: {
                width: wp('90%'),
                height: hp('10%'),
                flexDirection: 'colunm',
                alignItems: 'center',


            },
            titleText: {
                fontStyle:'italic',
                color: 'white',
                textAlign: 'center',
                fontSize: 40,
                textAlign:'left',
                marginBottom:20
                
            },
            nameText: {
                borderBottomColor:'grey',
                borderBottomWidth:2,
                color: 'white',
                textAlign: 'center',
                fontSize: 40,
                textAlign:'left',
                marginBottom:20
            },
            emailText: {
                color: '#c1c1c1',
                textAlign: 'center',
                fontSize: hp('2.5%')
            },
            editButtoncontainer: {
                backgroundColor: '#1E90FF',
                marginTop: hp('3%'),
                borderRadius: hp('8%'),
                height: hp('8%'),
                width: hp('22%'),
                textAlign: 'center',
                justifyContent: 'center',
            },
            titleContainer: {
                flex: 1,
                marginRight: 10,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between'

            },
            menuTitleText: {
                color: 'white',
                fontWeight: 'bold',
                fontSize: hp('2.8%'),
                marginLeft: 15
            },
            menuTitleContainer: {
                width: wp("90%"),
                alignItems: 'center',
                marginBottom: hp('3%'),
                borderRadius: 8,
                height: hp('6%'),
                backgroundColor: "#333333",
                flexDirection: 'row',
                justifyContent: 'space-between'

            },
            logOutButton: {
                fontSize: hp('3%'),
                color: 'orange',
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
            messageText:{
                fontSize:20, 
                textAlign:'center', 
                color:'red', 
                marginBottom:10
            }
        })


        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: "data:image/png;base64," + global.imageURL }} style={{ height: hp('25%'), width: hp('25%'), borderRadius: hp('25%') / 2 }} />
                </View>
                <View style={styles.profileContainer}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flexDirection:'column'}}>
                            <Text style={styles.titleText}>Role: </Text>
                            <Text style={styles.titleText}>Name: </Text>
                            <Text style={styles.titleText}>Mobile: </Text>
                            <Text style={styles.titleText}>Email: </Text>
                        </View>
                        <View style={{flexDirection:'column', marginLeft:20}}>
                            <Text style={styles.nameText}>{this.state.role}</Text>
                            <Text style={styles.nameText}>{this.state.firstname} {this.state.lastname}</Text>
                            <Text style={styles.nameText}>{this.state.mobile}</Text>
                            <Text style={styles.nameText}>{this.state.email}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
};

export default PersonalDetail;

