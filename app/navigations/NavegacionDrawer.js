import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Busqueda from "../screens/Busquedas";
import RutasPerfil from "./RutasPerfil";
import RutasRestaurante from "./RutasRestaurante";
import Favorito from "../screens/Favoritos";
import TopRestaurante from "../screens/TopRestaurantes";
import Ionicons from 'react-native-vector-icons/Ionicons';

//Creamos el objeto para manipular el menú lateral
const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
            initialRouteName="cuenta">
                <Drawer.Screen name="restaurantes" component={RutasRestaurante} options={{title:"Restaurantes", drawerIcon:()=><Ionicons name="restaurant" size={24}/>}} />
                <Drawer.Screen name="busquedas" component={Busqueda} options={{title:"Búsquedas", drawerIcon:()=><Ionicons name="search" size={24}/>}}/>
                <Drawer.Screen name="cuenta" component={RutasPerfil} options={{title:"Cuenta", drawerIcon:()=><Ionicons name="card" size={24}/>}}/>
                <Drawer.Screen name="favoritos" component={Favorito} options={{title:"Favoritos", drawerIcon:()=><Ionicons name="star" size={24}/>}} />
                <Drawer.Screen name="topRestaurantes" component={TopRestaurante} options={{title:"Top Restaurantes", drawerIcon:()=><Ionicons name="star-outline" size={24}/>}} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}