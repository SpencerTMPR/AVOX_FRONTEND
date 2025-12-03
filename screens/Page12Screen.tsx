import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../app/navigation/types";

type Page12NavProp = StackNavigationProp<RootStackParamList, "page12">;
type Page12RouteProp = RouteProp<RootStackParamList, "page12">;

export default function Page12Screen() {
  const navigation = useNavigation<Page12NavProp>();
  const route = useRoute<Page12RouteProp>();
  const { metodoPago, reserva } = route.params;

  return (
    <View style={styles.container}>
      {/* Logo AVOX */}
      <Image
        source={require("../assets/images/logo.jpeg")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Título */}
      <Text style={styles.title}>¡Reserva Exitosa!</Text>

      {/* Icono de check grande */}
      <View style={styles.checkContainer}>
        <Ionicons name="checkmark-circle-outline" size={80} color="#8AD2EA" />
      </View>

      {/* Mensaje dinámico */}
      <View style={styles.messageBlock}>
        <Text style={styles.messageTitle}>
          Tu reserva se ha agendado correctamente
        </Text>
        <Text style={styles.messageTitle}>
          Método de pago: {metodoPago === "efectivo" ? "Efectivo" : "Tarjeta"}
        </Text>
        <Text style={styles.messageTitle}>
          Fecha: {reserva.fechaReserva} - Hora: {reserva.horaReserva}
        </Text>
      </View>
      {/* Botón Home */}
      <TouchableOpacity
        style={styles.homeIcon}
        onPress={() => navigation.navigate("page6")}
      >
        <Ionicons name="home-outline" size={32} color="#023554" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("page6")}>
        <Text style={styles.loginText}>Regresar a la página principal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 40,
    paddingTop: 60,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    color: "#023554",
    marginBottom: 40,
    fontWeight: "400",
  },
  checkContainer: {
    marginBottom: 50,
  },
  messageBlock: {
    marginBottom: 40, // 👈 separa el bloque de texto del resto
    alignItems: "center",
  },
  messageTitle: {
    fontSize: 20,
    color: "#023554",
    marginBottom: 20,
    fontWeight: "400",
    textAlign: "center",
  },
  loginText: {
    color: "#023554",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
  homeIcon: {
    position: "absolute",
    bottom: 130,
  },
});
