import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
  
  //creamos una variable llamada datosForm y le damos un estado con cada un o de los datos del formulario en string vacios 
  const [datosForm, setDatosForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  


  const RegistroAxios = (event) => {
    //con esta funcion evitamos que se recarge el formulario cuando se recarga
    event.preventDefault();
    
    //obtenemos los datos de la variable datosForm y los guardamos en variables con los nombres necesarios para la consulta
    const user = {
      email: datosForm.email,
      password: datosForm.password,
      name: datosForm.name,
    };

    //url de la consulta a la API del restaurante 
    const url = 'http://localhost:8080/FullCalendar/public/api/register';
    //Se utiliza la url y los datos del usuario que se pasaran con el metodo post para registrarlo en la base de datos
    axios.post(url, user)
      .then(respuesta => console.log(respuesta.data.token))
      .catch(error => console.log(error));
  };

  //actualiza los datos de estado de la variable datosForm cogiendo los datos de los imputs, desectructurandolos y actualizandoselos a las variables de estado
  //{ ...datosForm }: Copia el estado actual (datosForm) usando el operador de propagación (...), y actualiza los datos de las variables con el valor del imput.
  const cambiosForm = (event) => {
    const { name, value } = event.target;
    setDatosForm({ ...datosForm, [name]: value });
  };
  
  return (
    /*Estructura del formulario de registro con la funcion "RegistroAxios"*/ 
    <form className="space-y-4" onSubmit={RegistroAxios}>
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={datosForm.name}
            onChange={cambiosForm}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="name"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={datosForm.email}
            onChange={cambiosForm}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Email"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={datosForm.password}
            onChange={cambiosForm}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Password"
          />
        </div>
        <div className="mt-4 text-center">
          <button
            type="onSubmit"
            className="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-md
            hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
          >
            Iniciar sesion
          </button>
        </div>
      </form>
  )
}