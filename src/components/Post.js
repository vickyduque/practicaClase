import React from "react"
import {View, Text, StyleSheet} from "react-native"
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

export default class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            likes: 0,
            liked: false //Valor inicial
        }
    }

//Metodo para likear o deslikear un posteo
functionLike(){
    const likes = doc(db, "posts");
    // Atomically add a new region to the "regions" array field.
      await updateDoc(likes, {
        regions: arrayUnion(" ")
    });
    // Atomically remove a region from the "regions" array field.
      await updateDoc(likes, {
        regions: arrayRemove(" ")
    });
}

render (){
    return (
        <View style={styles.container}> 
             {/*Renderiza el posteo: */}        
             <Text> {item.data.owner}  </Text>
             <Text> {item.data.description} </Text>
              <Text> {item.data.createdAt}  </Text>

              {/*boton para likear*/}   
             <TouchableOpacity style = {styles.button} onPress={() => this.props.functionLike()}>
                 <Text style = {styles.text}> Like </Text>
             </TouchableOpacity>

             {/*boton para deslikear */} 
            <TouchableOpacity style = {styles.button} onPress={() => this.props.functionLike()}>
                 <Text style = {styles.text}> Quitar Like </Text>
             </TouchableOpacity>

        </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
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