import { Feather, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import API from "../constants/api"; // tu cliente Axios
import { UserContext } from "../context/UserContext"; // tu contexto

const PRIMARY_BLUE = "#023554";
const SECONDARY_CYAN = "#8AD2EA";

export default function EditProfileScreen() {
  const router = useRouter();
  const { usuario, setUsuario } = useContext(UserContext);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneCountryCode: "+504",
    phoneNumber: "",
  });

  // Inicializar datos desde el contexto
  useEffect(() => {
    if (usuario) {
      setUser({
        firstName: usuario.nombre || "",
        lastName: usuario.apellido || "",
        email: usuario.correo || "",
        phoneCountryCode: "+504",
        phoneNumber: usuario.telefono?.replace("+504", "").trim() || "",
      });
    }
  }, [usuario]);

  const handleChange = (name: string, value: string) => {
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await API.put(`/api/usuarios/${usuario?.usuarioID}`, {
        nombre: user.firstName,
        apellido: user.lastName,
        correo: user.email,
        telefono: `${user.phoneCountryCode} ${user.phoneNumber}`,
        estado: usuario?.estado || "activo",
      });

      // Actualizar contexto y AsyncStorage
      setUsuario(response.data);
      await AsyncStorage.setItem("usuario", JSON.stringify(response.data));

      Alert.alert("Éxito", "Perfil actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      Alert.alert("Error", "No se pudo actualizar el perfil");
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("usuario"); // limpiar almacenamiento local
      setUsuario(null); // limpiar contexto
      router.replace("/"); // redirigir al login
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      Alert.alert("Error", "No se pudo cerrar la sesión");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi Perfil</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Foto de perfil */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: "https://placehold.co/120x120/023554/8AD2EA?text=U",
              }}
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
            onChangeText={(text) => handleChange("firstName", text)}
          />

          <InputField
            label="Apellido"
            value={user.lastName}
            onChangeText={(text) => handleChange("lastName", text)}
          />

          <InputField
            label="Correo"
            value={user.email}
            onChangeText={(text) => handleChange("email", text)}
            keyboardType="email-address"
          />

          {/* Teléfono */}
          <View>
            <Text style={styles.label}>Teléfono</Text>
            <View style={styles.phoneContainer}>
              <TextInput
                style={[styles.input, styles.countryCode]}
                value={user.phoneCountryCode}
                onChangeText={(text) => handleChange("phoneCountryCode", text)}
                keyboardType="phone-pad"
              />
              <TextInput
                style={[styles.input, { flex: 1 }]}
                value={user.phoneNumber}
                onChangeText={(text) => handleChange("phoneNumber", text)}
                placeholder="9000 0000"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Botón Guardar cambios */}
          <TouchableOpacity style={styles.passwordButton} onPress={handleSave}>
            <Feather name="save" size={18} color={PRIMARY_BLUE} />
            <Text style={styles.passwordButtonText}>Guardar cambios</Text>
          </TouchableOpacity>

          {/* Botón Cerrar sesión */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Feather name="log-out" size={18} color="#fff" />
            <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.push("/page6")}>
          <Ionicons name="home-outline" size={28} color="#023554" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/page13")}>
          <Ionicons name="calendar-outline" size={28} color="#023554" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/page14")}>
          <Ionicons name="person" size={28} color="#023554" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

type InputFieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: "default" | "email-address" | "phone-pad";
};

const InputField = ({
  label,
  value,
  onChangeText,
  keyboardType = "default",
}: InputFieldProps) => (
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
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "700",
    color: PRIMARY_BLUE,
  },
  scrollContent: { padding: 20 },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  avatarContainer: { position: "relative", marginRight: 16 },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: PRIMARY_BLUE,
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: PRIMARY_BLUE,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: PRIMARY_BLUE,
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  form: { width: "100%" },
  label: {
    fontSize: 13,
    color: "#555",
    marginBottom: 6,
  },
  input: {
    height: 48,
    borderWidth: 2,
    borderColor: SECONDARY_CYAN,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    fontSize: 16,
    color: PRIMARY_BLUE,
  },
  phoneContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  countryCode: {
    width: 80,
    textAlign: "center",
  },
  passwordButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: SECONDARY_CYAN,
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: PRIMARY_BLUE,
    marginTop: 0,
  },
  passwordButtonText: {
    color: PRIMARY_BLUE,
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 8,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingBottom: 10,
  },
  navItem: {
    padding: 10,
  },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: PRIMARY_BLUE,
    padding: 16,
    borderRadius: 5,
    marginTop: 10,
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 8,
  },
});
