import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();


import Login from './src/screens/Login'
import Report from './src/screens/Report'
import Order from './src/screens/Order'
import Management from './src/screens/Management'
import Settings from './src/screens/Settings'
import Menu from './src/screens/Menu'
import Food from './src/screens/Food'
import Staff from './src/screens/Staff'
import Home from './src/screens/Home'
import Icon from 'react-native-vector-icons/Ionicons'
import OrderDetail from './src/screens/OrderDetail'
import PersonalDetail from './src/screens/PersonalDetail'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FlashMessage from 'react-native-flash-message';

export default function App() {
  return (

    <NavigationContainer theme={MyTheme}>
      <HomeStack.Navigator>
        <HomeStack.Screen name="Login" options={{ headerShown: false }} component={Login} />
        <HomeStack.Screen name="Staff" options={{ headerShown: false }} component={Staff} />
        <HomeStack.Screen name="Menu" options={{ headerShown: false }} component={Menu} />
        <HomeStack.Screen name="Food" options={{ headerShown: false }} component={Food} />
        <HomeStack.Screen name="Report" options={{ headerShown: false }} component={Report} />
        <HomeStack.Screen name="OrderDetail" options={{ headerShown: false }} component={OrderDetail} />
        <HomeStack.Screen name="PersonalDetail" options={{ headerShown: false }} component={PersonalDetail} />
        <HomeStack.Screen name="ManagerDashboard" options={{ headerShown: false }} component={ManagerDashboardTab} />
        <HomeStack.Screen name="StaffDashboard" options={{ headerShown: false }} component={StaffDashboardTab} />
      </HomeStack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>

  )
}



function ManagerDashboardTab() {
  return (
    // <BottomTabStack.Navigator screenOptions={screenOptionsStyle}>
    //   <BottomTabStack.Screen name="Dashboard" component={Dashboard} options={{tabBarIcon:()=>(<Icon name="home" size={26} color='white'/>)}}/>
    //   <BottomTabStack.Screen  name="Status" 
    //                           component={Status} 
    //                           options={{tabBarIcon:()=>(
    //                             <Icon name="fast-food-outline" 
    //                                   size={26} 
    //                                   color='grey'

    //                             />
    //                             )}}/>
    //   <BottomTabStack.Screen name=" "  component={Order} options={{tabBarIcon:()=>(<Icon name="add-outline" size={48} color='white' style={{backgroundColor:"#1E90FF",width:48,height:48,borderRadius:"50%"}} />) }} />
    //   <BottomTabStack.Screen name="Profile" component={Profile} options={{tabBarIcon:()=>(<Icon name="person" size={26} color='white'/>)}}/>
    //   <BottomTabStack.Screen name="Settings" component={Setting} options={{tabBarIcon:()=>(<Icon name="settings" size={26} color='white'/>)}}/>
    // </BottomTabStack.Navigator>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Orders') {
            iconName = focused ? 'layers' : 'layers-outline';
          } else if (route.name === 'Order') {
            iconName = focused ? 'add' : 'add-outline';
          } else if (route.name === 'Management') {
            iconName = focused ? 'briefcase' : 'briefcase-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'grey',
        headerStyle: {
          height: 20
        },
        //Tab bar styles can be added here
        tabBarStyle: { paddingVertical: 5, paddingHorizontal: 20, borderTopLeftRadius: 15, borderTopRightRadius: 15, backgroundColor: 'black', position: 'absolute', height: 50 },
        tabBarLabelStyle: { paddingBottom: 10, paddingTop: 10 },
        unmountOnBlur: true,
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: true }} />
      <Tab.Screen name="Orders" component={Report} options={{ headerShown: true }} />
      <Tab.Screen name=" " component={Order} options={{
        tabBarIcon: () => (
          <View style={{ marginBottom: 20 }}>
            {/* <Icon name="add-outline" size={46} color="white" style={{backgroundColor:"#1E90FF",width:46,height:46,borderRadius:"50%", marginBottom:30}} /> */}
            <View style={{ flex: 1 }}>
              <Text style={{ color: 'white', fontSize: 40, width: 50, height: 50, background: '#1E90FF', borderRadius: 60 / 2, textAlign: 'center', textAlignVertical: 'center', lineHeight: 42 }}>+</Text>
            </View>
          </View>
        )
      }} />
      <Tab.Screen name="Management" component={Management} options={{ headerShown: true }} />
      <Tab.Screen name="Settings" component={Settings} options={{ headerShown: true }} />

    </Tab.Navigator>
  )
}

function StaffDashboardTab() {
  return (

    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Orders') {
            iconName = focused ? 'layers' : 'layers-outline';
          } else if (route.name === 'Order') {
            iconName = focused ? 'add' : 'add-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'grey',
        headerStyle: {
          height: 20
        },
        //Tab bar styles can be added here
        tabBarStyle: { paddingVertical: 5, paddingHorizontal: 20, borderTopLeftRadius: 15, borderTopRightRadius: 15, backgroundColor: 'black', position: 'absolute', height: 50 },
        tabBarLabelStyle: { paddingBottom: 10, paddingTop: 10 },
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: true }} />
      <Tab.Screen name="Orders" component={Report} options={{ headerShown: true }} />
      <Tab.Screen name=" " component={Order} options={{
        tabBarIcon: () => (
          <View style={{ marginBottom: 20 }}>
            {/* <Icon name="add-outline" size={46} color="white" style={{backgroundColor:"#1E90FF",width:46,height:46,borderRadius:"50%", marginBottom:30}} /> */}
            <View style={{ flex: 1 }}>
              <Text style={{ color: 'white', fontSize: 40, width: 50, height: 50, background: '#1E90FF', borderRadius: 60 / 2, textAlign: 'center', textAlignVertical: 'center', lineHeight: 42 }}>+</Text>
            </View>
          </View>
        )
      }} />
      <Tab.Screen name="Profile" component={PersonalDetail} options={{ headerShown: true }} />
      <Tab.Screen name="Settings" component={Settings} options={{ headerShown: true }} />

    </Tab.Navigator>
  )
}

const MyTheme = {
  colors: {
    background: 'black'
  },
};

const screenOptionsStyle = {
  headerStyle: {
    backgroundColor: 'black',
    borderBottomWidth: 0,
    height: 10,
  },
  headerTitleStyle: {
    color: 'white',
    height: 0
  },
  tabBarStyle: {
    backgroundColor: 'black',
    fontSize: 200,
    color: 'white',
    fontWeight: 'bold',
    borderTopWidth: 0,
    height: 55,
    marginBottom: 10,
    marginTop: 10,


  },
  tabBarLableStyle: {




  },
  tabBarActiveTintColor: 'white',
  tabBarInactiveTintColor: 'grey',
  // tabBarItemStyle:{
  //   backgroundColor:'#00ff00',
  //     margin:5,
  //     borderRadius:10,
  // }

  // tabBarIconStyle:{
  //   color:'white'
  // }
};
