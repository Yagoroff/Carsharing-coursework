import { useState } from "react";
import { Button } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AlertError from "../components/AlertError";
import AuthService from "../services/AuthService";

type Inputs = {
  username: string;
  password: string;
};

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    setLoading(true);

    try {
      AuthService.registration(data.username, data.password)
        .then(() => {
          navigate("/login");
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
        message="Не удалось зарегистрироваться"
        show={showAlert}
        setShow={setShowAlert}
      />

      <section>
        <div className="container mt-5 pt-5">
          <div className="row">
            <div className="col-12 col-sm-7 col-md-6 m-auto">
              <div className="card border-0 shadow">
                <div className="card-body">
                  <div className="text-center mt-3">
                    <h3 className="mb-5">Регистрация</h3>
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
                      Уже зарегистрированы? <Link to={`/login`}>Войти</Link>
                    </p>
                    <div className="text-center mt-3">
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={isLoading}
                      >
                        {isLoading ? "Loading…" : "Зарегистрироваться"}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegistrationPage;
