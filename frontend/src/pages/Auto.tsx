import { useContext, useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import AlertError from "../components/AlertError";
import Layout from "../components/Layout";
import { Context } from "../main";
import { IAuto } from "../models/IAuto";
import AutoService from "../services/AutoService";
import OrderService from "../services/OrderService";
import { useNavigate } from "react-router-dom";

const AutoPage = () => {
  const navigate = useNavigate();
  const { store } = useContext(Context);
  const [auto, setAuto] = useState([] as IAuto[]);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoadingAuto, setLoadingAuto] = useState(true);

  useEffect(() => {
    AutoService.getAllFreeAuto()
      .then((response) => {
        setAuto(response.data);
      })
      .catch((error) => {
        console.log(error);
        setShowAlert(true);
      })
      .finally(() => {
        setLoadingAuto(false);
      });
  }, []);

  const takeAuto = (carId: number, personId: number) => {
    OrderService.newOrder(carId, personId)
      .then(() => {
        navigate(0);
      })
      .catch((error) => {
        console.log(error);
        setShowAlert(true);
      });
  };

  return (
    <>
      <Layout>
        <h1 className="text-center">Список Автомобилей</h1>

        <AlertError
          header="Произошла ошибка!"
          message="Не удалось загрузить данные"
          show={showAlert}
          setShow={setShowAlert}
        />

        {isLoadingAuto == true ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : auto.length === 0 ? (
          <p className="text-center">Здесь ничего нет</p>
        ) : (
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>Марка</th>
                <th>Цвет</th>
                <th>Номер</th>
                <th>Статус</th>
                <th>Действие</th>
              </tr>
            </thead>
            <tbody>
              {auto.map((item, index) => (
                <tr key={index}>
                  <td>{item.mark}</td>
                  <td>{item.color}</td>
                  <td>{item.number}</td>
                  <td>{item.status}</td>
                  <td>
                    <button
                      onClick={() => takeAuto(item.id, store.user.id)}
                      className="btn btn-primary"
                      disabled={item.status !== "free"}
                    >
                      Взять
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Layout>
    </>
  );
};

export default AutoPage;
