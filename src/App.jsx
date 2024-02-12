import { Route, Routes } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import ShopPage from './pages/shop/ShopPage';
import SingleItemPage from './pages/shop/SingleItemPage';
import HomePage from './pages/HomePage';
import Header from './components/header/Header';

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
        <Route path='/shop/5' element={<SingleItemPage />} />
      </Routes>
    </div>
  );
}
