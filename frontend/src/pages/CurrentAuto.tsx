import { useContext, useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import AlertError from "../components/AlertError";
import Layout from "../components/Layout";
import { Context } from "../main";
import AutoService from "../services/AutoService";
import AutoModal from "../components/AutoModal";
import { IOrder } from "../models/IOrder";

const CurrentAutoPage = () => {
  const { store } = useContext(Context);
  const [currentAuto, setCurrentAuto] = useState([] as IOrder[]);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoadingAuto, setLoadingAuto] = useState(true);

  useEffect(() => {
    AutoService.getCurrentAutos(store.user.id)
      .then((response) => {
        setCurrentAuto(response.data);
      })
      .catch((error) => {
        console.log(error);
        setShowAlert(true);
      })
      .finally(() => {
        setLoadingAuto(false);
      });
  }, [store.user.id]);

  return (
    <Layout>
      <h1 className="text-center">Список Текущих Сессий</h1>

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
      ) : currentAuto.length === 0 ? (
        <p className="text-center">Здесь ничего нет</p>
      ) : (
        <Table responsive striped hover>
          <thead>
            <tr>
              <th>Номер машины</th>
              <th>Дата взятия</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {currentAuto.map((item, index) => (
              <tr key={index}>
                <td>{item.autoId}</td>
                <td>{item.dateTaking}</td>
                <td>
                  <AutoModal
                    autoId={item.autoId}
                    orderId={item.id}
                    titleButton="Завершить"
                    isEndButton={true}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Layout>
  );
};

export default CurrentAutoPage;
