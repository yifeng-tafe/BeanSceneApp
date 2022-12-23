import React, {Component} from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, ScrollView, Image } from "react-native";
import { 
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
        } from 'react-native-responsive-screen';

class NewsPopup extends Component {
  render() {
    const modalVisible = false;
    const setModalVisible = false;
    const styles = StyleSheet.create({
      centeredView: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 22
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
          
      },
      buttonClose: {
          
      },
      textStyle: {
          color: "grey",
          fontWeight: "bold",
          textAlign: "center"
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
          marginBottom:hp('3%')
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
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.container}>
                      <View style={styles.overlayContainer}>
                          <ScrollView vertical={true} showsHorizontalScrollIndicator={false}>
                              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                <Text style={styles.overlayTitle}>
                                    CHRISTMAS DAY AT BEAN SCENE
                                </Text>
                                <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
                                  <Text style={styles.textStyle}>X</Text>
                                </Pressable>
                              </View>
                              <Text style={styles.overlayDate}>
                                  Oct 4, 2020
                              </Text>
                              <Image source={require("../images/Announcement/Announcement01.jpg")} style={{height:wp('30%'), width:"100%", resizeMode: 'cover', marginBottom:hp('3%')}} />
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
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Sho2323w Modal</Text>
        </Pressable>
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
                            <TouchableOpacity style={styles.announcementContainer} onPress={() => setModalVisible(true)}>
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
      </View>
    );
  }
};


    

export default NewsPopup;


