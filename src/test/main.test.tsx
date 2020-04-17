import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount } from 'enzyme';

import MainPage from '../components/mainPage/MainPage';
import DisplayResult from '../components/displayResult/DisplayResult';
import StolenBikeDetails from '../components/stolenBikeDetails/StolenBikeDetails';
import CustomMap from '../components/customMap/CustomMap';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('main.test', () => {
  describe('render test', () => {
    it('MainPage', () => {
      const wrapper = shallow(<MainPage />);
      expect(wrapper).toMatchSnapshot();
    });

    it('DisplayResult', () => {
      const wrapper = shallow(<DisplayResult />);
      expect(wrapper).toMatchSnapshot();
    });

    it('StolenBikeDetails', () => {
      const wrapper = shallow(<StolenBikeDetails />);
      expect(wrapper).toMatchSnapshot();
    });

    it('CustomMap', () => {
      const wrapper = shallow(<CustomMap />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
