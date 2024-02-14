import React from 'react'
import { Link } from 'react-router-dom';

const HomeAdmin = () => {
    return ( 
        <div>
            <p>Este es el home de admin</p>
            <Link to="/">Inicio</Link>
        </div>
     );
}
 
export default HomeAdmin;