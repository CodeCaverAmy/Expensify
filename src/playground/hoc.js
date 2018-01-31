// Higher Order Components (HOC)
// a react compoenent (HOS) that renders another component(s)
// 1) Reuse Code
// 2) Render hijacking
// 3) Prop manipulation
// 4) Abstrct State

import React from 'react';
import ReactDOM from 'react-dom';


// component
const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

// create a function .. NOT a React component
const withAdminWarning = (WrappedComponent) => { // generic name - commonly known as WrappedComponent
    // return HOC
    return (props) => (
        <div>
            { props.isAdmin && <p>This is private info, please don't share.</p> }
            <WrappedComponent {...props} /> 
        </div>
    );
};

const requireAuthentication = (WrappedComponent) => {
    // return HOC
    return (props) => (
        <div>
            { props.isAuthenticated ? (
                <WrappedComponent {...props} />
            ) : (
                <p>Please Login to view the info</p>
            )}
        </div>
    );
};

// requireAuthentication

// create AdminInfo component
const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

//ReactDOM.render(<AdminInfo isAdmin={true} info="These are the details" />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info="This is Authentidcation" />, document.getElementById('app'));