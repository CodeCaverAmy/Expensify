import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
    <header>
        <h1>Expensify</h1>
        <NavLink to='/' exact={true} activeClassName='is-active'>Home</NavLink>
        <NavLink to='/dashboard' activeClassName='is-active'>Dashboard</NavLink>
        <NavLink to='/login' activeClassName='is-active'>Login</NavLink>
    </header>
);

export default Header;