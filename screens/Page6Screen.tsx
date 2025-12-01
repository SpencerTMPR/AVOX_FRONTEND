import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// Datos de ejemplo para simular los carwash de la imagen
const CARWASH_DATA = [
  {
    id: '1',
    name: 'Eco Wash',
    location: 'Las Lomas',
    // Usamos placeholder images. Reemplaza uri con require('../../assets/...')
    image: require('../assets/images/logo.jpeg'),
  },
  {
    id: '2',
    name: 'WashCar',
    location: 'Las Lomas',
    image: require('../assets/images/logo.jpeg'),
  },
  {
    id: '3',
    name: 'Carwash Camilo',
    location: 'Las Lomas',
    image: require('../assets/images/logo.jpeg'),
  },
  {
    id: '4',
    name: 'CarWash & Spa',
    location: 'Las Lomas',
    image: require('../assets/images/logo.jpeg'),
  },
];

export default function Page6Screen() {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  // Componente para renderizar cada tarjeta (Card)
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate('page7' as never)}
    >
      <View style={styles.cardImageContainer}>
        <Image
          source={item.image}
          style={styles.cardImage}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.cardLocation}>{item.location}</Text>
      <Text style={styles.cardTitle}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.container}>
        {/* Header: Barra de Búsqueda */}
        <View style={styles.headerContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={20} color="#B0B0B0" style={styles.searchIcon} />
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
              <Text style={styles.tagText}>Locacion</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tagButton}>
              <Text style={styles.tagText}>Reseñas</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Lista de Carwash (Grid) */}
        <FlatList
          data={CARWASH_DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2} // Para hacer las 2 columnas
          columnWrapperStyle={styles.row} // Estilo para separar columnas
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        {/* Barra de Navegación Inferior (Footer) */}
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.navigate('page6' as never)}>
            <Ionicons name="home" size={28} color="#023554" />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigation.navigate('page13' as never)}>
            <Ionicons name="calendar-outline" size={28} color="#000" />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigation.navigate('page14' as never)}>
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
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  // --- Header y Buscador ---
  headerContainer: {
    marginTop: 40,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5f5f5', // Un gris muy suave para el fondo del input
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    // Si prefieres borde como en el login, descomenta abajo:
    // borderWidth: 1,
    // borderColor: '#8AD2EA', 
  },
  searchIcon: {
    marginRight: 10,
    fontSize:25,
    color:'#828282',

  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: '#023554',
  },

  // --- Filtros ---
  filterSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    flexWrap: 'wrap', // Por si el texto es muy largo
  },
  sectionTitle: {
    fontSize: 18, // Ligeramente más pequeño que el login title para encajar
    fontWeight: '700',
    color: '#023554', // Color principal del login
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  tagButton: {
    backgroundColor: '#8AD2EA', // Color secundario del login
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderColor:'#023554',
    borderWidth:2,
  },
  tagText: {
    color: '#023554', // Texto oscuro sobre fondo claro
    fontSize: 17,
    fontWeight: '700',
    marginTop:-2,
  },

  // --- Grid / Cards ---
  listContent: {
    paddingBottom: 80, // Espacio para que el nav no tape el contenido
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cardContainer: {
    width: '47%', // Casi la mitad para dejar espacio en medio
  },
  cardImageContainer: {
    width: '100%',
    aspectRatio: 1, // Hace que sea cuadrado
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#D0D0D0', // Gris suave del login
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    overflow: 'hidden',
    // Sombra suave opcional
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardImage: {
    width: '80%',
    height: '80%',
  },
  cardLocation: {
    fontSize: 12,
    color: '#888', // Gris footer del login
    marginBottom: 2,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#023554',
  },

  // --- Bottom Navigation ---
  // ... resto de los estilos

  bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 70,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        paddingBottom: 10, // Para iOS SafeArea inferior
    },
    navItem: {
        padding: 10,
    },
  
});