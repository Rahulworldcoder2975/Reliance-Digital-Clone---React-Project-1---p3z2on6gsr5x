import React,{Suspense, useState} from 'react'
import Navbar from './component/navbar/navbar'
import Menu from './component/navbar/menu/menu'
import Slider from './component/slider/slider'
import Product from './component/product/produt'

import {BrowserRouter as Router,Navigate, Route,Routes} from 'react-router-dom'
import Search from './component/search/search'
import ProductDetail from './component/product/viewDetail'
import DashboardMenu from './component/dashboard/dashboard'
import Cart from './component/cart/cart'  
import Payment from './component/payment/payment'
import Signin from './component/login/singin'
import SignupPage from './component/login/signup'
const ProtectedRoute = ({ children }) => {
  
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" replace />; // Redirect to login
  }

  return children;
};
export default function App() {
  const [search, setSearch] = useState('');

  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  console.log("child to parent ", search)
  return ( 
    <Router>
      <Routes>
        <Route 
        exact
        path='/'
        element={<Suspense fallback={<div className='loader'></div>}>
         <Navbar search={search} handleChange={handleChange} />
         <Menu/>
         <Slider/>
         <Product/>
        </Suspense>}
        />
        <Route
        exact
        path='/search'
        element={<Suspense fallback={<div className='loader'></div>}>
          <Navbar search={search} handleChange={handleChange} />
          <Menu/>
           <Search search={search}/>
        </Suspense>}
        />
        <Route
        exact 
        path='product/:id'
        element={<Suspense fallback={<div className='loaedr'></div>}>
          <Navbar search={search} handleChange={handleChange} />
         <Menu/>
          <ProductDetail/>
        </Suspense>}
        />
             <Route
             exact
             path='/dashboard'
             element={
              <ProtectedRoute>
             <Suspense fallback={<div className='loader'>loaded</div>}>
               <Navbar search={search} handleChange={handleChange} />
         <Menu/>
              <DashboardMenu/>
             </Suspense> 
      </ProtectedRoute> 
            }
             />
            <Route
    path="/cart/:id"
    element={
      <ProtectedRoute>
        <Navbar search={search} handleChange={handleChange} />
        <Menu />
        <Cart />
      </ProtectedRoute>
    }
  />
          <Route
    path="/cart"
    element={
      <ProtectedRoute>
        <Navbar search={search} handleChange={handleChange} />
        <Menu />
        <Cart />
      </ProtectedRoute>
    }
  />
              <Route
             exact 
             path='/payment'
             element={
             <ProtectedRoute>
             <Suspense fallback={<div className='loader'>loading</div>}>
              <Payment/>
             </Suspense>
      </ProtectedRoute>
             }
             
             />
             <Route
             exact
             path='/login'
             element={<Suspense fallback={<div className='loader'>loading</div>}>
              <Signin/>
             </Suspense>}
             />
                <Route
             exact
             path='/signup'
             element={<Suspense fallback={<div className='loader'>loading</div>}>
              <SignupPage />
             </Suspense>}
             />
      </Routes>
    </Router>
  )
}  
 