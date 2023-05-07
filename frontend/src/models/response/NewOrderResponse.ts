import { IAuto } from "../IAuto";

export interface NewOrderResponse {
  id: number;
  dateTaking: string;
  dateReturn?: string;
  auto: IAuto;
  person: {
    id: number;
    username: string;
    password: string;
    role: string;
    orders: [];
  };
  dateReturnEmpty: boolean;
}
