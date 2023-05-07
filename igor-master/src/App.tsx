import jwt_decode from "jwt-decode";
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Context } from "./main";
import AppRoutes from "./routes/AppRoutes";
import UserService from "./services/UserService";
import { IJwtPayload } from "./models/IJwtPayload";
import { IUser } from "./models/IUser";

const App = observer(() => {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.setLoading(true);

      const decoded: IJwtPayload = jwt_decode(
        localStorage.getItem("token") as string
      );

      UserService.getUserById(decoded.id)
        .then((response) => {
          store.setAuth(true);
          store.setUser(response.data);
        })
        .catch((error) => {
          console.log(error);
          store.setAuth(false);
          store.setUser({} as IUser);
        })
        .finally(() => {
          store.setLoading(false);
        });
    }
  }, [store]);

  if (store.isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <BrowserRouter>
        <AppRoutes isAuth={store.isAuth} />
      </BrowserRouter>
    </>
  );
});

export default App;
