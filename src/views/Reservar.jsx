import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'; // Importar plugin de vista de tiempo
import interactionPlugin from '@fullcalendar/interaction'; // Para interacciones como selecciones
import Header from '../componets/Header';
import Footer from '../componets/Footer';
import { format } from 'date-fns';



function Reservar() {
   // Intenta recuperar nombre y email del localStorage, o establece cadenas vacías si no existen
   const storedName = JSON.parse(localStorage.getItem('name'));
   const storedEmail = JSON.parse(localStorage.getItem('email'));
 
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

      if (!response.ok) {
        throw new Error('Error al enviar los datos de la reserva');
      }
  
     // Comprobando que eventoId está presente antes de intentar eliminar el evento
    if (formData.eventoId) {
      await eliminarEvento(formData.eventoId);
      console.log("Evento eliminado con éxito");
    } else {
      console.log("ID del evento no está disponible. Verificar handleEventClick.");
    }

    } catch (error) {
      console.error('Error durante la reserva o eliminación del evento: ', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen lg:min-h-[150vh]">
      <div className="flex-grow bg-cover bg-center mt-24" style={{ backgroundImage: `url('./src/assets/reservar.jpg')` }}>
        <div className="flex flex-col items-center justify-center flex-grow">
          <Header />
        </div>
        <div className="ml-80 mt-32 flex flex-col md:flex-row">
          <div className="calendar-container m-4 p-4 h-100 shadow-lg rounded-lg bg-white md:mr-4">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
              selectable={true}
              select={handleDateSelect}
              events={eventos}
              eventClick={handleEventClick}
            />
          </div>
          <form onSubmit={handleSubmit} className="form-container m-4 p-4 shadow-lg rounded-lg bg-white">
              
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="appearance-none block w-full h-12 px-3 py-2 border-black border-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="appearance-none block w-full h-12 px-3 py-2 border-black border-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <input
              type="text"
              name="asunto"
              placeholder="Asunto"
              value={formData.asunto}
              onChange={handleChange}
              className="appearance-none block w-full h-12 px-3 py-2 border-black border-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <textarea
              name="mensaje"
              placeholder="Mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              className="appearance-none block w-full h-24 px-3 py-2 border-black border-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
            <input
              type="text"
              name="fecha"
              placeholder="Fecha y Hora Seleccionada"
              value={formData.fecha}
              onChange={handleChange}
              className="appearance-none block w-full h-12 px-3 py-2 border-black border-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              readOnly
            />
            <button
              type="submit"
              className="mt-4 px-4 py-2 h-14 w-full text-sm font-medium text-white rounded-md bg-gradient-to-t from-gray-500 to-gray-700 hover:bg-gray-600 transition duration-300"
            >
              Enviar Reserva
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
  
  
}

export default Reservar;
