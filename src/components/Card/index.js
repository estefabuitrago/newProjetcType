"use client"
import React, { useState } from "react";
import ModalCard from "./ModalCard";

export const Card = ({ children, info, styles, buttonStyles, textButton,isSale }) => {
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setModal(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModal(false);
  };

  return (
    <div className={`${styles}`}>
      {children}
      <div className="col-12 text-center">
        <button 
        className={buttonStyles}
        info={info} 
        onClick={openModal}>
          {/* Ver más información */}
          {textButton}
        </button>
      </div>
      {selectedItem && (
        <ModalCard
          isOpen={modal}
          onRequestClose={closeModal}
          info={info}
          isSale={isSale}
        />
      )}
    </div>
  );
};



// Card.propTypes = {
//   children: PropTypes.node,
//   info: PropTypes.string,
//   cardStyles: PropTypes.string,
//   buttonStyles: PropTypes.string,
// };

// Card.defaultProps = {
//   cardStyles: "",
//   buttonStyles: "",
// };

// export default Card;
