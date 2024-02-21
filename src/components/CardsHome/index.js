import { Link } from 'react-router-dom';

export const CardsHome = ({title,Icon,link,style}) => {
    return ( 
        <div>
            <div className='info-card-home'>
                <div className={`icono-quick${style}`}>
                    {Icon}
                </div>
                <p>{title}</p>
            </div>
            <p><Link className={`btn-quick-link${style}`} to={link}>Ir</Link></p>    
        </div>
    );
}
 
