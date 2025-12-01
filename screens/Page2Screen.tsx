// app/(tabs)/RoleSelectionScreen.tsx
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Page2Screen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.push('/(tabs)')} // ← vuelve a la pantalla anterior
                // Si quieres ir a una pantalla específica, cambia por:
                // onPress={() => router.push('/locales')}
            >
                <Feather name="arrow-left" size={28} color='#023554' />
            </TouchableOpacity>

        <Image source={require('../assets/images/logo.jpeg')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}></Text>

        <View style={{ height: 100 }} />

        <TouchableOpacity style={styles.button} onPress={() => router.push('/page3')}>
          <Text style={styles.buttonText}>Registro como Usuario</Text>
        </TouchableOpacity>

        <View style={{ height: 20 }} />

        <TouchableOpacity style={styles.button} onPress={() => router.push('/page4')}>
          <Text style={styles.buttonText}>Registro como Empresa</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flexGrow: 1, alignItems: 'center', paddingTop: 40, paddingHorizontal: 30 },
  backText: { fontSize: 30, color: '#023554' },
  logo: { width: 250, height: 250, marginTop:10 },
  title: { fontSize: 34, fontWeight: 'bold', color: '#023554', marginTop: 10 },
  backButton: {
        position: 'absolute',
        top: 50,        // justo debajo del notch/status bar
        left: 45,
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
        borderWidth:2,
    },
  button: {
    width: '100%',
    height: 56,
    backgroundColor: '#8AD2EA',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#023554',
  },
  buttonText: { color: '#002B45', fontSize: 16, fontWeight: '600' },

  
});
