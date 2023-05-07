import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";

export default class Store {
  user = {} as IUser;
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }
}
