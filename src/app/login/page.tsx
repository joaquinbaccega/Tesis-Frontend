"use client"
import { useState } from 'react';
import '../../public/Styles/login.css';
import { useRouter } from "next/navigation";

import { Button, TextField, Box } from "@mui/material";

export default function Login() {
  const router = useRouter();

  // Estado para almacenar los valores de los inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = (event:any) => {
    event.preventDefault(); // Evitar el comportamiento por defecto del formulario
    console.log("Email:", email);
    console.log("Contraseña:", password);
    

    if(email === "baccegajoaquin@gmail.com" && password === "123456") {
      alert("Sesión iniciada con éxito");
      router.push("/inicio")
    } else {
      alert("Email o contraseña incorrectos");
    }



  };

  return (
    <div className="flex h-screen">
      {/* Sección izquierda con la imagen */}
      <div className="hidden md:flex w-1/2 bg-login">
        {/* La imagen se aplicará como fondo y no afectará el tamaño del contenedor */}
      </div>

      {/* Sección derecha con el formulario */}
      <div className="flex w-full md:w-1/2 justify-center items-center p-8 bg-gray-100">
        <Box
          component="form"
          onSubmit={handleSubmit} // Manejar el evento de envío
          sx={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '400px' }}
        >
          <h2 className="text-2xl font-bold mb-6 text-black">Iniciar Sesión</h2> {/* Cambiar a text-black */}

          {/* Campo de Email */}
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            required
            value={email} // Vincular el valor del input con el estado
            onChange={(e) => setEmail(e.target.value)} // Actualizar el estado cuando cambie el input
          />

          {/* Campo de Contraseña */}
          <TextField
            label="Contraseña"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            required
            value={password} // Vincular el valor del input con el estado
            onChange={(e) => setPassword(e.target.value)} // Actualizar el estado cuando cambie el input
          />

          {/* Botón de Inicio de Sesión */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: 2, backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'gray' } }}
          >
            Iniciar Sesión
          </Button>
        </Box>
      </div>
    </div>
  );
}
