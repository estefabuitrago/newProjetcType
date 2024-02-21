import React from "react";
import { homeAdmin, sale,storeAdmin } from "../../../theme";
import ImageStore from "../../../assets/img/shoppingCart.png";
import "bootstrap/dist/css/bootstrap.css";
import { CardsHome, MenuAdmin } from "../../../components";
import ReceiptIcon from "@mui/icons-material/Receipt";
import StoreIcon from "@mui/icons-material/Store";
import { Image } from "react-bootstrap";

const Store = () => {
  return (
    <div className="content">
      <div className="menu-component">
        <MenuAdmin />
      </div>
      <div className="home-admin">
        <p className="title-store">Tienda</p>
        <div className="row row-store">
          <div className="col-10 welcome-store">
            <div className="row row-welcome">
              <div className="col-lg-7 col-md-12 col-sm-12 text-welcome">
                <p>¡Bienvenido a la tienda!</p>
              </div>
              <div className="col-lg-5">
                <div className="img-store">
                  <Image src={ImageStore} alt="" sizes="100vw" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-10">
            <div className="row card-store">
              <div className="col-lg-5 col-md-5 col-sm-12 card-quick-link">
                <CardsHome
                  title="Ventas"
                  Icon={<ReceiptIcon />}
                  link="/ventas"
                  style="1"
                />
              </div>
              <div className="col-lg-5 col-md-5 col-sm-12 card-quick-link">
                <CardsHome
                  title="Inventario"
                  Icon={<StoreIcon />}
                  link="/inventario"
                  style="2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
