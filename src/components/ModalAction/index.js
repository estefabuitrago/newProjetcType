"use client"
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { modalAction } from "../../theme";

export const ModalAction = ({
  isOpen,
  onRequestClose,
  children,
  title
}) => {

  return (
    <div className="body-modal">
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Actions"
        className="modal-action"
      >
        <h2 className="titulo-modal">{title}</h2>
        {children}
      </Modal>
    </div>
  );
};


