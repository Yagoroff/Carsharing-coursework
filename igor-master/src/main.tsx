import { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "mdb-ui-kit/css/mdb.min.css";
import Store from "./store/store.ts";
import "./style/global.css";

interface State {
  store: Store;
}

const store = new Store();

export const Context = createContext<State>({ store });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Context.Provider value={{ store }}>
    <App />
  </Context.Provider>
);
