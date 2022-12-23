import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, TouchableOpacity, ImageBackground, ScrollView, Animated, Dimensions } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { 
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
        } from 'react-native-responsive-screen';



class Order extends Component {
   
    componentDidMount() {
        loc(this);
      }
      
      componentWillUnMount() {
        rol();
      }
    render() {
        const styles = StyleSheet.create({
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
        })

        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>Hi,<br />Tom Cruise</Text>
                    <Image style={styles.headerImage} source={require('../images/TomCruise.png')}/>
                </View>
                <View style={styles.announcementSection}>   
                    <View style={styles.sectionTitleContainer}>
                        <Text style={styles.sectionTitle}>Annoucements</Text>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={styles.announcementGroup}>
                            <TouchableOpacity style={styles.announcementContainer} >
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
                            <TouchableOpacity style={styles.announcementContainer}>
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
                            <TouchableOpacity style={styles.announcementContainer}>
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
                                <TouchableOpacity style={styles.newsContainer}>
                                    <ImageBackground source={require("../images/News/News04.jpg")} style={styles.backgroundContainer} resizeMethod="scale" imageStyle={{ borderRadius: 12}}>
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
                                <TouchableOpacity style={styles.newsContainer}>
                                    <ImageBackground source={require("../images/News/News05.jpg")} style={styles.backgroundContainer} resizeMethod="scale" imageStyle={{ borderRadius: 12}}>
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
                                <TouchableOpacity style={styles.newsContainer}>
                                    <ImageBackground source={require("../images/News/News06.jpg")} style={styles.backgroundContainer} resizeMethod="scale" imageStyle={{ borderRadius: 12}}>
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
                                <TouchableOpacity style={styles.newsContainer}>
                                    <ImageBackground source={require("../images/News/News07.jpg")} style={styles.backgroundContainer} resizeMethod="scale" imageStyle={{ borderRadius: 12}}>
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
                                <TouchableOpacity style={styles.newsContainer}>
                                    <ImageBackground source={require("../images/News/News08.jpg")} style={styles.backgroundContainer} resizeMethod="scale" imageStyle={{ borderRadius: 12}}>
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
            </View>
            
        )
    }
};

export default Order;


