import React from "react";
import Modal from "react-modal";
// import imagen from "@/app/src/Assets/img/img.jpg";
import { modalAgent } from "../../theme";

export const ModalAgent = ({ isOpen, onRequestClose, info }) => {
  console.log(info);
  return (
    <div className="body-modal">
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Detalles del pedido"
        className="modal-agent"
      >
        <h1 className="titulo-modal">Solicitud agente</h1>
        <div className="close-button" onClick={onRequestClose}>
          X
        </div>
        <div className="info-agent">
          <div>
            <h2 className="sub-modal">Información del agente</h2>
            <p>
              <spam className="text">Nombre: </spam>
              <spam className="text2">{info.account.name}</spam>
            </p>
            <p>
              <spam className="text">Teléfono: </spam>
              <spam className="text2">{info.account.phone}</spam>
            </p>
            <p>
              <spam className="text">Email: </spam>
              <spam className="text2"> {info.account.email}</spam>
            </p>
            <p>
              <spam className="text"> Dirección: </spam>
              <spam className="text2"> {info.account.address}</spam>
            </p>
          </div>
          {/* <div>
            <Image
              className="circle-image-modal"
              src={imagen}
              alt=""
              sizes="100vw"
            />
          </div> */}
        </div>
        <h2 className="sub-modal">Información del agente</h2>
        <p>
          <spam className="text"> Servicio que ofrece: </spam>
          <spam className="text2"> {info.services}</spam>
        </p>
        <p>
          <spam className="text"> Años de experiencia: </spam>
          <spam className="text2"> {info.year_experience}</spam>
        </p>
      </Modal>
    </div>
  );
};
