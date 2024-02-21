import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Image } from "react-bootstrap";
import { Carousel, Modal } from "react-bootstrap";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { store, cardSale } from '../../../theme'
import { MenuUser, Button, Alerts, Card, Search, Footer } from '../../../components';
import SelectAmount from "./selectAmount.js";
import { api,resources } from "../../../utils/sdk/index.js";
// import { auth } from "@/app/src/Components/Auth/index";

const Sale = (props) => {
  const { stylesCard } = props;

  const [data, setData] = React.useState([]);
  const [list, setList] = useState([]);
  const [cartAlert, setCartAlert] = useState(0);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [search, setSearch] = useState(true);
  const [active, setActive] = useState(false);
  const [shop, setShop] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [addedProduct, setAddedProduct] = useState("");
  const [activeButton, setActiveButton] = useState();
  const [selectedAmount, setSelectedAmount] = useState(1);

  const initialState = {
    Name: false,
  };
  const [buttonHovered, setButtonHovered] = useState(initialState);

  const handleShop = (id, name, price, file) => {
    if (selectedAmount > 0) {
      const payload = {
        id: id,
        name: name,
        price: price,
        file: file,
        amount: selectedAmount,
      };
      setShop([...shop, payload]);
      setAddedProduct(name);
      setCartAlert(1);
      setShowModal(true);
    } else {
      console.error("Error: Cantidad seleccionada no válida");
    }
  };

  const getProducts = async (filter) => {
    setActiveButton(filter);
    if (filter === undefined || activeButton === filter) {
      const response = await api.get(`${resources.products}?state=1`);
      getProductsCarousel(response.data);
      setActiveButton(0);
    } else {
      const response = await api.get(`${resources.products}?category=${filter}&state=1`);
      getProductsCarousel(response.data);
    }
  };

  const getCategoryProducts = async () => {
    try {
      const response = await api.get(`${resources.categoryproduct}`);
      setCategoryProducts(response.data);
      setActive(true);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryClick = async (categoryId) => {
    try {
      setFilter(`?category_id=${categoryId}`);
      getProducts();
    } catch (error) {
      console.error("Error fetching products by category:", error);
      console.log("category id en el error:  ", categoryId);
    }
  };

  const getProductsCarousel = (products) => {
    setList([]);
    if (products.length === 0) {
    } else {
      for (let i = 0; i < products.length; i += 8) {
        const grupoDeTres = products.slice(i, i + 8);
        setList(list => [...list, grupoDeTres]);
      }
      setActive(false);
    }
  };

  const handleButtonHover = (buttonName, isHovered) => {
    setButtonHovered((prev) => ({
      ...initialState,
      [buttonName]: isHovered,
    }));
  };

  useEffect(() => {
    getProducts();
    if (categoryProducts.length === 0) {
      getCategoryProducts();
    }
  }, [active]);

  useEffect(() => {
    localStorage.setItem("shopCar", JSON.stringify(shop));
  }, [shop]);

  return (
    <div className="content-sale">
      <div className="menu-component">
        <MenuUser />
      </div>
      <div className="container-date">
        <div id="content" className="content-below-sale">
          <h1 className="title-sale">Tienda</h1>
          <div className="category-sale row" id="content">
            {categoryProducts.map((item) => (
              <div key={item.id} className="col">
                <button
                  className={`${
                    item.id === activeButton ? "active-store-filter" : "category-tags-sale"
                  }`}
                  onMouseOver={() => handleButtonHover(item.name, true)}
                  onMouseOut={() => handleButtonHover(item.name, false)}
                  type="submit"
                  onClick={() => {
                    getProducts(item.id);
                  }}
                >
                  {item.name}
                </button>
              </div>
            ))}
          </div>
          <Search placeholder="Buscar..." titulo="Búsqueda" />
          {/* {auth.token !== "rosk" ? (
              <>
                <b>Para comprar debes de iniciar sesión</b>
              </>
            ) : (
              <>
              </>
            )} */}
        </div>
        <Carousel className="carousel-products" interval={null} style={{ width: '100%', height: '100%' }}>
          {list.length > 0 ? (
            list.map((item, index) => (
              <Carousel.Item key={index}>
                <div className='row '>
                  {list[index].length > 0 ? (
                    list[index].map((item2, key) => (
                      <div key={key} className='col-3 content-card'>
                        <Card info={item2} isSale={true} styles="card-sale" buttonStyles="btn-card-products" textButton={'Ver mas'}>
                          <Image alt="" className="img-products-store" src={item2.file.file} />
                          <div className="row page-products">
                            <p className="col-12 name-products-store">{item2.name}</p>
                            <p className="col-lg-12 col-md-12 col-sm-12"><b>Precio:</b> ${item2.price}</p>
                            {/* {auth.token !== "rosk" ? (
                            <>
                            </>
                            ) : (
                              <>
                              <b className="col-5">Cantidad:</b>
                              <SelectAmount className="col-6" amount={item2.amount} onSelect={(selectedAmount) => setSelectedAmount(selectedAmount)} />
                              <div className="col-12 text-center">
                                <button className="btn-card-products" onClick={() => handleShop(item2.id, item2.name, item2.price, item2.file.file)}>Agregar al carrito <AddShoppingCartIcon /></button>
                              </div>
                              </>
                            )} */}
                          </div>
                        </Card>
                      </div>
                    ))
                  ) : (
                    ''
                  )}
                </div>
              </Carousel.Item>
            ))
          ) : (
            <div className="col-12 no-items-message">
              <p className="">No hay productos</p>
            </div>
          )}
        </Carousel>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Producto Agregado al Carrito</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{addedProduct} ha sido agregado al carrito.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Sale;
