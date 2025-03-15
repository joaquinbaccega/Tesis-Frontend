"use client";
import { useState } from "react";
import "../../public/Styles/login.css";
import { useRouter } from "next/navigation";
import { Button, TextField, Box } from "@mui/material";
import { login } from "@/services/auth"; // ✅ Usamos la función login de auth.ts

export default function Login() {
  const router = useRouter();

  // Estado para los inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Estado para mostrar loading
  const [error, setError] = useState(""); // Estado para errores

  // Función para manejar el envío del formulario
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setError(""); // Limpiar errores previos
    setLoading(true); // Mostrar indicador de carga

    try {
      const data = await login(email, password); // ✅ Usar la función login de auth.ts

      // Guardar el token en localStorage
      localStorage.setItem("token", data.token);

      alert("Sesión iniciada con éxito");
      router.push("/inicio"); // Redirigir a la página de inicio
    } catch (error: any) {
      setError(error.message || "Error en la autenticación");
    } finally {
      setLoading(false); // Ocultar indicador de carga
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sección izquierda con la imagen */}
      <div className="hidden md:flex w-1/2 bg-login"></div>

      {/* Sección derecha con el formulario */}
      <div className="flex w-full md:w-1/2 justify-center items-center p-8 bg-gray-100">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: "400px" }}
        >
          <h2 className="text-2xl font-bold mb-6 text-black">Iniciar Sesión</h2>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
 
          {/* Campos de texto para email y contraseña */} 
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            required
            value={email}  // ✅ Vinculado correctamente al estado
            onChange={(e) => setEmail(e.target.value)} // ✅ Actualiza el estado correctamente
          />

          {/* Campo de contraseña */}
          <TextField
            label="Contraseña"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            required
            value={password}  // ✅ Vinculado correctamente al estado
            onChange={(e) => setPassword(e.target.value)} // ✅ Actualiza el estado correctamente
          />

          {/* Botón de Inicio de Sesión */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              marginTop: 2,
              backgroundColor: "black",
              color: "white",
              "&:hover": { backgroundColor: "gray" },
            }}
          >
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </Button>
        </Box>
      </div>
    </div>
  );
}
