import React,{useState,useEffect} from 'react'
import { Image } from 'react-bootstrap';
import { api, resources } from "@/app/src/utils/sdk/";
import { styleInventory } from '@/app/src/Style';

const ImgProducts=({id,className})=>{
    const [pathImg,setPathImg]=useState()

    const getImg=async()=>{
        if(id!=null){
            try{
                const response = await api.get(`${resources.files}${id}`)
                setPathImg(response.data.file)
            }catch{
                console.error("Error al cargar la imagen:", error);
            }
        }
    }

    useEffect(() => {
        getImg();
      }, []);

    return (
        <Image className={className} width={100} height={100} src={pathImg}/>
    )
}

export default ImgProducts