

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RegisterSelectionScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Botón de retroceso */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      {/* Logo */}
      <Image
        source={require('../../assets/images/logo.jpeg')} // <-- ajusta la ruta a tu logo
        style={styles.logo}
        resizeMode="contain"
      />

      <TouchableOpacity>
              <Text>registrame Como Empresa</Text>
            </TouchableOpacity>
    </View>

      

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 30,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  backArrow: {
    fontSize: 28,
    color: '#000',
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#A6DBF2',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#002B45',
    fontSize: 16,
    fontWeight: '600',
  },
});
