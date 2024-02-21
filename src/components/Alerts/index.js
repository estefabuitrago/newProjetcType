import React from 'react'
import Alert from '@mui/material/Alert';
import { alerts } from '../../theme';

export const Alerts = ({style,children}) => {
    return ( 
        <Alert severity={style}>
        {children}
      </Alert>
    );
}
