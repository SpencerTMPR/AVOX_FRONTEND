import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// Colores de tu tema
const PRIMARY_BLUE = '#023554'; // Azul oscuro
const SECONDARY_CYAN = '#8AD2EA'; // Celeste claro

// Datos de la reserva simulados (para la demostración)
const RESERVA_DATA = {
    paymentMethod: 'Visa *1234',
    serviceDescription: 'Lavado Basico',
    servicePrice: 'L.300',
    subtotal: 'L.290',
    taxes: 'L.10',
    total: 'L.300',
};

export default function Page11Screen() {
    const router = useRouter();
    
    // Función de ejemplo para manejar la acción de confirmar
    const handleConfirmReservation = () => {
        // Aquí iría la lógica para enviar la reserva a la API
        console.log('Reserva realizada:', RESERVA_DATA);
        // Puedes navegar a una pantalla de éxito, por ejemplo:
        // router.push('/confirmation'); 
    };

    // Función de ejemplo para cambiar el método de pago (navegar a page9 o page11)
    const handlePaymentChange = () => {
        // En una app real, esto navegaría a la lista de métodos de pago.
        // Asumiendo que page9 es la lista de métodos de pago
        router.push('/page9'); 
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />
            
            {/* 1. Flecha de Retroceso Absoluta (Se mantiene el estilo flotante) */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.push('/page9')}
            >
                <Feather name="arrow-left" size={28} color={PRIMARY_BLUE} />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                
                {/* 2. Título Principal */}
                <Text style={styles.headerTitle}>Reserva</Text>

                {/* 3. Sección de Detalles de Pago y Descripción */}

                {/* --- Fila: PAGO (Interactiva) --- */}
                <TouchableOpacity onPress={handlePaymentChange} style={styles.detailRow}>
                    <Text style={[styles.detailLabel, styles.sectionTitle]}>PAGO</Text>
                    <View style={styles.flexRow}>
                        <Text style={styles.detailValue}>{RESERVA_DATA.paymentMethod}</Text>
                        <Feather name="chevron-right" size={20} color={PRIMARY_BLUE} style={{marginLeft: 5}} />
                    </View>
                </TouchableOpacity>
                
                <View style={styles.divider} />

                {/* --- Fila: DESCRIPCIÓN & PRECIO (Encabezados) --- */}
                <View style={[styles.detailRow, {paddingTop: 20}]}>
                    <Text style={[styles.detailLabel, styles.sectionTitle, {color: PRIMARY_BLUE}]}>DESCRIPCIÓN</Text>
                    <Text style={[styles.detailLabel, styles.sectionTitle, {color: PRIMARY_BLUE}]}>PRECIO</Text>
                </View>

                {/* --- Fila: Lavado Detallado --- */}
                <View style={styles.detailRow}>
                    <Text style={styles.descriptionText}>{RESERVA_DATA.serviceDescription}</Text>
                    <Text style={styles.priceValue}>{RESERVA_DATA.servicePrice}</Text>
                </View>

                <View style={styles.divider} />
                
                {/* 4. Sección de Resumen de Costos (Subtotal, Impuestos, Total) */}
                <View style={styles.summaryContainer}>
                    
                    {/* --- Fila: Subtotal --- */}
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Subtotal (1)</Text>
                        <Text style={styles.summaryValue}>{RESERVA_DATA.subtotal}</Text>
                    </View>

                    {/* --- Fila: Impuestos --- */}
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Impuestos</Text>
                        <Text style={styles.summaryValue}>{RESERVA_DATA.taxes}</Text>
                    </View>

         

                    {/* --- Fila: Total (Destacado) --- */}
                    {/* La imagen de referencia no tiene divisor después del total, pero sí tiene la misma fuente para todos los valores. */}
                    <View style={[styles.summaryRow, styles.totalRow]}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>{RESERVA_DATA.total}</Text>
                    </View>
                    <View style={styles.divider} />
                </View>

                {/* 5. Botón para Realizar Reserva */}
                <TouchableOpacity 
                    style={styles.confirmButton}
                    onPress={() => router.push('/page12')}
                        /*onPress={handleConfirmReservationCard}*/
                >
                    <Text style={styles.confirmButtonText}>Realizar reserva</Text>
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
        backgroundColor: '#fff',
    },
    // Estilo adaptado de la pantalla de tarjeta para la flecha flotante
    backButton: {
        position: 'absolute',
        top: 30, 
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
    headerTitle: {
        fontSize: 32,
        fontWeight: '400',
        color: PRIMARY_BLUE,
        marginTop: 100,
        marginBottom: 30,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 10, 
        paddingBottom: 30,
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#888', // Gris más claro para los títulos de sección (PAGO, DESCRIPCIÓN)
    },
    detailLabel: {
        fontSize: 16,
        color: PRIMARY_BLUE,
    },
    detailValue: {
        fontSize: 16,
        fontWeight: '400',
        color: PRIMARY_BLUE,
    },
    descriptionText: {
        fontSize: 16,
        color: PRIMARY_BLUE,
        fontWeight: '400', // Peso normal
        // No hay un label 'Marca' en la imagen, así que solo usamos la descripción
    },
    priceValue: {
        fontSize: 16,
        fontWeight: '500',
        color: PRIMARY_BLUE,
    },
    divider: {
        height: 3,
        backgroundColor: '#eee',
        marginVertical: 5,
    },
    summaryContainer: {
        marginTop: 30,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4,
    },
    summaryLabel: {
        fontSize: 16,
        color: PRIMARY_BLUE,
        fontWeight: '400',
    },
    summaryValue: {
        fontSize: 16,
        color: PRIMARY_BLUE,
        fontWeight: '500',
    },
    totalRow: {
        marginTop: 15,
        // Eliminado el borderTop para seguir la imagen de referencia
    },
    totalLabel: {
        fontSize: 16, // Mantener el mismo tamaño para Subtotal, Impuestos, Total
        fontWeight: '700',
        color: PRIMARY_BLUE,
    },
    totalValue: {
        fontSize: 16,
        fontWeight: '700',
        color: PRIMARY_BLUE,
    },
    confirmButton: {
        backgroundColor: SECONDARY_CYAN,
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: PRIMARY_BLUE,
        marginTop: 40, // Espacio suficiente entre la tabla de costos y el botón
    },
    confirmButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: PRIMARY_BLUE,
    },
});