import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, ScrollView, Image } from "react-native";
import { 
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
        } from 'react-native-responsive-screen';


const NewsPopup = () => {
  const [modalVisible, setModalVisible] = useState(false);
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
        {/* <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View> */}
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
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
  );
};

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
    

export default NewsPopup;


