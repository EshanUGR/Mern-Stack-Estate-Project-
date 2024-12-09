import React from 'react'
import {FaSearch} from 'react-icons/fa';
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux';
const Header = () => {
  const {currentUser}=useSelector(state=>state.user);
  return (
    <header className="p-3 shadow-md bg-slate-200 ">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <Link to="/">
          <h1 className="flex-wrap text-sm font-bold sm:text-xl">
            <span className="text-slate-500">Ravindu Eshan</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form className="flex items-center p-3 rounded-lg bg-slate-100">
          <input
            type="text"
            placeholder="Search..."
            className="w-24 bg-transparent focus:outline-none sm:w-64 "
          />
          <FaSearch />
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden cursor-pointer sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden cursor-pointer sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img src={currentUser.avatar} alt="profile" className='object-cover rounded-full h-7 w-7' />
            ) : (
              <li className="text-slate-700 hover:underline">Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header
