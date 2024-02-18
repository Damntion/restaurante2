import {Link} from 'react-router-dom';

// Definición del componente Footer
function Footer() {
  // Retorna la estructura del componente
  return (
    <footer class="flex items-start bg-black py-4 text-white  bottom-0 w-full">
        <Link
        to="/"
        class="text-center pr-10 w-full" id="logoPie">
        <img src="/src/assets/logoBlanco.png" alt="Logo" className="w-24"/>
        </Link>
        {/* div  de información de llamadas y ubicación */}
        <div id="llamadas" class="w-1/2">
            <h3>&#x1F4DE; LLÁMANOS</h3>
            <p>+34 153246526</p>
            <h3>&#x1F4CD; UBICACIÓN</h3>
            <p>Calle la rioja</p>
            <p>Córdoba</p>
            <p>España</p>
        </div>
        {/* div de información sobre el restaurante */}
        <div id="lacay" class="w-full">
            <h3>EL LACAY</h3>
            <p>Comida y bebida</p>
            <p>Tarjetas de regalo</p>
            <p>Comentario</p>
            <p>Nuestros pubs hermanos</p>
            <p>Alérgenos</p>
        </div>
        {/* div de información al cliente */}
        <div id="infoCliente" class="w-full">
          <h3>INFORMACIÓN AL CLIENTE</h3>
          <p>Únete a nuestro equipo</p>
          <p>Contactenos</p>
          {/* div de redes sociales y licencia */}
          <div class="flex-row w-34"> 
              <img src="/src/assets/redes.png"/>
              <p id="license">
                  Este trabajo tiene la licencia
                  <a id="licenseLink" class="flex" href="http://creativecommons.org/licenses/by-nc-sa/4.0/?ref=selecter-v1" target="_blank" rel="licencia noopener noreferrer">
                      {/* Íconos de la licencia Creative Commons */}
                      <img class="w-8" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"/>
                      <img class="w-8" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"/>
                      <img class="w-8" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1"/>
                      <img class="w-8" src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1"/>
                  </a>
              </p>
          </div>
      </div>
    </footer>
  );
}

// Exporta el componente Footer para ser utilizado en otros archivos
export default Footer;
