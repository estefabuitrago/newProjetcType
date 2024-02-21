import React, { useState } from "react";
import imgAuth from "../../../assets/img/imgAuth.jpg";
import { Image } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "bootstrap/dist/css/bootstrap.css";
import { auth } from "../../../theme";
import { Alerts, Button } from "../../../components";
import { api, resources } from "../../../utils/sdk";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [account, setAccount] = useState({ type_account_id: 3 });
  const [showAlert, setShowAlert] = useState(0);
  var pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );
  let navigate = useNavigate();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const register = async () => {
    if (
      account.name === undefined ||
      account.name === "" ||
      account.last_name === undefined ||
      account.last_name === "" ||
      account.phone === undefined ||
      account.phone === "" ||
      account.email === undefined ||
      account.email === "" ||
      account.password === undefined ||
      account.password === ""
    ) {
      setShowAlert(3);
    } else {
      setShowAlert(0);
      if (!pattern.test(account.email)) {
        console.log("correo invalido");
        setShowAlert(4);
      } else {
        await api
          .post(`${resources.account}`, account)
          .then((response) => {
            setShowAlert(1);
            setTimeout(() => {
              navigate("/iniciarSesion");
            }, 3000);
          })
          .catch((error) => {
            setShowAlert(2);
            console.error("Error al hacer la solicitud PUT");
          });
      }
    }
  };

  const login = () => {
    router.push("/src/jsx/components/auth/login/");
  };

  return (
    <div>
      <div className="row content-auth">
        <div className="col-5 photo-auth">
          <Image src={imgAuth} alt="Imagen 1" />
        </div>
        <div className="col-7 form-auth">
          <p className="title-auth">REGISTRARSE</p>
          <div className="row">
            <TextField
              required
              id="outlined-required"
              label="Nombre"
              defaultValue=""
              onChange={(e) => setAccount({ ...account, name: e.target.value })}
            />
            <TextField
              required
              id="outlined-required"
              label="Apellidos"
              defaultValue=""
              onChange={(e) =>
                setAccount({ ...account, last_name: e.target.value })
              }
            />
            <TextField
              required
              id="outlined-required"
              label="Telefono"
              defaultValue=""
              onChange={(e) =>
                setAccount({ ...account, phone: e.target.value })
              }
            />
            <TextField
              required
              id="outlined-required"
              label="Email"
              defaultValue=""
              onChange={(e) =>
                setAccount({ ...account, email: e.target.value })
              }
            />
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Contraseña
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                onChange={(e) =>
                  setAccount({ ...account, password: e.target.value })
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </div>
          {showAlert === 3 ? (
            <Alerts style="error">Por favor llena todos los datos</Alerts>
          ) : showAlert === 1 ? (
            <Alerts style="success">Registrado correctamente</Alerts>
          ) : showAlert === 2 ? (
            <Alerts style="error">Hubo un error en el registro</Alerts>
          ) : showAlert === 4 ? (
            <Alerts style="error">Correo invalido</Alerts>
          ) : (
            ""
          )}
          <Button className="button-orange btn-auth" onClick={() => register()}>
            Aceptar
          </Button>
          <div className="footer-auth">
            <Link to="/iniciarSesion" className="link-auth">
              ¿Ya tienes cuenta? Iniciar sesion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
