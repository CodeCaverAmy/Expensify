import React from 'react';
import { shallow } from 'enzyme';
import LoadingPage from '../../components/LoginPage';

test('should render Loading Page correctly', () => {
    const wrapper = shallow(<LoadingPage />);
    expect(wrapper).toMatchSnapshot();
});