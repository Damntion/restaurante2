import { Link } from 'react-router-dom';
import React, { useState } from 'react'; // Importa useState
import { useNavigate } from 'react-router-dom';

// Definición del componente Header
function Header() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token'); // Revisa si el token existe

  const logout = () => {
    localStorage.clear(); // Limpia todo el localStorage
    navigate('/login'); // Redirecciona al usuario a la página de login
  };

  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  // devuelve la estructura del componente
  return (
    <header className="bg-black py-2 fixed top-0 w-full">
      <div className="flex justify-between items-center h-full">
        {/* Logo a la izquierda */}
        <Link to="/" className="ml-10" id="logo">
          <img src="/src/assets/logoBlanco.png" alt="Logo" className="w-24" />
        </Link>

        {/* Botón en el centro si el usuario está logueado */}
        {isLoggedIn && (
          <div className="flex items-center">
            <div className="flex-grow"></div> 
            <div className="relative">
              <button onClick={handleMenuToggle} className="p-2 w-24 rounded-full transition ease-in-out duration-300 hover:shadow-outline focus:outline-none active:scale-95">
                <img src="/src/assets/Boton.png" alt="Botón de usuario" />
              </button>
              {showMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-black shadow-md rounded-md text-white">
                <Link to="/MetodosPago" className="block px-4 py-2 hover:bg-gray-800">
                  Métodos de pago
                </Link>
                <Link to="/Reservar" className="block px-4 py-2 hover:bg-gray-800">
                  Reservar
                </Link>
                <Link to="/TusReservas" className="block px-4 py-2 hover:bg-gray-800">
                  Tus reservas
                </Link>
                <Link onClick={logout} className="block px-4 py-2 hover:bg-gray-800">
                  Cerrar sesión
                </Link>
              </div>
              
              )}
            </div>
          </div>
        )}

        {!isLoggedIn && (
          <div id="reservas" className="flex items-center mr-10">
            <Link to="/Login" className="font-cursive bg-white text-black px-4 py-2">
              Login
            </Link>
          </div>
        )}

      </div>
    </header>
  );
}

// Exporta el componente Header para ser utilizado en otros archivos
export default Header;
