
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
import { Alerts,Button } from "../../../components";
import { api,resources } from "../../../utils/sdk";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showAlert, setShowAlert] = useState(0);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  var pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );

  const login = async () => {
    if (
      email === undefined ||
      email === "" ||
      password === undefined ||
      password === ""
    ) {
      setShowAlert(3);
    } else {
      if (!pattern.test(email)) {
        setShowAlert(4);
      } else {
        const response = await api.get(
          `${resources.account}?email=${email}&password=${password}`
        );
        if (response.data.length === 0) {
          setShowAlert(1);
        } else {
          const users = {
            id: response.data[0].id,
            name: response.data[0].name,
            last_name: response.data[0].last_name,
            type_account: response.data[0].type_account_id,
            role: response.data[0].type_account.name,
          };
          localStorage.setItem("users", JSON.stringify(users));
          localStorage.setItem("token", "rosk");
          setShowAlert(2);
          if(response.data[0].type_account_id===1){
            setTimeout(() => {
              router.push("/src/Page/Admin/");
            }, 1000);
          }else{
            setTimeout(() => {
              router.push("/src/Page/User/Home/");
            }, 1000);
          }
        }
      }
    }
  };

  const signUp = () => {
    router.push("/src/jsx/components/auth/signup/");
  };
    return ( 
        <div>
            <div className='row content-auth'>
                <div className='col-5 photo-auth'>
                    <Image src={imgAuth} alt="Imagen 1" />
                </div>
                <div className="col-7 form-auth">
                  <p className="title-auth-login">INICIO SESIÓN</p>
                  <div className="row">
                    <TextField
                      required
                      id="outlined-required"
                      label="Email"
                      defaultValue=""
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-login"
                    />
                    <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Contraseña
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
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
                    <Alerts style="error">Por favor llene todos los campos</Alerts>
                  ) : showAlert === 1 ? (
                    <Alerts style="error">
                      Email o contraseña incorrecta, por favor verificar{" "}
                    </Alerts>
                  ) : showAlert === 2 ? (
                    <Alerts style="success">
                      Verificacion exitosa, espere un momento...
                    </Alerts>
                  ) : showAlert === 4 ? (
                    <Alerts style="error">Correo invalido </Alerts>
                  ) : (
                    ""
                  )}
                  <Button className="button-orange btn-auth" onClick={() => login()}>
                    Aceptar
                  </Button>
                  <div className="footer-auth">
                    <Link to="/registrarse" className="link-auth">¿No tienes cuenta? Registrarse</Link>
                  </div>
                </div>
              </div>
            </div>
  );
};

export default Login;
