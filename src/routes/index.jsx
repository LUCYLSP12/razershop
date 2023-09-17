import { Login } from "../authPages/Login";
import { Regsiter } from "../authPages/Regsiter";
import  Karzina  from "../korzina/karzina";
import { NotFound } from "../pages/notFound/NotFound";

export const routes = [
  { id: "login", path: "/login", element: <Login /> },
  { id: "registr", path: "/registr", element: <Regsiter /> },
  { id: "cart", path: "/cart", element: <Karzina/> },
  { id: "notFound", path: "/*", element: <NotFound/> },
  { id: "productInfo", path: "/", element: <NotFound/> },


];