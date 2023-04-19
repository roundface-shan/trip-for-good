import React from 'react';
import styles from './App.module.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, SigninPage, RegisterPage, DetailPage, SearchPage, ShoppingCartPage } from './pages';
import { Navigate } from 'react-router-dom';
import { useSelector } from './redux/hooks';

const PrivateRoute = ({children}) => {
  const jwt = useSelector(state => state.signIn.token)
  return jwt ? children : <Navigate to="/signin" />
}

const App: React.FC = () => {
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
          <Route path="/detail/:touristRouteId" element={<DetailPage />} />
          <Route path="*" element={<h1>404 页面找不到了</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
