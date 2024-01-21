import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import Basket from "./pages/Basket";
import AddPage from "./pages/AddPage";
import Detail from "./pages/Detail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/Wishlist" element={<Wishlist />} />
            <Route path="/Basket" element={<Basket />} />
            <Route path="/AddPage" element={<AddPage />} />
            <Route path="/Detail/:id" element={<Detail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
