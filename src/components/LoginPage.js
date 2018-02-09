import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({ startLogin }) => (
    <div>
        <button onClick={startLogin}>Login</button>
    </div>
);

// no need for mapStateToProps since we do not need anything state related (undefined)
// we do need mapDispatchToProps since we do want to dispatch startLogin

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage); // undefined, since we don't need mapStateToProps