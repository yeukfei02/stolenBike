import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount } from 'enzyme';

import MainPage from '../components/mainPage/MainPage';
import DisplayResult from '../components/displayResult/DisplayResult';
import StolenBikeDetails from '../components/stolenBikeDetails/StolenBikeDetails';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('main.test', () => {
  describe('render test', () => {
    it('MainPage', () => {
      shallow(<MainPage />);
    });

    it('DisplayResult', () => {
      shallow(<DisplayResult />);
    });

    it('StolenBikeDetails', () => {
      shallow(<StolenBikeDetails />);
    });
  });
});
