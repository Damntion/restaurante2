import React from 'react';
import App from '../../views/App';
import {Routes, Route} from 'react-router-dom';
import Login from '../../views/Login';
import TusReservas from '../../views/TusReservas';
import Reservar from '../../views/Reservar';
import MetodosPago from '../../views/MetodosPago';

class Router extends React.Component{
    render()
    {
        //Este es el archivo de rutas, que se utilizar para organizar las redirecciones de los componentes u elementos de la pagina
        return (
            
            <Routes>
                {/*rutas de los componenetes y elementos de la paguina, se definen a travez de la libreria de enrutamiento de react, mas concretamente de las etiquetas
                Routes(contenedor para agrupar varias rutas) y Route(define las rutas de los componentes)*/

                /*la ruta "/" es la ruta raiz*/}
                <Route
                    path='/'
                    element={<App />}
                />
                <Route
                    path='/Login'
                    element={<Login />}
                />
                <Route
                    path='/TusReservas'
                    element={<TusReservas />}
                />
                <Route
                    path='/Reservar'
                    element={<Reservar />}
                />
                <Route
                    path='/MetodosPago'
                    element={<MetodosPago />}
                />
            </Routes>
        
        );
    }
}
export default Router;
