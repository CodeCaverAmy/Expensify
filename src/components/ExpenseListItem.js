import React from 'react';
import { connect } from 'react-redux';
import { removeExpense } from '../actions/expenses';

// Export a stateless functional component
// description, amount, createdAt

const ExpenseListItem = ({ dispatch, id, description, amount, createdAt }) => (
    <div>
        <h3>{description}</h3>
        <p>{amount} - {createdAt}</p>
        <button id={id} onClick={() => {
            dispatch(removeExpense({ id}));
            console.log({ id });
        }}>Remove</button>
    </div>
);

// we don't need anything from state, so we don't need mapStateToProps
export default connect()(ExpenseListItem);