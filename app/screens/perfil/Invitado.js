import React from "react";
import {View, Text, Image, ScrollView,StyleSheet} from "react-native";
import {Button} from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function Invitado() {
    const navegacion = useNavigation();
    return (
        <ScrollView centerContent={true} style={styles.body}>
            <Image
                source={require("../../../assets/img/fondo.png")}
                resizeMethod="auto"
                style={styles.imagen}
                />
                <Text style={styles.titulo}>Ingresa a tu perfil</Text>
                <Text style={styles.parrafo}>
                    Lorem ipsum dolor sit amet, consectetur adip,
                    Lorem ipsum dolor sitamet, consectetur adip,
                    Lorem ipsum dolor sitamet, consectetur adip,
                    Lorem ipsum dolor sitamet, consectetur adip,
                </Text>

                <View>
                    <Button
                        title="Inicia Sesión"
                        type="solid"
                        buttonStyle={{
                            backgroundColor: 'rgba(153, 102, 50, 1)',
                        }}
                        onPress={()=>navegacion.navigate("Login")}
                    />
                </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    body:{
        marginLeft:30,
        marginRight:30,
    },
    imagen:{
        height:320,
        width:"100%",
        marginBottom:30,
        marginTop:20,
    },
    titulo:{
        fontWeight:"bold",
        fontSize:19,
        marginBottom:10,
        textAlign:"center",
    },
    parrafo:{
        textAlign:"justify",
        marginBottom:20,
    },
});