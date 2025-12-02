import { Feather, Ionicons } from '@expo/vector-icons';
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

// --- COLORES DEL TEMA ---
const PRIMARY_BLUE = '#023554';
const SECONDARY_CYAN = '#8AD2EA';

// --- DATOS DE EJEMPLO ---
const SERVICE_OPTIONS = [
    { id: 1, title: 'Básico', description: 'Lavado exterior del vehículo.', price: 'L.300' },
    { id: 2, title: 'Premium', description: 'Lavado del interior y exterior del vehículo.', price: 'L.200' },
    { id: 3, title: 'Detallado', description: 'Lavado premium con extra de lavado de motor.', price: 'L.350' },
    { id: 4, title: 'Encerado', description: 'Incluye el lavado detallado + aplicación de cera líquida.', price: 'L.450' },
];

export default function PantallaServicios() {
    const router = useRouter();
    
/*
    const handleInfoPress = (itemName) => {
        console.log(`Información solicitada para: ${itemName}`);
    };
*/

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />

            {/* BOTÓN ATRÁS FLOTANTE (Nuevo estilo) */}
            <TouchableOpacity 
                style={styles.backButtonFloating} 
                onPress={() => router.push('/page16')}
            >
                <Feather name="arrow-left" size={28} color={PRIMARY_BLUE} />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                
                {/* 1. ENCABEZADO: Solo Logo (El botón de atrás es ahora flotante) */}
                <View style={styles.headerRow}>
                    {/* Espaciador para empujar el logo, ya que el botón es absoluto */}
                    <View style={{ width: 32 }} /> 
                    
                    <View style={styles.logoContainer}>
                        <Image 
                            source={require('../../assets/images/logo.jpeg')} 
                            style={styles.headerLogo}
                        />
                    </View>
                    
                    {/* View vacía para equilibrar */}
                    <View style={{ width: 32 }} /> 
                </View>

                {/* 2. BARRA DE ACCIÓN: Título y Botón Agregar */}
                <View style={styles.actionBar}>
                    <View>
                        <Text style={styles.sectionTitle}>Servicios disponibles</Text>
                        <View style={styles.titleUnderline} />
                    </View>

                    <TouchableOpacity style={styles.addButton} onPress={() => router.push('/page18')}>
                        <Text style={styles.addButtonText}>Agregar servicio</Text>
                    </TouchableOpacity>
                </View>

                {/* 3. GRILLA DE TARJETAS (Sin cambios) */}
                <View style={styles.optionsGrid}>
                    {SERVICE_OPTIONS.map((item) => (
                        <View key={item.id} style={styles.serviceCard}>
                            
                            <View style={styles.cardIconRow}>
                                <TouchableOpacity onPress={() => router.push('/page19')}>
                                    <Ionicons name="help-circle-outline" size={26} color={SECONDARY_CYAN} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>{item.title}</Text>
                                <Text style={styles.cardDesc}>{item.description}</Text>
                                <Text style={styles.cardPrice}>{item.price}</Text>
                            </View>
                        </View>
                    ))}
                </View>
                {/* Padding para el Bottom Nav */}
                <View style={{ height: 80 }} /> 
            </ScrollView>
        </SafeAreaView>
    );
}

// =========================================================
//                  ESTILOS (Añadido el nuevo backButtonFloating)
// =========================================================

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 40,
    },
    // --- NUEVO ESTILO: Botón Flotante/Absoluto (Consistente con las pantallas de formulario) ---
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
    // --- Header --- (Modificado para remover el viejo backButton)
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    // Eliminamos el viejo `backButton` que era simple `padding: 5`
    logoContainer: {
        alignItems: 'center',
    },
    headerLogo: {
        width: 250,
        height: 250, 
        resizeMode: 'contain',
        marginBottom: -50,
    },
    // --- Barra de Acción (Sin cambios) ---
    actionBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: SECONDARY_CYAN,
    },
    titleUnderline: {
        height: 3,
        width: '100%',
        backgroundColor: SECONDARY_CYAN,
        marginTop: 4,
        borderRadius: 2,
    },
    addButton: {
        backgroundColor: SECONDARY_CYAN,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: PRIMARY_BLUE,
    },
    addButtonText: {
        color: PRIMARY_BLUE,
        fontWeight: '400',
        fontSize: 16,
    },
    // --- Grilla de Tarjetas (Sin cambios) ---
    optionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 15,
    },
    serviceCard: {
        width: '47%', 
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        borderWidth: 2,
        borderColor: PRIMARY_BLUE,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        minHeight: 160,
    },
    cardIconRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 5,
    },
    cardContent: {
        flex: 1,
        justifyContent: 'space-between',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: PRIMARY_BLUE,
        marginBottom: 0,
        marginTop:-15,
    },
    cardDesc: {
        fontSize: 13,
        color: PRIMARY_BLUE,
        marginBottom: 30,
        lineHeight: 18,
    },
    cardPrice: {
        fontSize: 18,
        fontWeight: '800',
        color: PRIMARY_BLUE,
        marginTop:-12,
    },
});