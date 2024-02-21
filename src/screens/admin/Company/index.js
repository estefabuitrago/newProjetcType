"use client";
import React, { useState, useEffect } from "react";
import { MenuAdmin } from "../../../components";
import "bootstrap/dist/css/bootstrap.css";
import { profile } from "../../../theme";
// import PhotoUser from "@/app/src/Assets/img/user3.jpg";
import { api, resources } from "../../../utils/sdk";

const Company = () => {
  const [data, setData] = React.useState([]);

  const [values, setValues] = useState({});
  const [search, setSearch] = useState(true);

  const handleCompany = async () => {
    if (values.nit && values.name) {
      try {
        if (values.nit) {
          await api.put(`${resources.company}${values.id}/`, values);
          console.log("Este es el value ", values);
        } else {
          await api.post(`${resources.company}/`, values);
        }
      } catch (e) {}
    } else {
      alert("NIT y NOMBRE DE LA EMPRESA son campos obligatorios.");
      console.log("Estoy en el error");
    }
  };

  const getCompany = async () => {
    const response = await api.get(`${resources.company}`);
    if (response.data.length > 0) {
      setValues(response.data[0]);
      setSearch(false);
    }
  };
  useEffect(() => {
    if (search) getCompany();
  }, []);

  return (
    <div className="content">
      <div className="menu-component">
        <MenuAdmin />
      </div>
      <div className="home-admin">
        <div className="title">
          <p>Empresa</p>
        </div>
        <div className="card-profile">
          <div className="row">
            <div className="col-lg-3 col-md-12 col-sm-12 col-sm-12 photo-role">
              <div className="photo-profile">
                {/* <Image
                  src={PhotoUser}
                  alt=""
                  sizes="100vw"
                  className="photo-user"
                /> */}
              </div>
              <p className="name-user">Empresa</p>

              {values.lema && (
                <div className="role-user">
                  <p>
                    <b className="sub-title">Lema: </b> {values.lema}
                  </p>
                </div>
              )}
            </div>
            <div className="col-lg-9 col-md-12 col-sm-12 col-sm-12 info-user">
              <div className="row ">
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-input">
                  <p className="sub-title">NIT</p>
                  <input
                    value={values.nit}
                    type="text"
                    onChange={(e) =>
                      setValues({ ...values, nit: e.target.value })
                    }
                  ></input>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-input">
                  <p className="sub-title">NOMBRE DE LA EMPRESA</p>
                  <input
                    value={values.name}
                    type="text"
                    onChange={(e) =>
                      setValues({ ...values, name: e.target.value })
                    }
                  ></input>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-input">
                  <p className="sub-title">TELÉFONO</p>
                  <input
                    value={values.phone}
                    type="text"
                    onChange={(e) =>
                      setValues({ ...values, phone: e.target.value })
                    }
                  ></input>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-input">
                  <p className="sub-title">EMAIL</p>
                  <input
                    value={values.email}
                    type="text"
                    onChange={(e) =>
                      setValues({ ...values, email: e.target.value })
                    }
                  ></input>
                </div>
                <div className="col-12 form-input">
                  <p className="sub-title">DIRECCIÓN</p>
                  <input
                    value={values.address}
                    type="text"
                    onChange={(e) =>
                      setValues({ ...values, address: e.target.value })
                    }
                  ></input>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-input">
                  <p className="sub-title">LINK DE FACEBOOK</p>
                  <input
                    value={values.facebook}
                    type="text"
                    onChange={(e) =>
                      setValues({ ...values, facebook: e.target.value })
                    }
                  ></input>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-input">
                  <p className="sub-title">WHATSAPP</p>
                  <input
                    value={values.whatsapp}
                    type="text"
                    onChange={(e) =>
                      setValues({ ...values, whatsapp: e.target.value })
                    }
                  ></input>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-input">
                  <p className="sub-title">LINK DE INSTAGRAM</p>
                  <input
                    value={values.instagram}
                    type="text"
                    onChange={(e) =>
                      setValues({ ...values, instagram: e.target.value })
                    }
                  ></input>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-input">
                  <p className="sub-title">SITIO WEB</p>
                  <input
                    value={values.twitter}
                    type="text"
                    onChange={(e) =>
                      setValues({ ...values, twitter: e.target.value })
                    }
                  ></input>
                </div>
                <div className="col-12 form-input">
                  <p className="sub-title">Lema</p>
                  <input
                    value={values.lema}
                    type="text"
                    onChange={(e) =>
                      setValues({ ...values, lema: e.target.value })
                    }
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <button className="btn-uptade" onClick={(e) => handleCompany()}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Company;
