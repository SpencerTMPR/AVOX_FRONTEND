import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function Page5Screen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Logo AVOX */}
      <Image
        source={require('../assets/images/logo.jpeg')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Título */}
      <Text style={styles.title}>Reserva Exitoso</Text>

      {/* Icono de check grande */}
      <View style={styles.checkContainer}>
        <Ionicons name="checkmark-circle-outline" size={120} color="#8AD2EA" />
      </View>

      {/* Mensaje */}
      <Text style={styles.messageTitle}>La reserva se agendado</Text>
      <Text style={styles.messageTitle}>correctamente</Text>
<br /><br /><br /><br /><br />
      {/* Botón Regresar al Login */}

{/* Icono Home opcional (si quieres que sea clickeable también) */}
      <TouchableOpacity
        style={styles.homeIcon}
        onPress={() => navigation.navigate('page6' as never)}
      >
        <Ionicons name="home-outline" size={32} color="#023554" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('page6' as never)}
      >
        <Text style={styles.loginText}>Regresar a la pagina principal</Text>
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
