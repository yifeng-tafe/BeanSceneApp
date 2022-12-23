import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, Button, Image} from 'react-native';
import { 
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
        } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-web';

import {styles} from "../../assets/Style"

class Login extends Component{
    
    constructor(props){
        super(props);

        this.state={
            data:{},
            username:'',
            password:'',
            validation:'',
            error:''
        }
    }
    
    onUsernameChange=(e)=>{
        this.setState({
            username:e
        })
    }

    onPasswordChange=(e)=>{
        this.setState({
            password:e
        })
    }
    
    login=()=>{
        if(this.state.username.length==0){
            this.setState({
                error:'Please enter username'
            })
        }
        else if(this.state.password.length==0){
            this.setState({
                error:'Please enter password'
            })
        }
        else {
            this.setState({
                error:''
            })

            console.log("login");

            var url="http://localhost:5731/API/Staff/"+this.state.username+"/"+this.state.password;
            
            var headers = new Headers({
                Authorization: 'Basic ' + btoa('test:test')
            }
            );
        
            var options={headers:headers};

            fetch(url,options)
            .then(response => response.json())
            .then((json) =>{
                console.log(json);

                if(json==null){
                    this.setState({
                        error:'Invalid username and password'
                    })
                }
                else{
                    this.setState({
                        data:json,
                        username:'',
                        password:''
                    })

                    global.firstname=json.firstname;
                    global.lastname=json.lastname;
                    global.email=json.email;
                    global.imageURL=json.imageURL;
                    global.id=json.id;
                    global.mobile=json.mobile;
                    global.role=json.role;
                    
                    if(json.role=="manager"){
                        global.role="Manager"
                        this.props.navigation.navigate("ManagerDashboard");
                    }
                    else{
                        global.role="Staff"
                        this.props.navigation.navigate("StaffDashboard");
                    }
                }
                
            })
        }
    }

    async componentDidMount() {
        loc(this);
    }
      
      componentWillUnMount() {
        rol();
    }

    

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../images/BeanSceneLogo.png')}/>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Food Ordering System</Text>
                </View>
                <View style={styles.formContainer}>
                    <TextInput style={styles.textInput} placeholder='Email Address'onChangeText={this.onUsernameChange}></TextInput>
                    <TextInput secureTextEntry={true} style={styles.textInput} placeholder='Password'onChangeText={this.onPasswordChange}></TextInput>
                    <TouchableOpacity style={styles.buttonContainer} onPress={this.login}>
                        <Text style={styles.LoginButton}>Login</Text>
                    </TouchableOpacity>
                    <View>
                        <Text style={{color:'red', fontSize:16, fontWeight:'bold',marginTop:hp('1%')}}>{this.state.error}</Text>
                    </View>
                </View>
                
            </View>
        )
    }
};

export default Login;

