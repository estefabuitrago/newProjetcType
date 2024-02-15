import React from 'react'
import { MenuAdmin } from '../../../../components';
import { sale } from '../../../../theme'
import { Link } from 'react-router-dom';
import { resources,api } from '../../../../utils'

const Sale = () => {

    const [sales,setSales]=useState([])

  const getSales=async()=>{
      try{
        const response=await api.get(`${resources.billing}`)
        setSales(response.data)
        console.log(response.data)
      }catch (err){
        console.log("Error",err)
      }
  }

  useEffect(()=>{
    getSales()
  },[])

  return (
    <div className='content'>
        <div className='menu-component'>
            <MenuAdmin/>      
        </div>
        <div className='home-admin'>
            <h1 className="title">Bienvenido Admin</h1>
            <h2 className="subTitle">Ventas</h2>
            <div className="tableSale">
            <table className="table table-striped">
        <thead className='headTable'>
          <tr className='tableTitle '>
            <th>Cliente</th>
            <th>N° factura</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>N° de contacto</th>
            <th>Más</th>
          </tr>
        </thead>
        <tbody>
        {/* {sales.map((item, index) => ( */}
          <tr className='bodyTable'>
            <td>Jon bon jovi</td>
            {/* <td>{item.id}</td>
            <td>{item.date}</td>
            <td>{item.price}</td> */}
            <td>3000000000</td>
            <td>3000000000</td>
            <td>3000000000</td>
            <td>3000000000</td>
            <td>
              {/* <Link href={`/src/Page/Admin/Store/Sale/${item.id}`}>Ver recibo</Link> */}
              {/* <Link
                    className="btn-edit"
                    
                  >
                    Editar
                  </Link> */}
            </td> 
          </tr>
        {/* ))} */}
        </tbody>
      </table>
            </div>
        </div>
    </div>
  );
};
 
export default Sale;