import './App.css';
import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import axios from 'axios'
import Header from './components/Header';
import Login from './pages/user/Login'
import Signup from './pages/user/Signup'
import Home from './pages/user/Home'
import Menu from './pages/user/Menu'
import Cart from './pages/user/Cart'
import NewProduct from './pages/admin/NewProduct';
import User from './pages/admin/User';
import Invoice from './pages/admin/Invoice';
import { useDispatch } from 'react-redux';
import { loginRedux } from './redux/userSlice';
import { setDataProduct } from './redux/productSlice';
import { setDataCart } from './redux/cartSlice';
import Footer from './components/Footer';


function App() {

  const storageUser = sessionStorage.getItem('user') ?? ""
  const dispatch = useDispatch()
  if (storageUser) dispatch(loginRedux(JSON.parse(storageUser)))

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}products`)
      .then(res => dispatch(setDataProduct(res.data)))
      .catch()
  }, [dispatch])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}carts`)
      .then(res => {
        dispatch(setDataCart(res.data))
      })
      .catch()
  }, [dispatch])

  return (
    <div className="App">
      <Toaster />
      <Header />
      <div className='pt-16 bg-slate-100 min-h-screen'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/menu/:id' element={<Menu />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/newproduct' element={<NewProduct />} />
          <Route path='/user' element={<User />} />
          <Route path='/invoice' element={<Invoice />} />
          <Route path='*' element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
