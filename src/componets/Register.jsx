import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export default function Register() {

  //creamos una variable llamada datosForm y le damos un estado con cada un o de los datos del formulario en string vacios 
  const [datosForm, setDatosForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [modalMessage, setModalMessage] = useState(''); // Mensaje del modal
  const handleClose = () => setShowModal(false);
  const navigate = useNavigate();


  const loginFetch = (event) => {
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
    
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then(data => {
      console.log('Usuario registrado correctamente', data);
      localStorage.setItem('token', data.token); 
      setModalMessage('Usuario registrado con éxito.');
      setShowModal(true);
      setTimeout(()=>{
        navigate('/');
      }, 3000);
    })
    .catch(error => {
      console.error('Error al autenticar usuario:', error.message);
     });
  };

  //actualiza los datos de estado de la variable datosForm cogiendo los datos de los imputs, desectructurandolos y actualizandoselos a las variables de estado
  //{ ...datosForm }: Copia el estado actual (datosForm) usando el operador de propagación (...), y actualiza los datos de las variables con el valor del imput.
  const cambiosForm = (event) => {
    const { name, value } = event.target;
    setDatosForm({ ...datosForm, [name]: value });
  };
  
  return (
    <>
    <form className="space-y-4" onSubmit={loginFetch}>
        <div className="space-y-2">
          <label htmlFor="name" className="block  text-lg font-bold text-gray-700">
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
            className="appearance-none block w-full h-12 px-3 py-2 border-2 border-black rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="name"
          />
        </div>
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
          <label htmlFor="password" className="block  text-lg font-bold text-gray-700">
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
            className="appearance-none block w-full h-12 px-3 py-2 border-2 border-black rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Password"
          />
        </div>
        <div className="mt-4 text-center">
          <button
            type="submit"
            className="px-4 py-2 h-14 w-80 text-sm font-medium text-white rounded-md bg-gradient-to-t from-gray-500 hover:bg-gray-600 transition duration-300"
          >
            Registrarse
          </button>
        </div>
      </form>

      <Modal 
      show={showModal} 
      onHide={handleClose}
      dialogClassName="bg-gray-50 border-gray-300" // Personaliza el diálogo del modal si es necesario
      contentClassName="border-0" // Elimina el borde por defecto del contenido del modal
    >
      <Modal.Header closeButton className="bg-gray-50 border-b border-gray-300">
        <Modal.Title className="text-gray-800">Aviso</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-gray-50 text-gray-800">{modalMessage}</Modal.Body>
      <Modal.Footer className="bg-gray-50 border-t border-gray-300">
        <Button 
          onClick={handleClose} 
          className="bg-gray-800 hover:bg-gray-700 text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}