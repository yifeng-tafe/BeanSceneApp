import React, { Component } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, TouchableOpacity, ImageBackground, ScrollView } from "react-native";
import { 
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
        } from 'react-native-responsive-screen';
import {Ionicons} from '@expo/vector-icons';
import { showMessage } from "react-native-flash-message";
import NetInfo from "@react-native-community/netinfo";



class Home extends Component {
    componentDidMount() {
        loc(this);
    }

    componentWillUnMount() {
        rol();
    }
    state = {
        modalVisible: false,
        modalVisible1: false
    };


    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }
    setModalVisible1 = (visible) => {
        this.setState({ modalVisible1: visible });
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
        centeredView: {
          flex: 1,
          width:wp('60%')   
        },
        modalView: {
          margin: 20,
          backgroundColor: "white",
          borderRadius: 20,
          padding: 35,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5
        },
        button: {
          borderRadius: 20,
          padding: 10,
          elevation: 2
        },
        buttonOpen: {
          backgroundColor: "#F194FF",
        },
        buttonClose: {
          backgroundColor: "#2196F3",
        },
        textStyle: {
          color: "grey",
          textAlign: "right",
          fontSize:wp('3%')
        },
        modalText: {
          marginBottom: 15,
          textAlign: "center"
        },
        container: {
          flex: 1,
          backgroundColor: 'black',
          alignItems: 'center'
      
        },
        headerContainer:{
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            width: wp("90%"), 
            height: hp('20%')
        },
        headerTitle:{
            color: "white", 
            fontSize: hp('6.5%'), 
            fontWeight: "bold"
        },
        headerImage:{
            height: hp('16%'), 
            width: hp('16%'), 
            borderRadius: hp('16%') / 2,
            margin:hp('1.5%')
        },
        announcementSection:{
            width: wp("90%"), 
            height: hp('30%')
        },
        sectionTitleContainer: {
                        width: wp("90%"),
                        marginTop: 10,
                        marginBottom: 5
        },
        sectionTitle: {
                        fontWeight: 'bold',
                        fontSize: hp('4%'),
                        color: 'white',
                        marginTop: 20,
                        marginBottom: 5
        },
        announcementGroup:{
            flexDirection:'row',
        },
        announcementContainer:{
            width: wp("36%"),
            borderRadius: 12,
            height: hp('20%'),
            backgroundColor: "#333333",
            flexDirection:'row',
            marginRight: wp('2.8%')
        },
        announcementContent:{
            flex:3,
        },
        contentImageContainer:{
            flex:2,
        },
        contentTitleContainer: {
            flex: 1,
            padding: 10,
            flexDirection: 'column'
        },
        contentTitle: {
            flex:2,
            fontSize: hp('2%'),
            color: '#87cab8',
            fontWeight: "bold"
        },
        content:{
            flex: 2.5,
            color: "white",
            fontSize: hp('2%')
        },
        contentDateContainer:{
            flex:1,
            justifyContent:'flex-end'
        },
        contentDate:{
            fontSize: hp('1.2%'),
            color: '#cccccc',
            textAlign:'right'
        },
        newsSection: {
            width: wp("90%"), 
            height: hp('30%')
        },
        newsContainer:{
            width: wp("28%"),
            borderRadius: 12,
            height: hp('20%'),
            backgroundColor: "#333333",
            flexDirection:'row',
            marginRight: wp('2.8%')
        },
        backgroundContainer:{
            flex:1,
            justifyContent:'flex-end'
        },
        newsTitleContainer:{
            backgroundColor: "#000000c0",
            padding:hp('1%')
        },
        newsTitle:{
            color: "#FFAB1E",
            fontSize: hp('2%'),
            fontWeight: "bold",
            marginBottom:3,
        },
        newsDate:{
            fontSize: hp('1.2%'),
            color: '#cccccc',
            textAlign:'left'
        },
        overlayContainer:{
            width:wp('60%'), 
            height:hp('100%'), 
            backgroundColor:'white',
            borderTopRightRadius:24, 
            borderTopLeftRadius:24,
            padding:40
            
        },
        overlayTitle:{
            fontSize:32,
            fontWeight:'bold',
            marginBottom:hp('3%'),
            flex:4
        },
        overlayDate:{
            fontSize:20,
            color:'#848383',
            marginBottom:hp('3%')
        },
        overlayText:{
            fontSize:20,
            paddingBottom:hp('10%'),
            textAlign:'center'
        },
        background:{
            position:'absolute',
            left:0,
            right:0,
            top:0,
            bottom:0,
        }  
    });
    var url = "data:image/png;base64," + global.imageURL;
    const { modalVisible, modalVisible1 } = this.state;
        return (
        this.displayConnectionMessage(),
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Hi,<br />{global.firstname}</Text>
                <Image style={styles.headerImage} source={{uri:url}} />
                {/* <Text style={{color:'white'}}>{url}</Text> */}
            </View>
            <View style={styles.announcementSection}>
                <View style={styles.sectionTitleContainer}>
                    <Text style={styles.sectionTitle}>Annoucements</Text>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.announcementGroup}>
                        <TouchableOpacity style={styles.announcementContainer} onPress={() => this.setModalVisible(true)}>
                            <View style={styles.announcementContent}>
                                <View style={styles.contentTitleContainer}>
                                    <Text style={styles.contentTitle} numberOfLines={2}>CHRISTMAS DAY AT BEAN SCENE</Text>
                                    <Text style={styles.content} numberOfLines={3}>Experience unforgettable service and a decadent five-course menu by Executive Chef Peter Gilmore this Christmas Day with a long lunch at Bean Scene.
                                        {"\n"}Christmas Day at Bean Scene{"\n"}
                                        Saturday 25th December 2022{"\n"}
                                        Reservations from 12pm{"\n"}
                                        Glass of Champagne on arrival{"\n"}
                                        Signature five-course menu{"\n"}
                                        $580 per person{"\n"}
                                        Optional wine pairings available{"\n"}
                                        Quay wine pairing $230{"\n"}
                                        Sommelier wine pairing $330</Text>
                                    <View style={styles.contentDateContainer}>
                                        <Text style={styles.contentDate}>05/09/2022</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.contentImageContainer}>
                                <Image source={require("../images/Announcement/Announcement01.jpg")} style={{ borderTopRightRadius: 12, borderBottomRightRadius: 12, height: "100%", width: "100%", resizeMode: 'cover', }} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.announcementContainer} onPress={() => this.setModalVisible(true)}>
                            <View style={styles.announcementContent}>
                                <View style={styles.contentTitleContainer}>
                                    <Text style={styles.contentTitle} numberOfLines={2}>Bean Scene Korean Chicken Soup</Text>
                                    <Text style={styles.content} numberOfLines={3}>The extension of the Rocks Markets activation has seen the closure of one lane on George Street from the train overpass (near the Four Seasons Hotel) along to Argyle Street (Jack Munday Place).  Whilst traffic will still flow in a south bound direction, north bound traffic will need to take an alternative route to access Circular Quay West Road.</Text>
                                    <View style={styles.contentDateContainer}>
                                        <Text style={styles.contentDate}>05/09/2022</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.contentImageContainer}>
                                <Image source={require("../images/Announcement/Announcement02.jpg")} style={{ borderTopRightRadius: 12, borderBottomRightRadius: 12, height: "100%", width: "100%", resizeMode: 'cover', }} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.announcementContainer} onPress={() => this.setModalVisible(true)}>
                            <View style={styles.announcementContent}>
                                <View style={styles.contentTitleContainer}>
                                    <Text style={styles.contentTitle} numberOfLines={2}>RESTAURANT DIRECTIONS </Text>
                                    <Text style={styles.content} numberOfLines={3}>The extension of the Rocks Markets activation has seen the closure of one lane on George Street from the train overpass (near the Four Seasons Hotel) along to Argyle Street (Jack Munday Place).  Whilst traffic will still flow in a south bound direction, north bound traffic will need to take an alternative route to access Circular Quay West Road.</Text>
                                    <View style={styles.contentDateContainer}>
                                        <Text style={styles.contentDate}>05/09/2022</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.contentImageContainer}>
                                <Image source={require("../images/Announcement/Announcement03.jpg")} style={{ borderTopRightRadius: 12, borderBottomRightRadius: 12, height: "100%", width: "100%", resizeMode: 'cover', }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            <View style={styles.newsSection}>
                <View style={styles.sectionTitleContainer}>
                    <Text style={styles.sectionTitle}>
                        News
                    </Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={styles.announcementGroup}>
                            <TouchableOpacity style={styles.newsContainer} onPress={() => this.setModalVisible1(true)}>
                                <ImageBackground source={require("../images/News/News04.jpg")} style={styles.backgroundContainer} resizeMethod="scale" imageStyle={{ borderRadius: 12 }}>
                                    <View style={styles.newsTitleContainer}>
                                        <Text style={styles.newsTitle} numberOfLines={1}>
                                            Bumplings' Brendan Pang dishes up on his go-to food faves and guilty pleasures
                                        </Text>
                                        <Text style={styles.newsDate}>
                                            05/09/2022
                                        </Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.newsContainer} onPress={() => this.setModalVisible1(true)}>
                                <ImageBackground source={require("../images/News/News05.jpg")} style={styles.backgroundContainer} resizeMethod="scale" imageStyle={{ borderRadius: 12 }}>
                                    <View style={styles.newsTitleContainer}>
                                        <Text style={styles.newsTitle} numberOfLines={1}>
                                            Who are the new tenants for famous Bridge Room site?
                                        </Text>
                                        <Text style={styles.newsDate}>
                                            05/09/2022
                                        </Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.newsContainer} onPress={() => this.setModalVisible1(true)}>
                                <ImageBackground source={require("../images/News/News06.jpg")} style={styles.backgroundContainer} resizeMethod="scale" imageStyle={{ borderRadius: 12 }}>
                                    <View style={styles.newsTitleContainer}>
                                        <Text style={styles.newsTitle} numberOfLines={1}>
                                            Small Fitzroy bar Bonny snags ex-Cumulus chef, plus Cutler & Co gets Michelin talent in chef reshuffle
                                        </Text>
                                        <Text style={styles.newsDate}>
                                            05/09/2022
                                        </Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.newsContainer} onPress={() => this.setModalVisible1(true)}>
                                <ImageBackground source={require("../images/News/News07.jpg")} style={styles.backgroundContainer} resizeMethod="scale" imageStyle={{ borderRadius: 12 }}>
                                    <View style={styles.newsTitleContainer}>
                                        <Text style={styles.newsTitle} numberOfLines={1}>
                                            MoVida Spanish restaurant to open in Geelong
                                        </Text>
                                        <Text style={styles.newsDate}>
                                            05/09/2022
                                        </Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.newsContainer} onPress={() => this.setModalVisible1(true)}>
                                <ImageBackground source={require("../images/News/News08.jpg")} style={styles.backgroundContainer} resizeMethod="scale" imageStyle={{ borderRadius: 12 }}>
                                    <View style={styles.newsTitleContainer}>
                                        <Text style={styles.newsTitle} numberOfLines={1}>
                                            Food truck Frankie's Tortas and Tacos is moving to bigger digs in Fitzroy
                                        </Text>
                                        <Text style={styles.newsDate}>
                                            05/09/2022
                                        </Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>

                </View>
            </View>
            <View style={styles.centeredView}>
                <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {Alert.alert("Modal has been closed."); this.setModalVisible(!modalVisible);}}>
                    
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View style={styles.overlayContainer}>
                            <ScrollView vertical={true} showsHorizontalScrollIndicator={false}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.overlayTitle}>
                                        CHRISTMAS DAY AT BEAN SCENE
                                    </Text>
                                    <TouchableOpacity style={{width:50,alignItems:'flex-end'}} onPress={() => this.setModalVisible(!modalVisible)}>
                                        <Ionicons name="ios-close" size={40} color='grey'/>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.overlayDate}>
                                    Oct 4, 2020
                                </Text>
                                <Image source={require("../images/Announcement/Announcement01.jpg")} style={{ height: wp('30%'), width: "100%", resizeMode: 'cover', marginBottom: hp('3%') }} />
                                <Text style={styles.overlayText}>
                                    Experience unforgettable service and a decadent five-course menu by Executive Chef Peter Gilmore this Christmas Day with a long lunch at Bean Scene.{"\n"}{"\n"}
                                    Christmas Day at Bean Scene{"\n"}{"\n"}
                                    Saturday 25th December 2022{"\n"}{"\n"}
                                    Reservations from 12pm{"\n"}{"\n"}
                                    Glass of Champagne on arrival{"\n"}{"\n"}
                                    Signature five-course menu{"\n"}{"\n"}
                                    $580 per person{"\n"}{"\n"}
                                    Optional wine pairings available{"\n"}{"\n"}
                                    Quay wine pairing $230{"\n"}{"\n"}
                                    Sommelier wine pairing $330
                                </Text>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
                <Modal animationType="slide" transparent={true} visible={modalVisible1} onRequestClose={() => {Alert.alert("Modal has been closed."); this.setModalVisible(!modalVisible1);}}>
                    
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View style={styles.overlayContainer}>
                            <ScrollView vertical={true} showsHorizontalScrollIndicator={false}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.overlayTitle}>
                                    Bumplings' Brendan Pang dishes up on his go-to food faves and guilty pleasures
                                    </Text>
                                    <TouchableOpacity style={{width:50,alignItems:'flex-end'}} onPress={() => this.setModalVisible1(!modalVisible1)}>
                                        <Ionicons name="ios-close" size={40} color='grey'/>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.overlayDate}>
                                    Oct 4, 2020
                                </Text>
                                <Image source={require("../images/Announcement/Announcement01.jpg")} style={{ height: wp('30%'), width: "100%", resizeMode: 'cover', marginBottom: hp('3%') }} />
                                <Text style={[styles.overlayText, {textAlign:'left'}]}>
                                Perth-based MasterChef alumni Brendan Pang, 29, studied architecture before he had a change of heart and became a social worker.{"\n"}{"\n"}
                                But it was while working in child protection in Broome that he decided to apply as a contestant on the reality TV show in 2018, and life has been one foodie adventure ever since.{"\n"}{"\n"}
                                "I worked as a volunteer before I became a social worker and have always liked the idea of helping others and being there for people," says Pang, who runs his Bumplings airstream kitchen in Fremantle.{"\n"}{"\n"}
                                <strong>RELATED CONTENT</strong><br></br>
                                <p>Six dishes you must try at the 2022 Sydney Night Noodle MarketsSave the date: Melbourne's Night Noodle Markets are back "In Mauritius, my grandmere Josephine would cook rice and soup and give it to the homeless. Everything I have done in my life stems from my family upbringing," he says.</p> {"\n"}{"\n"}
                                </Text>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
      
      
    );
  }
}



export default Home;