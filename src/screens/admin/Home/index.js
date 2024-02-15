"use client";
import React from 'react'
import { CardsHome } from '../../../components';
// import MenuAdmin from '@/app/src/Components/navAdmin/page'
// import { homeAdmin } from '@/app/src/Style'
// import ImageAdmin from '@/app/src/Assets/img/admin.png'
// import PhotoUser from '@/app/src/Assets/img/user4.jpg'
import 'bootstrap/dist/css/bootstrap.css'
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ListIcon from '@mui/icons-material/List';
import PersonIcon from '@mui/icons-material/Person';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BusinessIcon from '@mui/icons-material/Business';
import CategoryIcon from '@mui/icons-material/Category';
import SourceIcon from '@mui/icons-material/Source';
import GroupIcon from '@mui/icons-material/Group';

const HomeAdmin = () => {
    return ( 
        <div className='content'>
            <div className='menu-component'>
                {/* <MenuAdmin/>       */}
            </div>
            <div className='home-admin'>
                <div className='title-info-home title-home'>
                    <p>Inicio</p>
                </div>
                <div className='user-profile'>
                    <div className='row separate'>
                        <div className='col-lg-8 col-md-12 col-sm-12'>
                            <div className='row'>
                                <div className='col-12 user-home'>
                                    <p className='text-welcome'>¡Bienvenido admin!</p>
                                    <div className='img-admin'>
                                        {/* <Image src={ImageAdmin} alt='' sizes="100vw"/> */}
                                    </div>
                                </div>
                                <p className="title title-quick-link">Enlaces rapidos</p>
                                <div className='quick-link'>
                                    <div className='row quick-link'>
                                        <div className='col-lg-3 col-md-3 col-sm-4 card-quick-link'>
                                            <CardsHome title='Menus' Icon={<ListIcon/>} link="./menu" style='1'/>             
                                        </div>
                                        <div className='col-lg-3 col-md-3 col-sm-4 card-quick-link'>
                                            <CardsHome title='Publicaciones' Icon={<SourceIcon/>} link="./article" style='2'/>  
                                        </div>
                                        <div className='col-lg-3 col-md-3 col-sm-4 card-quick-link'>
                                            <CardsHome title='Usuarios' Icon={<PersonIcon/>} link="./users" style='3'/>  
                                        </div>
                                    </div>
                                    <div className='row quick-link'>
                                        <div className='col-lg-3 col-md-3 col-sm-4 card-quick-link'>
                                            <CardsHome title='Empresa' Icon={<BusinessIcon/>} link="./company" style='1'/>  
                                        </div>
                                        <div className='col-lg-3 col-md-3 col-sm-4 card-quick-link'>
                                            <CardsHome title='Tienda' Icon={<LocalGroceryStoreIcon/>} link="./store" style='2'/>  
                                        </div>
                                        <div className='col-lg-3 col-md-3 col-sm-10 card-quick-link'>
                                            <CardsHome title='Categorias' Icon={<CategoryIcon/>} link="./category" style='3'/>  
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-3 col-md-12 col-sm-12 col-sm-12 profile-home' >
                            <p className='title-info-home title-profile'>Perfil</p>
                            <div className='photo'>
                                {/* <Image src={PhotoUser} alt='' sizes="100vw" className='photo-user'/> */}
                            </div>
                            <p className='title-info-home'>Roger Meddows Taylor</p>
                            <button className='btn-quick-link3' onClick={() =>router.push("./profile")}>Ir al perfil</button>
                            <div className="data-totals">
                                <div className="data-icon-color1">
                                    <div className="data-icon">
                                        <GroupIcon className='icon-totals'/>
                                    </div>
                                </div>
                                <div className="data-info">        
                                    <p>Total de agentes</p>
                                    <p className="number-data1">29</p>
                                </div>
                            </div>
                            <div className="data-totals">
                                <div className="data-icon-color2">
                                    <div className="data-icon">
                                        <ListAltIcon className='icon-totals'/>
                                    </div>
                                </div>
                                <div className="data-info">        
                                    <p>Total de publicaciones</p>
                                    <p className="number-data2">29</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default HomeAdmin;