// app/reservas-activas.tsx  (o el nombre que uses)

import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const PRIMARY_BLUE = '#023554';
const SECONDARY_CYAN = '#8AD2EA';

// Datos fijos de reservas activas
const RESERVATIONS = [
    {
        id: '1',
        serviceName: 'Camilo Cervantes',
        date: '16 Oct 2025, 10:30 AM',
        description: 'Lavado Detallado - L.300',
        location: 'Carr. Continua al Instituto San Francisco a la Cruz Roja',
    },
    {
        id: '2',
        serviceName: 'Jhon Jairo',
        date: '17 Oct 2025, 1:00 PM',
        description: 'Lavado Premium - L.200',
        location: 'Col. Centroamérica oeste',
    },
];

const ReservationCard = ({ reservation }) => (
    <View style={styles.card}>
        <View style={styles.cardHeader}>
            <View style={styles.carIconContainer}>
                <FontAwesome5 name="car" size={24} color={PRIMARY_BLUE} />
            </View>
            <Text style={styles.cardTitle}>{reservation.serviceName}</Text>
        </View>

        <Text style={styles.cardDetailText}>{reservation.date}</Text>
        <Text style={styles.cardDetailText}>{reservation.description}</Text>
    </View>
);

export default function HistorialReservas() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />

            {/* Botón Atrás Flotante */}
            <TouchableOpacity 
                style={styles.backButtonFloating} 
                onPress={() => router.push('/page16')}
            >
                <Feather name="arrow-left" size={28} color={PRIMARY_BLUE} />
            </TouchableOpacity>

            {/* Header con Logo y Título */}
            <View style={styles.headerContainer}>
                <View style={styles.logoPlaceholder}>
                    <Image 
                        source={require('../../assets/images/logo.jpeg')} 
                        style={styles.logoImage} 
                    />
                </View>
                <Text style={styles.mainTitle}>Historial reservas</Text>
            </View>

            {/* Botón Filtrar Fecha */}
            <View style={styles.filterButtonContainer}>
                <TouchableOpacity style={styles.filterButton}>
                    <Text style={styles.filterButtonText}>Filtrar Fecha</Text>
                </TouchableOpacity>
            </View>

            {/* Lista de Reservas */}
            <ScrollView 
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.cardList}>
                    {RESERVATIONS.map(res => (
                        <ReservationCard key={res.id} reservation={res} />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backButtonFloating: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
        backgroundColor: '#fff',
        padding: 4,
        borderRadius: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderColor: PRIMARY_BLUE,
        borderWidth: 2,
    },
    headerContainer: {
        alignItems: 'center',
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    logoPlaceholder: {
        marginBottom: 10,
        alignItems: 'center',
    },
    logoImage: {
        width: 250,
        height: 250,
        marginBottom: -50,
        resizeMode: 'contain',
    },
    mainTitle: {
        fontSize: 38,
        fontWeight: '400',
        color: PRIMARY_BLUE,
        marginBottom: 20,
    },
    // NUEVO: Contenedor del botón Filtrar Fecha
    filterButtonContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    filterButton: {
        backgroundColor: SECONDARY_CYAN,
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 12,
        alignSelf: 'flex-start',
        borderWidth: 2,
        borderColor: PRIMARY_BLUE,
    },
    filterButtonText: {
        color: PRIMARY_BLUE,
        fontSize: 16,
        fontWeight: '600',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    cardList: {
        gap: 18,
    },
    card: {
        backgroundColor: '#0000000b',
        padding: 15,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: PRIMARY_BLUE,
        shadowColor: PRIMARY_BLUE,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 6,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    carIconContainer: {
        backgroundColor: SECONDARY_CYAN,
        padding: 10,
        borderRadius: 10,
        marginRight: 12,
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
        fontWeight:'200',
    },
});