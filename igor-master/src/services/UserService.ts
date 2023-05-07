import { AxiosResponse } from "axios";
import { MainApi } from ".";
import { IUser } from "../models/IUser";

export default class UserService {
  static async getUserById(personId: number): Promise<AxiosResponse<IUser>> {
    return MainApi.get(`/getPersonById/${personId}`);
  }
}
