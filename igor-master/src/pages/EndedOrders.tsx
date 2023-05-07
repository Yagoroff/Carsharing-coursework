import { useContext, useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import AlertError from "../components/AlertError";
import Layout from "../components/Layout";
import { Context } from "../main";
import { IOrder } from "../models/IOrder";
import OrderService from "../services/OrderService";
import AutoModal from "../components/AutoModal";

const EndedOrdersPage = () => {
  const { store } = useContext(Context);
  const [endedOrders, setEndedOrders] = useState([] as IOrder[]);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    OrderService.getEndedOrders(store.user.id)
      .then((response) => {
        setEndedOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
        setShowAlert(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [store.user.id]);

  return (
    <Layout>
      <h1 className="text-center">Список Законченных Сессий</h1>

      <AlertError
        header="Произошла ошибка!"
        message="Не удалось загрузить данные"
        show={showAlert}
        setShow={setShowAlert}
      />

      {isLoading == true ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : endedOrders.length === 0 ? (
        <p className="text-center">Здесь ничего нет</p>
      ) : (
        <Table responsive striped hover>
          <thead>
            <tr>
              <th>Номер авто</th>
              <th>Дата взятия</th>
              <th>Дата возврата</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {endedOrders.map((item, index) => (
              <tr key={index}>
                <td>{item.autoId}</td>
                <td>{item.dateTaking}</td>
                <td>{item.dateReturn}</td>
                <td>
                  <AutoModal
                    autoId={item.autoId}
                    orderId={item.id}
                    titleButton="Посмотреть"
                    isEndButton={false}
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

export default EndedOrdersPage;
