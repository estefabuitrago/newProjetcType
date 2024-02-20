import React, { useState, useEffect } from "react";
import { category } from "../../../theme";
import "bootstrap/dist/css/bootstrap.css";
import { resources,api } from '../../../utils/sdk'
import { BtnSwitch,MenuAdmin } from "../../../components";

const Category = () => {
  const [values, setValues] = useState({});
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCategory, setEditedCategory] = useState({});
  const [pageNumber, setPageNumber] = useState(0);
  const categoriesPerPage = 5;
  
  const fetchCategories = async () => {
    try {
      const response = await api.get(`${resources.category}`);
      setCategories(response.data);
      console.log("Categorias",response.data)
    } catch (error) {
      console.error("Error al cargar las categorías:", error);
    }
  };
  
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategory = async () => {
    if (isEditing) {
      try {
        await api.put(`${resources.category}${editedCategory.id}/`, editedCategory);
        fetchCategories();
        setIsEditing(false);
        setEditedCategory({});
      } catch (error) {
        console.error("Error al editar la categoría:", error);
      }
    } else {
      if (values.name) {
        try {
          await api.post(`${resources.category}`, values);
          fetchCategories();
          setValues({});
        } catch (error) {
          console.error("Error al registrar la categoría:", error);
        }
      } else {
        alert("EL NOMBRE DE LA CATEGORÍA es un campo obligatorio.");
      }
    }
  };

  const editCategory = (category) => {
    setIsEditing(true);
    setEditedCategory(category);
  };

  const deleteCategory = async (categoryId) => {
    try {
      await api.delete(`${resources.category}${categoryId}`);
      fetchCategories();
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  };
  const pageCount = Math.ceil(categories.length / categoriesPerPage);
  const displayedCategories = categories.slice(
    pageNumber * categoriesPerPage,
    (pageNumber + 1) * categoriesPerPage
  );

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const getCurrentPage = pageNumber + 1;
  const pageSeparator = " - ";

  return (
    <div className='content'>
        <div className='menu-component'>
            <MenuAdmin/>      
        </div>
        <div className='home-admin'>
        <div className="title">
          <p>Categorias</p>
        </div>
        <div className="card-profile">
          <div className="row">
            <div className="col-lg-12 info-user">
              <div className="row">
                <div className="col-12 form-input">
                  <p className="sub-title">NOMBRE DE LA CATEGORIA</p>
                  <input
                    value={isEditing ? editedCategory.name : values.name}
                    type="text"
                    onChange={(e) =>
                      isEditing
                        ? setEditedCategory({ ...editedCategory, name: e.target.value })
                        : setValues({ ...values, name: e.target.value })
                    }
                  ></input>
                </div>                
              </div>
              <div className="botonBox col-12 text-right">
                  <button className="btn-create" onClick={(e) => handleCategory()}>
                    {isEditing ? "Actualizar" : "Guardar"}
                  </button>
                </div>
            </div>
          </div>
        </div>        
        <div className="table-articles">
          <div className="header-table row">
            <div className="col-3">
              <p>Id</p>
            </div>
            <div className="col-3">
              <p>Nombre de la Categoría</p>
            </div>
            <div className="col">
              <p>Acciones</p>
            </div>
          </div>
          {displayedCategories.map((item, index) => (
          <div key={index} className="row body-table">
            <div className="col">
              <p>{item.id}</p>
            </div>
            <div className="col">
              <p>{item.name}</p>
            </div>                        
            <div className="col">
              <button className="btn-article" onClick={() => editCategory(item)}>Editar</button>
            </div>
            <div className="col">
              <BtnSwitch onClick={() => handleSwitchChange(item.id)}>
                {item.state === 1 ? "Activo" : "Inactivo"}
              </BtnSwitch>
            </div>
          </div>
          ))}
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
      </div>
      </div>
  );
};

export default Category;





