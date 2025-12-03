import { Feather } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "../app/navigation/types";

type Page11NavProp = StackNavigationProp<RootStackParamList, "page11">;
type Page11RouteProp = RouteProp<RootStackParamList, "page11">;

const PRIMARY_BLUE = "#023554";
const SECONDARY_CYAN = "#8AD2EA";

export default function Page11Screen() {
  const navigation = useNavigation<Page11NavProp>();
  const route = useRoute<Page11RouteProp>();
  const { metodoPago, reserva } = route.params;

  const handleConfirmReservation = () => {
    console.log("Reserva realizada:", reserva, "Método:", metodoPago);
    navigation.navigate("page12", { reserva, metodoPago });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Botón atrás */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("page9", { reserva })}
      >
        <Feather name="arrow-left" size={28} color={PRIMARY_BLUE} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerTitle}>Reserva</Text>

        {/* Método de pago */}
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, styles.sectionTitle]}>PAGO</Text>
          <View style={styles.flexRow}>
            <Text style={styles.detailValue}>
              {metodoPago === "efectivo"
                ? "Pago en efectivo"
                : "Tarjeta seleccionada"}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Descripción y precio */}
        <View style={[styles.detailRow, { paddingTop: 20 }]}>
          <Text
            style={[
              styles.detailLabel,
              styles.sectionTitle,
              { color: PRIMARY_BLUE },
            ]}
          >
            DESCRIPCIÓN
          </Text>
          <Text
            style={[
              styles.detailLabel,
              styles.sectionTitle,
              { color: PRIMARY_BLUE },
            ]}
          >
            PRECIO
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.descriptionText}>{reserva.servicioNombre}</Text>
          <Text style={styles.priceValue}>L.{reserva.servicioPrecio}</Text>
        </View>

        <View style={styles.divider} />

        {/* Resumen */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>L.{reserva.servicioPrecio}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Impuestos</Text>
            <Text style={styles.summaryValue}>L.0</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>L.{reserva.servicioPrecio}</Text>
          </View>
          <View style={styles.divider} />
        </View>

        {/* Botón confirmar */}
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmReservation}
        >
          <Text style={styles.confirmButtonText}>Realizar reserva</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  backButton: {
    position: "absolute",
    top: 30,
    left: 20,
    zIndex: 10,
    backgroundColor: "#fff",
    padding: 4,
    borderRadius: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderColor: PRIMARY_BLUE,
    borderWidth: 2,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "400",
    color: PRIMARY_BLUE,
    marginTop: 100,
    marginBottom: 30,
  },
  scrollContent: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 30 },
  flexRow: { flexDirection: "row", alignItems: "center" },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  sectionTitle: { fontSize: 14, fontWeight: "700", color: "#888" },
  detailLabel: { fontSize: 16, color: PRIMARY_BLUE },
  detailValue: { fontSize: 16, fontWeight: "400", color: PRIMARY_BLUE },
  descriptionText: { fontSize: 16, color: PRIMARY_BLUE, fontWeight: "400" },
  priceValue: { fontSize: 16, fontWeight: "500", color: PRIMARY_BLUE },
  divider: { height: 3, backgroundColor: "#eee", marginVertical: 5 },
  summaryContainer: { marginTop: 30 },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  summaryLabel: { fontSize: 16, color: PRIMARY_BLUE, fontWeight: "400" },
  summaryValue: { fontSize: 16, color: PRIMARY_BLUE, fontWeight: "500" },
  totalRow: { marginTop: 15 },
  totalLabel: { fontSize: 16, fontWeight: "700", color: PRIMARY_BLUE },
  totalValue: { fontSize: 16, fontWeight: "700", color: PRIMARY_BLUE },
  confirmButton: {
    backgroundColor: SECONDARY_CYAN,
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: PRIMARY_BLUE,
    marginTop: 40,
  },
  confirmButtonText: { fontSize: 18, fontWeight: "600", color: PRIMARY_BLUE },
});
