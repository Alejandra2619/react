import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import Busquedas from "../screens/Busquedas";
import Restaurante from "../screens/restaurantes/Restaurante";
export default function RutasBusquedas() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="busqueda"
                component={Busquedas}
                options={{ title: "Buscar" }}
            />
            <Stack.Screen
                name="Restaurante"
                component={Restaurante}
            />
        </Stack.Navigator>
    );
}