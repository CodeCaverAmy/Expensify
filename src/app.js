import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter, Route, Switch,
    Link, NavLink // adds client-side routing
} from 'react-router-dom';

import 'normalize.css/normalize.css';
import './styles/styles.scss';

const ExpenseDashboardPage = () => (
    <div>
        This is dashboard componenet
    </div>
); 

const AddExpensePage = () => (
    <div>
        This is Add Expense componenet
    </div>
); 

const EditExpensePage = () => (
    <div>
        This is Edit Expense componenet
    </div>
); 

const HelpPage = () => (
    <div>
        This is Help componenet
    </div>
); 

const NotFoundPage = () => (
    <div>
        404 - <Link to='/'>Go Home</Link>
    </div>
); 

const Header = () => (
    <header>
        <h1>Expensify</h1>
        <NavLink to='/' exact={true} activeClassName='is-active'>Dashboard</NavLink>
        <NavLink to='/create' activeClassName='is-active'>Add Expense</NavLink>
        <NavLink to='/edit' activeClassName='is-active'>Edit Expense</NavLink>
        <NavLink to='/help' activeClassName='is-active'>Help</NavLink>
    </header>
);

const routes = (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path='/' exact={true} component={ExpenseDashboardPage} />
                <Route path='/create' component={AddExpensePage} />
                <Route path='/edit' component={EditExpensePage} />
                <Route path='/help' component={HelpPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('app'));
