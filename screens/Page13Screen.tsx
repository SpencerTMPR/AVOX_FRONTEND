import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Reserva } from "../app/navigation/types";
import API from "../constants/api";
import { UserContext } from "../context/UserContext";

// Colores de tu tema
const PRIMARY_BLUE = "#023554";
const SECONDARY_CYAN = "#8AD2EA";

export default function Page13Screen() {
  const router = useRouter();
  const { usuario } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("Pendientes");
  const [reservations, setReservations] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar reservas desde el backend
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await API.get(
          `/api/reservas/usuario/${usuario?.usuarioID}`
        ); // <-- ID del usuario logueado
        setReservations(response.data);
      } catch (error) {
        console.error("Error al obtener reservas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  // Separar reservas por estado
  const tabs = [
    {
      key: "Pendientes",
      title: "Pendientes",
      content: reservations.filter((r) => r.estado === "Pendiente"),
    },
    {
      key: "En Proceso",
      title: "En Proceso",
      content: reservations.filter((r) => r.estado === "En Proceso"),
    },
    {
      key: "Completadas",
      title: "Completadas",
      content: reservations.filter((r) => r.estado === "Completada"),
    },
    {
      key: "Canceladas",
      title: "Canceladas",
      content: reservations.filter((r) => r.estado === "Cancelada"),
    },
  ];

  // Tarjeta de reserva
  const ReservationCard = ({ reservation }: { reservation: Reserva }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.carIconContainer}>
          <FontAwesome5 name="car" size={24} color={PRIMARY_BLUE} />
        </View>
        <Text style={styles.cardTitle}>{reservation.servicioNombre}</Text>
      </View>

      <Text style={styles.cardDetailText}>
        {reservation.fechaReserva} {reservation.horaReserva}
      </Text>
      <Text style={styles.cardDetailText}>
        {reservation.servicioNombre} - L.{reservation.montoTotal}
      </Text>

      <View style={styles.locationContainer}>
        <Feather name="map-pin" size={14} color={PRIMARY_BLUE} />
        <Text style={styles.locationText}>
          {reservation.autolavadoNombre} - {reservation.autolavadoCiudad}
        </Text>
      </View>
    </View>
  );

  // Renderizar contenido según pestaña activa
  const renderContent = () => {
    const currentData =
      tabs.find((tab) => tab.key === activeTab)?.content || [];

    if (loading) {
      return <Text style={styles.emptyText}>Cargando reservas...</Text>;
    }

    if (currentData.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Feather name="folder" size={60} color="#ddd" />
          <Text style={styles.emptyText}>
            No hay reservas en esta categoría.
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.cardList}>
        {currentData.map((res) => (
          <ReservationCard key={res.reservaID} reservation={res} />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerContainer}>
        <Image
          source={require("../assets/images/logo.jpeg")}
          style={styles.logoImage}
        />
        <Text style={styles.mainTitle}>Mis Reservas</Text>
      </View>

      {/* Navegación por pestañas */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabButton}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.activeTabText,
              ]}
            >
              {tab.title}
            </Text>
            {activeTab === tab.key && (
              <View style={styles.activeTabIndicator} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Contenido */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderContent()}
      </ScrollView>

      {/* Barra de navegación inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.push("/page6")}>
          <Ionicons name="home-outline" size={28} color="#023554" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/page13")}>
          <Ionicons name="calendar" size={28} color="#023554" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/page14")}>
          <Ionicons name="person-outline" size={28} color="#000" />
        </TouchableOpacity>
      </View>
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
  headerContainer: {
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  logoImage: {
    width: 250,
    height: 250,
    marginBottom: -50,
    resizeMode: "contain",
  },
  mainTitle: {
    fontSize: 38,
    fontWeight: "400",
    color: PRIMARY_BLUE,
    marginBottom: 10,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    position: "relative",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
    color: PRIMARY_BLUE,
    opacity: 0.6,
  },
  activeTabText: {
    opacity: 10,
    fontWeight: "700",
    color: SECONDARY_CYAN,
  },
  activeTabIndicator: {
    position: "absolute",
    bottom: -1,
    height: 3,
    width: "80%",
    backgroundColor: SECONDARY_CYAN,
    borderRadius: 2,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 100,
  },
  cardList: {
    gap: 15,
  },
  card: {
    backgroundColor: "#0000000b",
    padding: 15,
    borderRadius: 12,
    shadowColor: PRIMARY_BLUE,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 2,
    borderColor: PRIMARY_BLUE,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  carIconContainer: {
    backgroundColor: SECONDARY_CYAN,
    padding: 8,
    borderRadius: 8,
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: PRIMARY_BLUE,
  },
  cardDetailText: {
    fontSize: 14,
    color: PRIMARY_BLUE,
    marginBottom: 3,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  locationText: {
    fontSize: 14,
    color: PRIMARY_BLUE,
    marginLeft: 5,
    fontWeight: "300",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
    marginTop: 50,
  },
  emptyText: {
    marginTop: 15,
    fontSize: 16,
    color: "#888",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingBottom: 10,
  },
  navItem: {
    padding: 10,
  },
});
