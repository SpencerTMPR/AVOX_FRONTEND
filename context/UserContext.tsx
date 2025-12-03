import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useEffect, useState } from "react";

type Usuario = {
  usuarioID: number;
  nombre: string;
  apellido: string;
  correo: string;
  rol: string;
  estado: string;
  telefono: string;
};

type UserContextType = {
  usuario: Usuario | null;
  setUsuario: (usuario: Usuario | null) => void;
  logout: () => Promise<void>;
};

export const UserContext = createContext<UserContextType>({
  usuario: null,
  setUsuario: () => {},
  logout: async () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const data = await AsyncStorage.getItem("usuario");
        console.log("Contenido en AsyncStorage:", data);

        if (data) {
          const usuarioGuardado = JSON.parse(data);

          // Validación básica
          if (usuarioGuardado?.nombre && usuarioGuardado?.rol) {
            console.log("Usuario cargado correctamente:", usuarioGuardado);
            setUsuario(usuarioGuardado);
          } else {
            console.log("El objeto guardado no tiene estructura válida.");
          }
        } else {
          console.log("No se encontró usuario en AsyncStorage.");
        }
      } catch (error) {
        console.log("Error al cargar usuario:", error);
      }
    };

    cargarUsuario();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem("usuario");
    setUsuario(null);
  };

  return (
    <UserContext.Provider value={{ usuario, setUsuario, logout }}>
      {children}
    </UserContext.Provider>
  );
};
