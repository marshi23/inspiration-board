import React from 'react';
import Board from '../Board';
import { shallow } from 'enzyme';


describe('Board', () => {
  it('test it matches and exisiting snapshot', () => {
    const wrapper = shallow(
      <Board
        url="https://inspiration-board.herokuapp.com/boards/"
        boardName={"maryam"}
      />);

    expect(wrapper).toMatchSnapshot();
  });

});
