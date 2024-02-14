import { Route, Routes } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import ShopPage from './pages/shop/ShopPage';

import HomePage from './pages/HomePage';
import Header from './components/header/Header';
import SingleItemPage from './pages/shop/SingleItemPage';

export default function App() {
  console.log('App susikure');
  return (
    <div className='App mx-auto'>
      <Header />
      <hr />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/shop' element={<ShopPage />} />
        <Route path='/shop/:itemId' element={<SingleItemPage />} />
      </Routes>
    </div>
  );
}
