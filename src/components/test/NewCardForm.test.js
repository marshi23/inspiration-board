import React from 'react';
import NewCardForm from '../NewCardForm';
import { shallow } from 'enzyme';


describe('NewCardForm', () => {
  it('test it matches and exisiting snapshot', () => {
    const wrapper = shallow(
      <NewCardForm
        addCardCallback={() => {}}
      />);

    expect(wrapper).toMatchSnapshot();
  });

});
