
export const CardsHome = ({title,Icon,link,style}) => {
    return ( 
        <div>
            <div className='info-card-home'>
                <div className={`icono-quick${style}`}>
                    {Icon}
                </div>
                <p>{title}</p>
            </div>
            {/* <Link className={`btn-quick-link${style}`} href={link}>Ir</Link> */}
            
        </div>
    );
}
 
