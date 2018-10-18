import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Spinner from 'components/common/Spinner/Spinner';

import styles from 'components/common/Spinner/Spinner.scss';

describe('<Spinner />', () => {
  context('rendering', () => {
    it('renders wrapper', () => {
      const wrapper = shallow(<Spinner />);
      expect(wrapper.find(`.${styles.wrapper}`)).to.have.length(1);
    });

    context('color prop', () => {
      it('applies class name from defaultProps without color prop', () => {
        const {defaultProps} = Spinner;
        const wrapper = shallow(<Spinner />);
        expect(wrapper.find(`.${styles[defaultProps.color]}`)).to.have.length(1);
      });

      it('applies class name with color prop', () => {
        const wrapper = shallow(<Spinner color="yellow" />);
        expect(wrapper.find(`.${styles.yellow}`)).to.have.length(1);
      });
    });
  });
});
