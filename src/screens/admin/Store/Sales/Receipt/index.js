import React, { useState, useEffect } from "react";
import { receipt } from '../../../../../theme'
import { resources,api } from '../../../../../utils/sdk'
import { useParams,Link } from "react-router-dom"
import { MenuAdmin } from "../../../../../components"

const Receipt = () => {
  const [receipts, setReceipts] = useState([]);
  const [billing, setBilling] = useState([]);
  const {id}=useParams()
  console.log(id)

//   const getBilling=async()=>{
//       const response = await api.get(`${resources.billing}${id}/`)
//       setBilling(response.data);
//   }

//   const getReceipt = async () => {
//     try {
//       const response = await api.get(`${resources.detailbilling}`);
//       console.log(response.data);
//       setReceipts(response.data);
//     } catch (error) {
//       console.error("Error fetching receipt:", error);
//     }
//   };

//   useEffect(() => {
//     getReceipt();
//     getBilling();
//   }, []);

  const data = {
    cliente: "Jon Bon Jovi",
    numeroFactura: "123456",
    date: "20/09/2023",
    total: "56.000",
    numeroContacto: "3000000000",
    direction: "Marinilla-Antioquia cra30 #32-45",
    email: "prueba@example.com",
  };

  const totalProduct = (amount, price) => {
    return amount * price;
  };
  const totalAll = () => {
    return receipts ? receipts.reduce((total, item) => total + item.total, 0) : 0;
  };

  return (
    <div className='content'>
        <div className='menu-component'>
            <MenuAdmin/>      
        </div>
        <div className='home-admin'>
            <h1 className="title">Recibo de venta</h1>
            {Array.isArray(receipts) ? (
                receipts.map((item, index) => (
                    <div key={index} className="headerReceipt">
                        <p className="p1">{`N° Factura:`}</p>
                        <p className="p2">{item.id}</p>
                        <p className="p1">{`Fecha:`}</p>
                        <p className="p2">{item.created}</p>
                        <br />
                    </div>
                ))
            ) : (
                <div className="headerReceipt">
                    <p className="p1">{`N° Factura:`}</p>
                    <p className="p2">Cargando...</p>
                    <p className="p1">{`Fecha:`}</p>
                    <p className="p2">Cargando...</p>
                </div>
            )}
            <div>
                <p className="p3">{`Información del comprador`}</p>
            </div>
            <div className="headerReceipt2">
                <p className="p1">{`Nombre:`}</p>
                <p className="p2">{data?.cliente}</p>
                <p className="p1">{`Teléfono:`}</p>
                <p className="p2">{data?.numeroContacto}</p>
                <p className="p1">{`Email:`}</p>
                <p className="p2">{data?.email}</p>
            </div>
            <div className="headerReceipt">
                <p className="p1">{`Dirección:`}</p>
                <p className="p2">{data?.direction}</p>
            </div>
            <table className="tableReceipt table-striped">
            <thead className="headTable">
                <tr className="tableTitle ">
                <th>Cantidad</th>
                <th>Producto</th>
                <th>Precio unitario</th>
                <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(receipts) ? (
                receipts.map((item, index) => (
                    <tr key={index} className="bodyTableReceipt">
                    <td>{item.amount}</td>
                    <td>{item.product}</td>
                    <td>{item.price}</td>
                    <td>{totalProduct(item.amount, item.price)}</td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan="4">Cargando...</td>
                </tr>
                )}
            </tbody>
            </table>
        <div className="btnReceipt">
            <Link to="/ventas" className="btnReturn">Volver</Link>
            <button className="buttonReceipt">Total: {totalAll()}</button>
        </div>
        </div>
    </div>
  );
};

export default Receipt;
