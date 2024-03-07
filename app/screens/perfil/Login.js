import React, {useRef} from "react";
import Toast from 'react-native-easy-toast';
import {View, Text, Image, ScrollView,StyleSheet} from "react-native";
import {Button} from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import FormLogin from "../../components/perfil/FormLogin";

export default function Login() {
    const toastRef=useRef();
    const navegacion = useNavigation();
    return (
        <ScrollView centerContent={true} style={styles.body}>
            <Image
                source={require("../../../assets/img/usuario.png")}
                resizeMethod="auto"
                style={styles.imagen}
                />
                <Text style={styles.titulo}>Login</Text>
                <View style={styles.formulario}>
                    
                <FormLogin toastRef={toastRef}/>
            </View>
            <Toast ref={toastRef} position="center" opacity={0.9}/>
                <View>
                
                <Text style={styles.texto}>
                    ¿Aún no tienes una cuenta?  <Text
                    style={{
                        color: 'rgba(153, 102, 50, 1)',
                        }}
                    onPress={()=>navegacion.navigate("Registrar")}
                    > Regístrate</Text>
                </Text>
                
                </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    body:{
        marginLeft:30,
        marginRight:20,
    },
    imagen:{
        height:200,
        width:200,
        alignSelf: 'center',
        marginBottom:30,
        marginTop:20,
    },
    titulo:{
        fontWeight:"bold",
        fontSize:19,
        marginBottom:10,
        textAlign:"center",
    },
    texto:{
        fontSize:18,
        textAlign:"center",
        marginBottom:20,
        marginTop:20,
    },
    formulario:{
        marginTop:10,
        marginLeft:40,
        marginRight:40,
    },
});