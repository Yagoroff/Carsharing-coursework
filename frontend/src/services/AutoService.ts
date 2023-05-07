import { AxiosResponse } from "axios";
import { IAuto } from "../models/IAuto";
import { MainApi } from ".";
import { IOrder } from "../models/IOrder";

export default class AutoService {
  static async getAllFreeAuto(): Promise<AxiosResponse<IAuto[]>> {
    return MainApi.get("/getAllFreeAuto");
  }

  static async getCurrentAutos(
    personId: number
  ): Promise<AxiosResponse<IOrder[]>> {
    return MainApi.get(`/currentAutos/${personId}`);
  }

  static async getAutoById(autoId: number): Promise<AxiosResponse<IAuto>> {
    return MainApi.get(`/getAutoById/${autoId}`);
  }
}
