import ReactShallowRenderer from 'react-test-renderer/shallow'; // allows us to render our components in regular javascript code and then we can assert something about what got rendered
import React from 'react';
import Header from '../../components/Header';

// test so see if header gets rendered correctly
test('should render Header correctly', () => {
    const renderer = new ReactShallowRenderer;
    renderer.render(<Header />); 
    expect(renderer.getRenderOutput()).toMatchSnapshot();
});