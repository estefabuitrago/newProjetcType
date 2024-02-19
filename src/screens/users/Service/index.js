"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Carousel } from "react-bootstrap";
import { api,resources } from "../../../utils/sdk";
import { MenuUser, Button, IconoMouse, Card, Search, Footer } from '../../../components';
import { service, card } from '../../../theme'
// import parse from "html-react-parser";

const Service = () => {
  const [data, setData] = React.useState([]);
  const [article, setArticle] = useState([]);
  const [search, setSearch] = useState(true);
  const [values, setValues] = useState([]);
  const [filter, setFilter] = useState("?tags=1")
  const [mainCarrousel,setMainCarrousel]=useState([])
  const [activeFilter,setActiveFilter]=useState(1)

  const initialState = {
    Hospedaje: false,
    Restaurante: false,
    Entretenimiento: false,
  };
  const getMainCarousel=async()=>{
    const response= await api.get(`${resources.article}?category=3&tags=7`)
    setMainCarrousel(response.data)
  }  

  const [buttonHovered, setButtonHovered] = useState(initialState);

  const getArticle = async () => {
    let response;
    response = await api.get(`${resources.article}${filter}&state=1`);
    setArticle(response.data);
    setSearch(false);
  };

  // useEffect(() => {
  //   getMainCarousel();
  //   getArticle();
  // }, [search, values, filter]);

  const handleButtonHover = (buttonName, isHovered) => {
    setButtonHovered((prev) => ({
      ...initialState,
      [buttonName]: isHovered,
    }));
  };

  const handleContentHtml = (e) => {
    const content = e.split("<p><!-- Ver más información --></p>")
    return parse(content[0])
  }

  const link=()=>{
    router.push("/src/jsx/components/dashboardUser/service#content")
  }

  return (
    <div className="content-user">
      <div className="menu-component">
        <MenuUser />
      </div>
      <div className="carousel-container">
        <Carousel style={{ width: '100%', height: '100vh' }}>
          {mainCarrousel.map((item,index)=>(
            <Carousel.Item key={index}>
            {parse(item.html)}
          </Carousel.Item>
          ))}          
        </Carousel>
        <Button className="button-blue btn-carousel" onClick={()=>link()}>Ver servicios</Button>
        <IconoMouse />
      </div>
      <div id="content" className="content-below">
        <h1 className="title">Servicios</h1>
        <div className="category-service row" id="content">
          <div className="col">
            <button
              className={`category-tags ${
                buttonHovered.Hospedaje ? "hovered" : ""
              } ${activeFilter===1 ? "activeFilterTags" : ''}`}
              onMouseOver={() => handleButtonHover("Hospedaje", true)}
              onMouseOut={() => handleButtonHover("Hospedaje", false)}
              type="submit"
              onClick={() => {
                let filtro = "?tags=1";
                setFilter(filtro);
                setActiveFilter(1)
              }}
            >
              Hospedaje
            </button>
          </div>
          <div className="col">
            <button
              className={`category-tags ${
                buttonHovered.Restaurante ? "hovered" : ""
              } ${activeFilter===2 ? "activeFilterTags" : ''}`}
              onMouseOver={() => handleButtonHover("Restaurante", true)}
              onMouseOut={() => handleButtonHover("Restaurante", false)}
              type="submit"
              onClick={() => {
                let filtro = "?tags=2";
                setFilter(filtro);
                setActiveFilter(2)
              }}
            >
              Restaurante
            </button>
          </div>
          <div className="col">
            <button
              className={`category-tags ${
                buttonHovered.Entretenimiento ? "hovered" : ""
              } ${activeFilter===3 ? "activeFilterTags" : ''}`}
              onMouseOver={() => handleButtonHover("Entretenimiento", true)}
              onMouseOut={() => handleButtonHover("Entretenimiento", false)}
              type="submit"
              onClick={() => {
                let filtro = "?tags=3";
                setFilter(filtro);
                setActiveFilter(3)
              }}
            >
              Entretenimiento
            </button>
          </div>
        </div>
        <Search
          placeholder="Buscar..."
          titulo="Búsqueda"
        />
      </div>
      
      <div>
        <div className="row container-cards">
        {article.length > 0 ? (
            article.map((item, index) => (
              <Card styles="col-lg-5 col-md-12 col-sm-12 col-sm-12 card-html" buttonStyles="btn-card" textButton="Ver mas informacion" isSale={false} info={parse(item.html)}>{handleContentHtml(item.html) }</Card>
              ))
          ) : (
            <h1>No hay artículos</h1>
              
              )}
        </div>
      </div>
    </div>
  );
};

export default Service;
