import React, {useState,useEffect,useCallback} from 'react'
import { resources,api } from '../../../../utils/sdk'
// import ImgProducts from './img';
import { inventory,modalAgent } from '../../../../theme'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { BtnSwitch,ModalGeneral,Button,Alerts,MenuAdmin } from '../../../../components';
import { useDropzone } from 'react-dropzone';
import TextField from '@mui/material/TextField';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { Image } from 'react-bootstrap';
import MenuItem from '@mui/material/MenuItem';

const Inventory = () => {
    const [modal, setModal] = useState(false)
    const [modalEdit,setModalEdit]=useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [products,setProducts]=useState([])
    const [product,setProduct]=useState({state:1})
    const [photo,setPhoto]=useState()
    const [showAlert,setShowAlert]=useState(0)
    const [especificProduct, setEspecificProduct]=useState({})
    const [addImage,setAddImage]=useState(0)
    const [categories,setCategories]=useState([])
    const [otherCategories,setOtherCategories]=useState([])

    const fetchProducts = async () => {
        try {
          const response = await api.get(`${resources.products}`);
          setProducts(response.data);
        } catch (error) {
          console.error("Error al cargar las categorías:", error);
        }
      };  

    // const getCategories=async()=>{
    //     try{
    //         const response=await api.get(`${resources.categoriesProducts}`)
    //         setCategories(response.data)
    //     }catch{
    //         console.log(error)
    //     }
    // }

      const addFile=async(file)=>{
        setAddImage(1)
        try{
        const save=await api.post(`${resources.files}`, file)
        setPhoto(save.data)
        setAddImage(2)
        }catch{
            console.log("error ingresando la imagen")
        }
      }

    const onDrop = useCallback(acceptedFiles => {
        const formData = new FormData();
        formData.append(`file`, acceptedFiles[0]);
        setPhoto(formData)
        addFile(formData)
      }, [])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    const saveProduct=async()=>{
        const objProduct=product
        objProduct.file_id=photo.id
        if(product.name===undefined || product.category_id===undefined || product.category_id===0){
            setShowAlert(1)
        }else{
            try{
                await api.post(`${resources.products}`, product)
                setShowAlert(2)
                setTimeout(() => {
                    setModal(false)
                    setAddImage(false)
                    fetchProducts()
                    setShowAlert(0)
                }, 2000);
            }catch (err){
                setShowAlert(3)
                console.error("Error al hacer la solicitud Post",err);
            }
        }   
    }

    const editProduct=async()=>{
        if(especificProduct.name===''|| especificProduct.amount===''||especificProduct.stock===''||especificProduct.price===''){
            setShowAlert(1)
        }else{
            try{
                await api.put(`${resources.products}${especificProduct.id}/`, especificProduct)
                setShowAlert(2)
                setTimeout(() => {
                    setModalEdit(false)
                    fetchProducts()
                    setShowAlert(0)
                }, 2000)
            }catch{
                setShowAlert(3)
            }            
        }
    }

    const changeState=async(data)=>{
        if(data.state==1){
           data.state=2 
        }else{
            data.state=1
        }
        await api.put(`${resources.products}${data.id}/`,data)
        fetchProducts()
    }

    const closeModal = () => {
        setSelectedItem(null)
        setModal(false)
        setModalEdit(false)
        setShowAlert(0)
        setAddImage(false)
    };

    useEffect(() => {
        fetchProducts()
        // getCategories()
      }, []);

     const getEspecificProduct=(data)=>{
        setModalEdit(true)
        setEspecificProduct(data)
        if(categories.length>0){
            setOtherCategories(categories.filter((item)=>item.id!=data.category_id))
        }
     }

     const borrar=async(id)=>{
        await api.delete(`${resources.products}${id}/`)
        fetchProducts()
     }

    return ( 
        <div className='content'>
        <div className='menu-component'>
            <MenuAdmin/>      
        </div>
        <div>
            <h1>Inventario</h1>
            <div className='col-12 text-right'>
                <button className='btn-add-product' onClick={()=> setModal(true)}>Agregar producto <ControlPointIcon/></button>
            </div>
            <ModalGeneral isOpen={modal} close={closeModal} className='modal-add-product'>
                <div className="row">
                    <div className="col-5 file-add-product">
                        {addImage===2 ? 
                         <Image width={100} height={100} src={photo.file}/>
                        :
                        addImage===1 
                        ?
                        <div className='button-add-image'>
                            <p>Cargando imagen, espere un momento</p>
                            <span class="loader"></span>
                        </div>
                        :
                         <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {
                                isDragActive ?
                                <p>Drop the files here ...</p> :
                                <div className='button-add-image'>
                                    <CloudUploadOutlinedIcon/>
                                    <button>Subir foto</button>
                                </div>
                            }
                        </div>
                        }
                    </div>
                    <div className="col-7 form-add-product">
                        <h1 className="titulo-modal">Agregar productos</h1> 
                        <div className="close-button" onClick={closeModal}>
                            X
                        </div>
                        <div className="row">
                            <TextField 
                            onChange={(e)=> setProduct({...product,name:e.target.value})} id="outlined-basic" 
                            className="col-12 text-field-products" label="Nombre" variant="outlined" 
                            />
                            <TextField 
                            onChange={(e)=> setProduct({...product,amount:e.target.value})} 
                            id="outlined-basic" 
                            className="col-6 text-field-products" 
                            label="Cantidad" 
                            variant="outlined" 
                            />
                            <TextField 
                            onChange={(e)=> setProduct({...product,stock:e.target.value})} id="outlined-basic" 
                            className="col-6 text-field-products" 
                            label="Stock" 
                            variant="outlined" />
                            <TextField 
                            id="outlined-basic" 
                            onChange={(e)=> setProduct({...product,price:e.target.value})} className="col-6 text-field-products" 
                            label="Precio unitario" 
                            variant="outlined" 
                            />
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="Categoria"
                                className="col-6 text-field-products"
                                onChange={(e)=> setProduct({...product,category_id:e.target.value})}
                                >
                                <MenuItem value={0}>
                                    Seleccione una opcion
                                </MenuItem>
                                {categories.map((item,index)=>(
                                    <MenuItem key={index} value={item.id}>
                                    {item.name}
                                </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Descripcion"
                                className="col-12 text-field-products"
                                onChange={(e)=>setProduct({...product,description:e.target.value})}
                                multiline
                                rows={4}
                            />
                            {showAlert===1?<Alerts style="error">LLene todos los campos</Alerts>:showAlert===2?<Alerts style="success">Producto agregado exitosamente</Alerts>:showAlert===3?<Alerts style="error">No se pudo agregar el producto</Alerts>:''}
                            <div className="col-12 text-right">
                                <Button className="button-orange" onClick={()=>saveProduct()}>Agregar</Button>
                            </div>
                        </div>            
                    </div>
                </div>
            </ModalGeneral>
            <ModalGeneral isOpen={modalEdit} close={closeModal} className='modal-add-product'>
                <div className="row">
                    <div className="col-5 file-add-product">
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {
                                isDragActive ?
                                <p>Drop the files here ...</p> :
                                <p>Inserta una imagen</p>
                            }
                        </div>
                    </div>
                    <div className="col-7 form-add-product">
                        <h1 className="titulo-modal">Editar productos</h1> 
                        <div className="close-button" onClick={closeModal}>
                            X
                        </div>
                        <div className="row">
                            <TextField 
                                value={especificProduct.name} 
                            onChange={(e)=> setEspecificProduct({...especificProduct,name:e.target.value})} 
                            id="outlined-basic" 
                            className="col-12 text-field-products" 
                            label="Nombre" 
                            variant="outlined" />
                            <TextField 
                                value={especificProduct.amount} 
                                onChange={(e)=> setEspecificProduct({...especificProduct,amount:e.target.value})} 
                                id="outlined-basic" 
                                className="col-6 text-field-products" 
                                label="Cantidad" 
                                variant="outlined" 
                            />
                            <TextField 
                                value={especificProduct.stock} 
                                onChange={(e)=> setEspecificProduct({...especificProduct,stock:e.target.value})} 
                                id="outlined-basic" className="col-6 text-field-products" label="Stock" 
                                variant="outlined" 
                            />
                            <TextField 
                            value={especificProduct.price} 
                            id="outlined-basic" 
                            onChange={(e)=> setEspecificProduct({...especificProduct,price:e.target.value})} 
                            className="col-6 text-field-products" 
                            label="Precio unitario" 
                            variant="outlined" 
                            />
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="Categoria"
                                defaultValue={especificProduct.category_id}
                                className="col-6 text-field-products"
                                onChange={(e)=> setEspecificProduct({...especificProduct,category_id:e.target.value})}
                                >
                                {categories.map((item,index)=>(
                                    <MenuItem key={index} value={item.id}>
                                    {item.name}
                                </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Descripcion"
                                className="col-12 text-field-products"
                                value={especificProduct.description}
                                onChange={(e)=> setEspecificProduct({...especificProduct,description:e.target.value})}
                                multiline
                                rows={4}
                            />
                            {showAlert===1?<Alerts style="error">LLene todos los campos</Alerts>:showAlert===2?<Alerts style="success">Producto editado exitosamente</Alerts>:showAlert===3?<Alerts style="error">No se pudo editar el producto</Alerts>:''}
                            <div className="col-12 text-right">
                            <Button className="button-orange" onClick={()=>editProduct()}>Editar</Button>
                            </div>
                        </div>            
                    </div>
                </div>
            </ModalGeneral>
            <div>
                {products.map((item,index)=>( 
                    <div key={index} className='row show-product'>
                        <div className='col-3'>
                            <Image className='img-inventory' src={item.file.file}/>
                        </div>
                        <div className='col-9 info-product'>
                            <div className='row'>
                                <div className='col-3'>
                                    <p className='name-product'>{item.name}</p>
                                    <p><b>Stock:</b>{item.stock}</p>
                                    <p><b>Cantidad:</b>{item.amount}</p>
                                    <p><b>Precio:</b> ${item.price}</p>
                                </div>
                                <div className='col-6'>
                                    <p><b>Descripcion:</b>{item.description}</p>
                                </div>
                                <div className='col-3'>
                                    <div>
                                        <button onClick={()=>getEspecificProduct(item)} className='btnMas btn-edit-product'>
                                            Editar<BorderColorIcon/>
                                        </button>                                        
                                    </div>
                                    <div>
                                        <BtnSwitch onClick={()=>changeState(item)}>{item.state===1 ? 'Activo':'Inactivo'}</BtnSwitch>
                                    </div>
                                    {/* <button onClick={()=>borrar(item.id)}>Borrar</button> */}
                                </div>
                            </div>
                        </div>                   
                    </div>
                ))}
            </div>
        </div>
        </div>
     );
}
export default Inventory;