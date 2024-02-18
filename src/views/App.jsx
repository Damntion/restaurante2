// Importa el archivo de estilos CSS de la aplicación
import '../estilos/App.css';
import React from 'react';

// Importa los componentes Header, Main y Footer desde las rutas especificadas
import Header from '../componets/Header'; 
import Main from '../componets/Main'; 
import Footer from '../componets/Footer'; 

// Definición del componente principal llamado App
function App() {

  
  // devuelve la estructura del componente
  return (
    <div>
      {/* Inserta una imagen como fondo para la pagina */}
      <video autoPlay="autoplay" muted loop style={{
        right: "0",
        bottom: "0",
        minWidth: "100%", 
        width: "auto", 
        height: "auto",
        zIndex: "-1", 
        overflow: "hidden",
        objectFit: "cover", 
      }}>
        <source src="./src/assets/videoPortal.mp4"/>
      </video>

      {/* Renderiza el componente Header */}
      <Header/>

      {/* Renderiza el componente Main */}
      <Main/>
      {/* Renderiza el componente Footer */}
      <Footer/>
    </div>
  );
}

// Exporta el componente App para ser utilizado en otros archivos
export default App;


