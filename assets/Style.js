import { StyleSheet } from 'react-native';
import { 
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
        } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'black'
    },
    logoContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    logo:{
        height:170,
        width:220,
        resizeMode:'contain'
    },
    titleContainer:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        fontSize:hp('4%'),
        fontWeight:'bold',
        color:'white',
    },
    formContainer:{
        flex:1,
        alignItems:'center',
    },
    textInput:{
        borderRadius:6,
        backgroundColor:'#333333',
        width:200,
        marginBottom:20,
        height:40,
        paddingLeft:10,
        lineHeight:30,
        justifyContent:'center',
        color:'white',
        fontSize:16
        

    },
    buttonContainer:{
        backgroundColor:'#1E90FF',
        justifyContent:'center',
        alignItems:'center',
        width:200,
        borderRadius:6,
        height:40,
    },
    LoginButton:{
       
        fontWeight:'bold',
        fontSize:16,
        color:'white',
        textAlign:'center',
        lineHeight:16,
        justifyContent:'center'
    }



});

export {styles}