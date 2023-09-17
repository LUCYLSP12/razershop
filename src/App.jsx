import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/home/Home";
import { SharedLayout } from "./components/SharedLayout";
import { routes } from "./routes";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";



function App() {
  const setRoutes = ()=> (
    routes.map(({id, path, element})=>(
      <Route key={id} path={path} element={element}/>
    ))
  )


  return (
    <div className="App">





    
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          
          {setRoutes()}
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
