import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

// create stateless functional component
export const PrivateRoute = ({ // destructure the props object
    isAuthenticated, 
    component: Component, // since we are going to render component, it needs to ber renamed as Component
    ...rest // ...rest grabs the remaining props, ...rest will contain everything that has not been destructured

    // create an instance of Route, which will not contain isAuthenicated (since it is not supported)
    // so pass in ...rest, but we also need component passed into it, so we define component on its own
}) => (
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <div>
                <Header />
                <Component {...props} />
            </div>
        ) : (
            <Redirect to="/" />
        )
    )} />
);


// no need to dispatch anything so no need for mapDispatch to props
const mapStateToProps = (state) => ({ // we will need to grab the state to see if the user is logged in or not
    // we only need one thing, like isAuthenicated
    isAuthenticated: !!state.auth.uid // boolean true if user is authenticated and boolean false if user is not authenticated
});

// export connected version by AppRouter
export default connect(mapStateToProps)(PrivateRoute);