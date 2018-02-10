import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout }) => (
    <header>
        <h1>Expensify</h1>
        <NavLink to='/' exact={true} activeClassName='is-active'>Home</NavLink>
        <NavLink to='/dashboard' activeClassName='is-active'>Dashboard</NavLink>
        <button onClick={startLogout}>Logout</button>
    </header>
);

const mapDisatchToProps = (dispatch) => ({
    // pass down to header startLogout
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDisatchToProps)(Header);