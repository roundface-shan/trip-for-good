import React, { useEffect } from 'react';
import styles from './App.module.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, SigninPage, RegisterPage, DetailPage, SearchPage, ShoppingCartPage, PlaceOrderPage } from './pages';
import { Navigate } from 'react-router-dom';
import { useSelector, useAppDispatch } from './redux/hooks';
import { getShoppingCart } from './redux/shoppingCart/slice';

const PrivateRoute = ({children}) => {
  const jwt = useSelector(state => state.signIn.token)
  return jwt ? children : <Navigate to="/signin" />
}

const App: React.FC = () => {
  const jwt = useSelector(state => state.signIn.token)
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    if(jwt) {
      dispatch(getShoppingCart(jwt))
    }
  }, [jwt])

  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/search/" >
            <Route path=":keywards" element={<SearchPage />} />
            <Route path="" element={<SearchPage />} />
          </Route>
          <Route
            path="/shoppingCart"
            element={
            <PrivateRoute>
              <ShoppingCartPage />
            </PrivateRoute>}
          />
          <Route
            path="/placeOrder"
            element={
            <PrivateRoute>
              <PlaceOrderPage />
            </PrivateRoute>}
          />
          <Route path="/detail/:touristRouteId" element={<DetailPage />} />
          <Route path="*" element={<h1>404 页面找不到了</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
