"use client"
import React,{useState,useEffect} from 'react'
import { MenuAdmin } from "../../../../components"
import { profile } from '../../../../theme'
import 'bootstrap/dist/css/bootstrap.css'
// import PhotoUser from '@/app/src/Assets/img/user-profile.png'
import { resources,api } from '../../../../utils/sdk'
import { Alerts } from '../../../../components'
import { Link } from 'react-router-dom'

const AddUser = () => {
    const [account,setAccount]=useState({state_id:1})
    const [showAlert,setShowAlert]=useState(0)
    const [selectTypeAccount,setSelectTypeAccount]=useState([])
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    const getTypeAccount=async()=>{
        const response= await api.get(`${resources.typeaccounts}`)
        setSelectTypeAccount(response.data)
    }

    // useEffect(()=>{
    //     getTypeAccount()
    // },[])

    const getAccount=async()=>{
        console.log(account)
        if(account.name=='' || account.name==undefined || account.last_name=='' || account.last_name==undefined ||account.email=='' || account.email==undefined || account.password=='' || account.password==undefined|| account.type_account_id==0|| account.type_account_id==undefined){
            setShowAlert(3)
        }else{
            if(!pattern.test(account.email)){
                setShowAlert(4)
            }else{
                try{
                    await api.post(`${resources.account}`, account)
                    setShowAlert(1);
                    setTimeout(() => {
                        router.push("/src/Page/Admin/Users/TableUsers")
                    }, 2000);
                }catch{
                    setShowAlert(2)
                    console.error("Error al hacer la solicitud PUT");
                }
            }
        }        
    }

    return (
      <div className="content">
        <div className="menu-component">
          <MenuAdmin />
        </div>
        <div className="home-admin">
          <div className="title">
            <p>Ingresar nuevo usuario</p>
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
                  <select
                    onChange={(e) =>
                      setAccount({
                        ...account,
                        type_account_id: e.target.value,
                      })
                    }
                  >
                    <option value={0}>Selecciona una opcion</option>
                    {selectTypeAccount.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-lg-9 col-md-12 col-sm-12 col-sm-12 info-user">
                <div className="row ">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-input">
                    <p className="sub-title">NOMBRE</p>
                    <input
                      type="text"
                      onChange={(e) =>
                        setAccount({ ...account, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-input">
                    <p className="sub-title">APELLIDOS</p>
                    <input
                      type="text"
                      onChange={(e) =>
                        setAccount({ ...account, last_name: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-input">
                    <p className="sub-title">TELÉFONO</p>
                    <input
                      type="text"
                      onChange={(e) =>
                        setAccount({ ...account, phone: e.target.value })
                      }
                    ></input>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-input">
                    <p className="sub-title">EMAIL</p>
                    <input
                      type="text"
                      onChange={(e) =>
                        setAccount({ ...account, email: e.target.value })
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
                      onChange={(e) =>
                        setAccount({ ...account, address: e.target.value })
                      }
                    ></input>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-input">
                    <p className="sub-title">CONTRASEÑA</p>
                    <input
                      type="password"
                      onChange={(e) =>
                        setAccount({ ...account, password: e.target.value })
                      }
                    ></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showAlert === 1 ? (
            <Alerts style="success">Usuario guardado correctamente</Alerts>
          ) : showAlert === 2 ? (
            <Alerts style="error">Error al guardar el usuario</Alerts>
          ) : showAlert === 3 ? (
            <Alerts style="error">Por favor llena todos los campos</Alerts>
          ) : showAlert === 4 ? (
            <Alerts style="error">Correo invalido</Alerts>
          ) : (
            ""
          )}
          <div>
            <button onClick={() => getAccount()} className="btn-uptade">
              Registrar usuario
            </button>
            <Link className="btn-uptade" to="/usuarios">
              Volver
            </Link>
            {/* <button className='btn-uptade' onClick={()=>router.push("/src/jsx/components/dashboardAdmin/users/")}>Volver</button> */}
          </div>
        </div>
      </div>
    );
}

export default AddUser;