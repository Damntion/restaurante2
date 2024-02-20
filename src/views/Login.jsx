import React, { useState } from 'react';
import Register from '../componets/Register';
import Header from '../componets/Header';
import Footer from '../componets/Footer';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    // Estado para gestionar los datos del formulario de inicio de sesión
    const [datosForm, setDatosForm] = useState({
      email: '',
      password: '',
    });

  // Estado para controlar la visualización del formulario de registro
  const [eventRegister, setEventRegister] = useState(false);
  // Hook para navegar programáticamente entre rutas
  //Cuando hace el login este hook te manda a la pagina principal
  const navigate = useNavigate();

  //Solicitud a la api
  const loginFetch = (event) => {
    event.preventDefault();
    const user = {
      email: datosForm.email,
      password: datosForm.password,
    };

    fetch("http://localhost:8080/FullCalendar/public/api/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la autenticación');
      }
      return response.json();
    })
    .then(data => {
      console.log('Usuario autenticado correctamente', data);
      localStorage.setItem('token', data.token); 
      localStorage.setItem('email', JSON.stringify(data.email)); 
      localStorage.setItem('password', JSON.stringify(data.password)); 
      localStorage.setItem('id', JSON.stringify(data.id)); 
      localStorage.setItem('name', JSON.stringify(data.name)); 
      // if (data.tarjetas && data.tarjetas.length > 0) {
      //   localStorage.setItem('tarjetas', JSON.stringify(data.tarjetas));
      // } else {
      //   localStorage.removeItem('tarjetas'); 
      // } 
      setTimeout(()=>{
        navigate('/');
      }, 3000);
      
    })
    .catch(error => {
      console.error('Error al autenticar usuario:', error.message);
    });
  };

  //EsTA funcion maneja los cambios en el formulario y actualiza el estado
  const cambiosForm = (event) => {
    const { name, value } = event.target;
    setDatosForm({ ...datosForm, [name]: value });
  };
  //Maneja el evento de renderizado del componente Register
  const toggleRegister = () => {
    //De base esta en false, con esto lo ponemos a true
    setEventRegister(!eventRegister);
  };

  return (
    <div className='flex flex-col min-h-screen' style={{ backgroundImage: `url('./src/assets/login2.jpg')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center' // Centra la imagen en el div
    }} >
      
      <Header />
      <div className="w-full max-w-md mx-auto p-6 mt-32 space-y-6" >
        
        <div className="text-center">
          <h2 className="text-3xl font-bold">¡Bienvenido de nuevo!</h2>
          <p className="text-gray-500 dark:text-gray-400">Por favor ingrese aquí sus credenciales.</p>
        </div>
        <form className="space-y-4" onSubmit={loginFetch}>
          <div className="space-y-2">
            <label htmlFor="email" className="block  text-lg font-bold text-gray-700">
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
              className="appearance-none block w-full h-12 px-3 py-2 border-2 border-black rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Email"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-lg font-bold font-size-200 text-gray-700">
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
              className="appearance-none block w-full h-12 px-3 py-2 border-black border-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Password"
            />
          </div>
          <div className="mt-4 text-center">
            <button
              type="submit"
              className="px-4 py-2 h-14 w-80 text-sm font-medium text-white rounded-md bg-gradient-to-t from-gray-500  hover:bg-gray-600 transition duration-300 ">
              Iniciar sesión
            </button>
          </div>
        </form>

        <button onClick={toggleRegister} className=" text-blue-800 font-bold">Si no tiene cuenta, pulse aquí para registrarse</button>
        {eventRegister && <Register />}

      </div>
      <div className='mt-56 flex items-start bg-black py-4 text-white  bottom-0 w-full'>
      <Footer/>
      </div>
    </div>
  );
};

export default Login;
