import React,{useState,useEffect} from 'react'
import { users } from '../../../theme';
import { MenuAdmin } from "../../../components"
import 'bootstrap/dist/css/bootstrap.css'
import { resources,api } from '../../../utils/sdk'
import { Link } from 'react-router-dom';

const Users = () => {
    const [request,setRequest]=useState(false)
    const [stateShowMore, setShowMore] = useState(false);
    const [idUser, setIdUser] = useState();
    const [state, setState] = useState();
    const [accounts, setAccounts] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const accountsPerPage = 5;

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

//   useEffect(() => {
//     getAccounts();
//   });

  const pageCount = Math.ceil(accounts.length / accountsPerPage);
  const displayedAccounts = accounts.slice(
    pageNumber * accountsPerPage,
    (pageNumber + 1) * accountsPerPage
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
        <div className='info-users'>
            <div className='filter-users'>
                <button className={`btn-filter-user ${request ? '' : 'active-filter'}`} onClick={()=>setRequest(false)}>Usuarios</button>
                <button className={`btn-filter-user ${request ? 'active-filter' : ''}`} onClick={()=>setRequest(true)}>Solicitudes</button>
            </div>                    
            <div>
                {request ? '' :
                <div className="scroll">
                <div className="form-add">
                    <Link className="btn-article btn-add" to="/nuevoUsuario">Agregar usuario</Link> 
                  {/* <Link  href={routers.addUserAdmin}>Agregar usuario</Link> */}
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
                              <Image
                                src={PhotoUser}
                                alt=""
                                sizes="100vw"
                                className="photo-user"
                              />
                            </div>
                            <p className="name-user">
                              {item.name} {item.last_name}
                            </p>
                          </div>
                          <p className="column-table">{item.email}</p>
                          <p className="column-table">{item.phone}</p>
                        </div>
                        <div className="actions-table">
                          <div className="column-table">{item.type_account.name}</div>
                          <div className="column-table">
                            <Link
                              className="btn-edit"
                              href={`/src/Page/Admin/Users/${item.id}`}
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
                                  <b className="sub-title-more">Años de experiencia:</b>
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
                }
            </div>
        </div>
        </div>
      </div>
    );
}
 
export default Users;