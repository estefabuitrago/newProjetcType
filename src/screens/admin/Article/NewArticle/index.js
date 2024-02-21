import React, { useState, useEffect, useRef } from "react";
import { templates } from "../../../../constants/templates";
import { Editor } from "@tinymce/tinymce-react";
import { resources,api } from '../../../../utils/sdk'
import CreatableSelect from "react-select/creatable";
import "bootstrap/dist/css/bootstrap.css";
import { Alerts } from "../../../../components";
import { Link,useNavigate } from "react-router-dom";
import { MenuAdmin } from "../../../../components"
// import { auth } from "@/app/src/Components/Auth";

const FormArticle = () => {
  const [tags, setTags] = useState([]);
  const [idTemplate, setTemplate] = useState();
  const [value, setValue] = useState(
    "Selecciona una plantilla o empieza a crear de 0"
  );
  const [article, setArticle] = useState({
    state: 1,
  });
  let navigate = useNavigate();

  const [text, setText] = useState("");
  const [category, setCategory] = useState([]);
  const [showAlert, setShowAlert] = useState(0);
  const editorRef = useRef(null);
  let getTemplate = [];

  useEffect(() => {
    if (idTemplate != undefined) {
      getTemplate = templates.filter((item) => item.id == idTemplate);
      setValue(getTemplate[0].html);
      console.log(idTemplate);
    }
    getCategory();
    getTags();
  }, [idTemplate]);

  const getCategory = async () => {
    const response = await api.get(`${resources.category}`);
    setCategory(response.data);
  };

  const getTags = async () => {
    const response = await api.get(`${resources.tags}`);
    setTags(response.data.map((tag) => ({ value: tag.id, label: tag.name })));
  };

  const saveArticle = async () => {
    const payload = {
      ...article,
    //   account: [auth.users.id],
    };
    if (payload.name === undefined || payload.name === "") {
      setShowAlert(3);
    } else {
      await api
        .post(`${resources.article}`, payload)
        .then((response) => {
          setShowAlert(1);
          setTimeout(() => {
            navigate("/publicaciones");
          }, 3000);
        })
        .catch((error) => {
          setShowAlert(2);
          console.error("Error al hacer la solicitud  POST");
        });
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
              onChange={(e) => setArticle({ ...article, name: e.target.value })}
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
              <option>Selecciona una opcion</option>
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
              onChange={(selectedTags) => {
                setArticle({
                  ...article,
                  tags: selectedTags.map((tag) => tag.value),
                });
              }}
              onCreateOption={(newTag) => {
                createNewTag(newTag);
              }}
            />
          </div>
          <div className="col-12">
            <Editor
              value={value}
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
                menubar: "file edit view insert format tools table help",
                plugins:
                  "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                typeahead_urls: true,
                contextmenu: "link image imagetools table",
                image_caption: true,
                image_advtab: true,
                automatic_uploads: true,
                pagebreak_separator: "<!-- Ver más información -->",

                file_picker_callback: async (cb, value, meta) => {
                  const input = document.createElement("input");
                  input.setAttribute("type", "file");
                  input.setAttribute("accept", "image/*");

                  input.addEventListener("change", (e) => {
                    const file = e.target.files[0];

                    const reader = new FileReader();
                    reader.addEventListener("load", async () => {
                      const id = "blobid" + new Date().getTime();
                      const blobCache =
                        tinymce.activeEditor.editorUpload.blobCache;
                      const base64 = reader.result.split(",")[1];
                      const blobInfo = blobCache.create(id, file, base64);

                      const data = new FormData();
                      data.append("file", blobInfo.blob(), blobInfo.filename());

                      const response = await api.post(
                        `${resources.files}`,
                        data,
                        {
                          headers: {
                            "Content-Type": "multipart/form-data",
                          },
                        }
                      );
                      cb(response.data.file, { title: response.data.name });
                    });
                    reader.readAsDataURL(file);
                  });

                  input.click();
                },
              }}
            />
          </div>
        </div>
      </div>
      {showAlert === 3 ? (
        <Alerts style="error">Por favor llene todos los campos</Alerts>
      ) : showAlert === 1 ? (
        <Alerts style="success">Articulo guardado correctamente</Alerts>
      ) : showAlert === 2 ? (
        <Alerts style="error">Error! No se pudo guardar el articulo</Alerts>
      ) : (
        ""
      )}
      <div className="footer-add-article">
        <Link className="btn-save" to="/publicaciones">
          Volver
        </Link>
        <button className="btn-save" onClick={() => saveArticle()}>
          Enviar
        </button>
      </div>
    </div>
    </div>
  );
};

export default FormArticle;
