import { Route, Routes } from "react-router-dom";
import GuardedRoute from "./GuardedRoute";
import LoginPage from "../pages/Login";
import HomePage from "../pages/Home";
import CurrentAutoPage from "../pages/CurrentAuto";
import RegistrationPage from "../pages/Registration";
import AutoPage from "../pages/Auto";
import EndedOrdersPage from "../pages/EndedOrders";
import NotFoundPage from "../pages/NotFound";

interface AppRoutesProp {
  isAuth: boolean;
}

const LOGIN_ROUTE = { SRC: "/login", CONTENT: <LoginPage /> };
const HOME_ROUTE = { SRC: "/", CONTENT: <HomePage /> };
const REGISTRATION_ROUTE = {
  SRC: "/registration",
  CONTENT: <RegistrationPage />,
};
const AUTO_ROUTE = { SRC: "/auto", CONTENT: <AutoPage /> };
const CURRENTAUTO_ROUTE = {
  SRC: "/current-auto",
  CONTENT: <CurrentAutoPage />,
};
const ENDEDORDERS_ROUTE = {
  SRC: "/ended-orders",
  CONTENT: <EndedOrdersPage />,
};

const AppRoutes = (props: AppRoutesProp): JSX.Element => {
  const { isAuth } = props;

  return (
    <Routes>
      {/* Unguarded Routes
      <Route path={ABOUT_ROUTE} element={<p>About Page</p>} /> */}

      {/* Non-Authenticated Routes: accessible only if user in not authenticated */}
      <Route
        element={
          <GuardedRoute
            isRouteAccessible={!isAuth}
            redirectRoute={HOME_ROUTE.SRC}
          />
        }
      >
        {/* Login Route */}
        <Route path={LOGIN_ROUTE.SRC} element={LOGIN_ROUTE.CONTENT} />
        <Route
          path={REGISTRATION_ROUTE.SRC}
          element={REGISTRATION_ROUTE.CONTENT}
        />
      </Route>

      {/* Authenticated Routes */}
      <Route
        element={
          <GuardedRoute
            isRouteAccessible={isAuth}
            redirectRoute={LOGIN_ROUTE.SRC}
          />
        }
      >
        <Route path={HOME_ROUTE.SRC} element={HOME_ROUTE.CONTENT} />
        <Route path={AUTO_ROUTE.SRC} element={AUTO_ROUTE.CONTENT} />
        <Route
          path={CURRENTAUTO_ROUTE.SRC}
          element={CURRENTAUTO_ROUTE.CONTENT}
        />
        <Route
          path={ENDEDORDERS_ROUTE.SRC}
          element={ENDEDORDERS_ROUTE.CONTENT}
        />
      </Route>

      {/* Not found Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
