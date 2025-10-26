import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  ScrollView 
} from 'react-native';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Iniciar sesión con:', email, password);
    // Aquí podrías validar y redirigir, por ejemplo:
    // navigation.navigate('Home');
  };

  const handleRegister = () => {
    console.log('Ir a registro');
    // navigation.navigate('Register');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo */}
      <Image 
        source={require('../../assets/images/logo.png')} 
        style={styles.logo} 
        resizeMode="contain"
      />

      {/* Título */}
      <Text style={styles.title}>Iniciar sesión</Text>

      {/* Campos */}
      <TextInput
        style={styles.input}
        placeholder="correo electrónico@dominio.com"
        placeholderTextColor="#B0B0B0"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#B0B0B0"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Botón principal */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Continuar</Text>
      </TouchableOpacity>

      {/* Separador */}
      <View style={styles.separatorContainer}>
        <View style={styles.separatorLine} />
        <Text style={styles.separatorText}>o</Text>
        <View style={styles.separatorLine} />
      </View>

      {/* Crear cuenta */}
      <View style={styles.registerContainer}>
        <Text style={styles.registerTitle}>Crea una cuenta</Text>
        <Text style={styles.registerSubtitle}>
          Ingresa tu correo electrónico para registrarte en esta aplicación
        </Text>
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerText}>Crear Cuenta</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <Text style={styles.footerText}>
        Al hacer clic en continuar, aceptas nuestros{' '}
        <Text style={styles.linkText}>Términos de servicio</Text> y{' '}
        <Text style={styles.linkText}>Política de privacidad</Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 25,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#B0B0B0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#000',
    marginBottom: 15,
  },
  loginButton: {
    width: '100%',
    height: 45,
    backgroundColor: '#002B45',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  loginText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 15,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: '80%',
    justifyContent: 'center',
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#D0D0D0',
  },
  separatorText: {
    marginHorizontal: 8,
    color: '#7A7A7A',
  },
  registerContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  registerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 5,
  },
  registerSubtitle: {
    textAlign: 'center',
    color: '#666',
    fontSize: 13,
    marginBottom: 15,
  },
  registerButton: {
    width: '100%',
    height: 45,
    backgroundColor: '#A7D7E9',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerText: {
    color: '#002B45',
    fontWeight: '600',
    fontSize: 15,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 11,
    color: '#888',
    marginTop: 25,
    width: '90%',
  },
  linkText: {
    color: '#007AFF',
  },
});
