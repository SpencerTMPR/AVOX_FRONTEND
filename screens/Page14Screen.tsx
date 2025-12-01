// app/edit-profile.tsx  (o page9.tsx si prefieres)
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const PRIMARY_BLUE = '#023554';
const SECONDARY_CYAN = '#8AD2EA';

export default function EditProfileScreen() {
  const router = useRouter();

  const [user, setUser] = useState({
    firstName: 'Sabrina',
    lastName: 'Aryan',
    username: '@Sabrina',
    email: 'SabrinaAry208@gmail.com',
    phoneCountryCode: '+504',
    phoneNumber: '9046 4700',
    birth: '1995',
    gender: 'Femenino',
  });

  const handleChange = (name: string, value: string) => {
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleBack = () => {
    router.back();
  };

  const handleChangePassword = () => {
    Alert.alert('Cambiar contraseña', 'Próximamente disponible');
  };

  const handleCamera = () => {
    Alert.alert('Foto de perfil', 'Funcionalidad de cámara próximamente');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header con botón atrás */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi Perfil</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Foto de perfil */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://placehold.co/120x120/023554/8AD2EA?text=SA' }}
              style={styles.avatar}
            />
          </View>

          <View>
            <Text style={styles.userName}>
              {user.firstName} {user.lastName}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Editar Perfil</Text>

        {/* Formulario */}
        <View style={styles.form}>

          <InputField
            label="Nombre"
            value={user.firstName}
            onChangeText={(text) => handleChange('firstName', text)}
          />

          <InputField
            label="Apellido"
            value={user.lastName}
            onChangeText={(text) => handleChange('lastName', text)}
          />

          <InputField
            label="Correo"
            value={user.email}
            onChangeText={(text) => handleChange('email', text)}
            keyboardType="email-address"
          />

          {/* Teléfono */}
          <View>
            <Text style={styles.label}>Teléfono</Text>
            <View style={styles.phoneContainer}>
              <TextInput
                style={[styles.input, styles.countryCode]}
                value={user.phoneCountryCode}
                onChangeText={(text) => handleChange('phoneCountryCode', text)}
                keyboardType="phone-pad"
              />
              <TextInput
                style={[styles.input, { flex: 1 }]}
                value={user.phoneNumber}
                onChangeText={(text) => handleChange('phoneNumber', text)}
                placeholder="9000 0000"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Botón cambiar contraseña */}
          <TouchableOpacity style={styles.passwordButton} onPress={handleChangePassword}>
            <Feather name="lock" size={18} color={PRIMARY_BLUE} />
            <Text style={styles.passwordButtonText}>Guardar cambios</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation (opcional, puedes quitarla si no la usas aquí) */}
      <View style={styles.bottomNav}>
                {/* Home */}
                <TouchableOpacity onPress={() => router.push('/page6')}>
                            <Ionicons name="home-outline" size={28} color="#023554" />
                          </TouchableOpacity>
                          
                          <TouchableOpacity onPress={() => router.push('/page13')}>
                            <Ionicons name="calendar-outline" size={28} color= '#023554'  />
                          </TouchableOpacity>
                          
                          <TouchableOpacity onPress={() => router.push('/page14')}>
                            <Ionicons name="person" size={28} color='#023554' />
                          </TouchableOpacity>
            </View>
    </SafeAreaView>
  );
}

// Componente reutilizable de input
const InputField = ({ label, value, onChangeText, keyboardType = 'default' }: any) => (
  <View style={{ marginBottom: 16 }}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      autoCapitalize="none"
    />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: PRIMARY_BLUE,
  },
  scrollContent: { padding: 20 },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: { position: 'relative', marginRight: 16 },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: PRIMARY_BLUE,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: PRIMARY_BLUE,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: PRIMARY_BLUE,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: PRIMARY_BLUE,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  form: { width: '100%' },
  label: {
    fontSize: 13,
    color: '#555',
    marginBottom: 6,
  },
  input: {
    height: 48,
    borderWidth: 2,
    borderColor: SECONDARY_CYAN,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    fontSize: 16,
    color: PRIMARY_BLUE,
  },
  phoneContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  countryCode: {
    width: 80,
    textAlign: 'center',
  },
  passwordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: SECONDARY_CYAN,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: PRIMARY_BLUE,
    marginTop: 20,
  },
  passwordButtonText: {
    color: PRIMARY_BLUE,
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 70,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        paddingBottom: 10, // Para iOS SafeArea inferior
    },
    navItem: {
        padding: 10,
    },
});