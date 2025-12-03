export type Reserva = {
  reservaID: number;
  usuarioID: number;
  autolavadoID: number;
  servicioID: number;
  fechaReserva: string;
  horaReserva: string;
  montoTotal: number;
  estado: string;
  servicioNombre: string;
  servicioPrecio: number;
  autolavadoNombre: string;
  autolavadoCiudad: string;
  autolavadoDireccion?: string; // opcional
  fechaCreacion?: string; // opcional
  metodoPago?: "tarjeta" | "efectivo"; // opcional
};

export type RootStackParamList = {
  page6: undefined;
  page7: { autolavadoID: number };
  page8: { autolavadoID: number; servicioID: number; reserva?: Reserva };
  page9: { reserva: Reserva };
  page10: undefined;
  page11: { metodoPago: "tarjeta" | "efectivo"; reserva: Reserva }; // 👈 ahora recibe ambos
  page12: { metodoPago: "tarjeta" | "efectivo"; reserva: Reserva };
  page13: undefined;
  page14: undefined;
};
