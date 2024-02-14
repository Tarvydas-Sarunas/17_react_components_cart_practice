import React from 'react';
import { PiShoppingCartThin } from 'react-icons/pi';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className='bg-gray-900 text-white'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link to={'/'}>
          <h2 className='text-3xl p-3 leading-none'>Logo</h2>
        </Link>
        <nav className='flex gap-5'>
          <NavLink
            className='text-lg p-3 hover:bg-slate-700 hover:text-white'
            to={'/'}
          >
            Home
          </NavLink>
          <NavLink
            className='text-lg p-3 hover:bg-slate-700 hover:text-white'
            to={'/about'}
          >
            About
          </NavLink>
          <NavLink
            className='text-lg p-3 hover:bg-slate-700 hover:text-white'
            to={'/shop'}
          >
            Shop
          </NavLink>
          <NavLink
            className='text-lg p-3 hover:bg-slate-700 hover:text-white flex gap-2'
            to={'/cart'}
          >
            <PiShoppingCartThin size={'25px'} />
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
