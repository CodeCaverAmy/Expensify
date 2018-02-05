import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import number from 'numeral';

// Export a stateless functional component
// description, amount, createdAt

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
    <div>
        <Link to={`/edit/${id}`}><h3>{description}</h3></Link>
        <p>
            {amount}: 
            {moment(createdAt).format('MMMM do, YYYY')}</p>
    </div>
);

export default ExpenseListItem;