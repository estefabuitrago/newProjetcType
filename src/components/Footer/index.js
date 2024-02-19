/** @format */

"use client";
import React, { useState } from "react";
// import { footer } from "@/app/src/Style";
// import { routers } from "@/app/src/Routers";
import MenuIcon from "@mui/icons-material/Menu";

export const Footer = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="all-footer">
      <h1 className="contact">Contactos</h1>
      <div className="Footer">
        <h1 className="sitio-web">Sitio web:</h1>

        <div className="content-contact">
          <div className="subtitle"><h3>Oficina local de turismo</h3></div>
          <div>
              <div></div>
              <div><h3>{}</h3></div>
              <div><h3>{}</h3></div>
          </div>
        </div>
      </div>
      <div className="black-rectangle"></div>
    </div>
  );
};

