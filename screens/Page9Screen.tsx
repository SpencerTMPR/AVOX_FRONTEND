import { Feather } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
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

type Page9NavProp = StackNavigationProp<RootStackParamList, "page9">;
type Page9RouteProp = RouteProp<RootStackParamList, "page9">;

// Colores de tu tema
const PRIMARY_BLUE = "#023554"; // Azul oscuro
const SECONDARY_CYAN = "#8AD2EA"; // Celeste claro

// --- Datos Simulados de Tarjetas ---
const SAVED_CARDS = [
  { id: "1", type: "Visa", last4: "5967", icon: "credit-card" }, // Se usa un ícono genérico de Feather para Visa
  { id: "2", type: "Mastercard", last4: "3461", icon: "credit-card" }, // Se usa un ícono genérico de Feather para Mastercard
  { id: "cash", type: "Efectivo", last4: "", icon: "dollar-sign" },
];

// --- Componente de Tarjeta Guardada ---
const SavedCard = ({ card, isSelected, onSelect }) => {
  const isCash = card.type === "Efectivo";
  const cardLogoText = isCash
    ? "EFECTIVO"
    : card.type === "Visa"
    ? "VISA"
    : "Mastercard";
  const cardLogoColor = isCash
    ? "#28a745"
    : card.type === "Visa"
    ? PRIMARY_BLUE
    : "#FF6C00";

  return (
    <TouchableOpacity
      style={[styles.cardOption, isSelected && styles.cardSelectedStyle]}
      onPress={() => onSelect(card.id)}
      activeOpacity={0.8}
    >
      <View style={styles.cardInfo}>
        <View
          style={[styles.cardTypeBadge, { backgroundColor: cardLogoColor }]}
        >
          <Text style={styles.cardTypeText}>{cardLogoText}</Text>
        </View>
        <Text style={styles.cardNumber}>
          {isCash ? "Pagar en efectivo" : `**** **** **** ${card.last4}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function Page9Screen() {
  const navigation = useNavigation<Page9NavProp>();
  const route = useRoute<Page9RouteProp>();
  const { reserva } = route.params; // aquí  la reserva desde Page8

  const [selectedCardId, setSelectedCardId] = useState(SAVED_CARDS[0].id);

  const handleSelectCard = (id) => {
    setSelectedCardId(id);
  };

  const handleUseCard = () => {
    if (selectedCardId === "cash") {
      console.log("Pago en efectivo seleccionado");
      navigation.navigate("page11", { metodoPago: "efectivo", reserva });
    } else {
      console.log(`Utilizar tarjeta seleccionada: ${selectedCardId}`);
      navigation.navigate("page11", { metodoPago: "tarjeta", reserva });
    }
  };

  const handleAddCard = () => {
    console.log("Navegar a la pantalla para agregar una nueva tarjeta");
    // Aquí iría la navegación a la pantalla de agregar tarjeta.
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() =>
          navigation.navigate("page8", {
            autolavadoID: reserva.autolavadoID,
            servicioID: reserva.servicioID,
            reserva,
          })
        }
      >
        <Feather name="arrow-left" size={28} color={PRIMARY_BLUE} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* --- 1. Encabezado de la Página --- */}
        <Text style={styles.headerTitle}>Métodos de pago</Text>

        {/* --- 2. Tarjetas Guardadas --- */}
        <View style={styles.cardsSection}>
          <Text style={styles.sectionTitle}>TARJETAS GUARDADAS</Text>

          {SAVED_CARDS.map((card) => (
            <SavedCard
              key={card.id}
              card={card}
              isSelected={selectedCardId === card.id}
              onSelect={handleSelectCard}
            />
          ))}

          {/* Botón para Agregar Otra Tarjeta */}
          <TouchableOpacity
            style={styles.addCardButton}
            onPress={() => navigation.navigate("page10")}
            /*onPress={handleAddCard}*/
          >
            <Feather name="plus-circle" size={24} color={PRIMARY_BLUE} />
            <Text style={styles.addCardButtonText}>Agregar otra tarjeta</Text>
          </TouchableOpacity>
        </View>

        {/* --- 3. Botón Principal de Acción --- */}
        {/* --- 3. Botón Principal de Acción --- */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleUseCard} // 👈 ahora sí usa la lógica correcta
        >
          <Text style={styles.actionButtonText}>
            {selectedCardId === "cash"
              ? "Confirmar pago en efectivo"
              : "Utilizar esta tarjeta"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// =========================================================
//                  SECCIÓN DE ESTILOS
// =========================================================

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 80, // Espacio para la barra de navegación
  },

  // --- 1. Encabezado ---
  headerTitle: {
    fontSize: 32,
    fontWeight: "400",
    color: PRIMARY_BLUE,
    marginTop: 100,
    marginBottom: 30,
  },

  // --- 2. Tarjetas Guardadas ---
  cardsSection: {
    backgroundColor: "#fff", // Fondo sutil para la sección de tarjetas
    padding: 20,
    borderRadius: 12,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderColor: "#023554",
    borderWidth: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#888",
    marginBottom: 15,
  },
  cardOption: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
  },
  cardSelectedStyle: {
    borderColor: SECONDARY_CYAN,
    backgroundColor: "#e6f7ff", // Fondo más claro para la seleccionada
  },
  cardInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  cardTypeBadge: {
    width: 50,
    height: 30,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  cardTypeText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 10,
  },
  cardNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: PRIMARY_BLUE,
    flex: 1,
  },

  // --- Botón Agregar Tarjeta ---
  addCardButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: SECONDARY_CYAN,
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 2,
    borderColor: PRIMARY_BLUE,
  },
  addCardButtonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "600",
    color: PRIMARY_BLUE,
  },

  // --- 3. Botón Principal de Acción ---
  actionButton: {
    backgroundColor: SECONDARY_CYAN,
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: PRIMARY_BLUE,
    marginTop: 10,
  },
  actionButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: PRIMARY_BLUE,
  },

  // --- 4. Barra de Navegación Inferior (Simulada) ---
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingBottom: 5,
  },
  navItem: {
    padding: 10,
  },

  // BOTÓN ATRÁS
  backButton: {
    position: "absolute",
    top: 30, // justo debajo del notch/status bar
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
});
