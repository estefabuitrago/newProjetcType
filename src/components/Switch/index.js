import React from 'react'
import { btnSwitch } from '../../theme';

export const BtnSwitch = ({children,onClick}) => {
    const state=true
    return ( 
        <button onClick={onClick} className={`btn-state ${children==='Activo' ? 'active-btn' : 'inactive'}`}><div className='circle'></div>{children}</button>
     );
}
 