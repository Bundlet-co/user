import { Route, Routes } from "react-router-dom";
import Layout from "@/Layout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import { MainProvider } from "@/context/MainContext";
import Verify from "@/pages/Verify";
import Product from "@/pages/Product";
import SingleProduct from "@/pages/SingleProduct";
import Persit from "@/pages/Persist";
import RequiredAuth from "@/pages/RequiredAuth";
import Cart from "@/pages/Cart";
import Wishlist from "@/pages/Wishlist";
import Missing from "./pages/Missing";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={
        <MainProvider>
          <Layout />
        </MainProvider> }
      >
        <Route index element={ <Home /> } />
        <Route path="login" element={ <Login /> } />
        <Route path="register" element={ <Signup /> } />
        <Route path="verify" element={ <Verify /> } />
        <Route path="product">
          <Route index element={ <Product /> } />
          <Route path=":id" element={<SingleProduct/>}/>
        </Route>
        <Route element={ <Persit /> }>
          <Route element={ <RequiredAuth /> }>
            <Route path="cart" element={ <Cart /> } />
            <Route path="wishlist" element={<Wishlist/>}/>
          </Route>
        </Route>
        <Route path="*" element={<Missing/>}/>
      </Route>
    </Routes>
  )
}

export default App