import React from 'react';
import { connect } from 'react-redux'; // import named export connect, connecting our component to the Redux store
import ExpenseListItem from './ExpenseListItem';
import SelectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
    <div className='content-container'>
        <div className='list-header'>
            <div className='show-for-mobile'>Expenses</div>
            <div className='show-for-desktop'>Expense</div>
            <div className='show-for-desktop'>Amount</div>
        </div>
        <div className='list-body'>
            {
                props.expenses.length === 0 ? (
                    <div className='list-item list-item--message'>
                        <span>No expenses</span>
                    </div>
                ) : (
                    props.expenses.map((expense) => { 
                        return <ExpenseListItem key={expense.description} {...expense} />
                    })            
                )
            }
        </div>
    </div>
);

const mapStateToProps = (state) => {
    return {
        expenses: SelectExpenses(state.expenses, state.filters)
    };
};

// create  new const for the HOC
export default connect(mapStateToProps)(ExpenseList); // connect gives something back - a function 

