import {Link} from 'react-router-dom';


// Definición del componente Header
function Header() {
      // devuelve la estructura del componente
    return (
      
      <header className="bg-black py-4 fixed top-0 w-full">
          <div className="flex items-center">
              {/* Sección del logo */}
              <div id="logo" className="text-center w-full ml-10">
                  {/* Imagen del logo */}
                  <img src="/src/assets/logo.png" alt="Logo" className="w-20"/>
              </div>
  
              {/* Sección de reservas */}
              <div id="reservas" className="w-2/6 mt-2.5">
                  {/* Enlace para reservar */}
                  <a className="text-white px-4 py-2">Reservar</a>
                  
                  {/* Enlace para tus reservas */}
                  <a className="text-white px-4 py-2">Tus Reservas</a>
                  {/* Boton para iniciar sesion o registrarse
                        El elemento Link funciona de la misma manera que un elemento a en html, solo que en este caso el enlace en vez de estar en "href" se pone en el "to" */}
                 <Link
                    to="/Login"
                    className="font-cursive bg-white
                    text-black text-right px-4 py-2">
                      Login
                  </Link>
              </div>
                
                    {/* <Link to="/Register">Register</Link> */}
                
          </div>

          
      </header>
    );
  }
  
  // Exporta el componente Header para ser utilizado en otros archivos
  export default Header;
  