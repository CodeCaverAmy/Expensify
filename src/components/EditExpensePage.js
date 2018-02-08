import React from 'react';
import { connect } from 'react-redux'; // we want to connect this component to the redux store
import ExpenseForm from './ExpenseForm'; // we need the expense form so that we can use it in our component
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.startEditExpense(this.props.expense.id, expense);
        this.props.history.push('/');
    };
    onRemove = () => {
        this.props.startRemoveExpense({ id: this.props.expense.id });
        this.props.history.push('/');
    };

    render() {
        return (
            <div>
                <ExpenseForm 
                    expense={this.props.expense} // send in the expense into the Expense Form
                    onSubmit={this.onSubmit}
                />
                <button onClick={this.onRemove}>Remove</button>
            </div>
        );
    }
}; 

// set up mapToStateProps to give the component the current expense object
const mapToStateProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.id)
    };
};

const mapDispatchToProps = (dispatch, props) => ({
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
});

export default connect(mapToStateProps, mapDispatchToProps)(EditExpensePage); 