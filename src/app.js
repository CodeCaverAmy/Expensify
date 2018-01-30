import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter, Route, Switch,
    Link // adds client-side routing
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
        <Link to='/'>Dashboard</Link>
        <Link to='/create'>Add Expense</Link>
        <Link to='/edit'>Edit Expense</Link>
        <Link to='/help'>Help</Link>
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
