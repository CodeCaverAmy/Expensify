import React from 'react';
import { shallow } from 'enzyme'; // replacing ReactShallowRenderer
import { Header } from '../../components/Header';
import { start } from 'repl';

// test so see if header gets rendered correctly
test('should render Header correctly', () => {
    const wrapper = shallow(<Header startLogout={() => { }} />);
    expect(wrapper).toMatchSnapshot();
});

test('should call startLogout on butotn click', () => {
    // add a spy
    const startLogout = jest.fn();
    const wrapper = shallow(<Header startLogout={startLogout} />);
    wrapper.find('button').simulate('click');
    expect(startLogout).toHaveBeenCalled();
});