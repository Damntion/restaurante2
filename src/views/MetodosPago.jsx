import React, { useEffect, useState } from 'react';
import Header from '../componets/Header';
import Footer from '../componets/Footer';

function MetodosPago() {
    const [datos, setDatos] = useState([]);
    const name = localStorage.getItem('name');
  
    function datosFetch() {
      const token = localStorage.getItem('token');
      const id = localStorage.getItem('id');
      const url = `http://localhost:8080/FullCalendar/public/api/mostrarTarjetas?id=${id}`;
    
      fetch(url, {
        method: 'GET',
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
        setDatos(data.user);
      })
      .catch(error => {
        console.error('Error en Fetch:', error);
      });
    }
  
    function BorrardatosFetch(id) {
      const token = localStorage.getItem('token');
      const url = `http://localhost:8080/FullCalendar/public/api/borrarTarjetas?id=${id}`;
    
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
        datosFetch();
      })
      .catch(error => {
        console.error('Error en Fetch:', error);
      });
    }
  
    function handleFormSubmit(event) {
      event.preventDefault(); // Evita que el formulario se envíe automáticamente
  
      // Captura los valores del formulario
      const nombre = event.target.nombre.value;
      const numero = event.target.numero.value;
      const cvv = event.target.cvv.value;
      // Construye el objeto de datos para enviar al servidor
      const data = {
        nombre: nombre,
        numero: numero,
        cvv: cvv
      };
  
      // Realiza la solicitud POST a la API
      fetch('http://localhost:8080/FullCalendar/public/api/insertarTarjetas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud Fetch');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        // Vuelve a cargar los datos después de agregar la tarjeta
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
      <div className="flex-grow bg-cover bg-center" style={{ backgroundImage: `url('./src/assets/fondoReservas.jpg')` }}>
        <div className="flex flex-col items-center justify-center flex-grow">
          <Header />
          <main className="flex flex-col mt-64 md:flex-row md:justify-center md:items-start ml-10 mb-60 text-left p-6 bg-gray-300 bg-opacity-90 shadow-md rounded">
            <div className="md:w-1/2 md:mr-4 mb-8 md:mb-0">
              <h1>Tarjetas a nombre de {JSON.parse(name)}</h1>
              <table className=" w-full my-4 mr-10">
                <thead>
                  <tr className="bg-gradient-to-t from-gray-100 to-gray-400">
                    <th className="px-4 py-2 border-b border-gray-300">Nombre</th>
                    <th className="px-4 py-2 border-b border-gray-300">Numero</th>
                    <th className="px-4 py-2 border-b border-gray-300">cvv</th>
                    <th className="px-4 py-2 border-b border-gray-300">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {datos.length > 0 ? (
                    datos.map((user, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 border-b border-gray-300">{user.nombre}</td>
                        <td className="px-4 py-2 border-b border-gray-300">{user.numero}</td>
                        <td className="px-4 py-2 border-b border-gray-300">{user.cvv}</td>
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
              </div>
            <div className="md:w-1/2 md:ml-4">
              <form onSubmit={handleFormSubmit} className="mt-4 md:mt-0">
                <div className="mb-4">
                  <label htmlFor="nombre" className="block mb-2 font-semibold">Nombre en la Tarjeta:</label>
                  <input type="text" id="nombre" name="nombre" className="w-full px-3 py-2 border rounded" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="numero" className="block mb-2 font-semibold">Número de Tarjeta:</label>
                  <input type="text" id="numero" name="numero" className="w-full px-3 py-2 border rounded" placeholder="#### #### #### ####" minLength="16" maxLength="16" required />
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label htmlFor="cvv" className="block mb-2 font-semibold">CVV:</label>
                    <input type="text" id="cvv" name="cvv" className="w-full px-3 py-2 border rounded" placeholder="###" minLength="3" maxLength="3" required />
                  </div>
                </div>
                <button type="submit" className="h-10 w-full bg-gradient-to-t text-white rounded-md from-gray-500 hover:bg-gray-600 transition duration-300">Añadir Tarjeta</button>
              </form>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );

  
}

export default MetodosPago;
