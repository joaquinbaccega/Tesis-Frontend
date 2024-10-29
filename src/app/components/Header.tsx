"use client"; // Asegúrate de que sea un componente de cliente

import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  return (
    <header className="bg-black text-white py-4">
      <title>OsteoHelth</title>
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-4">
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="px-4 py-2 border-white">
              Inicio
            </a>
          </li>
          <li>
            <a href="#" className="px-4 py-2 border-white">
              Producto
            </a>
          </li>
          <li>
            <a href="#" className="px-4 py-2 border-white">
              Sobre nosotros
            </a>
          </li>
          <li>
            <a href="#" className="px-4 py-2 border-white">
              Contacto
            </a>
          </li>
        </ul>
          <Button
            variant="text"
            color="inherit"
            className="text-white border-white"
            onClick={() => router.push("/login")}
          >
            Iniciar Sesion
          </Button>
      </nav>
    </header>
  );
};

export default Header;
