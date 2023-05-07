import { AxiosResponse } from "axios";
import { IOrder } from "../models/IOrder";
import { NewOrderResponse } from "../models/response/NewOrderResponse";
import { MainApi } from ".";

export default class OrderService {
  static async newOrder(
    carId: number,
    personId: number
  ): Promise<AxiosResponse<NewOrderResponse>> {
    return MainApi.post(`/newOrder?carId=${carId}&personId=${personId}`);
  }

  static async endOrder(id: number): Promise<AxiosResponse<any>> {
    console.log(id);
    return MainApi.post(`/endOrder/${id}`);
  }

  static async getEndedOrders(
    personId: number
  ): Promise<AxiosResponse<IOrder[]>> {
    return MainApi.get(`/endedOrders/${personId}`);
  }
}
