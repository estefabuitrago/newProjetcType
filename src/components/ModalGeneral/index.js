import React,{useState,useCallback} from "react";
import Modal from "react-modal";
import { modalAgent } from "../../theme";
import 'bootstrap/dist/css/bootstrap.css'
import TextField from '@mui/material/TextField';
import { useDropzone } from 'react-dropzone';
import { resources,api } from '../../utils/sdk'
import {Button,Alerts} from '../'

export const ModalGeneral=({children, isOpen, close,className})=>{
    return(
    <div className="body-modal"> 
    <Modal
      isOpen={isOpen}
      onRequestClose={close}
      className={className}
      ariaHideApp={false}
    >
        {children}
    </Modal>
    </div>
    )
}