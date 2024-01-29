import React, { useState } from 'react';
import axios from 'axios';
import $ from 'jquery';
import Register from './Register';

export const Login = () => {


  //creamos una variable llamada datosForm y le damos un estado con cada uno de los datos del formulario en strings vacios 
  const [datosForm, setdatosForm] = useState({
    email: '',
    password: '',
  });

  //Hacemos un login haciendo una solicitud con axios
  const loginAxios = (event) => {
    //con esta funcion evitamos que se recarge el formulario cuando se recarga
    event.preventDefault();
    
    //obtenemos los datos de la variable datosForm y los guardamos en variables con los nombres necesarios para la consulta
    const user = {
      email: datosForm.email,
      password: datosForm.password,
    };


    $.ajax({
      url: "http://localhost:8080/FullCalendar/public/api/login",
      method: 'POST',
      data: user,
      dataType: 'json',
      success: function (response) {
        console.log('Usuario autenticado correctamente', response);
      },
      error: function (error) {
        console.error('Error al autenticar usuario:', error.responseJSON.message);
      }
    });


  };


  //actualiza los datos de estado de la variable datosForm cogiendo los datos de los imputs, desectructurandolos y actualizandoselos a las variables de estado
  const cambiosForm = (event) => {
    const { name, value } = event.target;
    setdatosForm({ ...datosForm, [name]: value });
  };

  //creamos una variable para leer el estado del texto para registrarse, por predetermiando le ponemos el stado a false 
  const [eventRegister, seteventRegister] = useState(false);

  //creamos una funcion de flecha para que cuando se clicke sobre el texto para registrarse el estado se ponga a true
  const clickRegister=()=>{
    seteventRegister(true);
  }


  return (
    /*Estructura del formulario de login con la funcion "loginAxios"*/
    <div className="w-full max-w-md mx-auto p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Bienvenido de nuevo!</h2>
        <p className="text-gray-500 dark:text-gray-400">Por favor ingrese aqui sus credenciales.</p>
      </div>
      <form className="space-y-4" onSubmit={loginAxios}>
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

    <button onClick={clickRegister} className="text-blue-800 font-bold">Si no tiene cuenta registrase pulsando aqui</button>
                  {eventRegister && <Register />}
    </div>
  );
};

export default Login;
