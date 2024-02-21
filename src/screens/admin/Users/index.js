import React, { useState, useEffect } from "react";
import { profile, alerts } from "../../../theme";
import "bootstrap/dist/css/bootstrap.css";
// import PhotoUser from '@/app/src/Assets/img/user-profile.png'
import { api, resources } from "../../../utils/sdk";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Alerts,
  MenuAdmin,
  ModalAgent,
  ModalAction,
  BtnSwitch,
} from "../../../components";
import "bootstrap/dist/css/bootstrap.css";
// import imagen from "@/app/src/Assets/img/img.jpg";
import TextField from "@mui/material/TextField";
// import {alerts,page} from "@/app/src/Style"

const Users = () => {
  const [requestFilter, setRequestFilter] = useState(false);
  const [stateShowMore, setShowMore] = useState(false);
  const [idUser, setIdUser] = useState();
  const [accounts, setAccounts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [requests, setRequests] = useState([]);
  const [observation, setObservation] = useState();
  const [showAlert, setShowAlert] = useState(0);
  const [onlyRequest, setOnlyRequest] = useState();
  const [aceptarModalIsOpen, setAceptarModalIsOpen] = useState(false);
  const [rechazarModalIsOpen, setRechazarModalIsOpen] = useState(false);
  const requestPerPage = 5;

  const showMore = (id, stateShow) => {
    setIdUser(id);
    if (id === idUser && stateShowMore === true) {
      setShowMore(false);
    } else {
      setShowMore(stateShow);
    }
  };

  const getAccounts = async () => {
    const response = await api.get(`${resources.account}`);
    setAccounts(response.data);
  };

  const changeState = async (id) => {
    const response = await api.get(`${resources.account}${id}`);
    let user = response.data;

    if (user.state_id === 1) {
      user.state_id = 2;
    } else {
      user.state_id = 1;
    }
    const response2 = await api.put(`${resources.account}${id}/`, user);
    getAccounts();
  };

  const getRequests = async () => {
    const response = await api.get(`${resources.request}?state=1`);
    setRequests(response.data);
  };

  const openAceptarModal = async (item) => {
    item.account.type_account_id = 2;
    item.state_id = 2;
    console.log(item.account);
    try {
      await api.put(`${resources.request}${item.id}/`, item);
      await api.put(`${resources.account}${item.account.id}/`, item.account);
      setAceptarModalIsOpen(true);
      setShowAlert(2);
      setTimeout(() => {
        setAceptarModalIsOpen(false);
        getRequests();
        getAccounts()
      }, 2000);
    } catch {
      console.log("Error");
    }
    setAceptarModalIsOpen(true);
  };

  const closeAceptarModal = () => {
    setAceptarModalIsOpen(false);
  };

  const openRechazarModal = (item) => {
    setRechazarModalIsOpen(true);
    setOnlyRequest(item);
  };

  const denyRequest = async () => {
    if (observation === undefined || observation === "") {
      setShowAlert(1);
    } else {
      onlyRequest.observ = observation;
      onlyRequest.state_id = 2;
      console.log(onlyRequest);
      try {
        await api.put(`${resources.request}${onlyRequest.id}/`, onlyRequest);
        setShowAlert(2);
        setTimeout(() => {
          setRechazarModalIsOpen(false);
          getRequests();
        }, 2000);
      } catch {
        console.log("Error");
      }
    }
  };

  const closeRechazarModal = () => {
    setRechazarModalIsOpen(false);
    setShowAlert(0);
    setObservation("");
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setModal(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModal(false);
  };

  useEffect(() => {
    getRequests();
    getAccounts();
  }, []);

  const pageCount = Math.ceil(requests.length / requestPerPage);
  const displayedRequest = requests.slice(
    pageNumber * requestPerPage,
    (pageNumber + 1) * requestPerPage
  );

  const pageCountAccounts = Math.ceil(accounts.length / requestPerPage);
  const displayedAccounts = accounts.slice(
    pageNumber * requestPerPage,
    (pageNumber + 1) * requestPerPage
  );

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const getCurrentPage = pageNumber + 1;
  const pageSeparator = " - ";

  return (
    <div className="content">
      <div className="menu-component">
        <MenuAdmin />
      </div>
      <div className="home-admin">
        <div className="title">
          <p>Usuarios</p>
        </div>
        <div className="info-users">
          <div className="filter-users">
            <button
              className={`btn-filter-user ${
                requestFilter ? "" : "active-filter"
              }`}
              onClick={() => setRequestFilter(false)}
            >
              Usuarios
            </button>
            <button
              className={`btn-filter-user ${
                requestFilter ? "active-filter" : ""
              }`}
              onClick={() => setRequestFilter(true)}
            >
              Solicitudes
            </button>
          </div>
          <div>
            {requestFilter ? (
              <div id="root">
                <div className="scroll">
                  <div className="table-request">
                    <div className="header-table">
                      <p className="column-table">Nombre</p>
                      <p className="column-table">Servicio que ofrece</p>
                      <p className="column-table">Teléfono</p>
                      <p className="column-table">Mostrar más</p>
                      <p className="column-table">Acciones</p>
                    </div>
                    {displayedRequest.map((item, index) => (
                      <div key={index} className="body-table-request">
                        <div className="user column-table">
                          <div className="photo-u">
                            {/* <Image
                              src={imagen}
                              alt=""
                              sizes="100vw"
                              className="photo-user"
                            /> */}
                          </div>
                          <p className="name-user">{item.account.name}</p>
                        </div>
                        <p className="column-table">{item.services}</p>
                        <p className="column-table">{item.account.phone}</p>
                        <div className="column-table">
                          <button
                            type="button"
                            className="btnMas"
                            onClick={() => openModal(item)}
                          >
                            Mostrar más
                          </button>
                        </div>
                        <div className="column-table colum-actions">
                          <button
                            type="button"
                            className="btnAccept"
                            onClick={() => openAceptarModal(item)}
                          >
                            Aceptar
                          </button>
                          <button
                            type="button"
                            className="btnDecline"
                            onClick={() => openRechazarModal(item)}
                          >
                            Rechazar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pagination">
                    <span
                      className="pagination-arrow"
                      onClick={() => {
                        if (pageNumber > 0) {
                          setPageNumber(pageNumber - 1);
                        }
                      }}
                    >
                      {" < "}
                    </span>
                    {getCurrentPage}
                    {pageSeparator}
                    {pageCount}
                    <span
                      className="pagination-arrow"
                      onClick={() => {
                        if (pageNumber < pageCount - 1) {
                          setPageNumber(pageNumber + 1);
                        }
                      }}
                    >
                      {" > "}
                    </span>
                  </div>
                </div>
                {selectedItem && (
                  <ModalAgent
                    isOpen={modal}
                    onRequestClose={closeModal}
                    info={selectedItem}
                  />
                )}
                <ModalAction
                  isOpen={aceptarModalIsOpen}
                  onRequestClose={closeAceptarModal}
                  Accept="true"
                  title="Aceptar solicitud"
                  onAccept={() => {
                    closeAceptarModal();
                  }}
                >
                  <p className="text-accept">Solicitud aceptada</p>
                </ModalAction>
                <ModalAction
                  isOpen={rechazarModalIsOpen}
                  onRequestClose={closeRechazarModal}
                  title="Rechazar Solicitud"
                  // showReasonInput={true}
                  // onReject={handleRejectWithReason}
                  // Accept={false}
                >
                  <TextField
                    id="outlined-multiline-static"
                    label="Motivo del rechazo del agente"
                    multiline
                    rows={4}
                    onChange={(e) => setObservation(e.target.value)}
                  />
                  {showAlert === 1 ? (
                    <Alerts style="error">
                      No puedes dejar el campo vacio
                    </Alerts>
                  ) : showAlert === 2 ? (
                    <Alerts style="success">Solicitud rechazada</Alerts>
                  ) : (
                    ""
                  )}
                  <div className="btn-actions">
                    <button
                      className="btn-action"
                      onClick={() => closeRechazarModal()}
                    >
                      Cerrar
                    </button>
                    <button
                      className="btn-action"
                      onClick={() => denyRequest()}
                    >
                      Rechazar
                    </button>
                  </div>
                </ModalAction>
              </div>
            ) : (
              <div className="scroll">
                <div className="form-add">
                  <Link className="btn-article btn-add" to="/nuevoUsuario">
                    Agregar usuario
                  </Link>
                </div>
                <div className="table-users">
                  <div className="header-table">
                    <p className="column-table">Usuario</p>
                    <p className="column-table">Email</p>
                    <p className="column-table">Telefono</p>
                    <p className="column-table">Rol</p>
                    <p className="column-table">Acciones</p>
                    <p className="column-table">Estado</p>
                  </div>
                  {displayedAccounts.map((item, index) => (
                    <div key={index} className="body-table">
                      <div className="main-info">
                        <div
                          className="info-table"
                          onClick={() => showMore(item.id, true)}
                        >
                          <div className="user column-table">
                            <div className="photo-u">
                              {/* <Image
                                src={PhotoUser}
                                alt=""
                                sizes="100vw"
                                className="photo-user"
                              /> */}
                            </div>
                            <p className="name-user">
                              {item.name} {item.last_name}
                            </p>
                          </div>
                          <p className="column-table">{item.email}</p>
                          <p className="column-table">{item.phone}</p>
                        </div>
                        <div className="actions-table">
                          <div className="column-table">
                            {item.type_account.name}
                          </div>
                          <div className="column-table">
                            <Link
                              className="btn-edit"
                              to={`/usuarios/editar/${item.id}`}
                            >
                              Editar
                            </Link>
                          </div>
                          <div className="column-table">
                            <BtnSwitch onClick={() => changeState(item.id)}>
                              {item.state_id == 1 ? "Activo" : "Inactivo"}
                            </BtnSwitch>
                          </div>
                        </div>
                      </div>
                      {idUser === item.id ? (
                        stateShowMore ? (
                          <div
                            className="secondary-info"
                            onClick={() => showMore(item.id, true)}
                          >
                            <div className="title-more-info">
                              <b>Mas información</b>
                            </div>
                            <div className="more-info">
                              <p className="text-more-info">
                                <b className="sub-title-more">Dirección:</b>
                                {item.address}
                              </p>
                            </div>
                            <div>
                              {item.type_account == 2 ? (
                                <p className="text-more-info">
                                  <b className="sub-title-more">
                                    Años de experiencia:
                                  </b>
                                  {item.experience}
                                </p>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
                </div>
                <div className="pagination">
                  <span
                    className="pagination-arrow"
                    onClick={() => {
                      if (pageNumber > 0) {
                        setPageNumber(pageNumber - 1);
                      }
                    }}
                  >
                    {" < "}
                  </span>
                  {getCurrentPage}
                  {pageSeparator}
                  {pageCountAccounts}
                  <span
                    className="pagination-arrow"
                    onClick={() => {
                      if (pageNumber < pageCountAccounts - 1) {
                        setPageNumber(pageNumber + 1);
                      }
                    }}
                  >
                    {" > "}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
