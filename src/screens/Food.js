import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, Button, Image, TouchableOpacity, ScrollView, FlatList, Modal, ImageBackground, Picker} from 'react-native';
import { 
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
        } from 'react-native-responsive-screen';
import {Ionicons} from '@expo/vector-icons';
import NetInfo from "@react-native-community/netinfo";
import { showMessage } from "react-native-flash-message";



class Food extends Component{
    constructor(){
        super();
        this.state={
            data:[],
            modalVisible: false,
            modalViewVisible: false,
            modalEditVisible: false,
            modalDeleteVisible: false,
            modalDeleteButtonsVisible: true,
            modalEditButtonsVisible: true,
            modalCreateButtonVisible: true,
            searchText:'',
            id: '',
            name: '',
            description: '',
            price: '',
            category_id: '',
            imageURL: '',
            message: '',
            url: '',
            visible:false,
            category:[]
        }
    }

    componentDidMount() {
        loc(this);
    }
      
    componentWillUnMount() {
        rol();
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
                    description: "You can not add a new order until \nyou have an active internet connection again.",
                    type:"danger",
                    duration:5000,
                    floating:true,
                    icon:"danger",
                    autoHide:false,
                })
            }
        })
    }

    search=()=>{
        console.log("search");
        var text=this.state.searchText;

        if(text){
        console.log("inside"+text);
            var url="http://localhost:5731/API/Food/" + text
            console.log(url);
            
            var headers = new Headers({
                Authorization: 'Basic ' + btoa('test:test')
            }
            );
        
            var options={headers:headers};

            fetch(url,options)

            .then(response => response.json())
            .then((json) =>{
                console.log(json);
                
                this.setState({
                    data:json
                })
            })
        }
    }

    
    
    componentDidMount(){
        // fetch('https://jsonplaceholder.typicode.com/users')
        console.log('getFood')
        console.log(this.props.route.params)
        var url="http://localhost:5731/API/Food/Category/" + this.props.route.params.id;
        console.log(url)    
        var headers = new Headers({
            Authorization: 'Basic ' + btoa('test:test')
        }
        );
    
        var options={headers:headers};

        fetch(url,options)
        .then(response => response.json())
        .then((json) =>{
            console.log(json);

            this.setState({
                data:json
            })
        })
    }

    
    addFood=()=>{
        // Display message...
        this.displayConnectionMessage()

        
        
        console.log("add food");
        console.log(this.state.category_id)
        var product={
            Name: this.state.name,
            Description: this.state.description,
            Price: this.state.price,
            Category_Id: this.state.category_id,
            imageURL: '',
        }
        var url="http://localhost:5731/API/Food/addFood" 
        var headers = new Headers({
            Authorization: 'Basic ' + btoa('test:test')
        });

        headers.append('Accept', 'application/json');
        headers.append('Content-Type','application/json');
        var options={method:'POST', headers:headers, body:JSON.stringify(product)};

        fetch(url,options)
        .then(response => response.json())
        .then((json) =>{
            console.log(json);

            this.setState({
                data:json,
                message:"Added Successfully",
                modalCreateButtonVisible:false
            })
        })
    }

    updateFood=()=>{
        console.log("update food");
        var food={
            Id:this.state.id,
            Name: this.state.name,
            Description: this.state.description,
            Price: this.state.price,
            Category_Id: this.state.category_id,
            ImageURL: this.state.imageURL
        }
        var url="http://localhost:5731/API/Food/updateFood" 
        var headers = new Headers({
            Authorization: 'Basic ' + btoa('test:test')
        }
        );
        headers.append('Accept', 'application/json');
        headers.append('Content-Type','application/json');
        var options={method:'POST', headers:headers, body:JSON.stringify(food)};

        fetch(url,options)
        .then(response => response.json())
        .then((json) =>{
            console.log(json);

            this.setState({
                data:json,
                message:"Updated Successfully",
                modalEditButtonsVisible: false,
            })
        })
    }

    deleteFood=()=>{
        console.log("delete Food");
        console.log(this.state.id)
        var url="http://localhost:5731/API/Food/deleteFood/"+this.state.id;
        
        var headers = new Headers({
            Authorization: 'Basic ' + btoa('test:test')
        });
        
        var options={method:'DELETE', headers:headers};

        fetch(url,options)
        .then(response => response.json())
        .then((json) =>{
            console.log(json);

            this.setState({
                data:json,
                modalDeleteButtonsVisible: false,
                message:"Deleted Successfully"
            })
        })
    }

    getCategory=()=>{
        // fetch('https://jsonplaceholder.typicode.com/users')
        
        var url="http://localhost:5731/API/Category";
            
        var headers = new Headers({
            Authorization: 'Basic ' + btoa('test:test')
        }
        );
    
        var options={headers:headers};

        fetch(url,options)
        .then(response => response.json())
        .then((json) =>{
            console.log(json);

            this.setState({
                category:json
            })
        })
    }

    setModalCreateVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }
    setModalViewVisible = (visible) => {
        this.setState({ modalViewVisible: visible });
    }
    setModalEditVisible = (visible) => {
        this.setState({ modalEditVisible: visible });
    }
    setModalDeleteVisible = (visible) => {
        this.setState({ modalDeleteVisible: visible });
    }

    resetMessage = ()=>{
        this.setState({message:''})
    }

    render(){

        const styles=StyleSheet.create({
            container:{
                flex:1,
                backgroundColor:'black',
                alignItems:'center'
            },
            headerContainer:{
                width:wp('90%'),
                height:hp('8%'),
                marginTop:hp('3%'),
                flexDirection:'row',
                alignItems:'center',
            },
            backButtonContainer:{
                
                
            },
            titleContainer:{
                marginLeft:20,
                justifyContent:'center',
                alignContent:'center'

                
            },
            createButtonContainer:{
                width:120,
                marginLeft:30,
                textAlignVertical:'center'
                
            },
            searchContainer:{
                width:wp('90%'),
                height:48,
                marginTop:20,
                flexDirection:'row'
            },
            contentContainer:{
                marginTop:40,
                flexDirection:'row',
                width:wp("90%")
                
            },
            listText:{
                color:'white',
                fontSize:18,
                fontWeight:'bold',
               
                
            },
            crudButton:{
                height:30,
                width:70,
                borderRadius:4,
                marginLeft:0,
                alignItems:'center',
                justifyContent:'center',
                marginVertical:5
            },
            listVewStyle:{
                flexDirection:'row',
                flexWrap:'wrap',
                alignItems:'center',
                width:wp('90%'),
                justifyContent:'flex-start'
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
                width: '100%',
                height: wp('30%'),
                borderRadius: 4,
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
            deleteContainer: {
                width: wp('60%'),
                height: wp('35%'),
                backgroundColor: '#F08B42',
                borderRadius: 24,
                flex: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            },
            deleteText: {
                color: 'white',
                fontWeight: 'bold',
                fontSize: wp('5%'),
                textAlign: 'center',

            },
            messageText:{
                fontSize:20, 
                textAlign:'center', 
                color:'red', 
                marginBottom:80
            }
            
        })
        const {modalVisible, modalViewVisible, modalEditVisible, modalDeleteVisible, modalCreateButtonVisible } = this.state
        const renderData=({item})=>{
            // var url = "data:image/png;base64," + item.ImageURL
            var url = item.ImageURL
            return(
                <View style={{width:wp('45%')}}>
                <View style={{width:wp('45%'),height:30,borderWidth:1, borderTopColor:'grey'}}>
                    </View>
                <View style={{marginBottom:30, width:wp('45%'), height:wp('10%'), flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <View style={{width:wp('15%'),height:"100%"}}>
                        <Image source={{uri:url}} style={{height:wp('10%'), width:wp('15%')}} />
                    </View>
                    <View style={{flex:1, height:"100%", width:wp('20%'),flexDirection:'column',justifyContent:'space-between',paddingHorizontal:15}}>
                        <Text style={styles.listText}>{item.Name}</Text>
                        <Text style={[styles.listText, {fontSize:24}]}>AUD$<br></br>{item.Price}</Text>
                    </View>
                    <View style={{width:wp('10%'),flexDirection: 'column', justifyContent:'center',alignItems:'center' }}>
                        <TouchableOpacity style={[styles.crudButton, { backgroundColor: "#61BFC2" }]} onPress={() => {
                            this.setModalViewVisible(true),
                            this.setState({
                                id:item.Id,
                                name: item.Name,
                                description: item.Description,
                                price: item.Price,
                                category_id: item.Category_Id,
                                imageURL: item.ImageURL,
                                url: "data:image/png;base64," + item.imageURL,
                            })
                            
                        }}>
                            <Text style={{color:"white"}}>View</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.crudButton, { backgroundColor: "#51DC8B" }]} onPress={() => {
                            this.setModalEditVisible(true),
                            this.setState({
                                id:item.Id,
                                name: item.Name,
                                description: item.Description,
                                price: item.Price,
                                category_id: item.Category_Id,
                                imageURL: item.ImageURL,
                                modalEditButtonsVisible:true
                            })

                        }}>
                            <Text style={{color:"white"}}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.crudButton, { backgroundColor: "#FF3E6C" }]} onPress={() => {
                            this.setModalDeleteVisible(true)
                            this.setState({
                                id:item.Id,                              
                                modalDeleteButtonsVisible:true
                            })}}>
                            <Text style={{color:"white"}}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
                
                
            )
        };

        return(
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.backButtonContainer}>
                        <TouchableOpacity style={{height:40, width:40, borderRadius:8,backgroundColor:'black',alignItems:'center', justifyContent:'center'}} onPress={()=>this.props.navigation.navigate('Menu')}>
                            <Ionicons name={'ios-arrow-back'} size={35} color='white' />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={{color:'white',fontWeight:'bold',fontSize:32}}>
                            {this.props.route.params.name}
                        </Text>
                    </View>
                    <View style={styles.createButtonContainer}>
                        <TouchableOpacity style={{flexDirection:'row', alignItems:'center',height:40, borderRadius:8 ,backgroundColor:'#1E90FF', width:110, alignItems:'center', justifyContent:'center'}} onPress={() => {
                            this.setModalCreateVisible(true), 
                            this.setState({category_id:this.props.route.params.id,
                            modalCreateButtonVisible: true,
                            })
                            }}>
                            <Ionicons name={'ios-add'} size={35} color='white' />
                            <Text style={{color:'white', fontSize:24}}>
                                New   
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.searchContainer}>
                    <TextInput placeholder='search food...' style={{flex:1,borderTopLeftRadius:8, borderBottomLeftRadius:8,backgroundColor:'#333333',height:48, paddingLeft:10, fontSize:20,color:'white'}} value={this.state.searchText} onChangeText={text=>this.setState({searchText:text})}>
                    </TextInput>
                    <TouchableOpacity  style={{width:150, height:48,flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'#BC62FF', borderTopRightRadius:8,borderBottomRightRadius:8}} onPress={()=>this.search()}>
                        <Ionicons name={'ios-search'} size={28} color='white' style={{paddingRight:10}}/>
                        <Text style={{fontSize:24, color:'white'}}>
                            Search
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.contentContainer}>
                    <ScrollView>
                        <FlatList contentContainerStyle={styles.listVewStyle} data={this.state.data} renderItem={renderData} keyExtractor={(item, index)=>{return item._id;}}></FlatList>
                    </ScrollView>
                </View>
                <View>
                <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { Alert.alert("Modal has been closed."); this.setModalCreateVisible(!modalVisible); }}>
                <View style={{ alignItems: 'center' }}>
                    <View style={styles.overlayContainer}>
                        <ScrollView vertical={true} showsHorizontalScrollIndicator={false}>
                            <Text style={styles.overlayTitle}>
                                Create New Food
                            </Text>
                            <View style={{ padding: 40, paddingBottom:20, alignItems: 'center' }}>
                                <TouchableOpacity style={styles.photoSection}>
                                    <Ionicons name="ios-camera" size={50} color='grey' />
                                    <Text style={{ color: 'grey', fontsize: 32 }}>Upload Image</Text>
                                </TouchableOpacity>
                                <View style={{ width: '100%', marginTop: 40 }}>
                                    <Text style={styles.inputLabel}>Name:</Text>
                                    <TextInput style={styles.inputLine} onChangeText={text=>this.setState({name:text})}></TextInput>
                                    <Text style={styles.inputLabel}>Description:</Text>
                                    <TextInput style={styles.inputLine} onChangeText={text=>this.setState({description:text})}></TextInput>
                                    <Text style={styles.inputLabel}>Price:</Text>
                                    <TextInput style={styles.inputLine} onChangeText={text=>this.setState({price:text})}></TextInput>
                                </View>
                            </View>
                            { modalCreateButtonVisible
                            ?
                            (<View style={{ flexDirection: 'row', width: wp('60%'), justifyContent: 'space-evenly', marginBottom: 80 }}>
                                <TouchableOpacity style={[styles.editButton, { backgroundColor: '#FF3E6C' }]} onPress={() => {
                                    this.resetMessage(),
                                    this.setModalCreateVisible(false)}}>
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.editButton, { backgroundColor: '#51DC8B' }]} onPress={() => {
                                    // this.setModalCreateVisible(false)
                                    this.addFood()
                                    }}>
                                    <Text style={styles.buttonText}>Save</Text>
                                </TouchableOpacity>
                            </View>)
                            :
                            <View style={{flexDirection:'column', width: wp('60%'), alignItems: 'center', marginBottom: 80 }}>
                            <Text style={{color:'red',fontSize:24, fontWeight:'bold', marginBottom:20}}>{this.state.message}</Text>
                            <TouchableOpacity style={[styles.editButton, {backgroundColor: '#1E90FF' }]} onPress={() => {
                                this.setModalCreateVisible(false),
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
            <Modal animationType="slide" transparent={true} visible={modalEditVisible} onRequestClose={() => { Alert.alert("Modal has been closed."); this.setModalEditVisible(!modalEditVisible); }}>
                <View style={{ alignItems: 'center' }}>
                    <View style={styles.overlayContainer}>
                        <ScrollView vertical={true} showsHorizontalScrollIndicator={false}>
                            <Text style={styles.overlayTitle}>
                                {this.state.name}
                            </Text>
                            <View style={{ padding: 40, alignItems: 'center' }}>
                                <TouchableOpacity style={styles.photoSection}>
                                    <ImageBackground style={{
                                        width: '100%',
                                        height: wp('30%'),
                                        alignItems: 'center', justifyContent: "center", flexDirection:'row'
                                    }} source={{ uri: this.state.imageURL }} resizeMethod="scale" imageStyle={{ borderRadius: 8 }}>
                                        <View style={{width:280,height:60,backgroundColor:'#cccccc',borderColor:'grey',justifyContent:'center'}}>
                                            <Text style={{color:'grey', fontSize:32,textAlign:'center'}}>
                                                Edit Image
                                            </Text>
                                        </View>
                                        
                                    </ImageBackground>
                                </TouchableOpacity>
                                <View style={{ width: '100%', marginTop: 40 }}>
                                    <Text style={styles.inputLabel}>Name:</Text>
                                    <TextInput style={styles.inputLine} placeholder="First Name" value={this.state.name} onChangeText={text => this.setState({name: text })}></TextInput>
                                    <Text style={styles.inputLabel}>Description:</Text>
                                    <TextInput style={styles.inputLine} placeholder="Last Name" value={this.state.description} onChangeText={text => this.setState({ description: text })}></TextInput>
                                    <Text style={styles.inputLabel}>Price:</Text>
                                    <TextInput style={styles.inputLine} placeholder="Price" value={this.state.price} onChangeText={text => this.setState({ price: text })}></TextInput>
                                    {/* <Text style={styles.inputLabel}>Category:</Text>
                                    <TextInput style={styles.inputLine} placeholder="Category" value={this.state.category_id} onChangeText={text => this.setState({ category_id: text })}></TextInput> */}
                                    <Text style={styles.inputLabel}>Category:</Text>
                                    <View style={{width:350}}>
                                        <Picker style={{marginTop:20, fontSize:28}} selectedValue={this.state.category_id} onValueChange={(value)=>this.setState({category_id:value})}>
                                            <Picker.Item label="Entrees" value="1"></Picker.Item>
                                            <Picker.Item label="Mains" value="2"></Picker.Item>
                                            <Picker.Item label="Desserts" value="3"></Picker.Item>
                                            <Picker.Item label="Drinks" value="4"></Picker.Item>
                                            <Picker.Item label="Sides" value="5"></Picker.Item>
                                            <Picker.Item label="Specials" value="6"></Picker.Item>
                                        </Picker>
                                    </View>
                                    
                                </View>
                            </View>
                            
                            { this.state.modalEditButtonsVisible ?   
                                (<View style={{ flexDirection: 'row', width: wp('60%'), justifyContent: 'space-evenly', marginBottom: 40 }}>
                                <TouchableOpacity style={[styles.editButton, { backgroundColor: '#FF3E6C' }]} onPress={() => {
                                    this.resetMessage(),
                                    this.setModalEditVisible(false)}}>
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.editButton, { backgroundColor: '#51DC8B' }]} onPress={() => {
                                    this.setModalEditVisible(false),
                                    this.updateFood()
                                   
                                    }}>
                                    <Text style={styles.buttonText}>Save</Text>
                                </TouchableOpacity>
                                </View>)
                                :
                                <View style={{ flexDirection: 'row', width: wp('60%'), justifyContent: 'space-evenly', marginBottom: 40 }}>
                                    <Text style={styles.messageText}>{this.state.message}</Text>
                                    <TouchableOpacity style={[styles.editButton, {backgroundColor: '#1E90FF' }]} onPress={() => {
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
            <Modal animationType="slide" transparent={true} visible={modalViewVisible} onRequestClose={() => { Alert.alert("Modal has been closed."); this.setModalViewVisible(!modalViewVisible); }}>
                <View style={{ alignItems: 'center' }}>
                    <View style={styles.overlayContainer}>
                        <ScrollView vertical={true} showsHorizontalScrollIndicator={false}>
                            <Text style={styles.overlayTitle}>
                                {this.state.name} 
                            </Text>
                            <View style={{ padding: 40, alignItems: 'center' }}>
                                <TouchableOpacity style={styles.photoSection}>
                                    <ImageBackground style={{
                                        width: '100%',
                                        height: wp('30%'),
                                        alignItems: 'center', justifyContent: "center", flexDirection:'row'
                                    }} source={{ uri: this.state.imageURL }} resizeMethod="scale" imageStyle={{ borderRadius: 8 }}>
                                    </ImageBackground>
                                </TouchableOpacity>
                                <View style={{ width: '100%', marginTop: 40 }}>
                                    <Text style={styles.inputLabel}>Name:</Text>
                                    <Text style={styles.inputLine}>{this.state.name}</Text>
                                    <Text style={styles.inputLabel}>Description:</Text>
                                    <Text style={styles.inputLine}>{this.state.description}</Text>
                                    <Text style={styles.inputLabel}>Price:</Text>
                                    <Text style={styles.inputLine}>{this.state.price}</Text>
                                    <Text style={styles.inputLabel}>Category:</Text>
                                    <Text style={styles.inputLine}>{this.props.route.params.name}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', width: wp('60%'), justifyContent: 'space-evenly', marginBottom: 40 }}>
                                <TouchableOpacity style={[styles.editButton, { backgroundColor: '#1E90FF' }]} onPress={() => this.setModalViewVisible(false)}>
                                    <Text style={styles.buttonText}>Back</Text>
                                </TouchableOpacity>
                            </View>

                        </ScrollView>
                    </View>
                </View>
            </Modal>
            <Modal animationType="slide" transparent={true} visible={modalDeleteVisible} onRequestClose={() => { Alert.alert("Modal has been closed."); this.setModalDeleteVisible(!modalDeleteVisible); }}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <View style={styles.deleteContainer}>
                        {
                            // condition ? true : false
                            this.state.modalDeleteButtonsVisible
                            ?
                            (<View style={{ flex: 'column', height: '100%', width: '100%', justifyContent: 'space-evenly', padding: 40 }}>
                                <View style={{ alignItems: 'center', }}>
                                    <Text style={styles.deleteText}>
                                        Do you want to delete this food?
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                    <TouchableOpacity style={[styles.editButton, { backgroundColor: '#FF3E6C' }]} onPress={() => {
                                        this.resetMessage(),
                                        this.setModalDeleteVisible(false)}}>
                                        <Text style={styles.buttonText}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.editButton, { backgroundColor: '#51DC8B' }]} onPress={() => {
                                        // this.setModalDeleteVisible(false),
                                        this.deleteFood()
                                    }}>
                                        <Text style={styles.buttonText}>Confirm</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>)
                            :
                            <View style={{flexDirection:'column', height:'80%',justifyContent:'space-evenly',alignItems:'center'}}>
                            <Text style={{color:'white',fontSize:60, fontWeight:'bold', marginBottom:5}}>{this.state.message}</Text>
                            <TouchableOpacity style={[styles.editButton, {backgroundColor: '#1E90FF' }]} onPress={() => {
                                this.setModalDeleteVisible(false),
                                this.resetMessage()
                                }}>
                                    <Text style={styles.buttonText}>Back</Text>
                                </TouchableOpacity>
                                </View> 
                        }
                    </View>
                </View>
            </Modal>
            </View>
            </View>
        )
    }
};

export default Food;

