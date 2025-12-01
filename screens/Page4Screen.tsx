
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

export default function Page4Screen() {
  const router = useRouter();

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  const handleCrearCuenta = () => {
    if (!aceptaTerminos) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }
    console.log('Creando cuenta con:', { nombre, apellido, correo, telefono });
    // Aquí iría tu lógica de registro (API, validaciones, etc.)
    // Al completar correctamente, navegar a la pantalla de éxito
    router.push('/page5');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => router.back()}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      {/* Logo AVOX */}
      <Image
        source={require('../assets/images/logo.jpeg')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Campos del formulario */}
      <Text style={styles.label}>Nombre Empresa</Text>
      <TextInput
        style={styles.input}
        placeholder="Value"
        placeholderTextColor="#B0B0B0"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Correo</Text>
      <TextInput
        style={styles.input}
        placeholder="Value"
        placeholderTextColor="#B0B0B0"
        value={apellido}
        onChangeText={setApellido}
      />

      <Text style={styles.label}>Telefono</Text>
      <TextInput
        style={styles.input}
        placeholder="Value"
        placeholderTextColor="#B0B0B0"
        keyboardType="email-address"
        value={correo}
        onChangeText={setCorreo}
      />

      <Text style={styles.label}>Direccion</Text>
      <TextInput
        style={styles.input}
        placeholder="Value"
        placeholderTextColor="#B0B0B0"
        keyboardType="phone-pad"
        value={telefono}
        onChangeText={setTelefono}
      />

      <Text style={styles.label}>Ciudad</Text>
      <TextInput
        style={styles.input}
        placeholder="Value"
        placeholderTextColor="#B0B0B0"
        keyboardType="phone-pad"
        value={telefono}
        onChangeText={setTelefono}
      />

      {/* Checkbox términos (implementado como Touchable) */}
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => setAceptaTerminos(!aceptaTerminos)}
      >
        <View style={[styles.checkbox, aceptaTerminos && styles.checkboxChecked]}>
          {aceptaTerminos && <Text style={styles.checkmark}>✔</Text>}
        </View>
        <Text style={styles.checkboxLabel}>
          Acepto los <Text style={styles.linkText}>términos y condiciones</Text>
        </Text>
      </TouchableOpacity>

      <Text style={styles.terminosLink}>Leer Términos y Condiciones</Text>

      {/* Botón Crear Cuenta */}
      <TouchableOpacity style={styles.crearButton} onPress={handleCrearCuenta}>
        <Text style={styles.crearText}>Crear Cuenta</Text>
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
  back: { alignSelf: 'flex-start', padding: 10 },
  backText: { fontSize: 30, color: '#023554' },
  logo: {
    width: 250,
    height: 250,
    marginBottom: -20,
  },
  avoxText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#023554',
    marginBottom: 40,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 14,
    color: '#023554',
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#8AD2EA',
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 15,
    color: '#000',
    backgroundColor: '#FFFFFF',
    marginBottom: 18,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#8AD2EA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: '#8AD2EA',
  },
  checkmark: {
    color: '#023554',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
  },
  linkText: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  terminosLink: {
    fontSize: 14,
    color: '#007AFF',
    textDecorationLine: 'underline',
    marginBottom: 40,
    alignSelf: 'center',
  },
  crearButton: {
    width: 330,
    height: 45,
    backgroundColor: '#8AD2EA',
    borderRadius: 8,
    borderColor: '#023554',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  crearText: {
    color: '#002B45',
    fontWeight: '600',
    fontSize: 15,
  },
});


