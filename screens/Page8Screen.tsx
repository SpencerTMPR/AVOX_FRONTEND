import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    Modal,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Calendar } from 'react-native-calendars';

const { width } = Dimensions.get('window');

const PRIMARY_BLUE = '#023554';
const SECONDARY_CYAN = '#8AD2EA';

const TIME_SLOTS = [
    '08:00 AM','09:00 AM','10:00 AM','11:00 AM',
    '12:00 PM','01:00 PM','02:00 PM','03:00 PM',
    '04:00 PM','05:00 PM','06:00 PM','07:00 PM'
];

export default function Page8Screen() {
    const router = useRouter();
    const today = new Date().toISOString().split('T')[0];

    const [selectedDate, setSelectedDate] = useState(today);
    const [isTimeModalVisible, setIsTimeModalVisible] = useState(false);
    const [selectedTime, setSelectedTime] = useState('08:00 AM');

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        setIsTimeModalVisible(false);
    };

    const renderTimeSlot = ({ item }: { item: string }) => (
        <TouchableOpacity
            style={[
                styles.timeSlot,
                selectedTime === item && styles.selectedTimeSlot,
            ]}
            onPress={() => handleTimeSelect(item)}
        >
            <Text
                style={[
                    styles.timeSlotText,
                    selectedTime === item && styles.selectedTimeSlotText,
                ]}
            >
                {item}
            </Text>
        </TouchableOpacity>
    );

    const markedDates = {
        [selectedDate]: {
            selected: true,
            selectedColor: PRIMARY_BLUE,
            selectedTextColor: '#fff',
        },
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />

            {/* BOTÓN ATRÁS EN LA ESQUINA SUPERIOR IZQUIERDA */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.push('/page7')} // ← vuelve a la pantalla anterior
                // Si quieres ir a una pantalla específica, cambia por:
                // onPress={() => router.push('/locales')}
            >
                <Feather name="arrow-left" size={28} color={PRIMARY_BLUE} />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* CALENDARIO */}
                <br /><br /><br /><br />
                <View style={styles.calendarWrapper}>
                    <Calendar
                        theme={{
                            backgroundColor: '#fff',
                            calendarBackground: '#fff',
                            arrowColor: PRIMARY_BLUE,
                            monthTextColor: PRIMARY_BLUE,
                            textMonthFontWeight: '600',
                            textMonthFontSize: 20,
                            todayTextColor: PRIMARY_BLUE,
                        }}
                        markingType={'multi-dot'}
                        markedDates={markedDates}
                        onDayPress={day => setSelectedDate(day.dateString)}
                        firstDay={1}
                    />
                </View>

                {/* SELECTOR DE HORA */}
                <TouchableOpacity 
                    style={styles.timeButton}
                    onPress={() => setIsTimeModalVisible(true)}
                >
                    <Text style={styles.timeButtonText}>
                        Hora: {selectedTime}
                    </Text>
                    <Feather name="menu" size={24} color={PRIMARY_BLUE} />
                </TouchableOpacity>

                {/* INFORMACIÓN DEL SERVICIO */}
                <Text style={styles.businessName}>Eco Wash</Text>
                <Text style={styles.ratingText}>4,8 (500 reseñas)</Text>

                <View style={styles.bookingSummary}>
                    <View>
                        <Text style={styles.priceText}>L300</Text>
                        <Text style={styles.serviceText}>Lavado Básico</Text>
                    </View>

                    <TouchableOpacity style={styles.reserveButton} onPress={() => router.push('/page9')}>
                                <Text style={styles.reserveButtonText}>Reservar</Text>
                              </TouchableOpacity>
                </View>

                {/* IMAGEN FIJA */}
                <View style={styles.imageContainer}>
                    <Image
                        source={require("../assets/images/carwashlocal.jpeg")}
                        style={styles.fixedImage}
                        resizeMode="cover"
                    />
                </View>

            </ScrollView>

            {/* MODAL HORARIO */}
            <Modal
                animationType="slide"
                transparent
                visible={isTimeModalVisible}
                onRequestClose={() => setIsTimeModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Selecciona una hora</Text>

                        <FlatList
                            data={TIME_SLOTS}
                            renderItem={renderTimeSlot}
                            keyExtractor={(item) => item}
                            numColumns={3}
                            columnWrapperStyle={styles.columnWrapper}
                        />

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setIsTimeModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#fff' },
    scrollContent: { paddingHorizontal: 20, paddingBottom: 20 },

    // BOTÓN ATRÁS
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

    calendarWrapper: { paddingBottom: 15 },

    timeButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: SECONDARY_CYAN,
        padding: 15,
        borderRadius: 12,
        marginTop: 10,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: PRIMARY_BLUE,
    },

    timeButtonText: { fontSize: 16, fontWeight: '600', color: PRIMARY_BLUE },

    businessName: { fontSize: 20, fontWeight: '700', color: PRIMARY_BLUE },
    ratingText: { fontSize: 14, color: '#888', marginBottom: 15 },

    bookingSummary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },

    priceText: { fontSize: 24, fontWeight: '800', color: PRIMARY_BLUE },
    serviceText: { fontSize: 14, color: '#555' },

    reserveButton: {
        backgroundColor: SECONDARY_CYAN,
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: PRIMARY_BLUE,
    },
    reserveButtonText: { color: PRIMARY_BLUE, fontWeight: '700', fontSize:16 },

    imageContainer: {
        height: 200,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
    },
    fixedImage: {
        width: '100%',
        height: '100%',
    },

    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: Dimensions.get('window').height * 0.6,
    },

    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: PRIMARY_BLUE,
        textAlign: 'center',
        marginBottom: 20,
    },

    columnWrapper: { justifyContent: 'space-between', marginBottom: 10 },

    timeSlot: {
        width: '30%',
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
        marginBottom: 10,
    },

    selectedTimeSlot: {
        backgroundColor: SECONDARY_CYAN,
        borderColor: PRIMARY_BLUE,
        borderWidth: 1.5,
    },

    timeSlotText: { fontSize: 16, color: '#333' },
    selectedTimeSlotText: { fontWeight: '600', color: PRIMARY_BLUE },

    closeButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: PRIMARY_BLUE,
        borderRadius: 10,
        alignItems: 'center',
    },
    closeButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});