import { AxiosResponse } from "axios";
import { LoginResponse } from "../models/response/LoginResponse";
import { RegistrationResponse } from "../models/response/RegistrationResponse";
import { AuthApi } from ".";

export default class AuthService {
  static async login(
    username: string,
    password: string
  ): Promise<AxiosResponse<LoginResponse>> {
    return AuthApi.post("/login", { username, password });
  }

  static async registration(
    username: string,
    password: string
  ): Promise<AxiosResponse<RegistrationResponse>> {
    return AuthApi.post("/registration", { username, password });
  }
}
