import React, { useState, useEffect } from "react";
import { BtnSwitch, MenuAdmin } from "../../../components";
import "bootstrap/dist/css/bootstrap.css";
import { resources, api } from "../../../utils/sdk";
import ReactPaginate from "react-paginate";
import { article } from "../../../theme";
import { Link } from "react-router-dom";

const Article = () => {
  const [articles, setArticles] = useState([]);
  const [inactiveArticles, setInactiveArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const articlesPerPage = 5;
  const [request, setRequest] = useState(false);
  const [allArticles, setAllArticles] = useState();

  const getAllArticles = async () => {
    const response = await api.get(`${resources.article}`);
    setAllArticles(response.data);
  };

  const getActiveArticles = async () => {
    const response = await api.get(`${resources.article}?state=1`);
    setArticles(response.data);
  };

  const getInactiveArticles = async () => {
    const response = await api.get(`${resources.article}?state=2`);
    setInactiveArticles(response.data);
  };

  const getCategories = async () => {
    const response = await api.get(`${resources.category}`);
    setCategories(response.data);
  };

  const getTags = async () => {
    const response = await api.get(`${resources.tags}`);
    setTags(response.data);
  };

  const handleSwitchChange = async (articleId) => {
    try {
      const currentState = allArticles.filter((item) => item.id == articleId);
      let stateArticle = currentState[0].state;
      console.log(stateArticle);
      if (currentState[0].state === 1) {
        stateArticle = 2;
      } else {
        stateArticle = 1;
      }
      currentState[0].state = stateArticle;
      const response = await api.put(
        `${resources.article}${articleId}/`,
        currentState[0]
      );
      getActiveArticles();
      getInactiveArticles();
    } catch (error) {
      console.error(
        `Error al actualizar el estado en la API para el artículo ${articleId}:`,
        error
      );
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "No hay categoría";
  };

  const getTagsName = (tagIds) => {
    const tagIdsArray = Array.isArray(tagIds) ? tagIds : [tagIds];

    const tagNames = tagIdsArray.map((tagId) => {
      const tag = tags.find((tag) => tag.id === tagId);
      return tag ? tag.name : "No hay etiquetas";
    });
    return tagNames.join(", ");
  };

  useEffect(() => {
    getActiveArticles();
    getCategories();
    getTags();
    getInactiveArticles();
    getAllArticles();
  }, []);

  const pageCount = Math.ceil(articles.length / articlesPerPage);
  const displayedArticles = articles.slice(
    pageNumber * articlesPerPage,
    (pageNumber + 1) * articlesPerPage
  );

  const pageInactiveCount = Math.ceil(
    inactiveArticles.length / articlesPerPage
  );
  const displayedInactiveArticles = inactiveArticles.slice(
    pageNumber * articlesPerPage,
    (pageNumber + 1) * articlesPerPage
  );

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const getCurrentPage = pageNumber + 1;
  const pageSeparator = " - ";

  return (
    <div className="content">
      <div className="menu-component">
        <MenuAdmin />
      </div>
      <div className="home-admin">
        <div className="title">
          <p>Publicaciones</p>
        </div>
        <div className="info-articles">
          <div className="div-filter">
            {/* <select className="filter">
              <option>Filtrar</option>
              {category.map((item, index) => (
                        <option
                        onClick={() => {
                            setCategory();
                        }}
                        key={index}
                        >
                        {item.name}
                        </option>
                    ))}
            </select> */}
          </div>
          <div className="info-users">
            <div className="filter-users">
              <button
                className={`btn-filter-user ${request ? "" : "active-filter"}`}
                onClick={() => setRequest(false)}
              >
                Publicaciones
              </button>
              <button
                className={`btn-filter-user ${request ? "active-filter" : ""}`}
                onClick={() => setRequest(true)}
              >
                Inactivos
              </button>
            </div>
            <div className="form-add">
              <Link className="btn-article btn-add" to="/agregarArticulo">
                Agregar publicacion
              </Link>
            </div>
            <div>
              {request ? (
                <div>
                  <div className="table-articles">
                    <div className="header-table row">
                      <div className="col">
                        <p>Nombre</p>
                      </div>
                      <div className="col">
                        <p>Categoría</p>
                      </div>
                      <div className="col">
                        <p>Etiquetas</p>
                      </div>
                      <div className="col">
                        <p>Editar</p>
                      </div>
                      <div className="col">
                        <p>Estado</p>
                      </div>
                    </div>
                    {displayedInactiveArticles.map((item, index) => (
                      <div key={index} className="row body-table">
                        <div className="col">
                          <p>{item.name}</p>
                        </div>
                        <div className="col">
                          <p>{getCategoryName(item.category_id)}</p>
                        </div>
                        <div className="col">
                          <p>{getTagsName(item.tags)}</p>
                        </div>
                        <div className="col">
                          <Link
                            to={`/publicaciones/editar/${item.id}`}
                            className="btn-article"
                          >
                            Editar
                          </Link>
                        </div>
                        <div className="col">
                          <BtnSwitch
                            onClick={() => handleSwitchChange(item.id)}
                          >
                            {item.state === 1 ? "Activo" : "Inactivo"}
                          </BtnSwitch>
                        </div>
                      </div>
                    ))}
                  </div>
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
                    {pageInactiveCount}
                    <span
                      className="pagination-arrow"
                      onClick={() => {
                        if (pageNumber < pageInactiveCount - 1) {
                          setPageNumber(pageNumber + 1);
                        }
                      }}
                    >
                      {" > "}
                    </span>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="table-articles">
                    <div className="header-table row">
                      <div className="col">
                        <p>Id</p>
                      </div>
                      <div className="col">
                        <p>Nombre</p>
                      </div>
                      <div className="col">
                        <p>Categoría</p>
                      </div>
                      <div className="col">
                        <p>Etiquetas</p>
                      </div>
                      <div className="col">
                        <p>Editar</p>
                      </div>
                      <div className="col">
                        <p>Estado</p>
                      </div>
                    </div>
                    {displayedArticles.map((item, index) => (
                      <div key={index} className="row body-table">
                        <div className="col">
                          <p>{item.id}</p>
                        </div>
                        <div className="col">
                          <p>{item.name}</p>
                        </div>
                        <div className="col">
                          <p>{getCategoryName(item.category_id)}</p>
                        </div>
                        <div className="col">
                          <p>{getTagsName(item.tags)}</p>
                        </div>
                        <div className="col">
                          <Link
                            to={`/publicaciones/editar/${item.id}`}
                            className="btn-article"
                          >
                            Editar
                          </Link>
                        </div>
                        <div className="col">
                          <BtnSwitch
                            onClick={() => handleSwitchChange(item.id)}
                          >
                            {item.state === 1 ? "Activo" : "Inactivo"}
                          </BtnSwitch>
                        </div>
                      </div>
                    ))}
                  </div>
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
