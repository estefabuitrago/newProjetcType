import React, { useState, useEffect, useRef } from "react";
import { templates } from "../../../../constants/templates";
import { Editor } from "@tinymce/tinymce-react";
import { api,resources } from "../../../../utils/sdk";
import CreatableSelect from "react-select/creatable";
import "bootstrap/dist/css/bootstrap.css";
import { article } from "../../../../theme";
import TextField from "@mui/material/TextField";
import { Alerts,MenuAdmin } from "../../../../components";
import { useParams,Link,useNavigate } from "react-router-dom";

const EditArticle = () => {
    const {id}=useParams()
    const [tags, setTags] = useState([]);
    const [idTemplate, setTemplate] = useState();
    const [value, setValue] = useState(
        "Selecciona una plantilla o empieza a crear de 0"
    );
    const [article, setArticle] = useState({});
    const [tagsArticle,setTagsArticle]=useState([])
    const [text, setText] = useState("");
    const [category, setCategory] = useState([]);
    const [showAlert, setShowAlert] = useState(0);
    const [categoryArticle,setCategoryArticle]=useState([])
    const editorRef = useRef(null);
    let getTemplate = [];
    const initialTags=[]
    let navigate = useNavigate();

  const getCategory = async (category) => {
    const response = await api.get(`${resources.category}`);
    setCategory(response.data.filter(item=>item.id!=category));
    setCategoryArticle(response.data.filter(item=>item.id==category));
  };

  const getTags = async (tags) => {
    const response = await api.get(`${resources.tags}`);
    setTags(response.data.map((tag) => ({ value: tag.id, label: tag.name })));
    for(let i=0;i<tags.length;i++){
      const addTag=response.data.filter(item=>item.id==tags[i])
      const tag={label:addTag[0].name, value:addTag[0].id}
      initialTags.push(tag)
    }
  };

  const getArticle = async () => {
    const response = await api.get(`${resources.article}${id}`);
    setArticle(response.data);
    setTagsArticle(response.data.tags)
    getCategory(response.data.category_id)
    getTags(response.data.tags)
  };

  const editArticle = async () => {
    try {
      const response = await api.put(
        `${resources.article}${article.id}/`,
        article
      );
      setShowAlert(1);
      setTimeout(() => {
        navigate("/publicaciones");
      }, 3000);
    } catch {
      setShowAlert(2);
      console.error("Error al hacer la solicitud PUT");
    }
  };

  const createNewTag = async (newTag) => {
    try {
      const response = await api.post(`${resources.tags}`, { name: newTag });
      const newTagId = response.data.id;
      setTags([...tags, { value: newTagId, label: newTag }]);
      setArticle({ ...article, tags: [...article.tags, newTagId] });
    } catch (error) {
      console.error("Error al crear el nuevo tag:", error);
    }
  };

  useEffect(() => {
    if (idTemplate != undefined) {
      getTemplate = templates.filter((item) => item.id == idTemplate);
      setValue(getTemplate[0].html);
    }
    getArticle();
  }, []);

  return (
    <div className="content">
    <div className="menu-component">
      <MenuAdmin />
    </div>
    <div className="home-admin">
        <div className="title">
          <p>Agregar articulo</p>
        </div>
        <div className="form-article">
          <div className="row">
            <div className="col-6">
              <label>Nombre del articulo*</label>
              <input
                className="form-control"
                value={article.name}
                onChange={(e) =>
                  setArticle({
                    ...article,
                    name: e.target.value,
                  })
                }
              ></input>
            </div>
            <div className="col-6">
              <label>Plantillas</label>
              <select
                className="form-control"
                onChange={(e) => setTemplate(e.target.value)}
              >
                {templates.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-6">
              <label>Categorias</label>
              <select
                name="category"
                className="form-control"                
                onChange={(e) =>
                  setArticle({ ...article, category_id: e.target.value })
                }
              >
                {categoryArticle.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
                {category.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-6">
              <label>Tags</label>
              <CreatableSelect
                className="tags"
                isMulti
                options={tags}
                defaultValue={initialTags}
                onChange={(selectedTags) => {
                  setArticle({ ...article, tags: selectedTags.map(tag => tag.value) });
                }}
                onCreateOption={(newTag) => {
                  createNewTag(newTag);
                }}
              />
            </div>
            <div className="col-12">
              <Editor
                value={article.html}
                onInit={(evt, editor) => {
                  setText(editor.getContent({ format: "text" }));
                }}
                onEditorChange={(newValue, editor) => {
                  setValue(newValue);
                  setArticle({ ...article, html: newValue });
                  setText(editor.getContent({ format: "text" }));
                }}
                apiKey="tig6waa2uh41w9jlxhlp01qudhpvxnm45w3tzbwx6lojj8tm"
                init={{
                  plugins:
                    "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount pagebreak",
                  toolbar:
                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat | pagebreak",
                  pagebreak_separator: "<!-- Ver más información -->",
                }}
              />
            </div>
          </div>
        </div>
        {showAlert === 3 ? (
          <Alerts style="error">Por favor llene todos los campos</Alerts>
        ) : showAlert === 1 ? (
          <Alerts style="success">Articulo actualizado correctamente</Alerts>
        ) : showAlert === 2 ? (
          <Alerts style="error">
            Error! No se pudo actualizar el articulo
          </Alerts>
        ) : (
          ""
        )}
        <div className="footer-add-article">
            <Link to="/publicaciones" className="btn-save">Volver</Link>
            <button className="btn-save" onClick={() => editArticle()}>
                Enviar
            </button>
        </div>
      </div>
      </div>
  );
};

export default EditArticle;
