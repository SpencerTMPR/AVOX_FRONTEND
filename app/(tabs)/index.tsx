import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import API from "../../constants/api";
export default function LoginScreen() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const handleLogin = async () => {
    if (!correo || !contrasena) {
      alert("Completa todos los campos.");
      return;
    }

    try {
      const response = await API.post("/api/auth/login", {
        correo,
        contrasena,
      });

      if (response.data.success && response.data.usuario) {
        const usuario = response.data.usuario;
        await AsyncStorage.setItem(
          "usuario",
          JSON.stringify(response.data.usuario)
        );

        alert(response.data.message || "Inicio de sesión exitoso");
        //redirigir segun el rol
        if (usuario.rol === "cliente") {
          router.push("/page6");
        } else if (usuario.rol === "autolavado") {
          router.push("/");
        } else {
          router.push("/");
        }
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (error: any) {
      const mensajeError =
        error.response?.data?.message ||
        "Credenciales incorrectas o error de conexión";
      alert(mensajeError);
      console.log("ERROR LOGIN:", mensajeError);
    }
  };

  const handleRegister = () => {
    console.log("Ir a registro");
    // navigation.navigate('Register');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo */}
      <Image
        source={require("../../assets/images/logo.jpeg")}
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
        value={correo}
        onChangeText={setCorreo}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#B0B0B0"
        secureTextEntry
        value={contrasena}
        onChangeText={setContrasena}
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
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => router.push("/page2")}
        >
          <Text style={styles.registerText}>Crear Cuenta</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <Text style={styles.footerText}>
        Al hacer clic en continuar, aceptas nuestros{" "}
        <Text style={styles.linkText}>Términos de servicio</Text> y{" "}
        <Text style={styles.linkText}>Política de privacidad</Text>
      </Text>
    </ScrollView>
  );
}

// Tus estilos (sin cambios)
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 25,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#023554",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 45,
    borderColor: "#8AD2EA",
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 14,
    color: "#000",
    marginBottom: 15,
  },
  loginButton: {
    width: "100%",
    height: 45,
    backgroundColor: "#023554",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },
  loginText: {
    color: "#8AD2EA",
    fontWeight: "600",
    fontSize: 15,
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    width: "80%",
    justifyContent: "center",
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#D0D0D0",
  },
  separatorText: {
    marginHorizontal: 8,
    color: "#7A7A7A",
  },
  registerContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  registerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#023554",
    marginBottom: 5,
  },
  registerSubtitle: {
    textAlign: "center",
    color: "#666",
    fontSize: 13,
    marginBottom: 15,
  },
  registerButton: {
    width: 330,
    height: 45,
    backgroundColor: "#8AD2EA",
    borderRadius: 8,
    borderColor: "#023554",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
  },
  registerText: {
    color: "#002B45",
    fontWeight: "600",
    fontSize: 15,
  },
  footerText: {
    textAlign: "center",
    fontSize: 11,
    color: "#888",
    marginTop: 25,
    width: "90%",
  },
  linkText: {
    color: "#007AFF",
  },
});
