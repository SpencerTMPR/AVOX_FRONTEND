import { Feather, Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { RootStackParamList } from "../app/navigation/types";
import API from "../constants/api";

const { width } = Dimensions.get("window");

// 🔹 Tipos de navegación y ruta
type Page7RouteProp = RouteProp<RootStackParamList, "page7">;
type Page7NavProp = StackNavigationProp<RootStackParamList, "page7">;

type Servicio = {
  servicioID: number;
  nombre: string;
  descripcion: string;
  precio: number;
};

export default function Page7Screen() {
  const navigation = useNavigation<Page7NavProp>();
  const route = useRoute<Page7RouteProp>();
  const { autolavadoID } = route.params;

  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarServicios = async () => {
      if (!autolavadoID) {
        console.error("No se recibió autolavadoID");
        return;
      }
      try {
        const response = await API.get(
          `/api/servicios/autolavado/${autolavadoID}`
        );
        setServicios(response.data);
      } catch (error) {
        console.error("Error al cargar servicios:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarServicios();
  }, [autolavadoID]);

  const handleOptionSelect = (id: number) => {
    setSelectedOption(id);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=1000&auto=format&fit=crop",
        }}
        style={styles.headerImage}
      >
        <SafeAreaView style={styles.headerSafeArea}>
          {/* BOTÓN ATRÁS */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("page6")}
          >
            <Feather name="arrow-left" size={28} color="#023554" />
          </TouchableOpacity>
        </SafeAreaView>

        <View style={styles.paginationContainer}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </ImageBackground>

      <View style={styles.contentContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Servicios disponibles</Text>

          {loading ? (
            <ActivityIndicator size="large" color="#023554" />
          ) : servicios.length === 0 ? (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              No hay servicios disponibles para este autolavado
            </Text>
          ) : (
            <View style={styles.optionsGrid}>
              {servicios.map((item) => {
                const isSelected = selectedOption === item.servicioID;
                return (
                  <TouchableOpacity
                    key={item.servicioID}
                    style={[
                      styles.optionCard,
                      isSelected && styles.optionCardSelected,
                    ]}
                    onPress={() => handleOptionSelect(item.servicioID)}
                    activeOpacity={0.2}
                  >
                    <View style={styles.cardHeader}>
                      <Ionicons
                        name={
                          isSelected ? "radio-button-on" : "radio-button-off"
                        }
                        size={24}
                        color="#023554"
                      />
                      <Ionicons
                        name="help-circle-outline"
                        size={22}
                        color="#8AD2EA"
                      />
                    </View>

                    <Text style={styles.cardTitle}>{item.nombre}</Text>
                    <Text style={styles.cardDesc}>{item.descripcion}</Text>
                    <Text style={styles.cardPrice}>L.{item.precio}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          <View style={{ height: 80 }} />
        </ScrollView>

        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() =>
              selectedOption &&
              navigation.navigate("page8", {
                autolavadoID,
                servicioID: selectedOption,
              })
            }
            disabled={!selectedOption}
          >
            <Text style={styles.nextButtonText}>Siguiente</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerImage: { width: "100%", height: 300, justifyContent: "space-between" },
  headerSafeArea: { marginLeft: 15, marginTop: 10 },
  backButton: {
    position: "absolute",
    top: 20,
    left: 10,
    zIndex: 10,
    backgroundColor: "#fff",
    padding: 4,
    borderRadius: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderColor: "#023554",
    borderWidth: 2,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  activeDot: {
    backgroundColor: "#fff",
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: -1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
  },
  scrollContent: { paddingHorizontal: 25, paddingTop: 30 },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#023554",
    marginBottom: 5,
    textAlign: "center",
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 15,
  },
  optionCard: {
    width: "47%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1.5,
    borderColor: "#023554",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
    minHeight: 160,
    justifyContent: "space-between",
  },
  optionCardSelected: { borderWidth: 3 },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#023554",
    marginBottom: 5,
  },
  cardDesc: {
    fontSize: 12,
    color: "#023554",
    marginBottom: 10,
    lineHeight: 16,
  },
  cardPrice: { fontSize: 18, fontWeight: "800", color: "#023554" },
  footerContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  nextButton: {
    width: width * 0.5,
    backgroundColor: "#8AD2EA",
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#023554",
    alignItems: "center",
    shadowColor: "",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
  },
  nextButtonText: { fontSize: 16, fontWeight: "600", color: "#023554" },
});
