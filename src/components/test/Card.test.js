import React from 'react';
import Card from '../Card';
import { shallow } from 'enzyme';


describe('Card', () => {
  it ('test it matches and exisiting snapshot', () => {
    const wrapper = shallow(
      <Card
        id={1}
        text="hello there"
        emoji="heart_eyes"
        deleteCardCallback={() => {}}
      />);

      expect(wrapper).toMatchSnapshot();
  });

});
