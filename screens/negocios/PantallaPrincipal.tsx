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

// Colores del tema (Reutilizados)
const PRIMARY_BLUE = '#023554'; 
const SECONDARY_CYAN = '#8AD2EA'; 

export default function PantallaPrincipal() {
    const router = useRouter();

    // Función de navegación del footer
    const handleNavigation = (route) => {
        router.push(route);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />

            <ScrollView 
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* 1. Logo Superior */}
                <View style={styles.logoPlaceholder}>
                    <Image 
                        source={require('../../assets/images/logo.jpeg')} 
                        style={styles.logoImage} 
                    />
                </View>

                {/* 2. Título de Bienvenida */}
                <View style={styles.welcomeContainer}>
                    <Text style={styles.welcomeText}>Bienvenido,</Text>
                    <Text style={styles.brandText}>EcoWash</Text>
                </View>

                {/* 3. Subtítulo con línea decorativa */}
                <View style={styles.subtitleContainer}>
                    <Text style={styles.subtitleText}>Gestiona tu CarWash desde aqui</Text>
                    <View style={styles.subtitleUnderline} />
                </View>

                {/* 4. Imagen Central (Ahora es clicable) */}
                <TouchableOpacity 
                    onPress={() => router.push('/page17')} 
                    style={styles.imageContainer}
                >
                    <Image
                        source={require('../../assets/images/negocio.png')}
                        style={styles.centerImage}
                    />
                </TouchableOpacity>

                {/* 5. Título de Servicios (Ahora es clicable) */}
                <TouchableOpacity 
                    onPress={() => router.push('/page17')} 
                    // No se necesita estilo extra si styles.sectionTitle ya tiene el margen inferior
                >
                    <Text style={styles.sectionTitle}>Servicios disponibles</Text>
                </TouchableOpacity>
                

                {/* 6. Botones de Acción */}
                <View style={styles.actionButtonsContainer}>
                    <TouchableOpacity 
                        style={styles.actionButton}
                        onPress={() => router.push('/page20')} // Navegar a reservas
                    >
                        <Text style={styles.actionButtonText}>Reservas activas</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.actionButton}
                        onPress={() => router.push('/page21')}
                    >
                        <Text style={styles.actionButtonText}>Historial reservas</Text>
                    </TouchableOpacity>
                </View>

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
        backgroundColor: '#fff',
    },
    scrollContent: {
        alignItems: 'center', // Centra todo el contenido horizontalmente
        paddingTop: 20,
        paddingBottom: 100, // Espacio para la navbar
    },
    // --- Logo ---
    logoPlaceholder: {
        alignItems: 'center',
        marginBottom: 10,
    },
    logoImage: {
        width: 250, // Ligeramente más pequeño que en la pantalla de reservas para balancear
        height: 250,
        resizeMode: 'contain',
        marginBottom: -50, // Ajuste visual si el logo tiene mucho espacio blanco
    },
    // --- Textos de Bienvenida ---
    welcomeContainer: {
        width: '100%',
        paddingHorizontal: 30,
        alignItems: 'flex-start', // Alineado a la izquierda como la imagen
        marginBottom: 10,
    },
    welcomeText: {
        fontSize: 32,
        color: PRIMARY_BLUE,
        fontWeight: '400',
    },
    brandText: {
        fontSize: 36,
        color: PRIMARY_BLUE,
        fontWeight: '600',
        marginTop: -5,
    },
    // --- Subtítulo ---
    subtitleContainer: {
        width: '100%',
        paddingHorizontal: 30,
        marginBottom: 30,
    },
    subtitleText: {
        fontSize: 18,
        color: SECONDARY_CYAN,
        fontWeight: '600',
    },
    subtitleUnderline: {
        height: 3,
        width: 270, // Ancho fijo para cubrir el texto
        backgroundColor: SECONDARY_CYAN,
        marginTop: 5,
        borderRadius: 2,
    },
    // --- Imagen Central ---
    imageContainer: {
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    centerImage: {
        width: 200, 
        height: 250, 
        borderRadius: 10,
        resizeMode: 'cover',
    },
    // --- Sección Inferior ---
    sectionTitle: {
        fontSize: 28,
        color: PRIMARY_BLUE,
        fontWeight: '400',
        marginTop: -10,
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 15, // Espacio entre botones
        width: '100%',
        paddingHorizontal: 20,
        marginTop:25,
    },
    actionButton: {
        backgroundColor: PRIMARY_BLUE,
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 12,
        width: '43%', // Para que quepan dos lado a lado
        alignItems: 'center',
    },
    actionButtonText: {
        color: SECONDARY_CYAN,
        fontSize: 18,
        fontWeight: '400',
    },
});