import jwt_decode from "jwt-decode";
import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AlertError from "../components/AlertError";
import { Context } from "../main";
import AuthService from "../services/AuthService";
import { IJwtPayload } from "../models/IJwtPayload";

type Inputs = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const { store } = useContext(Context);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    setLoading(true);

    try {
      AuthService.login(data.username, data.password)
        .then((response) => {
          localStorage.setItem("token", response.data.jwt_token);
          store.setAuth(true);
          const decoded: IJwtPayload = jwt_decode(response.data.jwt_token);
          store.setUser({
            id: decoded?.id,
            username: decoded?.username,
            role: "",
          });
        })
        .catch((error) => {
          console.log(error);
          setShowAlert(true);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setShowAlert(true);
    }
  };

  return (
    <>
      <AlertError
        header="Произошла ошибка!"
        message="Не удалось авторизоваться"
        show={showAlert}
        setShow={setShowAlert}
      />

      <section>
        <div className="container mt-5 pt-5">
          <div className="col-12 col-sm-7 col-md-6 m-auto">
            <div className="card border-0 shadow">
              <div className="card-body">
                <div className="text-center mt-3">
                  <h3 className="mb-5">Вход</h3>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    type="text"
                    id="username"
                    placeholder="Имя пользователя"
                    {...register("username", { required: true })}
                    className="form-control my-4 py-2"
                  />
                  <input
                    type="password"
                    id="password"
                    placeholder="Пароль"
                    {...register("password", { required: true })}
                    className="form-control my-4 py-2"
                  />
                  <p className="text-center">
                    Нет аккаунта?{" "}
                    <Link to={`/registration`}>Зарегистрироваться</Link>
                  </p>
                  <div className="text-center mt-3">
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading…" : "Войти"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
