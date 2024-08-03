
import './App.css';
import Navbar from './Components/Navbar/Navbar.js'; 
import Shop from './Pages/Shop.js';
import Product from './Pages/Product.js';
import ShopCategory from './Pages/ShopCategory.js';
import { Routes, Route } from 'react-router-dom';
import LoginSignup from './Pages/LoginSignup.js';
import Cart from './Pages/Cart.js';
import Footer from './Components/Footer/Footer.js';
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kid_banner from './Components/Assets/banner_kids.png'


function App() {
  return (
    <>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/mens' element={<ShopCategory  banner={men_banner} category="men" />} />
          <Route path='/women' element={<ShopCategory banner={women_banner} category="women" />} />
          <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid" />} />
          <Route path='/product' element={<Product />}>
              <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup />} />
        </Routes>
         <Footer/>
    </>
  );
}

export default App;