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
import { showMessage } from "react-native-flash-message";
import NetInfo from "@react-native-community/netinfo";


class Settings extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            searchText: '',
            modalEditVisible: false,
            id: global.id,
            firstname: global.firstname,
            lastname: global.lastname,
            email: global.email,
            mobile: global.mobile,
            imageURL: global.imageURL,
            message: '',
            switchValueNotification: false,
            switchValueDarkMode: false,



        }
    }
    componentDidMount() {
        loc(this);
    }

    componentWillUnMount() {
        rol();
    }
    setModalEditVisible = (visible) => {
        this.setState({ modalEditVisible: visible });
    }
    resetMessage = () => {
        this.setState({ message: '' })
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
                })
            }
        })
    }


    updateStaff = () => {
        console.log("update staff");
        var staff = {
            id: global.id,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            mobile: this.state.mobile,
            imageURL: this.state.imageURL
        }
        var url = "http://localhost:5731/API/Staff/updateStaff"
        var headers = new Headers({
            Authorization: 'Basic ' + btoa('test:test')
        }
        );
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        var options = { method: 'POST', headers: headers, body: JSON.stringify(staff) };

        fetch(url, options)
            .then(response => response.json())
            .then((json) => {
                console.log(json);

                this.setState({
                    data: json,
                    message: "Updated Successfully",
                    modalEditButtonsVisible: false,
                })
            })
    }

    MyComponent = () => {
        const [isSwitchOn, setIsSwitchOn] = React.useState(false);

        const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

        return <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />;
    };

    render() {
        const { modalEditVisible } = this.state
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
                width: wp('90%'),
                paddingTop: hp('3%'),
                alignItems: 'center'
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
            nameText: {
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
                fontSize: hp('6%')
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
            messageText: {
                fontSize: 20,
                textAlign: 'center',
                color: 'red',
                marginBottom: 10
            }
        })

        const isEnable = this.state

        return (
            this.displayConnectionMessage(),
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: "data:image/png;base64," + global.imageURL }} style={{ height: hp('25%'), width: hp('25%'), borderRadius: hp('25%') / 2 }} />
                </View>
                <View style={styles.profileContainer}>
                    <Text style={styles.nameText}>{this.state.firstname} {this.state.lastname}</Text>
                    <Text style={styles.emailText}>{this.state.email}</Text>
                    <TouchableOpacity style={styles.editButtoncontainer} onPress={() => {
                        this.setModalEditVisible(true)
                        this.setState({
                            modalEditButtonsVisible: true
                        })
                    }}>
                        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: hp('2.8%') }}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.settingContainer}>
                    <View style={styles.menuTitleContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.menuTitleText}>Turn on Notifications</Text>
                            <Switch
                                trackColor={{ false: "#ff0000", true: "#00ff00" }}
                                thumbColor={"#ffffff"}
                                ios_backgroundColor="grey"
                                value={this.state.switchValueNotification}
                                onValueChange={(switchValueNotification) => this.setState({ switchValueNotification })} />
                        </View>
                    </View>
                    <View style={styles.menuTitleContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.menuTitleText}>Dark Mode</Text>
                            <Switch
                                trackColor={{ false: "#ff0000", true: "#00ff00" }}
                                thumbColor={"#ffffff"}
                                ios_backgroundColor="grey"
                                value={this.state.switchValueDarkMode}
                                onValueChange={(switchValueDarkMode) => this.setState({ switchValueDarkMode })} />
                        </View>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('Login') }}>
                        <Text style={styles.logOutButton}>Log out</Text>
                    </TouchableOpacity>
                </View>
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
                                        }} source={{ uri: "data:image/png;base64," + global.imageURL }} resizeMethod="scale" imageStyle={{ borderRadius: wp('35%') / 2 }}>
                                            <Ionicons style={{ marginBottom: 10, padding: 15, backgroundColor: '#cccccc', borderRadius: '50%' }} name="pencil" size={50} color='white' />
                                        </ImageBackground>
                                    </TouchableOpacity>
                                    <View style={{ width: '100%', marginTop: 40 }}>
                                        <Text style={styles.inputLabel}>First Name:</Text>
                                        <TextInput style={styles.inputLine} placeholder="First Name" value={this.state.firstname} onChangeText={text => this.setState({ firstname: text })}></TextInput>
                                        <Text style={styles.inputLabel}>Last Name:</Text>
                                        <TextInput style={styles.inputLine} placeholder="Last Name" value={this.state.lastname} onChangeText={text => this.setState({ lastname: text })}></TextInput>
                                        <Text style={styles.inputLabel}>Email Address:</Text>
                                        <TextInput style={styles.inputLine} placeholder="Email Address" value={this.state.email} onChangeText={text => this.setState({ email: text })}></TextInput>
                                        <Text style={styles.inputLabel}>Mobile Phone:</Text>
                                        <TextInput style={styles.inputLine} placeholder="Mobile Phone" value={this.state.mobile} onChangeText={text => this.setState({ mobile: text })}></TextInput>
                                    </View>
                                </View>

                                {this.state.modalEditButtonsVisible ?
                                    (<View style={{ flexDirection: 'row', width: wp('60%'), justifyContent: 'space-evenly', marginBottom: 80 }}>
                                        <TouchableOpacity style={[styles.editButton, { backgroundColor: '#FF3E6C' }]} onPress={() => {
                                            this.resetMessage(),
                                                this.setModalEditVisible(false)
                                        }}>
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
                                    <View style={{ flexDirection: 'column', width: wp('60%'), alignItems: 'center', marginBottom: 40 }}>
                                        <Text style={styles.messageText}>{this.state.message}</Text>
                                        <TouchableOpacity style={[styles.editButton, { backgroundColor: '#1E90FF', marginTop: 20 }]} onPress={() => {
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
            </View>
        )
    }
};

export default Settings;

