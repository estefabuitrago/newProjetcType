import React, { useState } from "react";
import MenuUserRight from "./MenuUserRight";
import { menuUser } from '../../theme'
import { Link } from 'react-router-dom';
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { auth } from "@/app/src/Components/Auth/index";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const MenuUser = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="all-menu">
      <div className={`Menu${openMenu ? "-open" : ""}`}>
        <div className="menu-logo">
          <div className="logo"></div>
        </div>
        <div className={`menu-content-user${openMenu ? "-open" : ""}`}>
          <div className="ul-menu no-cell">
            <Link to="/" className="link-menu-right">Inicio</Link>
          </div>
          <div className="ul-menu no-cell">
            <Link to="/rutas" className="link-menu-right">Rutas</Link>
          </div>
          <div className="ul-menu no-cell">
          <Link to="/servicios" className="link-menu-right">Servicios</Link>
          </div>
          <div className="ul-menu no-cell">
          <Link to="/tienda" className="link-menu-right">Tienda</Link>
          </div>
          {/* {auth.token !== "rosk" ? (
            <>
              <div className="ul-menu no-cell">
                <Link className="link-menu" href={routers.Auth}>
                  <p>Inicia sesión</p>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="ul-menu no-cell">
                {/* <Link className="link-menu" href={routers.cart}>
                  <ShoppingCartIcon className="icon" />
                </Link> */}
              {/* </div>
              <div className="ul-menu no-cell"> */}
                {/* <Link className="link-menu" href={routers.Auth}>
                  <AccountCircleIcon className="icon" />
                  <p>Hola, {auth.users.name}</p>
                </Link> */}
              {/* </div>
              <div className="ul-menu button-menu-right">
                <button onClick={() => setOpenMenu(!openMenu)}>
                  {openMenu ? (
                    <CloseRoundedIcon className="icon-menu-right" />
                  ) : (
                    <MenuIcon className="icon-menu-right" />
                  )}
                </button>
              </div>
            </> */}
          {/* )} */}
        </div>
      </div>
      {/* {auth.token !== "rosk" ? (
            <>
            </>
          ) : (
            <>
               <MenuUserRight style={openMenu} />
            </>
          )} } */}
     
    </div>
  );
};

export default MenuUser;
