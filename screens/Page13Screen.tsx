import { Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image, // Componente Image importado para el logo
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

// Colores de tu tema
const PRIMARY_BLUE = '#023554'; // Azul oscuro
const SECONDARY_CYAN = '#8AD2EA'; // Celeste claro

// Define la pantalla activa simulada.
// Para esta pantalla 'Mis Reservas', asumimos que está asociada al calendario/citas.
const ACTIVE_SCREEN = 'calendar'; 

// Datos de reserva simulados para la pestaña "Pendientes"
const PENDING_RESERVATIONS = [
    {
        id: '1',
        serviceName: 'Carwash flores',
        date: '16 Oct 2025, 10:30 AM',
        description: 'Lavado Detallado - L.300',
        location: 'Carr. Continua al Instituto San Francisco a la Cruz Roja',
    },
    {
        id: '2',
        serviceName: 'Carwash Centroamérica',
        date: '17 Oct 2025, 1:00 PM',
        description: 'Lavado Premiun - L.200',
        location: 'Col. Centroamérica oeste',
    },
];

// Componente para la Tarjeta de Reserva individual
const ReservationCard = ({ reservation }) => (
    <View style={styles.card}>
        <View style={styles.cardHeader}>
            {/* Icono de Carro (simulando un icono de servicio de lavado) */}
            <View style={styles.carIconContainer}>
                <FontAwesome5 name="car" size={24} color={PRIMARY_BLUE} />
            </View>
            <Text style={styles.cardTitle}>{reservation.serviceName}</Text>
        </View>

        <Text style={styles.cardDetailText}>{reservation.date}</Text>
        <Text style={styles.cardDetailText}>{reservation.description}</Text>

        <View style={styles.locationContainer}>
            <Feather name="map-pin" size={14} color={PRIMARY_BLUE} />
            <Text style={styles.locationText}>{reservation.location}</Text>
        </View>
    </View>
);

// Componente principal de la pantalla
export default function Page13Screen() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('Pendientes');

    // Mapeo de pestañas y contenido
    const tabs = [
        { key: 'Pendientes', title: 'Pendientes', content: PENDING_RESERVATIONS },
        { key: 'En Proceso', title: 'En Proceso', content: [] }, // Datos vacíos simulados
        { key: 'Completadas', title: 'Completadas', content: [] }, // Datos vacíos simulados
    ];

    // Función que renderiza la lista de reservas según la pestaña activa
    const renderContent = () => {
        const currentData = tabs.find(tab => tab.key === activeTab).content;

        if (currentData.length === 0) {
            return (
                <View style={styles.emptyContainer}>
                    <Feather name="folder" size={60} color="#ddd" />
                    <Text style={styles.emptyText}>No hay reservas en esta categoría.</Text>
                </View>
            );
        }

        return (
            <View style={styles.cardList}>
                {currentData.map(res => (
                    <ReservationCard key={res.id} reservation={res} />
                ))}
            </View>
        );
    };
    
    // Función para manejar la navegación (simulando la barra inferior)
    const handleNavigation = (screen) => {
        // Lógica de navegación simulada
        console.log(`Navegar a: ${screen}`);
    };

    // --- Componente de Ícono de Navegación ---
    const NavIcon = ({ name, activeName, screen }) => {
        const isActive = ACTIVE_SCREEN === screen;
        const iconName = isActive ? activeName : name;
        const color = isActive ? PRIMARY_BLUE : '#000'; // Azul primario para activo

        return (
            <TouchableOpacity onPress={() => handleNavigation(screen)} style={styles.navItem}>
                <Ionicons name={iconName} size={28} color={color} />
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />

            {/* 1. Área superior: Logo y Título */}
            <View style={styles.headerContainer}>
                
                {/* Espacio para el Logo */}
                <View style={styles.logoPlaceholder}>
                    {/* Componente Image con la ruta local y estilo definido */}
                    <Image 
                        source={require('../assets/images/logo.jpeg')} 
                        style={styles.logoImage} // Se requiere un estilo definido para el tamaño
                    />
                </View>
                {/* Fin Espacio para el Logo */}
                
                <Text style={styles.mainTitle}>Mis Reservas</Text>
            </View>

            {/* 2. Navegación por Pestañas */}
            <View style={styles.tabContainer}>
                {tabs.map(tab => (
                    <TouchableOpacity
                        key={tab.key}
                        style={styles.tabButton}
                        onPress={() => setActiveTab(tab.key)}
                    >
                        <Text style={[
                            styles.tabText,
                            activeTab === tab.key && styles.activeTabText,
                        ]}>
                            {tab.title}
                        </Text>
                        {/* Indicador inferior azul */}
                        {activeTab === tab.key && <View style={styles.activeTabIndicator} />}
                    </TouchableOpacity>
                ))}
            </View>

            {/* 3. Contenido de las Reservas */}
            <ScrollView 
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {renderContent()}
            </ScrollView>

            {/* Barra de Navegación Inferior (Footer) */}
            <View style={styles.bottomNav}>
                {/* Home */}
                <TouchableOpacity onPress={() => router.push('/page6')}>
                            <Ionicons name="home-outline" size={28} color="#023554" />
                          </TouchableOpacity>
                          
                          <TouchableOpacity onPress={() => router.push('/page13')}>
                            <Ionicons name="calendar" size={28} color= '#023554'  />
                          </TouchableOpacity>
                          
                          <TouchableOpacity onPress={() => router.push('/page14')}>
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
        backgroundColor: '#fff',
    },
    headerContainer: {
        alignItems: 'center',
        paddingTop: 20, // Ajuste para el espacio superior
        paddingHorizontal: 20,
    },
    // Estilos del Logo
    logoPlaceholder: {
        // Estilos para centrar la imagen dentro del contenedor
        marginBottom: 10,
        alignItems: 'center',
    },
    logoImage: {
        // ¡IMPORTANTE! Define el tamaño de tu logo aquí
        width: 250,
    height: 250,
    marginBottom: -50,
        resizeMode: 'contain', // Asegura que la imagen se ajuste sin cortarse
    },
    logoTextAvox: {
        fontSize: 20,
        fontWeight: 'bold',
        color: PRIMARY_BLUE,
        letterSpacing: 3,
        textAlign: 'center',
        marginTop: 5, 
    },
    mainTitle: {
        fontSize: 38,
        fontWeight: '400',
        color: PRIMARY_BLUE,
        marginBottom: 10,
    },
    // Estilos de las Pestañas
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        position: 'relative',
    },
    tabText: {
        fontSize: 16,
        fontWeight: '500',
        color: PRIMARY_BLUE,
        opacity:0.6,
         // Pestaña inactiva
    },
    activeTabText: {
        opacity: 10,
        fontWeight: '700',
        color: SECONDARY_CYAN,
    },
    activeTabIndicator: {
        position: 'absolute',
        bottom: -1,
        height: 3,
        width: '80%',
        backgroundColor: SECONDARY_CYAN,
        borderRadius: 2,
    },
    // Estilos del Contenido y Tarjetas
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 100, // Espacio para la barra de navegación inferior
    },
    cardList: {
        gap: 15,
    },
    card: {
        backgroundColor: '#0000000b',
        padding: 15,
        borderRadius: 12,
        shadowColor: PRIMARY_BLUE,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        borderWidth: 2,
        borderColor:PRIMARY_BLUE,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
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
        fontWeight: '700',
        color: PRIMARY_BLUE,
    },
    cardDetailText: {
        fontSize: 14,
        color: PRIMARY_BLUE,
        marginBottom: 3,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    locationText: {
        fontSize: 14,
        color: PRIMARY_BLUE,
        marginLeft: 5,
        fontWeight: '300',
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 50,
        marginTop: 50,
    },
    emptyText: {
        marginTop: 15,
        fontSize: 16,
        color: '#888',
    },
    // Estilos de la Barra de Navegación Inferior
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