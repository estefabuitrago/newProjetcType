import React, { useState } from "react";
// import { menuUser } from "@/app/src/Style";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { auth } from "@/app/src/Components/Auth/index";

const MenuUserRight = ({ style }) => {
  // const router = useRouter();
  const [menu, setMenu] = useState(false);
  const [userName, setUserName] = useState("Nombre de Usuario");

  const toggleMenu = (option) => {
    setMenu(option);
  };

  const handleEditProfile = () => {
    router.push("/src/Page/User/profile");
    toggleMenu(false);
  };

  const handleHome = () => {
    router.push("/src/Page/User/home");
    toggleMenu(false);
  };

  const handleRoutes = () => {
    router.push("/src/Page/User/route");
    toggleMenu(false);
  };

  const handleServices = () => {
    router.push("/src/Page/User/service");
    toggleMenu(false);
  };

  const handleBecomeAgent = () => {
    router.push("/src/Page/User/requestAgent");
    toggleMenu(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Eliminadmos datos
    localStorage.removeItem("users");
    router.push("/src/Page/User/Home");
    window.location.reload();
    toggleMenu();
  };

  return (
    <div>
      <div className={`menu-right${style ? "-open" : ""}`}>
        <div className="ul-menu-right">
          <div className="menu-options">
            <AccountCircleIcon className="icon-circle-right" />
            <p className="nameUser">{userName}</p>
            <button className="btn-menu-right no-web" onClick={handleHome}>
              Inicio
            </button>
            <button className="btn-menu-right no-web" onClick={handleRoutes}>
              Rutas
            </button>
            <button className="btn-menu-right no-web" onClick={handleServices}>
              Servicios
            </button>
            <button className="btn-menu-right" onClick={handleEditProfile}>
              Editar Perfil
            </button>
            {auth.users.type_account===2 ? 
            <Link className="btn-menu-right" href={routers.publicationsAgent}>Mis publicaciones</Link>
            :
            <Link className="btn-menu-right" href={routers.requestAgent}>Quiero ser agente</Link>
            }
            <button className="btn-menu-right" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuUserRight;
