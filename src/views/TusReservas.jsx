import React, { useEffect, useState } from 'react';
import Header from '../componets/Header';
import Footer from '../componets/Footer';

function App() {
  const [datos, setDatos] = useState([]);
  const name = localStorage.getItem('name');

  function datosFetch() {
    const token = localStorage.getItem('token'); // Recuperamos el token almacenado
    const id = localStorage.getItem('id'); // Recuperamos el id almacenado
    const endpoint = `http://localhost:8080/FullCalendar/public/api/mostrar?id=${id}`;
  
    fetch(endpoint, {
      method: 'GET', // Método HTTP
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud Fetch');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      setDatos(data.user); // Asegúrate de ajustar esto según la estructura de la respuesta
    })
    .catch(error => {
      console.error('Error en Fetch:', error);
    });
  }


  function BorrardatosFetch(id) {
    const token = localStorage.getItem('token'); // Recuperamos el token almacenado
    const url = `http://localhost:8080/FullCalendar/public/api/borrar?id=${id}`;
  
    fetch(url, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud Fetch');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      // Aquí podrías añadir lógica adicional para manejar la respuesta, como actualizar el estado para reflejar que el elemento ha sido borrado
      // Por ejemplo, podrías volver a llamar a datosFetch() para actualizar la lista de reservas
      datosFetch();
    })
    .catch(error => {
      console.error('Error en Fetch:', error);
    });
  }
  
  useEffect(() => {
    datosFetch();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Contenedor para la imagen de fondo y el contenido central */}
      <div className="flex-grow bg-cover bg-center" style={{ backgroundImage: `url('./src/assets/fondoReservas.jpg')` }}>
        {/* Contenedor del contenido central con transparencia, centrado vertical y horizontalmente */}
        <div className="flex flex-col items-center justify-center flex-grow">
          {/* Renderiza el componente Header */}
          <Header />

          {/* Contenedor principal para el contenido con transparencia */}
          <main className="mt-64 ml-10 mb-60 text-left p-6 bg-white bg-opacity-90 shadow-md rounded">
            <h1>Reservas a nombre de {JSON.parse(name)}</h1>
            <table className="w-full my-4">
              <thead>
                <tr className="bg-gradient-to-t from-gray-100 to-gray-400">
                  <th className="px-4 py-2 border-b border-gray-300">Fecha</th>
                  <th className="px-4 py-2 border-b border-gray-300">Nombre</th>
                  <th className="px-4 py-2 border-b border-gray-300">Email</th>
                  <th className="px-4 py-2 border-b border-gray-300">Asunto</th>
                  <th className="px-4 py-2 border-b border-gray-300">Mensaje</th>
                  <th className="px-4 py-2 border-b border-gray-300">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {datos.length > 0 ? (
                  datos.map((user, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border-b border-gray-300">{user.fecha}</td>
                      <td className="px-4 py-2 border-b border-gray-300">{user.Nombre}</td>
                      <td className="px-4 py-2 border-b border-gray-300">{user.Email}</td>
                      <td className="px-4 py-2 border-b border-gray-300">{user.Asunto}</td>
                      <td className="px-4 py-2 border-b border-gray-300">{user.Mensaje}</td>
                      <td className="px-4 py-2 border-b border-gray-300 flex justify-around">
                        
                        <button className="px-4 py-2 rounded text-white bg-red-800 hover:bg-red-700 transition duration-300" onClick={() => BorrardatosFetch(user.id)}>
                          Borrar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-4 py-2 border-b border-gray-300">No ha realizado ninguna reserva</td>
                  </tr>
                )}
              </tbody>
            </table>
          </main>
        </div>
      </div>

      {/* Renderiza el componente Footer, asegurándose de que esté al final */}
      <Footer />
    </div>
  );
}

export default App;
