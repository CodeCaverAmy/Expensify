import React from 'react';
import { shallow } from 'enzyme'; // replacing ReactShallowRenderer
import Header from '../../components/Header';

// test so see if header gets rendered correctly
test('should render Header correctly', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
});