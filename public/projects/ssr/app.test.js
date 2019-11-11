import React from 'react';
import App from './app';
import renderer from 'react-test-renderer';

// https://reactjs.org/docs/test-renderer.html
test('react component', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree.children[0]).toBe('app component');
    expect(tree.children[1].children[0]).toBe('3');
})