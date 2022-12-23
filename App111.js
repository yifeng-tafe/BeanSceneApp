import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const HomeStack=createStackNavigator();
const BottomTabStack=createBottomTabNavigator();


import Login from './src/screens/Login'
import Order from './src/screens/Order'
import Menu from './src/screens/Menu'
import Setting from './src/screens/Status'
import Profile from './src/screens/Settings'
import Status from './src/screens/Status'
import Dashboard from './src/screens/Home'



import IonicIcon from 'react-native-vector-icons/Ionicons'


export default function App() {
  return (
    
    <NavigationContainer theme={MyTheme}>
      <HomeStack.Navigator>
        <HomeStack.Screen name="Login" options={{headerShown:false}} component={Login}/>
        <HomeStack.Screen name="ManagerDashboardTab" options={{headerShown:false}} component={ManagerDashboardTab}/>
      </HomeStack.Navigator>
    </NavigationContainer>
    
  )
}

function ManagerDashboardTab(){
  return(
    <BottomTabStack.Navigator screenOptions={screenOptionsStyle}>
      <BottomTabStack.Screen name="Dashboard" component={Dashboard} options={{tabBarIcon:()=>(<Icon name="home" size={26} color='white'/>)}}/>
      <BottomTabStack.Screen  name="Status" 
                              component={Status} 
                              options={{tabBarIcon:()=>(
                                <Icon name="fast-food-outline" 
                                      size={26} 
                                      color='grey'

                                />
                                )}}/>
      <BottomTabStack.Screen name=" "  component={Order} options={{tabBarIcon:()=>(<Icon name="add-outline" size={48} color='white' style={{backgroundColor:"#1E90FF",width:48,height:48,borderRadius:"50%"}} />) }} />
      <BottomTabStack.Screen name="Profile" component={Profile} options={{tabBarIcon:()=>(<Icon name="person" size={26} color='white'/>)}}/>
      <BottomTabStack.Screen name="Settings" component={Setting} options={{tabBarIcon:()=>(<Icon name="settings" size={26} color='white'/>)}}/>
    </BottomTabStack.Navigator>
  )
}

const MyTheme = {
  colors: {
    background:'black'
  },
};

const screenOptionsStyle={
  headerStyle:{
    backgroundColor: 'black',
    borderBottomWidth:0,
    height:20,
  },
  headerTitleStyle:{
    color:'white',
    height:0
  },
  tabBarStyle:{
    backgroundColor:'black', 
    fontSize:200, 
    color:'white', 
    fontWeight:'bold',
    borderTopWidth:0,
    height:55,
    marginBottom:10,
    marginTop:10,
   
    
  },
  tabBarLableStyle:{
    
  

    
  },
  tabBarActiveTintColor:'white',
  tabBarInactiveTintColor:'grey',
  // tabBarItemStyle:{
  //   backgroundColor:'#00ff00',
  //     margin:5,
  //     borderRadius:10,
  // }
  
  // tabBarIconStyle:{
  //   color:'white'
  // }
};
