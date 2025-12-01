import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

// Colores de tu tema
const PRIMARY_BLUE = '#023554'; // Azul oscuro
const SECONDARY_CYAN = '#8AD2EA'; // Celeste claro

export default function Page10Screen() {
    const router = useRouter();
    
    // Estados para los campos del formulario
    const [cardHolderName, setCardHolderName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvc, setCvc] = useState('');

    const handleAddCard = () => {
        // Aquí iría la lógica para validar y agregar la tarjeta
        console.log('Agregando tarjeta:', {
            cardHolderName,
            cardNumber,
            expiryDate,
            cvc,
        });
        // Después de agregar la tarjeta, podrías navegar de vuelta
        // a la pantalla de métodos de pago o a otra parte de la app.
        router.back(); 
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />
            
            {/* --- 1. Encabezado SÓLO con la flecha de retroceso --- */}
            <TouchableOpacity
    style={styles.backButton}
    onPress={() => router.push('/page9')}
>
    <Feather name="arrow-left" size={28} color={PRIMARY_BLUE} />
</TouchableOpacity>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                
                {/* --- 2. Título Principal (Movido aquí para que esté bajo la flecha) --- */}
                <Text style={styles.headerTitle}>Tarjeta crédito/debito</Text>

                {/* --- Nombre en la tarjeta --- */}
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Nombre en la tarjeta</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Alexandra Smith"
                        value={cardHolderName}
                        onChangeText={setCardHolderName}
                    />
                </View>

                {/* --- Número de tarjeta --- */}
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Numero de la tarjeta</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="4747 4747 4747 4747"
                        value={cardNumber}
                        onChangeText={setCardNumber}
                        keyboardType="numeric"
                        maxLength={19} // 16 dígitos + 3 espacios
                    />
                </View>

                {/* --- Fecha de expiración y CVC --- */}
                <View style={styles.inlineInputs}>
                    <View style={[styles.inputGroup, styles.halfInput]}>
                        <Text style={styles.inputLabel}>Fecha de Expiracion</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="07/21"
                            value={expiryDate}
                            onChangeText={setExpiryDate}
                            keyboardType="numeric"
                            maxLength={5} // MM/YY
                        />
                    </View>
                    <View style={[styles.inputGroup, styles.halfInput]}>
                        <Text style={styles.inputLabel}>CVC</Text>
                        <View style={styles.cvcInputContainer}>
                            <TextInput
                                style={[styles.textInput, styles.cvcTextInput]}
                                placeholder="474"
                                value={cvc}
                                onChangeText={setCvc}
                                keyboardType="numeric"
                                maxLength={3} // CVC típicamente de 3 dígitos
                                secureTextEntry // Oculta el CVC
                            />
                            <Feather name="credit-card" size={20} color="#888" style={styles.cvcIcon} />
                        </View>
                    </View>
                </View>

                {/* --- Botón para Agregar Tarjeta --- */}
                <TouchableOpacity 
    style={styles.addCardButton}
    onPress={() => router.push('/page9')}
>
    <Text style={styles.addCardButtonText}>Agregar tarjeta</Text>
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
     backButton: {
        position: 'absolute',
        top: 30,        // justo debajo del notch/status bar
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
        borderWidth:2,
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
        // Reducimos el paddingTop ya que el título ahora es parte del scroll
        paddingTop: 10, 
        paddingBottom: 30,
    },
    
    inputGroup: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 14,
        color: PRIMARY_BLUE,
        marginBottom: 5,
        fontWeight: '500',
    },
    textInput: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 14,
        color: PRIMARY_BLUE,
        borderWidth: 2,
        borderColor: SECONDARY_CYAN
    },
    inlineInputs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    halfInput: {
        width: '48%', // Divide el espacio casi por la mitad
        marginBottom: 0, 
    },
    cvcInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: SECONDARY_CYAN,
        marginLeft:0,
        marginRight:100, // Espacio para el icono
    },
    cvcTextInput: {
        flex: 1,
        backgroundColor: 'fff',
        borderWidth: 0,
    },
    cvcIcon: {
        // Estilos para el icono dentro del input
        marginLeft:-250,
        paddingRight:10,
    },

    addCardButton: {
        backgroundColor: SECONDARY_CYAN,
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: PRIMARY_BLUE,
        marginTop: 20,
    },
    addCardButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: PRIMARY_BLUE,
    },
});