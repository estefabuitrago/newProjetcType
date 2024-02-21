import React,{useState,useEffect} from 'react'
import { api,resources } from '../../../../utils/sdk'

const Filter=({idType,idUser,onChange})=>{
    const [myTypeAccount,setMyTypeAccount]=useState([])
    const [othersTypes,setOtherTypes]=useState([])

    console.log(idType)

    const getTypeAccount=async()=>{
        const response= await api.get(`${resources.typeaccounts}`)
        const my=response.data.filter(item=>item.id==idType)
        const others=response.data.filter(item=>item.id!=idType)
        setMyTypeAccount(my)
        setOtherTypes(others) 
    }    

    useEffect(()=>{
        getTypeAccount()       
    },[idUser])


    return(
        <select onChange={onChange}>
            {myTypeAccount.map((item,index)=>(
                <option selected key={index} value={item.id}>{item.name}</option>
            ))}
            {othersTypes.map((item2,index)=>(
                <option key={index} value={item2.id}>{item2.name}</option>
            ))}
        </select>
    )
}

export default Filter