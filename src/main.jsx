import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './componets/routes/Router'
import './estilos/index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
    //componente padre que se utiliza para almacenar todos los demas componentes, utiliza la API de historial de html
        //despues se renderizan el componentes de rutas
    <BrowserRouter>
    <Router/>
    </BrowserRouter>
)
