import React from "react";
import Modal from "react-modal";
import { Button } from '../index.js';
import { homeUser, card, modalCard } from '../../theme'
// import {modalCard} from '@/app/src/style/'
import { Image } from "react-bootstrap";

const ModalCard = ({
  isOpen,
  onRequestClose,
  info,
  isSale,
}) => {
  return (
    <div className="body-modal"> 
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Detalles del pedido"
      className={`${isSale ? 'modal-products-store': 'modal-card'}`}
    >
      <div className={`${isSale ? 'info-products': 'info-card'}`}> 
          {isSale ?
          <div className="row">
            <div className="col-5">
              <Image src={info.file.file}/>
            </div>
            <div className="col-7 info-modal-products">
              <h1 className="titulo-modal">{info.name}</h1> 
              <div className="close-button" onClick={onRequestClose}>
                X
              </div>
              <p><b>Precio: </b>{info.price}</p>
              <p><b>Stock: </b>{info.stock}</p>
              <p><b>Descripcion: </b>{info.description}</p>
              <p><b>Unidades: </b>{info.amount}</p>
              {/* <div class="row">
                <div className="col-6">
                  <Button className="button-orange btn-modal-products">Agregar al carrito</Button>
                </div>
                <div className="col-6">
                  <Button className="button-orange btn-modal-products">Comprar ahora</Button>
                </div>
              </div> */}
            </div>
            
          </div>
          :
          <div>
            <h1 className="titulo-modal">Más información</h1> 
            <div className="close-button" onClick={onRequestClose}>
              X
            </div>
          <p>
            <spam className="text">{info}</spam>
          </p>
          </div>
          }
        </div>
    </Modal>
    </div>
  );
};

export default ModalCard;
