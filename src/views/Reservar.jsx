import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'; // Importar plugin de vista de tiempo
import interactionPlugin from '@fullcalendar/interaction'; // Para interacciones como selecciones
import Header from '../componets/Header';
import Footer from '../componets/Footer';
import { format } from 'date-fns';
import Modal from 'react-bootstrap/Modal';
import esLocale from '@fullcalendar/core/locales/es';


function Reservar() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
    fecha: '',
    eventoId: null,
    tarjeta: '', 
  });
  const [eventos, setEventos] = useState([]);
  const [tarjetas, setTarjetas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/FullCalendar/public/api/eventos')
      .then(response => response.json())
      .then(data => {
        const eventosCalendario = data.map(evento => ({
          title: evento.nombre,
          start: evento.fecha_hora_inicio,
          end: evento.fecha_hora_fin,
          id: evento.id,
        }));
        setEventos(eventosCalendario);
      })
      .catch(error => console.log(error));

    fetchTarjetasUsuario();
  }, []);

  const fetchTarjetasUsuario = () => {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
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
      setTarjetas(data.user);
    })
    .catch(error => {
      console.error('Error en Fetch:', error);
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateSelect = (selectInfo) => {
    const startDate = format(selectInfo.start, "yyyy-MM-dd'T'HH:mm:ss");
    setFormData({ ...formData, fecha: startDate });
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); 
  };

  const handleEventClick = (clickInfo) => {
    const startDate = format(new Date(clickInfo.event.start), "yyyy-MM-dd'T'HH:mm:ss");
    const eventoId = clickInfo.event.id; 
    setFormData({ 
      ...formData, 
      fecha: startDate, 
      eventoId, 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); 

    try {
      const response = await fetch('http://localhost:8080/FullCalendar/public/api/insertar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json(); 

      if (!response.ok) {
        throw new Error(data.message || 'Error al enviar los datos de la reserva');
      }

      setModalMessage('Reserva realizada con éxito.'); 
      setShowModal(true);

    } catch (error) {
      console.error('Error durante la reserva o eliminación del evento: ', error);
      setModalMessage(error.toString()); 
      setShowModal(true);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    // Recuperar nombre y email del localStorage
    const storedName = JSON.parse(localStorage.getItem('name'));
    const storedEmail = JSON.parse(localStorage.getItem('email'));
  
    // Establecer nombre y email en el estado formData
    setFormData({
      ...formData,
      nombre: storedName,
      email: storedEmail,
    });
  }, []);

  return (
    <>
    
    <div className="flex flex-col min-h-screen lg:min-h-[100vh]">
        <div className="flex-grow bg-cover bg-center" style={{ backgroundImage: `url('./src/assets/reservar.jpg')` }}>
          <div className="flex flex-col items-center justify-center flex-grow">
          </div>
          <div className="ml-50 mt-48 flex flex-col md:flex-row justify-center items-start">
            <Header />
            <div className="opacity-90 calendar-container w-1/2 max-h-[7000px] overflow-hidden m-4 p-4 bg-gray-200 shadow-lg rounded-lg md:mr-4">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth" // Cambiar a la vista de mes
              selectable={true}
              locale={esLocale}
              events={eventos}
              select={handleDateSelect}
              eventClick={handleEventClick}
              aspectRatio={1.35}
            />
            </div>
          <form onSubmit={handleSubmit} className="opacity-80 font-bold form-container m-4 p-4 w-50 shadow-lg rounded-xl bg-white">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del evento"
            value={formData.nombre}
            onChange={handleChange}
            readOnly={!!formData.nombre} // Se vuelve readOnly si formData.nombre tiene un valor
            className="mb-4 appearance-none block w-full h-12 px-3 py-2 border-black border-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            readOnly={!!formData.email} // Se vuelve readOnly si formData.email tiene un valor
            className="mb-4 appearance-none block w-full h-12 px-3 py-2 border-black border-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <input
            type="text"
            name="asunto"
            placeholder="Asunto"
            value={formData.asunto}
            onChange={handleChange}
            className="mb-4 appearance-none block w-full h-12 px-3 py-2 border-black border-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <textarea
            name="mensaje"
            placeholder="Mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            className="mb-4 appearance-none block w-full h-24 px-3 py-2 border-black border-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
          <input
            type="text"
            name="fecha"
            placeholder="Fecha y Hora Seleccionada"
            value={formData.fecha}
            onChange={handleChange}
            className=" appearance-none block w-full h-12 px-3 py-2 border-black border-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            readOnly
          />
          <select
            name="tarjeta"
            onChange={handleChange}
            value={formData.tarjeta}
            className="mt-4 mb-4 appearance-none block w-full h-12 px-3 py-2 border-black border-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Seleccionar tarjeta</option>
            {tarjetas.map(tarjeta => (
              <option key={tarjeta.id} value={tarjeta.numero}>
                Tarjeta termianda en ...{tarjeta.numero.substring(tarjeta.numero.length - 4)} {/* Muestra solo los últimos cuatro dígitos */}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="px-4 opacity-100 py-2 ml-52 mt-6  h-14 w-80 text-sm font-medium text-white rounded-md bg-gradient-to-t from-gray-500  hover:bg-gray-600 transition duration-300 ">
            
            Enviar Reserva
          </button>
        </form>

            </div>
          </div>
          <Footer />
        </div>
        <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalMessage}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <button onClick={handleClose} className="h-10 w-full bg-gradient-to-t text-white rounded-md from-gray-500 hover:bg-gray-600 transition duration-300">
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>
        </>
  );
  
  
}

export default Reservar;
