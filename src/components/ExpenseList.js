import React from 'react';
import { connect } from 'react-redux'; // import named export connect, connecting our component to the Redux store

const ExpenseList = (props) => (
    <div>
        <h1>Expense List</h1>
        {props.filters.text}
        {props.expenses.length}
    </div>
);

const mapStateToProps = (state) => {
    return {
        expenses: state.expenses,
        filters: state.filters
    };
}

// create  new const for the HOC
export default connect(mapStateToProps)(ExpenseList); // connect gives something back - a function 

