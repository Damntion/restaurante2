import {Link} from 'react-router-dom';
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Definición del componente Header
function Header() {
  const navigate = useNavigate();
  
  const isLoggedIn = localStorage.getItem('token'); // Revisa si el token existe

  const logout = () => {
    localStorage.clear(); // Limpia todo el localStorage, incluido el token
    navigate('/login'); // Redirecciona al usuario a la página de login
  };
  

    // devuelve la estructura del componente
    return (
      <header className="bg-black py-2 fixed top-0 w-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo a la izquierda */}
          <Link to="/" className="ml-10" id="logo">
            <img src="/src/assets/logoBlanco.png" alt="Logo" className="w-24"/>
          </Link>
  
          {/* Botón en el centro si el usuario está logueado */}
          {isLoggedIn && (
            <div className="flex-grow flex justify-center ml-24">
              <button onClick={logout} className="p-2 w-24 rounded-full transition ease-in-out duration-300 hover:shadow-outline focus:outline-none active:scale-95">
                <img src="/src/assets/Boton.png" alt="Botón de usuario" />
              </button>
            </div>
          )}
  
          {/* Enlaces a la derecha */}
          <div id="reservas" className="flex items-center mr-10">
            <Link to="/Reservar" className="text-white px-4 py-2">
              Reservar
            </Link>
            <Link to="/TusReservas" className="text-white px-4 py-2">
              Tus reservas
            </Link>
            <Link to="/Login" className="font-cursive bg-white text-black px-4 py-2">
              Login
            </Link>
          </div>
        </div>
      </header>
    );
  
  }
  
  // Exporta el componente Header para ser utilizado en otros archivos
  export default Header;
  