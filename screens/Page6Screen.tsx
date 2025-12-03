import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "../app/navigation/types";
import API from "../constants/api";
import { UserContext } from "../context/UserContext";

// 🔹 Tipo para cada autolavado (según tu backend)
type Carwash = {
  autolavadoID: number;
  nombre: string;
  direccion: string;
  ciudad: string;
  latitud: number;
  longitud: number;
};

type Page6NavProp = StackNavigationProp<RootStackParamList, "page6">;

export default function Page6Screen() {
  const navigation = useNavigation<Page6NavProp>();
  const [search, setSearch] = useState("");
  const [carwashes, setCarwashes] = useState<Carwash[]>([]);
  const [loading, setLoading] = useState(true);

  const { usuario } = useContext(UserContext);

  useEffect(() => {
    console.log("Usuario desde contexto:", usuario);

    const cargarAutolavados = async () => {
      try {
        const response = await API.get("/api/autolavados/disponibles");
        setCarwashes(response.data);
      } catch (error) {
        console.error("Error al cargar autolavados:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarAutolavados();
  }, [usuario]);

  const saludo = usuario
    ? `Bienvenido ${usuario.nombre}`
    : "Bienvenido invitado";

  // Componente para renderizar cada tarjeta (Card)
  const renderItem = ({ item }: { item: Carwash }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() =>
        navigation.navigate("page7", {
          autolavadoID: item.autolavadoID,
        })
      }
    >
      <View style={styles.cardImageContainer}>
        <Image
          source={require("../assets/images/logo.jpeg")} // placeholder por ahora
          style={styles.cardImage}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.cardLocation}>{item.ciudad}</Text>
      <Text style={styles.cardTitle}>{item.nombre}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.container}>
        {/* Header: Barra de Búsqueda */}
        <View style={styles.headerContainer}>
          <Text style={styles.sectionTitle}>{saludo}</Text>
          <View style={styles.searchBar}>
            <Ionicons
              name="search-outline"
              size={20}
              color="#B0B0B0"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar"
              placeholderTextColor="#828282"
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>

        {/* Sección de Filtros y Título */}
        <View style={styles.filterSection}>
          <Text style={styles.sectionTitle}>Locales disponibles</Text>
          <View style={styles.tagsContainer}>
            <TouchableOpacity style={styles.tagButton}>
              <Text style={styles.tagText}>Locación</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tagButton}>
              <Text style={styles.tagText}>Reseñas</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Lista de Carwash (Grid) */}
        {loading ? (
          <ActivityIndicator size="large" color="#023554" />
        ) : carwashes.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No hay autolavados disponibles
          </Text>
        ) : (
          <FlatList
            data={carwashes.filter((c) =>
              c.nombre.toLowerCase().includes(search.toLowerCase())
            )}
            renderItem={renderItem}
            keyExtractor={(item) => item.autolavadoID.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* Barra de Navegación Inferior (Footer) */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            onPress={() => navigation.navigate("page6" as never)}
          >
            <Ionicons name="home" size={28} color="#023554" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("page13" as never)}
          >
            <Ionicons name="calendar-outline" size={28} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("page14" as never)}
          >
            <Ionicons name="person-outline" size={28} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  headerContainer: {
    marginTop: 40,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5f5f5",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 10,
    fontSize: 25,
    color: "#828282",
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: "#023554",
  },
  filterSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    flexWrap: "wrap",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#023554",
  },
  tagsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  tagButton: {
    backgroundColor: "#8AD2EA",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderColor: "#023554",
    borderWidth: 2,
  },
  tagText: {
    color: "#023554",
    fontSize: 17,
    fontWeight: "700",
    marginTop: -2,
  },
  listContent: {
    paddingBottom: 80,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 20,
  },
  cardContainer: {
    width: "47%",
  },
  cardImageContainer: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardImage: {
    width: "80%",
    height: "80%",
  },
  cardLocation: {
    fontSize: 12,
    color: "#888",
    marginBottom: 2,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#023554",
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
});
