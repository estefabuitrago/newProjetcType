import React, { useState, useEffect } from "react";
import { profile } from "../../../../theme";
import "bootstrap/dist/css/bootstrap.css";
// import PhotoUser from '@/app/src/Assets/img/user-profile.png'
import { api, resources } from "../../../../utils/sdk";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Alerts,MenuAdmin } from "../../../../components";
import Filter from './select';

const EditUser = () => {
  const { id } = useParams();
  const [showAlert, setShowAlert] = useState(0);
  const [user, setUser] = useState([]);
  let navigate = useNavigate();

  const getAccount = async () => {
    const response = await api.get(`${resources.account}${id}/`);
    setUser(response.data);
  };

  useEffect(() => {
    getAccount();
  }, [id]);

  const editAccount = async () => {
    console.log(user);
    if (user.name == "" || user.last_name == "" || user.email == "") {
      setShowAlert(3);
    } else {
      const response = await api
        .put(`${resources.account}${id}/`, user)
        .then((response) => {
          setShowAlert(1);
          setTimeout(() => {
            navigate("/usuarios");
          }, 2000);
        })
        .catch((error) => {
          setShowAlert(2);
          console.error("Error al hacer la solicitud PUT");
        });
    }
  };

  return (
    <div className="content">
      <div className="menu-component">
        <MenuAdmin />
      </div>
      <div className="profile">
        <div className="title">
          <p>Editar usuario</p>
        </div>
        <div className="card-profile">
          <div className="row">
            <div className="col-lg-3 col-md-12 col-sm-12 col-sm-12 photo-role">
              <div className="photo-profile">
                {/* <Image src={PhotoUser} alt='' sizes="100vw" className='photo-user'/> */}
              </div>
              <p className="name-user">Selecciona una foto</p>
              <div className="role-user">
                <p className="sub-title">ROL</p>
                {}
                <Filter idType={user.type_account_id} idUser={user.id} onChange={(e)=>setUser({...user,type_account_id:e.target.value})}/>
              </div>
            </div>
            <div className="col-lg-9 col-md-12 col-sm-12 col-sm-12 info-user">
              <div className="row ">
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-input">
                  <p className="sub-title">NOMBRE</p>
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-input">
                  <p className="sub-title">APELLIDOS</p>
                  <input
                    type="text"
                    value={user.last_name}
                    onChange={(e) =>
                      setUser({ ...user, last_name: e.target.value })
                    }
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-input">
                  <p className="sub-title">TELÉFONO</p>
                  <input
                    type="text"
                    value={user.phone}
                    onChange={(e) =>
                      setUser({ ...user, phone: e.target.value })
                    }
                  ></input>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-input">
                  <p className="sub-title">EMAIL</p>
                  <input
                    type="text"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  ></input>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-input">
                  <p className="sub-title">DEPARTAMENTO</p>
                  <select>
                    <option>Selecciona una opcion</option>
                  </select>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-input">
                  <p className="sub-title">MUNICIPIO</p>
                  <select>
                    <option>Selecciona una opcion</option>
                  </select>
                </div>
                <div className="col-12 form-input">
                  <p className="sub-title">DIRECCIÓN DE RESIDENCIA</p>
                  <input
                    type="text"
                    value={user.address}
                    onChange={(e) =>
                      setUser({ ...user, address: e.target.value })
                    }
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showAlert === 1 ? (
          <Alerts style="success">Usuario editado correctamente</Alerts>
        ) : showAlert === 2 ? (
          <Alerts style="error">Error! no se pudo editar el usuario</Alerts>
        ) : showAlert === 3 ? (
          <Alerts style="error">Por favor llena todos los campos</Alerts>
        ) : (
          ""
        )}
        <div>
          <button onClick={() => editAccount()} className="btn-uptade">
            Editar usuario
          </button>
          <Link className="btn-uptade" to="/usuarios">
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
