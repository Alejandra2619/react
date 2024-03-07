import React, {useRef} from "react";
import Toast from 'react-native-easy-toast';
import {View, Text, Image, StyleSheet, ScrollView} from "react-native";
import FormRestaurante from "../../components/restaurantes/FormRestaurante";

export default function AgregarRestaurante() {
    const toastRef=useRef();
    return (
        <ScrollView>
            <View style={style.formulario}>
                <FormRestaurante toastRef={toastRef}/>
            </View>
            <Toast ref={toastRef} position="center" opacity={0.9}/>
        </ScrollView>
    );
}

const style = StyleSheet.create({
    imagen:{
        height:100,
        width:100,
        alignSelf: 'center',
        marginBottom:30,
        marginTop:20,
    },
    formulario:{
        marginTop:10,
        marginLeft:40,
        marginRight:40,
    },
})