import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { db } from '../firebase/config';

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [], //Valor inicial
        }
    }

    //Aca van los posteos. Va a mostrar todos los posteos actualizados de mi coleccion de post. Seteamos al estado de post, todos los documentos existentes ahi. 
    componentDidMount(){
       db.collection("post").orderBy("createdAt", "desc").onSnapshot(  //Obtenemos la coleccion de posteo. OnSnapshot detecta todos los cambios del posteo: tiempo real. 
        docs => {      //Devulve una coleccion de docs, que los vamos a pushear a un array auxiliar. 
            let postsAux = [ ]   //Variable auxiliar.
             docs.forEach (doc => {
                 postsAux.push({
                     id: doc.id,  //cada posteo tiene un id determinado. 
                     date: doc.data()   //toda la data de ese documento: cuando se creo, autor, contenido.
                 })
                 this.setState({
                     posts: postsAux  //seteamos el estado con la variable auxiliar. 
                 })
             })
            }
       )
    }

    render(){
        return(
            <View>
                <Text> Home </Text>
                <TouchableOpacity style = {styles.button} onPress={() => this.props.handleLogout()}>
                    <Text style = {styles.text}> Logout </Text>
                </TouchableOpacity>
                <FlatList
                data = {this.state.posts}
                keyExtractor = {post => post.id.toString()} //clave unica de cada componente dentro del flatlist. 
                renderItem = { ({item}) => 
                    <Post item = {item}> </Post> }
                /> 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    field: {
        width: '80%',
        backgroundColor: "#09009B",
        color: '#FFA400',
        padding: 10,
        marginVertical: 10
    },
    button: {
        width: '30%',
        backgroundColor: "#0F00FF",
    },
    text: {
        color: '#FFA400',
        fontSize: 20
    }
})