import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import { auth } from '../firebase/config';
import CreatePost from './CreatePost';

export default class Menu extends Component{
    constructor(props){
        super(props);
        this.state = {
            loggedIn: false,
            error: null,
        }
    }

    //Metodo para que recuerde al usuario cada vez que se recarga la pagina
    componentDidMount(){
        auth.onAuthStateChanged ( user => {
            if (user) {
                this.setState ({  //Si hay un usuario logueado, queremos que sea true. 
                    loggedIn: true
                })
            }
        })
    }
    
    handleLogin(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then( response => {
            console.log(response);
            alert("Usuario loggeado!");
            this.setState({
                loggedIn: true
            })
        })
        .catch( response => {
            console.log(response);
            alert("Error en el loggueo");
            this.setState({
                error: "Error en loggueo"
            })
        })
    }
    
    handleRegister(email, password, username) {
        //alert(`REGISTRO: usuario: ${this.state.email}, password: ${this.state.password}`)
        auth.createUserWithEmailAndPassword(email, password) //creamos el usuario
        .then( response => {
            console.log(response);
            alert("Usuario registrado!"); // Se registra correctamente el usuario.
              response.user.updateProfile({    // Agarrar el username y meterselo al usuario, que se actualice.  
                displayName: username      //usernmae que recibe por parametro desde el componente register.
              })  
            this.setState({
                loggedIn: true      //creamos el usuario, queda la sesion iniciada
            })
        })
        .catch( error => {
            console.log(error);
            alert("Error en el registro");
            this.setState({
                error: "Fallo en el registro"
            })
        })
    }

    //Meotodo para cerrar sesion
    handleLogout(){
        auth.signOut()
        .then(()=> {
            this.setState({
                loggedIn: false
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

    render(){
        const Drawer = createDrawerNavigator();
    
        return(
            <NavigationContainer>
                    <Drawer.Navigator>
                       {this.state.loggedIn === true ? 

                        <React.Fragment>
                        <Drawer.Screen name = "Home">
                            {props => <Home {...props} handleLogout={()=>this.handleLogout()}/>}
                        </Drawer.Screen>
                        
                       {/*  Paso el componente createPost  */}
                        <Drawer.Screen name= "CreatePost"> 
                        {props => <CreatePost {...props} /> }

                        </Drawer.Screen>
                        
                        </React.Fragment>
                        : 
                        <React.Fragment>
                            <Drawer.Screen name="Login">
                                {props => <Login {...props} handleLogin={(email, password)=>this.handleLogin(email, password)}/>}
                            </Drawer.Screen>  {/* los 3 puntitos de props: es para pasar todos los datos. Hay props que ya vienen por defecto (naviagtion, route) sirven para navegar entre compooentes. Con los 3 puntos pasamos esas 2 props. */ }
                            <Drawer.Screen name = "Register">
                                {props => <Register {...props} handleRegister={(email, password, username)=>this.handleRegister(email, password, username)}/>}
                            </Drawer.Screen>
                        </React.Fragment>
                    } 
                    
                    </Drawer.Navigator>
                </NavigationContainer>
            )
        }
}