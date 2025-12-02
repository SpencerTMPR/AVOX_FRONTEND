import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function AgregarServicio() {
  const router = useRouter();

  // Estados para los campos del formulario
  const [nombreServicio, setNombreServicio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [valor, setValor] = useState('');

  const handleAgregarServicio = () => {
    console.log('Agregando servicio:', { nombreServicio, descripcion, valor });
    // Aquí iría la lógica para guardar el servicio
    router.push(''); // Regresa a la lista de servicios
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* --- BOTÓN ATRÁS (Reutilizado del código proporcionado) --- */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push('/page17')} 
      >
        <Feather name="arrow-left" size={28} color='#023554' />
      </TouchableOpacity>

      {/* --- LOGO --- */}
      <Image
        source={require('../../assets/images/logo.jpeg')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* --- TÍTULO DE LA PANTALLA --- */}
      {/* Este bloque imita el estilo de "Agregar nuevo servicio" de la imagen */}
      <View style={styles.titleContainer}>
        <Text style={styles.pageTitle}>Agregar nuevo servicio</Text>
        <View style={styles.underline} />
      </View>

      {/* --- FORMULARIO (Inputs reutilizados) --- */}
      
      {/* Campo 1: Nombre */}
      <Text style={styles.label}>Nombre del servicio</Text>
      <TextInput
        style={styles.input}
        placeholder="Value"
        placeholderTextColor="#B0B0B0"
        value={nombreServicio}
        onChangeText={setNombreServicio}
      />

      {/* Campo 2: Descripción */}
      <Text style={styles.label}>Descripcion del servicio</Text>
      <TextInput
        style={styles.input}
        placeholder="Value"
        placeholderTextColor="#B0B0B0"
        value={descripcion}
        onChangeText={setDescripcion}
      />

      {/* Campo 3: Valor */}
      <Text style={styles.label}>Valor del servicio</Text>
      <TextInput
        style={styles.input}
        placeholder="Value"
        placeholderTextColor="#B0B0B0"
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
      />

      {/* Espaciador para separar el botón de los inputs */}
      <View style={{ height: 20 }} />

      {/* --- BOTÓN DE ACCIÓN --- */}
      <TouchableOpacity style={styles.crearButton} onPress={handleAgregarServicio}>
        <Text style={styles.crearText}>Agregar servicio</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 40,
  },
  // Estilo del botón atrás (Exactamente el proporcionado)
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20, // Ajustado ligeramente para alinearse visualmente con la imagen
    zIndex: 10,
    backgroundColor: '#fff',
    padding: 4,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderColor: '#023554',
    borderWidth: 2,
  },
  logo: {
    width: 250, // Ajustado ligeramente para balancear
    height: 250,
    marginTop:-50,
    marginBottom: -50,
    resizeMode: 'contain',
  },
  // Estilos específicos para el título "Agregar nuevo servicio"
  titleContainer: {
    alignSelf: 'flex-start',
    marginBottom: 25,
    marginTop: 10,
  },
  pageTitle: {
    fontSize: 18,
    color: '#8AD2EA', // Color celeste según la imagen
    marginBottom: 5,
    fontWeight: '600',
  },
  underline: {
    height: 3,
    width: '100%',
    backgroundColor: '#8AD2EA', // Subrayado celeste
    borderRadius: 2,
  },
  // Estilos de Inputs y Labels (Reutilizados del código proporcionado)
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    color: '#023554', // Azul oscuro
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    height: 45, // Ligeramente más alto para parecerse a la imagen
    borderColor: '#8AD2EA',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 15,
    color: '#000',
    backgroundColor: '#FFFFFF',
    marginBottom: 18,
  },
  // Estilo del Botón Principal
  crearButton: {
    width: 200, // Ancho ajustado según imagen
    height: 45,
    backgroundColor: '#8AD2EA',
    borderRadius: 12,
    borderColor: '#023554',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    marginTop: 10,
  },
  crearText: {
    color: '#002B45',
    fontWeight: '600',
    fontSize: 15,
  },
});