import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';
import {
  Home,
  About,
  Cart,
  Checkout,
  Error,
  Products,
  SingleProduct,
  PrivateRoute,
  AuthWrapper,
} from './pages';

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Navbar></Navbar>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='about' element={<About />}></Route>
          <Route path='cart' element={<Cart />}></Route>
          <Route path='products' element={<Products />}></Route>
          <Route path='/products/:id' element={<SingleProduct />}></Route>
          <Route
            path='checkout'
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }></Route>
          <Route path='*' element={<Error />}></Route>
        </Routes>
        <Footer />
      </Router>
    </AuthWrapper>
  );
}
export default App;
