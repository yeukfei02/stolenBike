import React from 'react';
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { shallow, mount } from "enzyme";

import MainPage from '../components/mainPage/MainPage';

Enzyme.configure({ adapter: new Adapter() });

describe("main.test", () => {
  describe("render test", () => {
    it("MainPage", () => {
      shallow(<MainPage />);
    });
  });
});
