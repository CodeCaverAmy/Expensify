import React from 'react';
import { shallow } from 'enzyme'; // replacing ReactShallowRenderer
import NotFoundPage from '../../components/NotFoundPage';

// test so see if header gets rendered correctly
test('should render NotFoundPage correctly', () => {
    const wrapper = shallow(<NotFoundPage />);
    expect(wrapper).toMatchSnapshot();
});