
// Definición del componente Main
function Main() {
    // Retorna la estructura del componente
    return (
      <main>
          {/* Contenedor del texto con fondo negro y estilos */}
          <div className="text absolute top-1/2 left-1/2 
          transform -translate-x-1/2 -translate-y-1/2
           text-white text-3xl bg-black bg-opacity-50 p-8">
              Bienvenido al restaurante del cisne blanco
          </div>
          
      </main>
    );
  }
  
  // Exporta el componente Main para ser utilizado en otros archivos
  export default Main;
  