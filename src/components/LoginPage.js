import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({ startLogin }) => (
    <div className="box-layout">
        <div className="box-layout__box">
            <h1 className="box-layout__title">Expensify</h1>
            <p>Get your expenses under control</p>
            <button className="button" onClick={startLogin}>Login</button>
        </div>
    </div>
);

// no need for mapStateToProps since we do not need anything state related (undefined)
// we do need mapDispatchToProps since we do want to dispatch startLogin

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage); // undefined, since we don't need mapStateToProps