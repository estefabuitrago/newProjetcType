import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
    return ( 
        <div>
            <p>Este es el home</p>
            <p><Link to="/rutas">Rutas</Link></p>
            <p><Link to="/admin">Admin</Link></p>
        </div>
     );
}
 
export default Home;