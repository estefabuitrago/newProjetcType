import React from 'react'
import { buttonTitle } from '../../theme'

export const Button = ({children,className,onClick}) => {
    return ( 
        <button className={`${className}`} onClick={onClick}>{children}</button>
     );
}
