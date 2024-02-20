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
   // Intenta recuperar nombre y email del localStorage, o establece cadenas vacías si no existen
   const storedName = JSON.parse(localStorage.getItem('name'));
   const storedEmail = JSON.parse(localStorage.getItem('email'));
   const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
   const [modalMessage, setModalMessage] = useState(''); // Mensaje del modal
   const handleClose = () => setShowModal(false);
 
   const [formData, setFormData] = useState({
    nombre: storedName,
    email: storedEmail,
    asunto: '',
    mensaje: '',
    fecha: '',
    eventoId: null,
  });

  const [eventos, setEventos] = useState([]);
 
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
   }, []);
 
   const handleDateSelect = (selectInfo) => {
    const startDate = format(selectInfo.start, "yyyy-MM-dd'T'HH:mm:ss");
    setFormData({ ...formData, fecha: startDate });
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // Limpia la selección visual en el calendario
  };
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const handleEventClick = (clickInfo) => {
    const startDate = format(new Date(clickInfo.event.start), "yyyy-MM-dd'T'HH:mm:ss");
    const eventoId = clickInfo.event.id; // Asegúrate de definir eventoId aquí antes de usarlo
    setFormData({ 
      ...formData, 
      fecha: startDate, 
      eventoId, // Ahora correctamente definido antes de ser usado
    });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Recuperamos el token almacenado
  
    try {
      const response = await fetch('http://localhost:8080/FullCalendar/public/api/insertar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Asegúrate de que el token se maneje adecuadamente
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json(); // Suponiendo que el servidor devuelve JSON
  
      if (!response.ok) {
        throw new Error(data.message || 'Error al enviar los datos de la reserva');
      }
  
      // Respuesta positiva del servidor
      setModalMessage('Reserva realizada con éxito.'); // Mensaje de éxito
      setShowModal(true); // Mostrar modal
  
    } catch (error) {
      console.error('Error durante la reserva o eliminación del evento: ', error);
      setModalMessage(error.toString()); // Mensaje de error
      setShowModal(true); // Aún puedes optar por mostrar el modal con el mensaje de error
    }
  };
  

  return (
    <>
    
    <div className="flex flex-col min-h-screen lg:min-h-[100vh]">
        <div className="flex-grow bg-cover bg-center" style={{ backgroundImage: `url('./src/assets/reservar.jpg')` }}>
          <div className="flex flex-col items-center justify-center flex-grow">
          </div>
          <div className="ml-50 mt-48 flex flex-col md:flex-row justify-center items-start">
            <Header />
            <div className="opacity-90 calendar-container w-1/2 max-h-[500px] overflow-hidden m-4 p-4 bg-gray-200 shadow-lg rounded-lg md:mr-4">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
              selectable={true}
              locale={esLocale} // Configuración de idioma a español
              events={eventos} // Asegúrate de que 'eventos' tenga la estructura correcta
              select={handleDateSelect}
              eventClick={handleEventClick}
              slotMinTime="12:00:00" // Hora de inicio a las 12 PM
              slotMaxTime="24:00:00" // Extiende hasta las 12 AM (fin del día)
              aspectRatio={1.35}
            />
            </div>
          <form onSubmit={handleSubmit} className="opacity-80 font-bold form-container m-4 p-4 w-50 shadow-lg rounded-lg bg-white">
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
