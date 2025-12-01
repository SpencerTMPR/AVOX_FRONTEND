import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function Page5Screen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Logo AVOX */}
      <Image
        source={require('../assets/images/logo.jpeg')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Título */}
      <Text style={styles.title}>Registro Exitoso</Text>

      {/* Icono de check grande */}
      <View style={styles.checkContainer}>
        <Ionicons name="checkmark-circle-outline" size={120} color="#8AD2EA" />
      </View>

      {/* Mensaje */}
      <Text style={styles.messageTitle}>Verifica tu Correo</Text>
      <Text style={styles.messageTitle}>Electrónico</Text>
<br /><br /><br /><br /><br />
      {/* Botón Regresar al Login */}

{/* Icono Home opcional (si quieres que sea clickeable también) */}
      <TouchableOpacity
        style={styles.homeIcon}
        onPress={() => router.replace('/')} // o donde quieras ir después
      >
        <Ionicons name="home-outline" size={32} color="#023554" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.replace('/')} // o router.push('/') para volver al login
      >
        <Text style={styles.loginText}>Pagina Principal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 12,
  },
  avoxTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#023554',
    marginBottom: 50,
  },
  title: {
    fontSize: 26,
    color: '#023554',
    marginBottom: 40,
    fontWeight:'400',
    lineHeight: 0,
    letterSpacing:0,
  },
  checkContainer: {
    marginBottom: 50,
  },
  messageTitle: {
    fontSize: 24,
    color: '#023554',
    marginBottom: 40,
    fontWeight:'400',
    lineHeight: 0,
    letterSpacing:0,
  },
  loginButton: {
    marginTop: 40,
    width: '100%',
    height: 55,
    backgroundColor: '#023554',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: '#023554',
    fontSize: 16,
    fontWeight: 'bold',
  },
  homeIcon: {
    position: 'absolute',
    bottom: 130,
  },
});
