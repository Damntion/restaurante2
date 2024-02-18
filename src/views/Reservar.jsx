import React, { useEffect, useState } from 'react';
import Header from '../componets/Header'; 
import Footer from '../componets/Footer'; 

function Reservar() {


    return (
        <div className="flex flex-col min-h-screen">
          {/* Contenedor para la imagen de fondo y el contenido central */}
          <div 
            className="flex-grow bg-cover bg-center mt-24" 
            style={{ 
              backgroundImage: `url('./src/assets/reservar.jpg')`, 
              backgroundSize: '74%' // Ajusta este valor según necesites
            }}
          >
            {/* Contenedor del contenido central con transparencia, centrado vertical y horizontalmente */}
            <div className="flex flex-col items-center justify-center flex-grow">
              {/* Renderiza el componente Header */}
              <Header />
            </div>
          </div>
      
          {/* Renderiza el componente Footer, asegurándose de que esté al final */}
          <Footer />
        </div>
      );
      
}

export default Reservar;
